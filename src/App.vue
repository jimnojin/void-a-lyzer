<template>
  <div>
    <audio id="player" controls="controls" volume="0.2"
      crossorigin="anonymous">
      <!-- <source src="./assets/track.wav"> -->
      <source src="./assets/track.mp3">
    </audio>
    <button @click="start">PLAY</button>

    <select v-model="modeModel">
      <option v-for="m in DISPLAY_MODE" :key="m">{{ m }}</option>
    </select>
    <center>
      <Equalizer />
    </center>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { FFT_SIZE, DISPLAY_MODE } from './const';
import Equalizer from './components/Equalizer.vue';

export default {
  name: 'App',
  components: {
    Equalizer,
  },

  data() {
    return {
      audioContext: null,
      analyser: null,
      DISPLAY_MODE,
    };
  },

  computed: {
    ...mapState(['data', 'mode']),

    modeModel: {
      get() {
        return this.mode;
      },
      set(value) {
        this.setMode(value);
      },
    },
    player() {
      return this.$el.querySelector('#player');
    },
  },

  methods: {
    ...mapActions(['setData', 'setPlaying', 'setMode']),

    getAudioContext() {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = FFT_SIZE;
    },

    getData() {
      requestAnimationFrame(() => this.getData());

      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      this.setData(data);
    },

    async start() {
      this.getAudioContext();
      await this.audioContext.resume();
      this.player.play();
      this.setPlaying(true);

      const source = this.audioContext.createMediaElementSource(this.player);
      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      this.getData();
    },
  },
};
</script>

<style lang="scss">
body {
  background: black;
}
</style>

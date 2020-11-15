<template>
  <div>
    <audio id="player" controls="controls" volume="0.2"
      crossorigin="anonymous">
      <!-- <source src="./assets/track.wav"> -->
      <!-- <source src="./assets/track.mp3"> -->
      <source src="http://stream-02.radiotangra.com/Tangra-middle">
    </audio>
    <button @click="start">PLAY</button>
    <button @click="stop">STOP</button>

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
      timeout: null,
      source: null,
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

    /**
     * @returns {HTMLAudioElement}
     */
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
      this.timeout = setTimeout(() => this.getData(), 1000 / 60);

      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      this.setData(data);
    },

    async start() {
      this.getAudioContext();
      await this.audioContext.resume();
      this.player.play();
      this.setPlaying(true);

      if (!this.source) {
        this.source = this.audioContext.createMediaElementSource(this.player);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
      }
      this.getData();
    },

    stop() {
      this.player.pause();
      this.setPlaying(false);
      clearTimeout(this.timeout);
    },
  },
};
</script>

<style lang="scss">
body {
  background: black;
}
</style>

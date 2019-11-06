<template>
  <div>
    <audio id="player" controls="controls"
      crossorigin="anonymous">
      <source src="./assets/bass.mp3">
    </audio>
    <button @click="start">PLAY</button>
    <center>
      <Equalizer :data="data" />
    </center>
  </div>
</template>

<script>
import Equalizer from './components/Equalizer.vue';

export default {
  name: 'App',
  components: {
    Equalizer,
  },

  data() {
    const fftSize = 2 ** 8;
    return {
      audioContext: null,
      analyser: null,
      data: new Uint8Array(fftSize / 2).fill(255),
      fftSize,
    };
  },

  computed: {
    player() {
      return this.$el.querySelector('#player');
    },
  },

  methods: {
    getAudioContext() {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.fftSize;

      this.data = new Uint8Array(this.analyser.frequencyBinCount);
    },

    getData() {
      requestAnimationFrame(() => this.getData());

      const data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
      this.data = data;
    },

    async start() {
      this.getAudioContext();
      await this.audioContext.resume();
      this.player.play();
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

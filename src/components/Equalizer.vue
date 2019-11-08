<template>
<div class="equalizer" style="height: 800px; width: 1024px;transform: translate(50%, 15%);">
  <Bar :style="transform(i)" :value="value" :key="i" v-for="(value, i) in data" />
</div>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters, mapActions } from 'vuex';
import chroma from 'chroma-js';
import { colors } from '../utils';
import Bar from './Bar.vue';

export default {
  name: 'Equalizer',
  components: { Bar },

  data() {
    return {
      radius: 0,
      timer: null,
    };
  },

  computed: {
    ...mapState(['data', 'color', 'isPlaying']),
    ...mapGetters(['angle']),
  },

  methods: {
    ...mapActions(['setColor']),

    transform(index) {
      const height = this.radius * 2;
      return {
        position: 'absolute',
        transformOrigin: '0 100%',
        transform: `
          rotate(${this.angle * (index - this.data.length / 2)}deg)
          translate(-50%, ${-height}px)
        `,
      };
    },
  },

  watch: {
    isPlaying(value) {
      if (value) {
        let tick = 0;
        let dir = 1;

        this.timer = setInterval(() => {
          this.setColor(colors(tick).css());

          tick += 1 * dir;
          if (tick >= 100 || tick <= 0) {
            dir *= -1;
          }
        }, 500);
      } else {
        clearInterval(this.timer);
      }
    },
  },
  mounted() {
    const { width } = this.$el.getBoundingClientRect();
    this.radius = width / (2 * Math.PI) / 2;
  },
};
</script>

<style lang="scss" scoped>
.equalizer {
  display: inline-flex;
}
</style>

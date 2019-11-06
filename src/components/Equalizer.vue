<template>
<div class="equalizer" style="height: 800px; width: 1024px;transform: translate(50%, 15%);">
  <Bar :style="transform(i)" :value="value" :key="i" v-for="(value, i) in data" />
</div>
</template>

<script>
/* eslint-disable */
import Bar from './Bar.vue';

export default {
  name: 'Equalizer',
  components: { Bar },
  props: {
    data: Uint8Array,
  },

  data() {
    return {
      radius: 0,
    };
  },

  computed: {
    angle() {
      return 360 / this.data.length;
    },
  },

  methods: {
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

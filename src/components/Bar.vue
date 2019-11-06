<template>
<div class="bar">
  <div :key="i" v-for="(item, i) in items" class="bar--circle" :style="item" />
</div>
</template>

<script>
/* eslint-disable */
const MAX_VALUE = 255;
const MAX_ITEMS = 9;

export default {
  name: 'Bar',
  props: {
    value: Number,
    color: {
      type: Object,
      default: () => ({
        h: 128,
        s: 100,
        l: 50,
      }),
    },
  },

  computed: {
    items() {
      const ratio = this.value / MAX_VALUE;
      const items = Array.from({ length: MAX_ITEMS }).map(() => ({
        background: 'hsla(0, 0%, 100%, 0)',
      }));
      const segments = this.value * MAX_ITEMS / MAX_VALUE;
      let i;

      for (i = 0; i < Math.floor(segments); i += 1) {
        items[i].background = this.toColorString(this.color);
      }

      if (items[i]) {
        const scaledColor = { ...this.color };
        const offset = 64;
        scaledColor.h = Math.round(scaledColor.h - offset + (2 * offset * (segments - Math.floor(segments))));
        items[i].background = this.toColorString(scaledColor);
      }

      return items;
    },
  },

  methods: {
    toColorString(obj) {
      return `hsl(${obj.h}, ${obj.s}%, ${obj.l}%)`;
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  flex: 0 0 auto;
  flex-direction: column-reverse;

  display: flex;

  &--circle {
    width: 3px;
    height: 3px;
    margin: 3px;
    border-radius: 50%;

    transition: background 140ms ease-out;
    will-change: background;
  }
}
</style>

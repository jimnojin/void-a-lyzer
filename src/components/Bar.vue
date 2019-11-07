<template>
<div class="bar">
  <div :key="i" v-for="(item, i) in items" class="bar--circle" :style="item" />
</div>
</template>

<script>
/* eslint-disable */
import chroma from 'chroma-js';
import { mapState } from 'vuex';
import { setInterval } from 'timers';

const MAX_VALUE = 255;
const MAX_ITEMS = 11;

export default {
  name: 'Bar',
  props: {
    value: Number,
  },

  computed: {
    ...mapState(['color']),

    items() {
      const ratio = this.value / MAX_VALUE;
      const items = Array.from({ length: MAX_ITEMS }).map(() => ({
        background: chroma.hsl(0, 0, 1).alpha(0).css('hsl'),
      }));
      const segments = this.value * MAX_ITEMS / MAX_VALUE;
      let i;

      if (segments) {
        for (i = 0; i < Math.floor(segments); i += 1) {
          items[i].background = this.color;
        }

        if (items[i]) {
          const scaledColor = chroma(this.color);
          const offset = 64;
          const correct = offset + (2 * offset * (segments - Math.floor(segments)));
          items[i].background = scaledColor.brighten(offset / correct).css('hsl');
        }
      }

      return items;
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  $size: 6px;
  $margin: 1px;

  flex: 0 0 auto;
  flex-direction: column-reverse;

  display: flex;

  &--circle {
    width: $size;
    height: $size;
    margin: $margin;
    border-radius: 50%;

    // transition: background 140ms ease-out;
    will-change: background;
  }
}
</style>

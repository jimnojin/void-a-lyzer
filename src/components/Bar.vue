<template>
<div class="bar">
  <span class="bar--holder" :key="i" :style="{ flexDirection: segment.direction }" v-for="(segment, i) in items">
    <span class="bar--circle" :style="item" :key="j" v-for="(item, j) in segment.items" />
  </span>
</div>
</template>

<script>
/* eslint-disable */
import chroma from 'chroma-js';
import { mapState } from 'vuex';
import { DISPLAY_MODE } from '../const';

const MAX_VALUE = 255;
const MAX_ITEMS = 15;
const INACTIVE_BGR = chroma.hsl(0, 0, 1).alpha(0).css('hsl');
/**
 * [getItems description]
 *
 * @param   {Number}  value  [value description]
 * @param   {String}  mode   [mode description]
 * @param   {String}  color  [color description]
 * @param   {Number}  count  [count description]
 *
 * @returns {Array<{items: Object, direction: String}>} result
 */
function getItems(value, mode, color, count) {
  // const ratio = this.value / MAX_VALUE;
  let result = [];
  let items;
  let direction;

  if (mode === DISPLAY_MODE.OUTWARD) {
    direction = 'column-reverse';
    items = Array.from({ length: count }).map(() => ({
      background: chroma('#f00f').css,
    }));

    const segments = value * count / MAX_VALUE;
    let i;

    if (segments) {
      for (i = 0; i < Math.floor(segments); i += 1) {
        items[i].background = color;
      }

      if (items[i]) {
        const scaledColor = chroma(color);
        const offset = 64;
        const correct = offset + (2 * offset * (segments - Math.floor(segments)));
        items[i].background = scaledColor.brighten(offset / correct).css('hsl');
      }
    }

    result = [{ items, direction }];
  } else if (mode === DISPLAY_MODE.INWARD) {
    direction = 'column';
    items = Array.from({ length: count }).map(() => ({
      background: INACTIVE_BGR,
    }));

    const segments = value * count / MAX_VALUE;
    let i;

    if (segments) {
      for (i = 0; i < Math.floor(segments); i += 1) {
        items[i].background = color;
      }

      if (items[i]) {
        const scaledColor = chroma(color);
        const offset = 64;
        const correct = offset + (2 * offset * (segments - Math.floor(segments)));
        items[i].background = scaledColor.brighten(offset / correct).css('hsl');
      }
    }

    result = [{ items, direction }];
  } else {
    const inward = getItems(value, DISPLAY_MODE.INWARD, color, Math.floor(count / 2));
    const outward = getItems(value, DISPLAY_MODE.OUTWARD, color, Math.floor(count / 2));

    if (mode === DISPLAY_MODE.MID_INWARD) {
      result = [
        inward[0],
        outward[0],
      ];
    } else if (mode === DISPLAY_MODE.MID_OUTWARD) {
      result = [
        outward[0],
        inward[0],
      ];
    }
  }

  return result;
}

export default {
  name: 'Bar',
  props: {
    value: Number,
  },

  computed: {
    ...mapState(['color', 'mode']),

    items() {
      return getItems(this.value, this.mode, this.color, MAX_ITEMS);
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  $size: 6px;
  $margin: 1px;

  flex: 0 0 auto;
  flex-direction: column;
  display: flex;

  &--holder {
    flex: 0 0 auto;
    display: flex;

  }
  &--circle {
    width: $size;
    height: $size;
    margin: $margin;
    border-radius: 50%;

    // transition: background 140ms ease-out;
    will-change: background, box-shadow;
    box-shadow:
            0 0 .5rem #fff,
            inset 0 0 .5rem #fff,
            0 0 2rem currentColor,
            inset 0 0 2rem currentColor,
            0 0 4rem currentColor,
            inset 0 0 4rem currentColor;
  }
}
</style>

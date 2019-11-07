import Vue from 'vue';
import Vuex from 'vuex';
import chroma from 'chroma-js';
import { DISPLAY_MODE, FFT_SIZE } from '../const';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: DISPLAY_MODE.OUTWARD,
    data: new Uint8Array(FFT_SIZE / 2).fill(0),
    isPlaying: false,
    color: chroma.hsl(50, 0.2, 0.8).css(),
  },

  getters: {
    angle(state) {
      return 360 / state.data.length;
    },
  },

  actions: {
    setMode({ commit }, payload) {
      commit('setMode', payload);
    },
    setData({ commit }, payload) {
      commit('setData', payload);
    },
    setPlaying({ commit }, payload) {
      commit('setPlaying', payload);
    },
    setColor({ commit }, payload) {
      commit('setColor', payload);
    },
  },

  mutations: {
    setMode(state, payload) {
      state.mode = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
    setPlaying(state, payload) {
      state.isPlaying = payload;
    },
    setColor(state, payload) {
      state.color = payload;
    },
  },
});

import Vue from "vue";
import Vuex from "vuex";
import AppBar from "./AppBar.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    app_name: "wavesurfer.vue",
    github: "https://github.com/qh73xe/wavesurfer.vue"
  },
  mutations: {},
  actions: {},
  modules: { app_bar: AppBar }
});

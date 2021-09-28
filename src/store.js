import Vue from "vue";
import Vuex from "vuex";

import { DemoRepository } from "./models/DemoRepository";
import { AdminTestRepository } from "./models/AdminTestRepository";

Vue.use(Vuex);

export const SET_BAR_IMAGE = "SET_BAR_IMAGE";
export const SET_DRAWER = "SET_DRAWER";

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    drawer: null
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    }
  },
  actions: {}
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const SET_BAR_IMAGE = "SET_BAR_IMAGE";
export const SET_DRAWER = "SET_DRAWER";

const moduleMap = {
  // state: () => ({ ... }),
  // mutations: { ... },
  // actions: { ... },
  // getters: { ... }
};

const moduleDrawer = {
  state: () => ({ drawer: null }),
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    }
  }
  // actions: { ... },
  // getters: { ... }
};

export default new Vuex.Store({
  modules: {
    OrderRoomDrawer: moduleDrawer
  },
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",

    wsMessage: null
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },

    SOCKET_ONMESSAGE(state, message) {
      console.log(
        "=============== Received message from websocket server. ==============="
      );
      console.log(JSON.stringify(message.data));
      state.wsMessage = JSON.stringify(message.data);
      console.log(
        "======================================================================="
      );
    },
    SOCKET_ONERROR(state, message) {
      for (var property in message) {
        console.log(property + " = " + message[property]);
      }
    },
    SOCKET_ONCLOSE(state, message) {
      for (var property in message) {
        console.log(property + " = " + message[property]);
      }
    },
    SOCKET_ONOPEN(state, message) {
      for (var property in message) {
        console.log(property + " = " + message[property]);
      }
    }
  },
  actions: {}
});

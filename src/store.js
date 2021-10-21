import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const SET_BAR_IMAGE = "SET_BAR_IMAGE";
export const SET_DRAWER = "SET_DRAWER";

// const moduleMap = {
//   state: () => ({ map: null })
//   // mutations: { ... },

//   // map을 등록함
//   // 마커를 등록함
//   // 인포인도우를 등록함
//   // 마커를 보여줌

//   // actions: { ... },
//   // getters: { ... }
// };

const moduleDrawer = {
  state: () => ({ drawer: false }),
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

    snackbar: false,
    title: "",
    content: "",
    orderRoomTimer: 0,
    myCounterInterval: null,
    myRoomNumber: null,
    storeNameOfRoom: null
  },
  getters: {
    timeout: state => {
      if (state.orderRoomTimer < 0) {
        return true;
      }
      return false;
    },
    Duration: state => {
      const seconds = state.orderRoomTimer;
      return (
        Math.floor(seconds / 60) + ":" + (seconds % 60 ? seconds % 60 : "00")
      );
    }
  },
  mutations: {
    SET_ROOM_INFO(state, payload) {
      state.storeNameOfRoom = payload.storeName;
      state.myRoomNumber = payload.roomNumber;
    },
    INIT_ROOM_INFO(state) {
      state.storeNameOfRoom = null;
      state.myRoomNumber = null;
    },
    SNACKBAR_ALERT(state, payload) {
      state.title = payload.title;
      state.content = payload.content;
      state.snackbar = true;
    },
    START_TIMER(state, finish) {
      // const duration = start + finish * 60;
      state.orderRoomTimer = finish * 60;
      state.myCounterInterval = setInterval(
        () => (state.orderRoomTimer -= 1),
        1000
      );
    },
    STOP_TIMER(state) {
      console.log("stop!!");
      clearInterval(state.myCounterInterval);
      state.myCounterInterval = null;
    },
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },

    SOCKET_ONMESSAGE(state, message) {
      console.log(
        "=============== Received message from websocket server. ==============="
      );
      const data = JSON.parse(message.data);

      if (data.key === "ROOM-MATCHED") {
        if (!state.myRoomNumber) return;
        // 내 방인지 체크
        if (
          state.myRoomNumber == data.roomNumber &&
          state.storeNameOfRoom === data.storeName
        ) {
          clearInterval(state.myCounterInterval);
          state.myCounterInterval = null;
          state.storeNameOfRoom = null;
          state.myRoomNumber = null;
          state.title = "방 매칭 알림!";
          state.content = "방이 매칭 되었습니다! 주문 내역을 확인해주세요~";
          state.snackbar = true;
          // alert!!
        }
      }
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

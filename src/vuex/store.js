import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const OPEN_CREATE_ROOM = "OPEN_CREATE_ROOM";
export const CLOSE_CREATE_ROOM = "CLOSE_CREATE_ROOM";

export default new Vuex.Store({
  state: {
    createRoomModal: false
  }, // vue 의 data와 비슷
  getters: {}, // vue의 computed와 비슷
  mutations: {
    [OPEN_CREATE_ROOM](state) {
      state.createRoomModal = true;
    },
    [CLOSE_CREATE_ROOM](state) {
      state.createRoomModal = false;
    }
  }, // state를 수정할 때 사용!, 동기적으로 (한번의 한개)
  actions: {} // 비동기를 사요할때, 또는 여러 뮤테이션을 연달아 실행 할떄,
});

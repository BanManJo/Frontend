import Vue from "vue";
import Vuex from "vuex";
import { DemoRepository } from "../models/DemoRepository";
import { AdminTestRepository } from "../models/AdminTestRepository";

let Web3_1 = require("web3");

Vue.use(Vuex);

export const SET_DEMO_INSTANCE = "SET_DEMO_INSTANCE";
export const SET_ADMIN_INSTANCE = "SET_ADMIN_INSTANCE";

export default new Vuex.Store({
  state: {
    web3: null,
    DemoRepoInstance: null,
    AdminTestRepoInstance: null
  }, // vue 의 data와 비슷
  getters: {}, // vue의 computed와 비슷
  mutations: {
    [SET_ADMIN_INSTANCE](state) {
      state.AdminTestRepoInstance = new AdminTestRepository();
      if (state.web3 === null) {
        state.web3 = new Web3_1(window.ethereum);
        console.log(state.web3);
        state.AdminTestRepoInstance.setWeb3(state.web3);
      }
    },
    [SET_DEMO_INSTANCE](state) {
      state.DemoRepoInstance = new DemoRepository();
      if (state.web3 === null) {
        state.web3 = new Web3_1(window.ethereum);
        console.log(state.web3);
        state.DemoRepoInstance.setWeb3(state.web3);
      }
    }
  }, // state를 수정할 때 사용!, 동기적으로 (한번의 한개)
  actions: {} // 비동기를 사요할때, 또는 여러 뮤테이션을 연달아 실행 할떄,
});

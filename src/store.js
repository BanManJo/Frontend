import Vue from 'vue'
import Vuex from 'vuex'

import { DemoRepository } from './models/DemoRepository'
import { AdminTestRepository } from './models/AdminTestRepository'
const Web3 = require('web3')

Vue.use(Vuex)

export const SET_DEMO_INSTANCE = 'SET_DEMO_INSTANCE'
export const SET_ADMIN_INSTANCE = 'SET_ADMIN_INSTANCE'

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    web3: null,
    DemoRepoInstance: null,
    AdminTestRepoInstance: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    [SET_ADMIN_INSTANCE] (state) {
      state.AdminTestRepoInstance = new AdminTestRepository()
      if (state.web3 === null) {
        state.web3 = new Web3(window.ethereum)
        console.log(state.web3)
        state.AdminTestRepoInstance.setWeb3(state.web3)
      }
    },
    [SET_DEMO_INSTANCE] (state) {
      state.DemoRepoInstance = new DemoRepository()
      if (state.web3 === null) {
        state.web3 = new Web3(window.ethereum)
        console.log(state.web3)
        state.DemoRepoInstance.setWeb3(state.web3)
      }
    },
  },
  actions: {

  },
})

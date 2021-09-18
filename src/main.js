import Vue from "vue";
import App from "./App";
import Config from "./config";
import router from "./router";
import Vuetify from "vuetify";
import VueResource from "vue-resource";
import { DemoRepository } from "./models/DemoRepository";
import { AdminTestRepository } from "./models/AdminTestRepository";
import store from "./vuex/store";

// let Web3_1 = require("web3");

Vue.use(VueResource);
Vue.use(Vuetify);
Vue.config.productionTip = false;

// state management
// let store = {
//   debug: true,
//   state: {
//     // metamask state variable
//     metamask: {
//       web3DefaultAccount: "0x5b3bb65dC52177BAc0eeebcD5270Ad76499A4e8F",
//       metamaskInstalled: true,
//       networkId: "3"
//     },

//     // local web3 instance(not metamask)
//     web3: null
//   },
//   networkReady() {
//     return (
//       this.getNetworkId() != "" &&
//       this.getMetamaskInstalled() &&
//       this.getWeb3DefaultAccount() != ""
//     );
//   },
//   setNetworkId(networkId) {
//     this.state.metamask.networkId = networkId;
//   },
//   getNetworkId() {
//     return this.state.metamask.networkId;
//   },
//   setWeb3DefaultAccount(account) {
//     this.state.metamask.web3DefaultAccount = account;
//   },
//   getWeb3DefaultAccount() {
//     return this.state.metamask.web3DefaultAccount;
//   },
//   setMetamaskInstalled() {
//     this.state.metamask.metamaskInstalled = true;
//   },
//   getMetamaskInstalled() {
//     return this.state.metamask.metamaskInstalled;
//   },
//   getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// };

// const getWeb3Instance = () => {
//   console.log(window.ethereum);
//   const web3 = new Web3_1(window.ethereum);
//   return web3;
// };

// const getWeb3 = () => {
//   return new Promise((resolve, reject) => {
//     window.addEventListener("load", async () => {
//       if (window.ethereum) {
//         const web3 = new Web3_1(window.ethereum);
//         try {
//           // ask user permission to access his accounts
//           await window.ethereum.request({ method: "eth_requestAccounts" });
//           resolve(web3);
//         } catch (error) {
//           reject(error);
//         }
//       } else {
//         reject("must install MetaMask");
//       }
//     });
//   });
// };

// Vue.mixin({
//   created: async function() {
//     this.$DemoRepoInstance = new DemoRepository();
//     this.$AdminTestRepository = new AdminTestRepository();
//     // one instance of web3 available to all components

//     if (typeof web3 !== "undefined") {
//       web3 = new Web3_1(window.ethereum);
//       console.log(web3);
//       this.$DemoRepoInstance.setWeb3(web3);
//       this.$AdminTestRepository.setWeb3(web3);
//     }
//     // inject config to components
//     this.$config = Config;
//   }
// });

new Vue({
  el: "#app",
  store,
  data: {
    // globalState: store
  },
  router,
  template: "<App/>",
  components: { App },
  mounted() {}
});

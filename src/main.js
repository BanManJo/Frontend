import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import websocket from "./websocket";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  websocket,
  render: h => h(App)
}).$mount("#app");

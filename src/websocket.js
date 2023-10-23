import Vue from "vue";
import VueNativeSock from 'vue-native-websocket'
import store from './store'
Vue.use(VueNativeSock, 'ws://localhost:7071/ws', { reconnection: true, reconnectionAttempts: 5, reconnectionDelay: 3000, store: store })

export default ({ store }, inject) => {
}

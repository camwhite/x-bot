import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import Buefy from 'buefy'
import * as io from 'socket.io-client'
import 'buefy/lib/buefy.css'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueSocketio, io.connect('', {transports: ['websocket', 'polling']}))
Vue.use(Buefy)

new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')

if (module.hot) {
  module.hot.accept()
}

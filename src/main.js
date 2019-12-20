import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosApi from "@/commont/js/request.js"
import 'weui';
import './icon/iconfont.js'

Vue.use(axiosApi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

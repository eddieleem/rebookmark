import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/app.css'

import { testRun } from "./service/firebase";
testRun();

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/app.css'
import vuetify from './plugins/vuetify'

// import { testRun } from "./service/firebase";
// testRun();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

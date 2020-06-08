import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

//server work PWA
import './registerServiceWorker';



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

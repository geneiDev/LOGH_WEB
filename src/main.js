// src/main.js
import Vue from 'vue'
import App from './App.vue'
import store from './common/store/';
import vResize from 'vue-resize-directive';  // 수정된 부분

Vue.directive('resize', vResize);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
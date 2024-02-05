// src/main.js
import Vue from 'vue'
import App from './App.vue'
import store from './common/store/';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false

// Vue에 플러그인 등록
Vue.use(Toasted);

// 토스트 메시지 컴포넌트 등록
Vue.toasted.register('my-toast', {
  type: 'success',
  icon: 'check',
  position: 'bottom-right',
  duration: 3000, // 3초 동안 보이도록 설정
});

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

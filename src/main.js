//main.js
import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted';
import VueLazyload from 'vue-lazyload';
import VModal from 'vue-js-modal';

//util
import store from './common/store/index.js';
import router from './common/router/index.js';


Vue.config.productionTip = false

// Vue에 플러그인 등록
Vue.use(Toasted);
Vue.use(VModal, { dynamic: true })
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'path_to_your_error_image',
  loading: 'path_to_your_loading_image',
  attempt: 1
});

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
  router,
}).$mount('#app')

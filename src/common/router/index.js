// src/common/router/index.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import routes from './routes'; // 라우트 설정을 가져옵니다.


Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

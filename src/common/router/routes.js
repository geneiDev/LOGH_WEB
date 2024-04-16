// routes.js
import Vue from 'vue';
import VueRouter from 'vue-router';

import mainMenu from '@/components/main/LayoutMenu.vue';

import userMain from '@/components/layouts/main/users/LayerUserMain.vue';
import userInfo from '@/components/layouts/main/users/LayerUserInfo.vue';

//Single
import newGame from '@/components/layouts/main/menu/LayerPopNewGame.vue';

//Data
import dataPerson from '@/components/layouts/main/menu/LayerPopDicPerson.vue';
import dataStarzone from '@/components/layouts/main/menu/LayerPopDicStarzone.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: mainMenu, name: 'mainMenu' },
  { path: '/user', component: userMain, name: 'user' },
  { path: '/user/Info', component: userInfo, name: 'userInfo' },
  //single
  { path: '/single/newGame', component: newGame, name: 'newGame' },
  //data
  { path: '/data/person', component: dataPerson, name: 'dataPerson' },
  { path: '/data/starzone', component: dataStarzone, name: 'dataStarzone' },
];

const router = new VueRouter({
  routes: routes, // 또는 routes만 작성해도 됩니다.
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;

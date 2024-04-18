// routes.js
import Vue from 'vue';
import VueRouter from 'vue-router';

import mainTitle from '@/components/main/LayoutTitle.vue';

import mainMenu from '@/components/main/LayoutMenu.vue';

import userMain from '@/components/layouts/main/users/LayerUserMain.vue';
import userInfo from '@/components/layouts/main/users/LayerUserInfo.vue';

//Single
//C:\Users\LG\Documents\LOGH_WEB\src\components\main\menu\LayoutSingle.vue
import mainSingle from '@/components/layouts/main/menu/LayoutSingle.vue';
import newGame from '@/components/layouts/main/menu/LayerPopNewGame.vue';

//Data
import dataPerson from '@/components/layouts/main/menu/LayerPopDicPerson.vue';
import dataStarzone from '@/components/layouts/main/menu/LayerPopDicStarzone.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: mainTitle, name: 'mainTitle' },

  { path: '/main', component: mainMenu, name: 'mainMenu' },
  //user
  { path: '/user', component: userMain, name: 'user' },
  { path: '/user/Info', component: userInfo, name: 'userInfo' },
  //single
  { path: '/mainSingle', component: mainSingle, name: 'mainSingle' },
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

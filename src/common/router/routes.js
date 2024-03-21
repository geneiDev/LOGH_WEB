import mainMenu from '@/components/main/LayoutMenu.vue';
import newGame from '@/components/layouts/main/menu/LayerPopNewGame.vue';
import userInfo from '@/components/layouts/main/users/LayerUserInfo.vue';

const routes = [
  { path: '/', component: mainMenu, name: 'mainMenu' },
  { path: '/newGame', component: newGame, name: 'newGame' },
  { path: '/userInfo', component: userInfo, name: 'userInfo' },
];

export default routes;

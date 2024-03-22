import mainMenu from '@/components/main/LayoutMenu.vue';
import userInfo from '@/components/layouts/main/users/LayerUserInfo.vue';

// import newGame from '@/components/layouts/main/menu/LayerPopNewGame.vue';

//Documents
import dataPerson from '@/components/layouts/main/menu/LayerPopDicPerson.vue';
import dataStarzone from '@/components/layouts/main/menu/LayerPopDicStarzone.vue';


const routes = [
  { path: '/', component: mainMenu, name: 'mainMenu' },
  { path: '/userInfo', component: userInfo, name: 'userInfo' },
  // { path: '/newGame', component: newGame, name: 'newGame' },

  { path: '/data/person', component: dataPerson, name: 'dataPerson' },
  { path: '/data/starzone', component: dataStarzone, name: 'dataStarzone' },
];

export default routes;

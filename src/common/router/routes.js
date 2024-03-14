// src/common/router/routes.js

// 라우트 컴포넌트를 import합니다.
import mainMenu from '@/components/main/LayoutMenu.vue';
// import About from '@/components/About.vue';
// import Contact from '@/components/Contact.vue';

// 라우트 설정을 정의합니다.
const routes = [
  { path: '/', component: mainMenu },
  // { path: '/about', component: About },
  // { path: '/contact', component: Contact }
];

// 라우트 설정을 내보냅니다.
export default routes;

// storeUser.js
export default {
  namespaced: true,
  state: {
    currentUser: {
      isLogin: false,
      id: '',
      name: 'GUEST',
      pic: '@/assets/images/person/etc/user/silhouette-male-person.png',
      points: 0,
    },
  },
  mutations: {
    setCurrentUser(state, user) {
      // 객체의 각 속성을 복사
      Object.assign(state.currentUser, user);
    },
  },
  actions: {
    // 로그인 액션
    login({ commit }, user) {
      commit('setCurrentUser', user);
    },
    // 로그아웃 액션
    logout({ commit }) {
      commit('setCurrentUser', {
        isLogin: false,
        id: '',
        name: 'GUEST',
        pic: '@/assets/images/person/etc/user/silhouette-male-person.png',
        points: 0,
      });
    },
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
  },
};
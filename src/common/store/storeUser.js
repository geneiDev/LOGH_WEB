// src/common/store/storeUser.js
export default {
  namespaced: true,
  state: {
    browser : '',
    os : '',
    uuid : '',
    currentUser: {
      isLogin: false,
      lastLogin: 'K',
      id: '',
      name: 'GUEST',
      langType : 'KR',
      pic: '@/assets/images/person/etc/user/silhouette-male-person.png',
      points: 0,
    },
  },
  mutations: {
    setCurrentUser(state, user) {
      Object.assign(state.currentUser, user);
    },
    setBrowser(state, browser) {
      state.browser = browser;
    },
    setOS(state, os) {
      state.os = os;
    },
    setUUID(state, os) {
      state.uuid = os;
    }
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
    getBrowser: (state) => state.browser,
    getOS: (state) => state.os,
    getUUID: (state) => state.uuid,
  },
};
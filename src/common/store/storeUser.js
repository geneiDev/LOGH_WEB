// src/common/store/storeUser.js
export default {
  namespaced: true,
  state: {
    browser : '',
    os : '',
    uuid : '',
    currentUser: {
      isLogin : false,
      langType : '',
      lastLogin: '',
      userId : '',
      userName : '',
      userPic : '',
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
    login({ commit }, userData) {
      // console.info('로그인 액션', userData);
      const userName = userData.TMP_USER === 'Y' ? `사용자_${userData.UUID.substring(0,8)}` : userData.USER_NAME
      const user = {
        isLogin   : userData.IS_LOGIN,
        langType  : userData.LANG_TYPE,
        lastLogin : userData.LAST_LOGIN,
        userId    : userData.USER_ID,
        userName  : userName,
        userPic   : userData.USER_PIC,
        points    : userData.POINT,
      }
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
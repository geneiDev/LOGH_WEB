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
      tmpUser : 'Y',
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
    setUUID(state, uuid) {
      state.uuid = uuid;
    }
  },
  actions: {
    login({ commit }, userData) {
      const userName = userData.TMP_USER === 'Y' ? `사용자_${userData.UUID.substring(0,8)}` : userData.USER_NAME
      const user = {
        isLogin     : userData.IS_LOGIN,
        langType    : userData.LANG_TYPE,
        lastLogin   : userData.LAST_LOGIN,
        userId      : userData.USER_ID,
        userName    : userName,
        userPic     : userData.USER_PIC,
        points      : userData.POINT,
        tmpUser     : userData.TMP_USER,
      }
      commit('setCurrentUser', user);
    },
    // 로그아웃 액션
    logout({ commit }) {
      const uuid      = localStorage.getItem('currentUUID');
      const userId    = localStorage.getItem('userId')||uuid;
      const userName  = `사용자_${uuid.substring(0,8)}`;
      commit('setCurrentUser', {
        isLogin     : false,
        langType    : 'KR',
        userId      : userId,
        userName    : userName,
        userPic     : '/images/person/CH_000000.png',
        points      : 0,
        tmpUser     : 'Y',
      });
      localStorage.removeItem('userPwd');
      
    },
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getBrowser: (state) => state.browser,
    getOS: (state) => state.os,
    getUUID: (state) => state.uuid,
  },
};
// storeUser.js
export default {
  state: {
    currentUser: {
      username: '',
    },
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    // 로그인 액션
    login({ commit }, user) {
      commit('setCurrentUser', user);
    },
    // 로그아웃 액션
    logout({ commit }) {
      commit('setCurrentUser', null);
    },
  },
  getters: {
    getCurrentUser: (state) => (state.currentUser ? state.currentUser : { username: '', email: '' }),
  },
};
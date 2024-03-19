// storeInfo.js
import global from '@/common/utils/global.js';

export default {
  namespaced: true,
  state: {
    systemMsg: [],
    traitList: [],
    sheepList: {},
  },
  mutations: {
    createTraitList(state) {
      const traitList = global.traitUtils.getTraitList();
      state.traitList = traitList;
    },
    createSheepList(state) {
      const sheepList = global.sheepUtils.getSheepList();
      state.sheepList = sheepList;
    },
    setSystemMsgList(state, msg) {
      state.systemMsg = msg;
    },
    addSystemMsg(state, msg) {
      state.systemMsg.push(msg);
    }
  },
  actions: {
    async setTraitList({ commit }) {
      try {
        commit('setTraitList', []);
        const traitList = global.traitUtils.getTraitList();
        commit('setTraitList', traitList);
      } catch (error) {
        console.error('Error fetching trait list:', error);
      }
    },
    async setSystemMsgList({ commit }, msg) {
      commit('setSystemMsgList', msg);
    },
    async addSystemMsg({ commit }, msg) {
      commit('addSystemMsg', msg);
    }
  },
  getters: {
    getTraitList: (state) => {
      return state.traitList;
    },
    getSheepList: (state) => {
      return state.sheepList;
    },
    getSystemMsgList: (state) => {
      return state.systemMsg;
    },
    getSystemMsg: (state) => {
      return state.systemMsg.length > 0 ? state.systemMsg[state.systemMsg.length - 1] : null;
    }
  },
};

// storeInfo.js
import global from '@/common/utils/global.js';

export default {
  namespaced: true,
  state: {
    traitList: [],
  },
  mutations: {
    setTraitList(state, traitList) {
      state.traitList = traitList;
    },
  },
  actions: {
    async createTraitList({ commit }) {
      try {
        const traitList = global.traitUtils.getTraitList();
        commit('setTraitList', traitList);
      } catch (error) {
        console.error('Error fetching trait list:', error);
      }
    },
  },
  getters: {
    getTraitList: (state) => {
      if (state.traitList && state.traitList.length > 0) {
        return state.traitList;
      }
      return [];
    },
  },
};

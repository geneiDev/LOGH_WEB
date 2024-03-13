// storeInfo.js
import global from '@/common/utils/global.js';

export default {
  namespaced: true,
  state: {
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
  },
  getters: {
    getTraitList: (state) => {
      return state.traitList;
    },
    getSheepList: (state) => {
      return state.sheepList;
    },
  },
};

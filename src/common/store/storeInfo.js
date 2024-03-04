//storeInfo.js
export default {
  state: {
    traitList : [],
    
  },
  mutations: {
    setTraitList(state, flag) {
      console.info('setTraitList', flag);
      state.traitList = ['aa'];
    },
  },
  actions: {
    // actions for layer module
  },
  getters: {
    getTraitList: (state) => state.traitList,
  },
};

//storeInfo.js
import global from '@/common/utils/global.js';
export default {
  state: {
    traitList: [],
  },
  mutations: {
    setTraitList(state, flag) {
      console.info('setTraitList', state.traitList, flag);
      console.info(global.traitUtils);
      state.traitList = ['aa']; // 또는 원하는 값을 설정
    },
  },
  actions: {
    
  },
  getters: {
    getTraitList: (state) => {
      if (state.traitList && state.traitList.length > 0) {
        return state.traitList;
      }
      // traitList가 비어있거나 undefined인 경우 빈 배열 반환
      return [];
    },
  },
};

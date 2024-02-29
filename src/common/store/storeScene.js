// storeScene.js
export default {
  namespaced: true,
  state: {
    characterList : [],
  },
  mutations: {
    setCharacterList(state, array) {
      // RN int형 key값(필수)
      const currArray = array.filter(row => row.RN).map(row => {
        //CHA_CODE 캐릭터 코드가 없다면 RN으로 만들 수 있음.
        if(!row.CHA_CODE) {
          const formatNumber = ('000000' + row.RN).slice(-6);
          row.CHA_CODE = `CH_${formatNumber}`;
        }
        return row;
      })
      state.characterList = currArray;
    },
  },
  actions: {
    fetchCharacterList({ commit }) {
      const mockData = [
        { id: 1, name: 'Item 1', value: 'Value 1' },
        { id: 2, name: 'Item 2', value: 'Value 2' },
      ];
      commit('setCharacterList', mockData);
    },
  },
  getters: {
    getCharacterList: (state) => state.characterList,
    getCharacterData: (state) => (id) => {
      return state.characterList.find((item) => item.CHA_CODE === id);
    },
  },
};

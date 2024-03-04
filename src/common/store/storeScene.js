// storeScene.js
import global from '@/common/utils/global.js';

export default {
  namespaced: true,
  state: {
    scenarioInfo : {},
    characterList : [],
  },
  mutations: {
    setScenarioInfo(state, object) {
      state.scenarioInfo = object;
    },
    setCharacterList(state, array) {
      const currArray = array.filter(row => row.CHA_USEYN !== 'N').map(row => {
        global.characterUtils.fnGetCharacterInfo(row);
        row.CHA_AGE = global.characterUtils.fnGetAge(state.scenarioInfo.date, row.CHA_BIRTH);

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
    getScenarioInfo: (state) => state.scenarioInfo,
    getCharacterList: (state) => state.characterList,
    getCharacterData: (state) => (id) => {
      return state.characterList.find((item) => item.CHA_CODE === id);
    },
  },
};

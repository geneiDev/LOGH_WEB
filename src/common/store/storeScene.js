// storeScene.js
import global from '@/common/utils/global.js';

export default {
  namespaced: true,
  state: {
    currentScene : {},
    scenarioInfo : {},
    characterList : [],
  },
  mutations: {
    setScenarioInfo(state, object) {
      state.currentScene.id = object.id;
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
      commit('setCharacterList', []);
    },
  },
  getters: {
    getCurrentScene: (state) => state.currentScene,
    getScenarioInfo: (state) => state.scenarioInfo,
    getCharacterList: (state) => state.characterList,
    getCharacterData: (state) => (id) => {
      return state.characterList.find((item) => item.CHA_CODE === id);
    },
  },
};

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
      //.filter(row => row.CHA_USEYN !== 'N')
      const currArray = array.map(row => {
        global.characterUtils.fnGetCharacterInfo(row);
        row.CHA_AGE = global.characterUtils.fnGetAge(state.scenarioInfo.date, row.CHA_BIRTH);

        return row;
      })
      state.characterList = currArray;
    },
    setCharacterTraitList(state, arrObj) {
      // console.info('setCharacterTraitList:', state, arrObj);
      arrObj.forEach(objToUpdate => {
          // Check if TRAIT exists in objToUpdate
          const traitsString = objToUpdate.TRAITS ? (typeof objToUpdate.TRAITS === 'object' ? JSON.stringify(objToUpdate.TRAITS) : objToUpdate.TRAITS) : '{}';
      
          const updatedCharacterList = state.characterList.map(row => {
              if (objToUpdate.CHA_CODE === row.CHA_CODE) {
                  // If CHA_CODE matches, update the CHA_TRAITS
                  return { ...row, CHA_TRAITS: traitsString };
              } else {
                  // If CHA_CODE doesn't match, keep the row unchanged
                  return { ...row, CHA_TRAITS: {} };
              }
          });
          state.characterList = updatedCharacterList;
      });
      console.info('캐릭터 트레잇 정보 세팅 완료.', state.characterList);
    },
    setCharacterTrait(state, row) {
      console.info(state, row)
      console.info(state.characterList)
      

    }
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

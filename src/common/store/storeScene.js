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
    setCharacterTraitList(state, arrObj) {
      console.info('setCharacterTraitList:', state, arrObj);
      // Check if TRAIT exists in arrObj
      const traitsString = arrObj.TRAIT ? (typeof arrObj.TRAIT === 'object' ? JSON.stringify(arrObj.TRAIT) : arrObj.TRAIT) : '{}';

      const updatedCharacterList = state.characterList.map(row => {
          if (arrObj.CHA_CODE === row.CHA_CODE) {
              // 해당하는 CHA_CODE가 있다면 TRAIT 값을 업데이트
              return { ...row, CHA_TRAITS: traitsString };
          } else {
              // 업데이트할 필요 없는 행은 그대로 반환하면서 TRAIT을 빈 객체로 설정
              return { ...row, CHA_TRAITS: '{}' };
          }
      });
      state.characterList = updatedCharacterList;
      console.info('>>>>>', state.characterList);

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

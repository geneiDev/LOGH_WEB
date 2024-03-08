// storeScene.js
import global from '@/common/utils/global.js';

export default {
  namespaced: true,
  state: {
    currentScene : {
      id : '',
    },
    scenarioInfo : {},
    characterList : [],
  },
  mutations: {
    //시나리오
    setScenarioInfo(state, object) {
      state.currentScene.id = object.id;
      state.scenarioInfo = object;
      return true;
    },
    //캐릭터
    async createCharacterList(state, scenarioId) {
      console.info(`prev:${state.currentScene.id} > to:${scenarioId}`);
      const filePath = `data/scenario${scenarioId ? `/${scenarioId}` : ''}/TN_GEN_CHAR.xlsx`;

      if( state.currentScene.filePath == filePath && state.characterList.length > 0) {
        return console.info(`이미 동일한 시나리오가 로드되어 있음 : ${scenarioId}}`)
      }
      const currArray = global.characterUtils.fnInitCharacterData(filePath);
      if(currArray &&currArray.length > 0) {
        state.currentScene.id = scenarioId;
        state.currentScene.charFilePath = filePath;
        state.characterList = currArray;
      }
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

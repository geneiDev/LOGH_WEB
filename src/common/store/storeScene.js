// storeScene.js
import global from '@/common/utils/global.js';

import { scenarioMeta } from "@/assets/txt/scenario/scenarioMeta";

export default {
  namespaced: true,
  state: {
    currentScene : {
      id : '',
    },
    scenarioList : [],
    scenarioInfo : {},
    characterList : [],
  },
  mutations: {
    createScenarioList(state) {
      state.scenarioList = scenarioMeta;
    },
    //시나리오
    async setScenarioInfo(state, object) {
      state.currentScene.id = object.id;
      state.scenarioInfo = object;
      return true;
    },
    //캐릭터
    async createCharacterList(state, scenarioId, callback) {
      console.info(`prev:${state.currentScene.id} > to:${scenarioId}`, state.characterList.length);
      if(state.currentScene.id !== scenarioId || state.characterList.length === 0) {
        const matchingScenario = scenarioMeta.find(item => item.id === scenarioId);
        if(matchingScenario) {
          console.info(`시나리오 로드됨 : `, matchingScenario)
          state.currentScene.id = matchingScenario.id;
          state.scenarioInfo = matchingScenario;
        }
      } else {
        return console.info(`이미 동일한 시나리오가 로드되어 있음 : ${scenarioId}`)
      }
      const filePath = `data/scenario${scenarioId ? `/${scenarioId}` : ''}/TN_GEN_CHAR.xlsx`;

      if( state.currentScene.filePath == filePath && state.characterList.length > 0) {
        return console.info(`이미 동일한 시나리오가 로드되어 있음 : ${scenarioId}`)
      }
      
      const charData = await global.characterUtils.fnInitCharacterData(filePath);
      state.characterList = charData;
      if (typeof callback === 'function') {
        callback();
      }
      console.info('createCharacterList ed', state.characterList);
      return charData
    },
    fnSetCharacterList(state, charlist) {
      state.characterList = charlist
    },
  },  
  actions: {
    resetCharacterList({ commit }) {
      commit('setCharacterList', []);
    },
    
  },
  getters: {
    getCurrentScene: (state) => state.currentScene,
    getScenarioList: (state) => state.scenarioList,
    getScenarioInfo: (state) => state.scenarioInfo,
    getCharacterList: (state) => state.characterList,
    getCharacterData: (state) => (id) => {
      return state.characterList.find((item) => item.CHA_CODE === id);
    },
  },
};

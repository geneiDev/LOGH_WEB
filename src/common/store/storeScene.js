// storeScene.js
import global from '@/common/utils/global.js';

import { scenarioMeta } from "@/assets/txt/scenario/scenarioMeta";

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
    async setScenarioInfo(state, object) {
      state.currentScene.id = object.id;
      state.scenarioInfo = object;
      return true;
    },
    //캐릭터
    async createCharacterList(state, scenarioId, callback) {
      if(state.currentScene.id !== scenarioId || state.characterList.length === 0) {
        console.info(`prev:${state.currentScene.id} > to:${scenarioId}`);
        const matchingScenario = scenarioMeta.find(item => item.id === scenarioId);
        if(matchingScenario) {
          console.info(`시나리오 로드됨 : `, matchingScenario)
          state.currentScene.id = matchingScenario.id;
          state.scenarioInfo = matchingScenario;
        }
      }
      const filePath = `data/scenario${scenarioId ? `/${scenarioId}` : ''}/TN_GEN_CHAR.xlsx`;

      if( state.currentScene.filePath == filePath && state.characterList.length > 0) {
        return console.info(`이미 동일한 시나리오가 로드되어 있음 : ${scenarioId}}`)
      }
      
      const charData = await global.characterUtils.fnInitCharacterData(filePath);
      console.info('createCharacterList ed', charData);
      this.state.characterList = charData;

      if (typeof callback === 'function') {
        callback();
      }
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
    getScenarioInfo: (state) => state.scenarioInfo,
    getCharacterList: (state) => state.characterList,
    getCharacterData: (state) => (id) => {
      return state.characterList.find((item) => item.CHA_CODE === id);
    },
  },
};

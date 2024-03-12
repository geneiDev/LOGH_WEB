// storeScene.js
import global from '@/common/utils/global.js';

import { scenarioMeta } from "@/assets/txt/scenario/scenarioMeta";

export default {
  namespaced: true,
  state: {
    scenarioList : [],
    scenarioInfo : {},

    characterList : [],

    starzoneList : [],
  },
  mutations: {
    createScenarioList(state) {
      state.scenarioList = scenarioMeta;
      if (Object.keys(state.scenarioInfo).length === 0 || !state.scenarioInfo?.id) {
        state.scenarioInfo = scenarioMeta[0]
        console.info('현재 시나리오:', state.scenarioInfo)
      }
    },
    //시나리오
    async setScenarioInfo(state, object) {
      state.scenarioInfo = object;
      return true;
    },
    //캐릭터
    async createCharacterList(state, scenarioId, callback) {
      console.info(`prev:${state.scenarioInfo.id} > to:${scenarioId}`, state.characterList.length);
      if(state.scenarioInfo.id !== scenarioId || state.characterList.length === 0) {
        const matchingScenario = scenarioMeta.find(item => item.id === scenarioId);
        if(matchingScenario) {
          console.info(`시나리오 로드됨 : `, matchingScenario)
          state.scenarioInfo = matchingScenario;
        }
      } else {
        return console.info(`이미 동일한 시나리오가 로드되어 있음 : ${scenarioId}`)
      }
      const filePath = `data/scenario${scenarioId ? `/${scenarioId}` : ''}/TN_GEN_CHAR.xlsx`;
      const charData = await global.characterUtils.fnInitCharacterData(filePath);
      state.characterList = charData;
      if (typeof callback === 'function') {
        callback();
      }
      return charData
    },
    fnSetCharacterList(state, charlist) {
      state.characterList = charlist
    },

    async createStarzoneList(state) {
      let scenarioId = state.scenarioInfo.id;
      if(!scenarioId) {
        scenarioId  = 'T1'
      }
      const starzoneList = await global.starzoneUtils.fnInitStarzoneList(scenarioId);
      console.info(starzoneList);
      
      

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
    //starzone
    getStarzoneList: (state) => (id) => {
      if(state.scenarioInfo.id === id && state.starzoneList.length > 0) {
        return state.starzoneList;
      }
      let scenarioId = state.scenarioInfo.id;
      if(!scenarioId) {
        console.error('storeScene/getStarzoneList error : invalid scenarioId');
        return;
      }
      const starzoneList = global.starzoneUtils.fnInitStarzoneList(scenarioId);
      state.starzoneList = starzoneList;
      
      return state.starzoneList;
    },
  },
};

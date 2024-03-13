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
    createCharacterList(state, scenarioId, callback) {
      console.info(`prev:${state.scenarioInfo.id} > to:${scenarioId}`, state.characterList.length);
    
      if (state.scenarioInfo.id !== scenarioId || state.characterList.length === 0) {
        const matchingScenario = scenarioMeta.find(item => item.id === scenarioId);
        if (matchingScenario) {
          console.info(`시나리오 로드됨 : `, matchingScenario)
          state.scenarioInfo = matchingScenario;
        }
      } else {
        console.info(`이미 동일한 시나리오가 로드되어 있음 : ${scenarioId}`);
        return Promise.resolve(state.characterList); // 이미 로드된 경우, 기존 데이터를 Promise로 감싸서 반환
      }
      const filePath = `data/scenario${scenarioId ? `/${scenarioId}` : ''}/TN_GEN_CHAR.xlsx`;
    
      // Promise를 반환하도록 변경
      return global.characterUtils.fnInitCharacterData(filePath)
        .then(charData => {
          state.characterList = charData;
    
          if (typeof callback === 'function') {
            callback();
          }
    
          return charData; // 비동기 작업이 완료된 데이터를 Promise로 감싸서 반환
        })
        .catch(error => {
          console.error('Error initializing character data:', error);
          throw error;
        });
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
    async fetchCharacterList({ commit }, scenarioId) {
      try {
        const characters = scenarioId; //await apiCallToGetCharacterList(scenarioId);
        commit('setCharacterList', characters);
        return characters;
      } catch (error) {
        console.error('Error fetching character list:', error);
        throw error;
      }
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

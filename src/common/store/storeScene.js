// storeScene.js
import global from '@/common/utils/global.js';

export default {
  namespaced: true,
  state: {
    scenarioInfo : {},
    characterList : [],
  },
  mutations: {
    setCharacterList(state, array) {
      const currArray = array.filter(row => row.RN).map(row => {
        if(!row.CHA_CODE) {
          const formatNumber = ('000000' + row.RN).slice(-6);
          row.CHA_CODE = `CH_${formatNumber}`;
        }
        const baseKeys = global.characterUtils.fnGetBaseKeys();
        const personalKeys = global.characterUtils.fnGetPersonalKeys();
        const statsKeys = global.characterUtils.fnGetStatsKey();

        const representName = (values) => {
          for (const value of values) {
            if (value) {
              return value;
            }
          }
          return null;
        };
        baseKeys.map(key => {
          const charMainName = representName([
            row['CHA_STD_NAME'],
            row['CHA_STD_NICK'],
          ]);
          if (!row[key]) {
            //캐릭터정보 유효 여부(필수값)
            if(key === 'RN' || key === 'CHA_CODE' || !charMainName) {
              console.error('필수값 누락 : ', key);
              this.fnSetErrorLog();
            }
            //캐릭터가 현재 활성화되어있는지 확인. 기본은 Y임.
            if(key === 'CHA_USEYN') {
              row[key] = 'Y';
            }
            if(key === 'CHA_JAP_NAME' || key === 'CHA_ENG_NAME') {
              row[key] = charMainName;
            }
            if(key === 'CHA_STD_NICK') {
              const nicknames = charMainName.split(' ');
              const nickname = nicknames.reduce((longest, current) => (current.length > longest.length ? current : longest), '');
              row[key] = nickname;
            }
          }
        })
        personalKeys.map(key => {
          console.info(key, row[key])
        })
        statsKeys.map(key => {
          console.info(key, row[key])
        })

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

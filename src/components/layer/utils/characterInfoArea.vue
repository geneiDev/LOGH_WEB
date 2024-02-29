<template>
  <div :class="'characterArea ' + option.displayType">
    <div class="charTopInfo">
      <div class="charImg">
        <genei-img-area :imgSrc="'images/person/CH_000089N_H.webp'"/>
      </div>
      <div class="charBase">
        <h2 class="charName">{{charData.CHA_STD_NAME}}</h2>
        <h3 class="charName">{{charData.CHA_STD_NAME}}</h3>
        <h3 class="charName">{{charData.CHA_STD_NAME}}</h3>
        <h3 class="charName">{{charData.CHA_STD_NAME}}</h3>
      </div>
    </div>
    <div>{{charData}}</div>
    
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import GeneiImgArea from '@/components/layer/utils/geneiImgArea'
export default {
  components: {
    GeneiImgArea,
  },
  props: {
    charId: {
      type : String,
      default: 'CH_000000'
    },
    option: {
      type : Object,
      default: () => ({
        displayType : 'H',  //H : 머리만 | U : 상반신 | F : 전체
        scenario : '',      //값이 존재하면 새로 해당 시나리오의 캐릭터 정보를 가져온다.
      })
    }
  },
  data() {
    return {
      baseKeys : [
        'RN',               //KEY
        'CHA_CODE',         //REL_KEY
        'CHA_USEYN',        //사용여부
        'CHA_STD_NAME',     //KOR_NAME
        'CHA_NAME',         //ENG_NAME
        'CHA_STD_NICK',     //표시명
      ],


      charList : [],
      charData : {

      },
    };
  },
  mounted() {
    this.fnInitData();
  },
  methods: {
    /** @DESC : GET DATA*/
    async fnInitData() {
      console.info('INIT : characterInfoArea.vue', this.charId, this.option);
      await this.getCharacterList();
      if(this.charList.length == 0) {
        await this.fnGetScenarioCharData();
      } else {
        await this.getCharacterData();
      }
    },
    async fnGetScenarioCharData() {
      // 엑셀에서 데이터를 가져온다.
      // this.dataLoadingText = '인물 정보를 세팅하는 중';
      let filePath = 'data/scenario/TN_GEN_CHAR.xlsx';
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        if( jsonData && jsonData.length > 0) {
          this.$store.commit('storeScene/setCharacterList', jsonData);
          this.fnSetMajorItem('preview');
        } else {
          console.error('캐릭터 정보 onload failed')
        }
      };

      fetch(filePath)
        .then(response => response.blob()) // 파일을 Blob으로 변환합니다.
        .then(blob => reader.readAsArrayBuffer(blob)); // FileReader를 사용해 Blob을 읽습니다.
    },
    async getCharacterList() {
      this.charList = this.$store.getters['storeScene/getCharacterList'];
    },
    async getCharacterData() {
      const storeCharData = this.$store.getters['storeScene/getCharacterData'](this.charId);
      console.info(storeCharData)
      const personalKeys = [
        'CHA_BIRTH',        //탄생년도
        'CHA_NATION',       //소속국가
        'CHA_MORAL',        //정치 선호도
        'CHA_FRIEND',       //개인 진화도
      ]
      const statsKey = [
        'CHA_ST_CMD',       //지휘
        'CHA_ST_CSM',       //통솔
        'CHA_ST_ATT',       //공격
        'CHA_ST_DEF',       //방어
        'CHA_ST_FST',       //기동
        'CHA_ST_MNG',       //운영
        'CHA_ST_AFG',       //공전
        'CHA_ST_GFG',       //육전
        'CHA_ST_INF',       //정보
        'CHA_ST_MMP',       //전투공작
        'CHA_ST_NMP',       //전투공작 회복치
        'CHA_ST_MSP',       //정치공작
        'CHA_ST_NSP',       //정치공작 회복치
      ]
      const representValue = (values) => {
        for (const value of values) {
          if (value) {
            return value;
          }
        }
        return null;
      };

      console.info('baseKeys')
      this.$data.baseKeys.map(key => {
        const charMainName = representValue([
          storeCharData['CHA_STD_NAME'],
          storeCharData['CHA_NAME'],
          storeCharData['CHA_STD_NICK'],
        ]);

        if (!storeCharData[key]) {
          //캐릭터정보 유효 여부(필수값)
          if(key === 'RN' || key === 'CHA_CODE' || !charMainName) {
            console.error('필수값 누락 : ', key);
            this.fnSetErrorLog();
          }
          //캐릭터가 현재 활성화되어있는지 확인. 기본은 Y임.
          if(key === 'CHA_USEYN') {
            storeCharData[key] = 'Y';
          }
          if(key === 'CHA_STD_NAME' || key === 'CHA_NAME') {
            storeCharData[key] = charMainName;
          }
          if(key === 'CHA_STD_NICK') {
            const nicknames = charMainName.split(' ');
            const nickname = nicknames.reduce((longest, current) => (current.length > longest.length ? current : longest), '');
            storeCharData[key] = nickname;
          }
        }
        console.info(key, storeCharData[key])
      })

      console.info('personalKeys')
      personalKeys.map(key => {
        console.info(key, storeCharData[key])
      })
      console.info('statsKey')
      statsKey.map(key => {
        console.info(key, storeCharData[key])
      })


      this.charData = storeCharData;
    },
    fnSetErrorLog() {

    },
    
  }
};
</script>

<style lang="scss" scoped>
.characterArea {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 0 3px #c2daf7;
  &.H {
    height: 12rem;
    margin: 3px 3px;
    .charTopInfo {
      max-height: 7rem;
      display: flex;
      flex-direction: row;
      .charImg {
        height: 6.8rem;
        width : 6rem;
        border: 4px solid rgb(202, 200, 52);
        border-radius: 5%;
      }
      .charBase {
        flex : 1;
        overflow: hidden;
        .charName {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  &.U {
    margin: 8px 0;
  }
  &.F {
    margin: 6px 0;
  }

}
</style>

<template>
  <div :class="'characterArea ' + optionsInfo.displayType">
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
      optionsInfo : {
        displayType : '',
        scenario : '',
      },
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
      await this.fnSetOption();
      await this.getCharacterList();
      if(this.charList.length == 0) {
        await this.fnGetScenarioCharData();
      } else {
        await this.getCharacterData();
      }
    },
    //옵션 세팅
    async fnSetOption() {
      this.optionsInfo.displayType = (this.option.displayType) ? this.option.displayType : 'H';
      this.optionsInfo.scenario = (this.option.scenario) ? this.option.scenario : '';
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

    /** @DESC : 현재 시나리오의 전체 인물 데이터를 가져온다. */
    async getCharacterList() {
      this.charList = this.$store.getters['storeScene/getCharacterList'];
    },
    /** @DESC : 현재 시나리오의 특정 인물 데이터를 가져온다. */
    async getCharacterData() {
      const storeCharData = this.$store.getters['storeScene/getCharacterData'](this.charId);
      console.info('storeCharData:', storeCharData)
      


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

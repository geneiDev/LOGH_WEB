<template>
  <div :class="'characterArea ' + optionsInfo.displayType">
    <div class="charTopInfo">
      <div class="charImg" v-if="fnGetCharImg()">
        <genei-img-area :imgSrc="fnGetCharImg()"/>
      </div>
      <div class="charBase">
        <h2 class="charText">{{ fnGetLocatonText(charData) }}</h2>
        <h3 class="charText">{{charData.CHA_STD_NAME}}</h3>
        <h3 class="charText">{{charData.CHA_AGE}}</h3>
      </div>
    </div>
    <div class="btnCharBox">
      <button :class="'btnCharDetail'+(targetRefs === 'trait' ? ' on' : '')" id="trait" @click="fnShowCharDetail('trait')">특성</button>
      <button :class="'btnCharDetail'+(targetRefs === 'polit' ? ' on' : '')" id="polit" @click="fnShowCharDetail('polit')">내정</button>
      <button :class="'btnCharDetail'+(targetRefs === 'stats' ? ' on' : '')" id="stats" @click="fnShowCharDetail('stats')">능력치</button>
      <button :class="'btnCharDetail'+(targetRefs === 'bioge' ? ' on' : '')" id="bioge" @click="fnShowCharDetail('bioge')">열전</button>
    </div>
    <div class="charDetail_stats" v-if="targetRefs === 'trait'">
    </div>
    <div class="charDetail_stats" v-if="targetRefs === 'polit'">
    </div>
    <div class="charDetail_stats" v-if="targetRefs === 'stats'">
      <ul class="stat_title"><li>지휘</li><li>통솔</li><li>공격</li><li>방어</li></ul>
      <ul class="stat_context"><li>{{charData.CHA_ST_CMD}}</li><li>{{charData.CHA_ST_CSM}}</li><li>{{charData.CHA_ST_ATT}}</li><li>{{charData.CHA_ST_DEF}}</li></ul>
      <ul class="stat_title"><li>기동</li><li>운영</li><li>정보</li><li>공전</li><li>육전</li></ul>
      <ul class="stat_context"><li>{{charData.CHA_ST_FST}}</li><li>{{charData.CHA_ST_MNG}}</li><li>{{charData.CHA_ST_INF}}</li><li>{{charData.CHA_ST_AFG}}</li><li>{{charData.CHA_ST_GFG}}</li></ul>

      <ul class="stat_title"><li>전투공작</li><li>회복치</li><li>정치공작</li><li>회복치</li></ul>
      <ul class="stat_context"><li>{{charData.CHA_ST_MMP}}</li><li>{{charData.CHA_ST_NMP}}</li><li>{{charData.CHA_ST_MSP}}</li><li>{{charData.CHA_ST_NSP}}</li></ul>
    </div>
    <div class="charDetail_stats" v-if="targetRefs === 'bioge'">
    </div>

    
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
      charData : {},
      targetRefs : 'stats',
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
    fnGetCharImg() {
      if(!this.charData.CHA_CODE || !this.optionsInfo.displayType) return false;
      const imgSrc = `images/person/${this.charData.CHA_CODE}N_${this.optionsInfo.displayType}.webp`;
      return imgSrc;
    },
    fnGetLocatonText() {
      //소속 국가
      let rtnText = '';
      const nationText = (!this.charData.CHA_NATION_NAME ? '국적없음' : `${this.charData.CHA_NATION_NAME} 소속`);
      rtnText = `${nationText}`;
      return rtnText;
    },
    fnShowCharDetail(refsId) {
      this.targetRefs = refsId;
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
    // max-height: 12rem;
    margin: 3px 3px;
    .charTopInfo {
      max-height: 7rem;
      display: flex;
      flex-direction: row;
      .charImg {
        height: 6.9rem;
        width : 6rem;
        border: 4px solid rgb(202, 200, 52);
        border-radius: 5%;
      }
      .charName {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      .charText {
        height: 2.3rem;
        background-color: gray;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: 4px solid rgb(128, 128, 128);
      }
      .charBase {
        flex : 1;
        overflow: hidden;
      }
      .charIcon {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.2rem;
        color: rgb(255, 255, 255);
        cursor: pointer;
      }
    }
    .btnCharBox {
      margin-bottom: 0.5rem;
      .btnCharDetail {
        background-color: black;
        position: relative;
        width: 25%;
        height: 2rem;
        font-size: 1.2rem;
        color: rgb(255, 255, 255);
      }
      .btnCharDetail.on {
        font-weight: bold;
      }
    }
    
    .charDetail_stats {
      list-style: none;
      padding: 0;
      margin: 0;
      display: row;
      height: 8rem;
      .stat_title {
        width : 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        background-color: steelblue;
        color:black;
        font-weight: bolder;
      }
      .stat_title li {
        flex : 1;
        border-width: 2px 2px 0px 2px;
        border-style: solid;
        border-color: rgb(255, 255, 255);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .stat_context {
        width : 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        background-color: rgb(91, 161, 218);
        color:black;
      }
      .stat_context li {
        flex: 1;
        border-width: 0 2px 2px 2px;
        border-style: solid;
        border-color: rgb(255, 255, 255);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.on {
        text-align: center;
        border: 4px solid rgb(202, 200, 52);
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

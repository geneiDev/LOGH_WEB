<template>
<div class="pop_dictionary">
  <div class="pop_dictionary_layer">
    <div class="scenario_list_section">
      <div :class="'scenario_row_section'+(scenarioObj.rn === scenarioRow.rn ? ' on' : '')" v-for="scenarioRow in scenarioArr" :key="scenarioRow.rn" @click="fnSetScenario(scenarioRow.rn)">
          <h4 class="flag_info_item">UC {{ scenarioRow.date }}</h4>
          <h3 class="flag_info_item">{{fnGetScenarioFlagName(scenarioRow.flag)}} {{ (scenarioRow.subtitle || '시나리오 이름 작성중') }}</h3>
      </div>
    </div>
    <div class="scenario_section">
      <button type="button" class="btn_prev" @click="fnBtnScenario('P')"></button>
        <div @click="fnToggleSceneList">
          <h4 class="flag_info_item">UC {{ scenarioObj.date }}</h4>
          <h3 class="flag_info_item">{{fnGetScenarioFlagName(scenarioObj.flag)}} {{ (scenarioObj.subtitle || '시나리오 이름 작성중') }} </h3>
        </div>
      <button type="button" class="btn_next" @click="fnBtnScenario('N')"></button>
    </div>
    <div class="character_search_section">
      <h4>총 {{ characterArr.length }} 명 중</h4>
      <h4>'{{ (characterInfoSearchKey || '모든 데이터') }}'(으)로 검색</h4>
      <input type="text" class="" v-model="characterInfoSearchKey">
    </div>
    <div class="paging_div">
      <button class="ctl_common" @click="characterInfoPageObj.currentPage--" :disabled="characterInfoPageObj.currentPage == 0">이전페이지</button>
      <div class="info_box"><h4>{{ characterInfoPageObj.currentPage+1 }} / {{ characterInfoPageObj.totalPages }}</h4></div>
      <button class="ctl_common" @click="characterInfoPageObj.currentPage++" :disabled="characterInfoPageObj.currentPage >= characterInfoPageObj.totalPages-1">다음페이지</button>
    </div>
    <div class="character_filter_section">
      <div class="selector">
        <div>
          <select class="input_select" disabled><option v-for="filter in characterFilterObj.filterLV1" :key="filter.rn" :value="filter.value">{{ filter.value }}</option></select>
        </div>
        <div>
          <select class="input_select" disabled><option>지휘가</option></select>
        </div>
        <div>
          <select class="input_select" disabled><option>0보다</option></select>
        </div>
        <div>
          <select class="input_select" disabled><option>크다</option></select>
        </div>
        <div>
          <button class="ctl_common" disabled>적용</button>
        </div>

      </div>
      <div class="filter">
        <span>적용된 필터가 없습니다.</span>
      </div>
    </div>
    <div class="character_list_section" v-if="characterInfo.length > 0">
      <div :id="characterRow.CHA_CODE" v-for="characterRow in characterInfo[this.characterInfoPageObj.currentPage]" :key="characterRow.RN">
        <character-info-area :charObj="characterRow" :option="{ 'displayType' : 'M' }"></character-info-area>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { scenarioMeta } from "@/assets/txt/scenario/scenarioMeta";
import CharacterInfoArea from '@/components/layer/utils/characterInfoArea'
export default {
  components: {
    CharacterInfoArea,
  },
  data() {
    return {
      //새 게임의 TYPE
      menuFlag : [
        {idx: 0, flagName:'튜토리얼', flagCode:'T'},
        {idx: 1, flagName:'스탠다드', flagCode:'S'},
        {idx: 2, flagName:'가상역사', flagCode:'F'}
      ],
      scenarioArr : [],
      scenarioObj : {},

      characterArr: [],
      
      characterFilterObj : {
        filterLV1 : [
          { rn: 0, id : "status" , value : "능력치 중" },
          { rn: 1, id : "nation" , value : "국가 가" },
        ],

      },
      

      characterInfoSearchKey : "",
      characterInfoPageObj : {
        itemsPerPage : 20,
        currentPage : 0,
        totalPages : 0
      },
      characterInfo : [],
    };
  },
  watch: {
    'scenarioObj.rn'() {
      this.fnGetCharacterInfo();
    },
    'characterInfoSearchKey'() {
      this.fnFilterCharacterInfo();
    },
  },
  mounted() {
    this.userData = this.$store.getters['storeUser/getCurrentUser'];
    console.info('userData', this.userData);
    this.fnInitScreenFunc();
    this.fnInitScenarioMeta();
  },
  methods : {
    //화면
    fnInitScreenFunc() {
      this.fnSetFilterFunc(); 
    },
    fnSetFilterFunc() {
      
    },
    //시나리오
    fnInitScenarioMeta() {
      this.scenarioArr = scenarioMeta;
      this.scenarioArr.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      this.scenarioArr.forEach((row, index) => {
        row.rn = index;
      });
      if(this.scenarioArr && this.scenarioArr.length > 0) {
        this.scenarioObj = this.scenarioArr[0];
      }
    },
    fnGetScenarioFlagName(flagCode) {
      const matchingFlag = this.menuFlag.find(flag => flag.flagCode === flagCode);
      return `[${matchingFlag?.flagName || ''}]`;
    },
    fnBtnScenario(flg) {
      let index = this.scenarioObj.rn;
      const arrLength = this.scenarioArr.length;

      if(flg === 'P') {
        index = (index - 1 + arrLength) % arrLength;
      } else if(flg === 'N') {
        index = (index + 1) % arrLength;
      }
      this.scenarioObj = this.scenarioArr[index];
    },
    fnToggleSceneList() {
      // 현재 클래스 상태 확인
      const isOn = this.$el.querySelector('.scenario_list_section').classList.contains('on');
      // 클래스 토글
      this.$el.querySelector('.scenario_list_section').classList.toggle('on', !isOn);
    },
    fnSetScenario (rn) {
      this.scenarioObj = this.scenarioArr[rn];
      this.fnToggleSceneList();
    },

    //캐릭터
    async fnGetCharacterInfo() {
      await this.fnGetScenarioCharData();
    },
    // 엑셀에서 데이터를 가져온다.
    async fnGetScenarioCharData() {
      const baseScenarioInfo = this.$store.getters['storeScene/getScenarioInfo'];
      if(baseScenarioInfo.id === this.scenarioObj.id) {
        console.info('//기존거')
        this.characterArr = this.$store.getters['storeScene/getCharacterList'];
      } else {
        console.info('//새로')
        this.$store.commit('storeScene/setScenarioInfo', this.scenarioObj);
        this.$store.commit('storeScene/createCharacterList', this.scenarioObj.id)
        this.characterArr = this.$store.getters['storeScene/getCharacterList'];
      }
      this.fnFilterCharacterInfo();
    },
    //페이징
    async fnFilterCharacterInfo() {
      if (!this.characterArr || !Array.isArray(this.characterArr)) {
        console.error('Invalid or undefined characterArr.');
        return;
      }

      const filteredData = this.characterArr.filter((character) => {
        const nameIncludes = character.CHA_STD_NAME ? character.CHA_STD_NAME.includes(this.characterInfoSearchKey) : false;
        const nickIncludes = character.CHA_STD_NICK ? character.CHA_STD_NICK.includes(this.characterInfoSearchKey) : false;
        const engNameIncludes = character.CHA_ENG_NAME ? character.CHA_ENG_NAME.includes(this.characterInfoSearchKey) : false;
        return nameIncludes || nickIncludes || engNameIncludes;
      });

      const totalItemCount = filteredData.length;
      this.characterInfoPageObj.totalPages = Math.ceil(totalItemCount / this.characterInfoPageObj.itemsPerPage);

      this.characterInfo = Array.from({ length: this.characterInfoPageObj.totalPages }, () => []);
      for (let i = 0; i < this.characterInfoPageObj.totalPages; i++) {
        const startIndex = i * this.characterInfoPageObj.itemsPerPage;
        const endIndex = startIndex + this.characterInfoPageObj.itemsPerPage;
        const currentPageData = filteredData.slice(startIndex, endIndex);
        this.$set(this.characterInfo, i, currentPageData);
      }
      console.info('::', this.characterInfoPageObj)
      if(this.characterInfoPageObj.currentPage > this.characterInfoPageObj.totalPages) {
        this.characterInfoPageObj.currentPage = 0;
      }

    },


  }
}
</script>

<style lang="scss" scoped>
  @charset "UTF-8";
.pop_dictionary {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .pop_dictionary_layer {
    position: relative;
    z-index: 500;
    height: 100%;
    display: flex;
    flex-direction: column;
    .scenario_section {
      position: relative;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: auto;
      height: 4rem;
      border-top: 3px solid #ffffff;
      border-bottom: 3px solid #ffffff;
      .btn_prev {
        background-image: url("@/assets/images/common/icon/play_arrow.png");
        width: 2rem;
        height: 2rem;
        transform: rotate(180deg);
        background-size: cover;
        border: none;
      }
      .btn_next {
        background-image: url("@/assets/images/common/icon/play_arrow.png");
        width: 2rem;
        height: 2rem;
        background-size: cover;
        border: none;
      }
    }
    .scenario_list_section {
      top: 3rem;
      position: fixed;
      overflow: hidden;
      transition: height 1.2s ease;
      height: 0;
      max-height: 45rem;
      width: 100%;
      background-color: black;
      z-index: 500;
      border: 2px solid white;
      box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.5);
      overflow-y: auto;
      .scenario_row_section {
        margin: 0.5rem;
        border-bottom: 1px solid #ffffff;
      }
      .scenario_row_section .on {
        border: 2px solid white;
      }
    }
    .scenario_list_section.on {
      height: 100%;
    }

    .character_search_section {
      border: 2px solid white;
      padding-bottom: 1.2rem;
      input {
        width: 80%;
        height: 2rem;
      }
    }
    .character_filter_section {
      min-height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      flex-direction: column;
      .selector {
        display: flex;
        align-items: center;
        justify-content: center;
        height : 3rem;
        width: 100%;
        border: 0.5px solid white;
        div {
          flex : 1;
          .input_select {
            background: black;
            color: #c2daf7;
            font-size: 1.0rem;
            option {
              font-size: 1rem;
              height: 0.8rem;
            }
          }
        }
      }
      
    }
    .character_list_section {
      position: relative;
      height: calc(100% - 9rem);
      overflow-y: auto;
    }
    .paging_div {
      position: relative;
      border: 2px solid white;
      color: #c2daf7;
      width: 100vw;
      background-color: rgba(0, 0, 0, 1);
      height: 3rem;
      overflow-y: hidden;
      flex-direction: row;
      justify-content: space-between;
      display: flex;
      align-items: center;
      width: 100%;
      .info_box {
        flex: 1;
      }
      
    }
  }
  .ctl_common {
    flex: 1;
    margin: 0.1rem;
    background-color: rgba(0, 0, 0, 1);
    box-shadow: 0 0 0 2px #c2daf7;
    border-radius: 0.1em;
    color: #c2daf7;
    height: 100%;
  }
  .ctl_common:disabled {
    color: grey;
    cursor: not-allowed;
  }

}
</style>
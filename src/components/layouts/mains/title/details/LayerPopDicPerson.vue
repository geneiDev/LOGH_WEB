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
      <h3>총 {{ characterInfo.length }} / {{ characterArr.length }} 명</h3>
      <input type="text" class="" v-model="characterInfoKey">
    </div>

    <div class="character_list_section">
      <div v-for="characterRow in characterInfo" :key="characterRow.RN">
        <h3>{{characterRow.CHA_STD_NAME}}</h3>
      </div>
      
    </div>
    
  </div>
</div>
</template>

<script>
import { scenarioMeta } from "@/assets/txt/scenario/scenarioMeta";
import * as XLSX from 'xlsx';
export default {
  components: {
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
      characterInfo : [],
      characterInfoKey : "",
    };
  },
  watch: {
    'scenarioObj.rn'() {
      this.fnGetCharacterInfo();
    },
    'characterInfoKey' (newVal) {
      this.fnFilterCharacterInfo(newVal)
    },
  },
  mounted() {
    this.userData = this.$store.getters['storeUser/getCurrentUser'];
    console.info('userData', this.userData);
    this.fnInitScenarioMeta();
  },
  methods : {
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
      let filePath = 'data/scenario/TN_GEN_CHAR.xlsx';
      if (this.scenarioObj.mod === 'Y' && this.scenarioObj.id) {
        filePath = `data/scenario/${this.scenarioObj.id}/TN_GEN_CHAR.xlsx`;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        if( jsonData && jsonData.length > 0) {
          this.$store.commit('storeScene/setCharacterList', jsonData);
          this.characterArr = jsonData;
          console.info('characterArr', this.characterArr)
          this.fnFilterCharacterInfo('')
        } else {
          console.error('캐릭터 정보 NULL');
        }
      };
      try {
        fetch(filePath)
        .then(response => response.blob())
        .then(blob => reader.readAsArrayBuffer(blob));  
      } catch (error) {
        console.error(error)
      }
    },
    fnFilterCharacterInfo(newVal) {
      const lowerCaseVal = newVal.toLowerCase();
      this.characterInfo = this.characterArr.filter(character => {
        const lowerCaseName = character.CHA_STD_NAME.toLowerCase();
        const lowerCaseNick = character.CHA_STD_NICK.toLowerCase();
        return lowerCaseName.includes(lowerCaseVal) || lowerCaseNick.includes(lowerCaseVal);
      });
    },

  }
}
</script>

<style lang="scss" scoped>
  @charset "UTF-8";
.pop_dictionary {
  height: auto;
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
      height: 3rem;
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
      position: absolute;
      overflow: hidden;
      transition: height 3s ease;
      height: 0;
      max-height: 40rem;
      width: 100%;
      background-color: black;
      z-index: 500;
      border: none;
      overflow-y: auto;
      .scenario_row_section {
        margin: 0.5rem;
        border-bottom: 1px solid #ffffff;
      }
      .scenario_row_section.on {
        border: 2px solid white;
        
      }
    }
    .scenario_list_section.on {
      height: auto;
    }
    .character_search_section {
      border: 2px solid white;
      input {
        width: 80%;
        height: 2rem;
      }
    }
    .character_list_section {
      position: relative;
      max-height: 200px;
      overflow-y: auto;
    }

    // 하단 버튼 에리어
    .btn_area {
      position: absolute;
      bottom: 3rem;
      left: 0;
      width: 100%;
      margin-bottom: 0.5rem;
      display: flex;
      .btn_common {
        flex: 1;
        border-radius: 0.1em;
        margin: 0.1rem;
        color:gray;
        background-color: rgba(0, 0, 0, 1);
        box-shadow: 0 0 0 2px #c2daf7;
        border-radius: 0.5em;
        color : #c2daf7;
      }
      .btn_common[disabled] {
        color:gray;
        box-shadow: 0 0 0 2px gray;
      }
    }
    .scenario_detail_section {
      position: absolute;
      height: 0%;
      width: 100%;
      z-index: 600;
      bottom: 0;
      display: none;
      &.on {
        display: block;
        height: 100%;
      }
    }
  }
}
</style>
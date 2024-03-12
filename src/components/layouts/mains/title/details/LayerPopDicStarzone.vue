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
    <div class="starzone_section">
      <genei-map-area :scenario="scenarioObj" />
      {{ starzoneData }}
    </div>
    <div class="star_section">
      2
    </div>
  </div>
</div>
</template>

<script>
import { scenarioMeta } from "@/assets/txt/scenario/scenarioMeta";
import geneiMapArea from '@/components/layer/utils/geneiMapArea.vue'

export default {
  components: {
    geneiMapArea
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

      starzoneData : [],
    };
  },
  watch: {
    'scenarioObj.rn'() {
      this.fnGetStarzoneData();
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

    //지도
    async fnGetStarzoneData() {
      this.$store.getters['storeScene/getStarzoneList'](this.scenarioObj.id).then(result => {
        this.starzoneData = result;
      })
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
      min-height: 4rem;
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
      top: 4rem;
      position: fixed;
      overflow: hidden;
      transition: height 1.2s ease;
      height: 0;
      max-height: 40rem;
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
      .scenario_row_section.on {
        border: 2px solid white;
        color: #1566c9;
      }
    }
    .scenario_list_section.on {
      height: 100%;
    }
  }
  .starzone_section {
    flex : 1;
    border: 2px solid white;
  }
  .star_section {
    flex : 1;
    border: 2px solid white;
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
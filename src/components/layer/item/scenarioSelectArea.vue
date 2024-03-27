<!-- scenarioDetailInfoArea.vue -->
<template>
  <div class="scenario_select_area">
    <div class="scenario_section">
      <button type="button" class="btn_prev" @click="fnBtnScenario('P')"></button>
        <div @click="fnToggleSceneList">
          <!-- {{ scenarioInfo }} -->
          <h4 class="flag_info_item">UC {{ scenarioInfo.date }}</h4>
          <h3 class="flag_info_item">{{fnGetScenarioFlagName(scenarioInfo.flag)}} {{ (scenarioInfo.subtitle || '시나리오 이름 작성중') }} </h3>
        </div>
      <button type="button" class="btn_next" @click="fnBtnScenario('N')"></button>
    </div>
    <div class="scenario_list_section">
      <div :class="'scenario_row_section'+(scenarioInfo.id === scenarioRow.id ? ' on' : '')" v-for="scenarioRow in scenarioList" :key="scenarioRow.rn" @click="fnSetScenario(scenarioRow)">
          <h4 class="flag_info_item">UC {{ scenarioRow.date }}</h4>
          <h3 class="flag_info_item">{{fnGetScenarioFlagName(scenarioRow.flag)}} {{ (scenarioRow.subtitle || '시나리오 이름 작성중') }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  components: {
  },
  computed: {
    scenarioList() {
      return this.$store.getters['storeScene/getScenarioList'];
    },
    scenarioInfo() {
      return this.$store.getters['storeScene/getScenarioInfo'];
    },
  },
  data() {
    return {
      //새 게임의 TYPE
      menuFlag : [
        {idx: 0, flagName:'튜토리얼', flagCode:'T'},
        {idx: 1, flagName:'스탠다드', flagCode:'S'},
        {idx: 2, flagName:'가상역사', flagCode:'F'}
      ],
    };
  },
  watch : {
    
  },
  activated() {
    
  },
  created() {
    
  },
  async mounted() {
    
  },
  methods: {
    //SELECT 영역 확장/축소
    fnToggleSceneList() {
      // 현재 클래스 상태 확인
      const isOn = this.$el.querySelector('.scenario_list_section').classList.contains('on');
      // 클래스 토글
      this.$el.querySelector('.scenario_list_section').classList.toggle('on', !isOn);
    },
    fnGetScenarioFlagName(flagCode) {
      const matchingFlag = this.menuFlag.find(flag => flag.flagCode === flagCode);
      return `[${matchingFlag?.flagName || ''}]`;
    },
    fnSetScenario (info) {
      this.$store.commit('storeScene/setScenarioInfo', info);
      this.fnToggleSceneList();
    },
    fnBtnScenario(flg) {
      const arrLength = this.scenarioList.length;
      let index = this.scenarioList.findIndex(row => row.idx === this.scenarioInfo.idx);
      if(flg === 'P') {
        index = (index - 1 + arrLength) % arrLength;
      } else if(flg === 'N') {
        index = (index + 1) % arrLength;
      }
      this.$store.commit('storeScene/setScenarioInfo', this.scenarioList[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
.scenario_select_area {
  position: relative;
  min-height: 4rem;
  height: 100%;
  width: 100%;
  .scenario_section {
    position: relative;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    min-height: 4rem;
    border-bottom: 3px solid #ffffff;
    .btn_prev {
      background-image: url("@/assets/images/common/icon/play_arrow.png");
      width: 2rem;
      height: 2rem;
      transform: rotate(180deg);
      background-size: cover;
      border: none;
    }
    .flag_info_item {
      color: #1566c9;
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
    position: fixed;
    overflow: hidden;
    transition: height 0.2s ease;
    height: 0;
    max-height: 40rem;
    width: 100%;
    background-color: black;
    z-index: 500;
    border: none;
    box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.5);
    overflow-y: auto;
    .scenario_row_section {
      color:#ffffff;
      margin: 1.5rem;
      
      border-bottom: 1px solid #ffffff;
    }
    .scenario_row_section.on {
      border: 2px solid white;
      color: #1566c9;
    }
  }
  .scenario_list_section.on {
    height: 100%;
    max-height: 85vh;
  }
}

</style>

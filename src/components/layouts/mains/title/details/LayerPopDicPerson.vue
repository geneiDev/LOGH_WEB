<template>
<div class="pop_dictionary">
  <div class="pop_layer">
    <div class="flag_section">
      <button type="button" class="btn_prev" @click="fnSetMainFlag('P')"></button>
      <h1>{{ currFlag.flagName }}</h1>
      <button type="button" class="btn_next" @click="fnSetMainFlag('N')"></button>
    </div>
    <div class="scenario_section">
      <div :class="'flag_info_section'+(scenarioObj && scenarioObj.idx === scenario.idx ? ' on' : '')" v-for="scenario in scenarioArr" :key="scenario.idx" :aria-disabled="scenario.useYn ? 'false' : 'true'" @click="fnCallScenarioDetail(scenario)">
        <h3 class="flag_info_item">UC {{ scenario.date }}</h3>
        <h3 class="flag_info_item">{{ scenario.subtitle }}</h3>
      </div>
    </div>
    
    <div class="character_section">
      aa
    </div>
    <div class="scenario_detail_section on" v-if="scenarioPop">
      <scenario-detail-info :scenarioObj="scenarioObj" @fnClosePop="fnCloseScenarioDetailInfo"/>
    </div>
  </div>
</div>
</template>

<script>
import { scenarioMeta } from "@/assets/txt/scenario/scenarioMeta";
import scenarioDetailInfo from '@/components/layer/item/scenarioDetailInfoArea.vue'
export default {
  components: {
    scenarioDetailInfo,
  },
  data() {
    return {
      //새 게임의 TYPE
      menuFlag : [
        {idx: 0, flagName:'튜토리얼', flagCode:'T'},
        {idx: 1, flagName:'스탠다드', flagCode:'S'},
        {idx: 2, flagName:'가상역사', flagCode:'F'}
      ],
      //선택된 TYPE
      currFlag : {
        idx: 0,
        flagName:'',
        flagCode:''
      },
      //새 게임의 시나리오
      scenarioArr : [],
      //선택된 시나리오
      scenarioObj : {},
      //시니리오 팝업 컨트롤러
      scenarioPop : false,
    };
  },
  mounted() {
    this.userData = this.$store.getters['storeUser/getCurrentUser'];
    this.fnSetMainFlag();
  },
  methods : {
    fnSetMainFlag(type) {
      if (this.currFlag.idx === undefined) {
        this.currFlag.idx = 0;
      }
      let newIdx = this.currFlag.idx;
      if (type === 'N') {
        newIdx = (this.currFlag.idx + 1) % this.menuFlag.length;
      } else if (type === 'P') {
        newIdx = (this.currFlag.idx - 1 + this.menuFlag.length) % this.menuFlag.length;
      }
      this.currFlag = this.menuFlag[newIdx];
      this.fnCallScenario(this.currFlag.flagCode);
    },
    fnCallScenario(flg) {
      this.scenarioArr = scenarioMeta.filter(scenario => scenario.flag === flg);
      this.scenarioObj = {};
    },
    fnCallScenarioDetail(data) {
      if(!data.useYn) {
        return;
      }
      this.scenarioObj = data;
      this.fnSetScenarioDetailInfo();
    },
    fnSetScenarioDetailInfo() {
      // this.scenarioPop = true;
    },
    

  }
}
</script>

<style lang="scss" scoped>
  @charset "UTF-8";
.pop_dictionary {
  min-height: 100%;
  .pop_layer {
    z-index: 500 !important;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .flag_section {
      background-color: #c2daf7;
      color: black;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
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
      h1 {
        flex: 1;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
      }
      h1::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, transparent, rgb(111, 62, 156), transparent);
        animation: textFlow 5s linear infinite;
      }
      @keyframes textFlow {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    }
    .scenario_section {
      max-height: 25vh;
      overflow: auto;
      flex: 1;
      .flag_info_section {
        margin : 0.8rem;
        color : #c2daf7;
        max-height: 8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .flag_info_item {
          flex: 1;
        }
        &.on {
          box-shadow: 0 0 0 2px #c2daf7;
          border-radius: 0.5em;
        }
      }
      .flag_info_section[aria-disabled="true"] {
        color:gray;
      }
    }
    .character_section {
      flex-grow: 2;
      overflow: auto;
      background-color: red;
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
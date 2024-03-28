<template>
<div>
  <div class="pop_layer">
    <div v-if="scenarioArr">
    <scenario-select></scenario-select>
    </div>
    <div class="flag_section">
      <button type="button" class="btn_prev" @click="fnSetMainFlag('P')"></button>
      <h1>{{ currFlag.flagName }}</h1>
      <button type="button" class="btn_next" @click="fnSetMainFlag('N')"></button>
    </div>
    <div class="scenario_section">
      <div :class="'flag_info_section'+(scenarioObj && scenarioObj.idx === scenario.idx ? ' on' : '')" v-for="scenario in scenarioArr" :key="scenario.idx" :aria-disabled="scenario.useYn ? 'false' : 'true'" @click="fnCallScenarioDetail(scenario)">
        <h1 class="flag_info_item">{{ scenario.title }}</h1>
        <h3 class="flag_info_item">UC {{ scenario.date }}</h3>
        <h3 class="flag_info_item">{{ scenario.subtitle }}</h3>
      </div>
    </div>
    <div class="btn_area">
      <button type="button" class="btn_common" @click="fnSetScenario('on')" :disabled = '!scenarioObj.idx'><h1>다음</h1></button>
    </div>
    <div class="scenario_detail_section on" v-if="scenarioPop">
      <scenario-detail-info :scenarioObj="scenarioObj" @fnClosePop="fnCloseScenarioDetailInfo"/>
    </div>
  </div>
</div>
</template>

<script>
import { scenarioMeta } from "@/assets/txt/scenario/scenarioMeta";

import scenarioSelect from "@/components/layer/item/scenarioSelectArea.vue";

import scenarioDetailInfo from '@/components/layer/item/scenarioDetailInfoArea.vue'
export default {
  components: {
    scenarioSelect,
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
      this.fnShowScenarioDetailInfo();
    },
    fnShowScenarioDetailInfo() {
      this.scenarioPop = true;
    },
    fnCloseScenarioDetailInfo() {
      this.scenarioPop = false;
    },
    fnSetScenario () {

    },

  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layer/commons/LayerPopNewGame.scss"
</style>
<template>
  <div class="pop_layer">
    <div class="flag_section">
      <button type="button" class="btn_prev" @click="fnSetMainFlag('P')"></button>
      <h1>{{ currFlag.flagName }}</h1>
      <button type="button" class="btn_next" @click="fnSetMainFlag('N')"></button>
    </div>
    <div class="flag_info_section">
      <h3 class="flag_info_item">UC {{ scenarioObj.date }}</h3>
      <h1 class="flag_info_item">{{ scenarioObj.title }}</h1>
      <h3 class="flag_info_item">{{ scenarioObj.subtitle }}</h3>
    </div>

    <div class="btn_area">
      <button type="button" class="btn_common" @click="fnSetScenario('on')"><h1>이전</h1></button>
      <button type="button" class="btn_common" @click="fnSetScenario('on')"><h1>다음</h1></button>
    </div>
  </div>
</template>

<script>
import { scenarioMeta } from "@/assets/txt/scenario";
export default {
  data() {
    return {
      //새 게임의 TYPE
      menuFlag : [
        {idx: 0, flagName:'튜토리얼', flagCode:'T'},
        {idx: 1, flagName:'스탠다드', flagCode:'S'},
        {idx: 2, flagName:'가상역사', flagCode:'F'}
      ],
      currFlag : {
        idx: 0,
        flagName:'',
        flagCode:''
      },
      //새 게임의 시나리오

      scenarioIdx : 0,
      scenarioObj : {},
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
      this.fnCallScenario(0);
    },
    fnCallScenario(flg) {
      this.scenarioFlag = flg;
      this.scenarioObj = scenarioMeta[this.scenarioIdx];
      console.info(this.scenarioObj)
    },
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layer/commons/LayerPopNewGame.scss"
</style>
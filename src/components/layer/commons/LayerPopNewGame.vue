<template>
  <div class="pop_layer">
    <div class="flag_section">
      <button type="button" class="btn_prev" @click="fnSetMainFlag('P')"></button>
      <h1>튜토리얼</h1>
      <button type="button" class="btn_next" @click="fnSetMainFlag('N')"></button>
    </div>
    <div>
      <h2></h2>
      <h2></h2>
      <h3></h3>
    </div>
    <div class="btn_area">
      <button type="button" class="btn_common" @click="fnSetScenario('on')"><h1>이전</h1></button>
      <button type="button" class="btn_common" @click="setTitleFlag('on')"><h1>자세히</h1></button>
      <button type="button" class="btn_common" @click="fnSetScenario('on')"><h1>다음</h1></button>
    </div>
  </div>
</template>

<script>
import { scenarioMeta } from "@/assets/txt/scenario";
export default {
  data() {
    return {
      scenarioIdx : 0,
      scenarioObj : {},
    };
  },
  mounted() {
    this.userData = this.$store.getters['storeUser/getCurrentUser'];
    this.fnCallScenarioMeta();
  },
  methods : {
    fnCallScenarioMeta() {
      this.scenarioObj = scenarioMeta[this.scenarioIdx];
      console.info(scenarioMeta.length)
      console.info(this.scenarioObj)
    },
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layer/commons/LayerPopNewGame.scss"
</style>
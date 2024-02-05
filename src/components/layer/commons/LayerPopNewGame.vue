<template>
  <div class="pop_layer">
    <div>
      <h2></h2>
      <h2></h2>
      <h3></h3>
    </div>
    <div class="btn_area">
      <button type="button" class="btn_next" @click="setTitleFlag('on')"><h1>인물 선택</h1></button>
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
      console.info(this.scenarioObj)
    },
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layer/commons/LayerPopNewGame.scss"
</style>
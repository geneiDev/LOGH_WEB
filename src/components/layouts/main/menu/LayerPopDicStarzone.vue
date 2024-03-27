<template>
<div class="pop_dictionary">
  <div class="pop_dictionary_layer">
    <scenario-select></scenario-select>
    <div class="starzone_section">
      <genei-map-area />
      
    </div>
    <div class="star_section">
      {{ starzoneList() }}
      <div v-for="row in starzoneList" :key="row.code">
        {{row.name.KR}}
      </div>

    </div>
  </div>
</div>
</template>

<script>
import geneiMapArea from '@/components/layer/utils/geneiMapArea.vue'
import scenarioSelect from "@/components/layer/item/scenarioSelectArea.vue";

export default {
  components: {
    scenarioSelect,
    geneiMapArea,
  },
  data() {
    return {
    };
  },
  watch: {

  },
  computed: {
    scenarioList() {
      return this.$store.getters['storeScene/getScenarioList'];
    },
    scenarioInfo() {
      return this.$store.getters['storeScene/getScenarioInfo'];
    },
    starzoneList() {
      return this.$store.getters['storeScene/getStarzoneList'];
    },
  },
  mounted() {
    this.fnInitScreenFunc();
  },
  methods : {
    //화면
    fnInitScreenFunc() {

    },
  },
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
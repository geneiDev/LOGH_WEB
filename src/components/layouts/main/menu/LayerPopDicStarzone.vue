<template>
<div class="pop_dictionary">
  <div class="pop_dictionary_layer">
    <scenario-select></scenario-select>
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
import scenarioSelect from "@/components/layer/item/scenarioSelectArea.vue";

export default {
  components: {
    geneiMapArea,
    scenarioSelect,
  },
  data() {
    return {
      
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
<!-- scenarioDetailInfoArea.vue -->
<template>
  <div class="scenario_detail_info_area">
    <div class="contents_area">
      <div class="main_info_section">
        <h1 class="flag_info_item">{{ scenarioObj.title }}</h1>
        <h3 class="flag_info_item">UC {{ scenarioObj.date }}</h3>
        <h3 class="flag_info_item">{{ scenarioObj.subtitle }}</h3>
      </div>
      <div class="scene_info_section">
        <ul>
          <li :class="{ 'on': majorItem === 'preview' }"><h1 class="scene_info_item" @click="fnSetMajorItem('preview')">개요</h1></li>
          <li :class="{ 'on': majorItem === 'mission' }"><h1 class="scene_info_item" @click="fnSetMajorItem('mission')">목표</h1></li>
          <li :class="{ 'on': majorItem === 'rewards' }"><h1 class="scene_info_item" @click="fnSetMajorItem('rewards')">보상</h1></li>
        </ul>
      </div>
      <div v-if="majorItem === 'preview'">
        preview
      </div>
      <div v-if="majorItem === 'mission'">
        mission
      </div>
      <div v-if="majorItem === 'rewards'">
        rewards
      </div>

        <!-- <h2 class="flag_info_item">{{ scenarioObj }}</h2> -->
    </div>
    <div class="controller_area">
      <button type="button" class="btn_common" @click="fnClosePop()"><h1>닫기</h1></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scenarioObj: Object
  },
  data() {
    return {
      isOpen : false,
      majorItemList : [],
      majorItem : 'preview',
      previewObj : {},
    };
  },
  watch : {
    'scenarioObj.idx': function() {
      this.fnInit();
    }
    // majorItem(newItem) {
    //   console.info('majorItem Chagened:', newItem);
    // },
  },
  mounted() {
    this.fnInit();
  },
  methods: {
    fnInit() {
      const that = this;
      const majorItemArr = ['preview', 'mission', 'rewards'];
      this.majorItemList = [];
      if (typeof that.scenarioObj === 'object' && that.scenarioObj !== null && that.scenarioObj.idx) {
        console.info('>>>>', that.scenarioObj)
        majorItemArr.forEach(function(majorObj) {
          if (majorObj in  that.scenarioObj) {
            // console.log(`Pushing ${majorObj} into majorItemList.`);
            that.majorItemList.push(majorObj)
          }
        });
        this.fnSetMinorData();
      }
    },
    fnSetMinorData() {
      console.info(this.majorItemList.length)
      if(this.majorItemList.length === 0 ) {
        // alert('시나리오 데이터를 초기화하는데 실패했습니다.')
        return;
      }
      
    },
    fnSetMajorItem(objId) {
      this.majorItem = objId;
    },
    fnClosePop () {
      this.$parent.fnCloseScenarioDetailInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.scenario_detail_info_area {
  position: relative;
  height: 100%;
  background-image: url("@/assets/images/common/background.jpg");
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .contents_area {
    flex: 1;
    width: 100%;
    .scene_info_section {

    }
    .scene_info_section ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
    }
    .scene_info_section li {
      flex: 1;
      text-align: center;
      border: 1px solid #ccc;
      &.on {
        text-align: center;
        border: 2px solid rgb(202, 200, 52);
      }
    }
  }
  .controller_area {
    position: fixed;
    bottom: 0;
    left : 0;
    width: 100%;
    padding: 1rem;
  }
  .main_info_section {
    margin: 2rem 0.5rem;
    box-shadow: 0 0 0 1px #c2daf7;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
  }
  .btn_common {
    
    width: 100%;
    border-radius: 0.1em;
    margin: 0.1rem;
    color:gray;
    background-color: rgba(0, 0, 0, 1);
    box-shadow: 0 0 0 2px #c2daf7;
    border-radius: 0.5em;
    color : #c2daf7;
  }
}
.opening-div {
  max-height: 8rem;
  overflow: hidden;
}

.opening-crawl {
  white-space: pre-line;
  position: relative;
  transition: transform 0.01s;
}
</style>

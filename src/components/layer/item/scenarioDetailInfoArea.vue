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
          <li :class="{ 'on': majorItem === 'preview' }" ref="ref_preview"><h1 class="item" @click="fnSetMajorItem('preview')">개요</h1></li>
          <li :class="{ 'on': majorItem === 'subInfo' }" ref="ref_subInfo"><h1 class="item" @click="fnSetMajorItem('subInfo')">정보</h1></li>
          <li :class="{ 'on': majorItem === 'mission' }" ref="ref_mission"><h1 class="item" @click="fnSetMajorItem('mission')">목표</h1></li>
          <li :class="{ 'on': majorItem === 'rewards' }" ref="ref_rewards"><h1 class="item" @click="fnSetMajorItem('rewards')">보상</h1></li>
        </ul>
      </div>
      <!-- 준비중 -->
      <div class="dimmed" v-if="majorItem === ''">
        <div class="loader"></div>
        <h2>{{ dataLoadingText }}</h2>
      </div>

      <!-- 개요 -->
      <div class="detail_info_section" v-if="majorItem === 'preview'">
        <img class="preview_img" v-lazy="fnGetImage(scenarioObj.previewImg[previewPage])" alt="img"
          @click="(previewPage < scenarioObj.previewTxt.length - 1) ? previewPage++ : ''" />
        <div class="preview_txt" ref="textContainer" @click="(previewPage < scenarioObj.previewTxt.length - 1) ? previewPage++ : ''">
          {{ scenarioObj.previewTxt[previewPage] }}
        </div>
        <h5>{{ previewPage+1 }} / {{ scenarioObj.previewTxt.length }}</h5>
        <div class="preview_btn">
          <button type="button" class="ctl_common" @click="previewPage--" :disabled="previewPage == 0"><h1>이전</h1></button>
          <button type="button" class="ctl_common" @click="previewPage++" :disabled="previewPage == scenarioObj.previewTxt.length-1"><h1>다음</h1></button>
        </div>
      </div>

      <!-- 정보 -->
      <div v-if="majorItem === 'subInfo'">
        추가 정보 출력란
      </div>
      <div class="detail_info_section" v-if="majorItem === 'mission'">
        <div class="mission_txt" ref="textContainer" @click="(missionPage < scenarioObj.mission.length - 1) ? missionPage++ : ''">
          <h2 class="text_item">{{ scenarioObj.mission[missionPage].idx }}. {{ scenarioObj.mission[missionPage].title }}</h2>
          <span class="desc_item">{{scenarioObj.mission[missionPage].desc}}</span>
        </div>
        <div class="preview_btn">
          <button type="button" class="ctl_common" @click="missionPage--" :disabled="missionPage == 0"><h1>이전</h1></button>
          <button type="button" class="ctl_common" @click="missionPage++" :disabled="missionPage == scenarioObj.mission.length-1"><h1>다음</h1></button>
        </div>
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
      dataLoading : false,
      dataLoadingText : '',

      scenarioIdx : 0,

      majorItemList : [],
      majorItem : '',

      previewArray: [],
      previewPage : 0,

      missionPage : 0,
    };
  },
  watch : {
    dataLoadingText: function(b, a) {
      const minimumDuration = 1000; // 0.5초
      this.displayText = b;
      this.displayTime = Math.max(a, minimumDuration);
      setTimeout(() => {
        this.displayText = a;
      }, this.displayTime);
    },
    scenarioIdx: function() {
      this.fnInit();
    },
    previewPage: function(idx, pidx) {
      if(pidx < idx) {
        this.startTyping()
      }
    },
  },
  activated() {
    console.info('activated')
  },
  created() {
    this.fnInit();
  },
  mounted() {
    console.info('mounted!')
  },
  methods: {
    fnInit() {
      this.dataLoadingText = '시나리오 초기화 중'
      console.info('scenarioDetailInfoArea.vue initialize.')

      const that = this;
      const majorItemArr = ['preview', 'infoma', 'mission', 'rewards'];
      this.majorItemList = [];
      if (typeof that.scenarioObj === 'object' && that.scenarioObj !== null && that.scenarioObj.idx) {
        // console.info('>>>>', that.scenarioObj)
        majorItemArr.forEach(function(majorItemId) {
          if (majorItemId in  that.scenarioObj) {
            that.majorItemList.push(majorItemId)
            const functionName = 'fnInit' + majorItemId;
            if (typeof that[functionName] === 'function') {
              that['fnInit' + majorItemId]();
            }
          } else {
            console.info('nullobj', majorItemId)
          }
        });
      }
      if(this.majorItemList.length === 0 ) {
        // alert('시나리오 데이터를 초기화하는데 실패했습니다.')
        return;
      }
      // this.majorItem = this.majorItemList.find(item => this.scenarioObj[item]) || '';
    },
    fnInitpreview() {
      console.info('preview loading')
      this.dataLoadingText = '개요 정보를 초기화하는 중'
      this.previewArray =  []
      this.previewPage = 0
      
      let lastImgPath = "";
      this.dataLoadingText = '개요 정보를 세팅하는 중'
      for(let i=0; i<this.scenarioObj.previewTxt.length; i++) {
        let image;
        if(this.scenarioObj.previewImg[i]) {
          lastImgPath = this.scenarioObj.previewImg[i];
          image = require(`${lastImgPath}`);
        }
        this.previewArray.push({
          text : this.scenarioObj.previewTxt[i],
          imgPath : lastImgPath,
          img : image,
        });
      }

      // this.scenarioObj.previewImg.forEach((imgPath, index) => {
      //   const image = require(`@/path/to/images/${imgPath}`);
      //   imageArray[index] = image.default; // default를 사용하여 이미지를 추출
      // });

      console.info(this.scenarioObj.previewTxt);
      console.info(this.scenarioObj.previewImg);

      // 0: "assets/images/common/event/scenario/GalacticFederation.webp"
      // 1: "assets/images/common/event/scenario/PlvsVltra.webp"
      // 2: "assets/images/common/event/scenario/GalacticFederation.webp"
      // 3: "assets/images/common/event/scenario/GalacticFederation.webp"
      // 4: "assets/images/common/event/scenario/GalacticFederation.webp"
      // 5: "assets/images/common/event/scenario/GalacticFederation.webp"
      // 6: "assets/images/common/event/scenario/GalacticFederation.webp"
      // 7: "assets/images/common/event/scenario/GalacticFederation.webp"
      // 8: "assets/images/common/event/scenario/GalacticFederation.webp"

      
      
    },

    fnSetMajorItem(objId) {
      this.majorItem = objId;
      if(this.majorItem === 'preview') {
        this.previewPage = 0
        this.startTyping();
      }
    },
    fnGetImage(path) {
      if (!path) {
        return null;
      }
      // 이미지 경로를 정규화하고 배열로 분해
      const pathParts = path.replace(/\\/g, '/').split('/');
      // 파일명과 파일이 위치한 경로로 나누기
      const fileName = pathParts[pathParts.length - 1];
      const filePath = pathParts.slice(0, pathParts.length - 1).join('/');
      // 최종 경로 반환
      return `@/${filePath}/${fileName}`;
      
    },
    startTyping() {
      // let index = 0;
      // const typedText = this.scenarioObj.previewTxt[this.previewPage]
      // console.info(typedText)
      // if (typedText) {
      //   const typingInterval = setInterval(() => {
      //     this.typedText += typedText[index];
      //     index++;

      //       if (index === typedText.length) {
      //         clearInterval(typingInterval);
      //       }
      //   }, 50);
      // }
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
    .main_info_section {
    margin: 2rem 0.5rem;
    box-shadow: 0 0 0 1px #c2daf7;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .contents_area {
    flex-direction: column;
    flex: 1;
    position: relative;
    width: 100%;
    display: flex;
    .scene_info_section {
      margin-bottom: 1rem;
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
        border: 4px solid rgb(202, 200, 52);
      }
    }
    .detail_info_section {
      position: relative;
      display: flex;
      flex-direction: column;
      flex:1;
      overflow-y: auto;
      .preview_img {
        border: 3px solid rgb(202, 200, 52);
        height: 10rem;
        background: rgb(152, 152, 152);
      }
      .preview_txt
       {
        height: 12rem;
        min-height: 12rem;
        max-height: 12rem;
        background-color: black;
        border: 4px solid rgb(86, 22, 139);
        margin-top: 1rem;
        font-size : 1.6rem;
        text-align: left;
        white-space: pre-line;
        overflow-y: auto;
      }
      .preview_btn {
        bottom: 0;
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        .ctl_common {
          flex: 1;
          border-radius: 0.1em;
          margin: 0.1rem;
          color:gray;
          background-color: rgba(0, 0, 0, 1);
          box-shadow: 0 0 0 2px #c2daf7;
          border-radius: 0.5em;
          color : #c2daf7;
          z-index: 800;
        }
        .ctl_common:disabled {
          color: grey;
          cursor: not-allowed;
        }
      }
      .mission_txt
       {
        height: 24rem;
        background-color: black;
        border: 4px solid rgb(86, 22, 139);
        margin-top: 1rem;
        text-align: left;
        white-space: pre-line;
        overflow-y: auto;
      }
    }
  }
  .controller_area {
    bottom: 0;
    left : 0;
    width: 100%;
    padding: 1rem;
    z-index: 1100;
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
    z-index: 800;
  }
}

</style>

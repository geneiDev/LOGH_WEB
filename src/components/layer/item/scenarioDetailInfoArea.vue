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
      <!-- 로딩 텍스트 -->
      <div class="dimmed" v-if="majorItem === ''">
        <div class="loader"></div>
        <h2>{{ dataLoadingText }}</h2>
      </div>
      <div class="main_context">
        <!-- 개요 -->
        <div class="detail_info_section" v-if="majorItem === 'preview'">
          <div class="preview_img" @click="(previewPage < scenarioObj.preview.length - 1) ? previewPage++ : ''">
            <genei-img-area :imgSrc="scenarioObj.previewImg[previewPage]"/>
          </div>
          <div class="preview_txt" ref="textContainer" @click="(previewPage < scenarioObj.preview.length - 1) ? previewPage++ : ''">
            <scroll-text-area :options="{text : scenarioObj.preview[previewPage] , itv : 50 }" />
          </div>
          <h5 class="page_box">{{ previewPage+1 }} / {{ scenarioObj.preview.length }}</h5>
          <div class="preview_btn">
            <button type="button" class="ctl_common" @click="previewPage--" :disabled="previewPage == 0"><h1>이전</h1></button>
            <button type="button" class="ctl_common" @click="previewPage++" :disabled="previewPage == scenarioObj.preview.length-1"><h1>다음</h1></button>
          </div>
        </div>

        <!-- 정보 -->
        <div v-if="majorItem === 'subInfo'">
          <!-- A타입 : 이미지 + 텍스트 -->
          <div v-if="scenarioObj.subInfo[subInfoPage].displayType === 'A'" class="subInfoA">
            TODO
          </div>
          <!-- C타입 : 캐릭터 + 텍스트 -->
          <div v-if="scenarioObj.subInfo[subInfoPage].displayType === 'C'" class="subInfoC">
            <character-info-area :charId="scenarioObj.subInfo[subInfoPage].data" :option="{ 'scenario' : scenarioObj.id }"></character-info-area>
            <div class="preview_txt" ref="textContainer" @click="(previewPage < scenarioObj.preview.length - 1) ? previewPage++ : ''">
              <scroll-text-area :options="{text : scenarioObj.subInfo.text , itv : 50 }" />
            </div>
          </div>

        </div>

        <!-- 목표 -->
        <div class="detail_info_section" v-if="majorItem === 'mission'">
          <div class="preview_txt" ref="textContainer" @click="(missionPage < scenarioObj.mission.length - 1) ? missionPage++ : ''">
            <h3 class="text_item">{{ scenarioObj.mission[missionPage].idx }}. {{ scenarioObj.mission[missionPage].title }}</h3>
            <span class="desc_item">{{scenarioObj.mission[missionPage].desc}}</span>
          </div>
          <div class="preview_btn">
            <button type="button" class="ctl_common" @click="missionPage--" :disabled="missionPage == 0"><h1>이전</h1></button>
            <button type="button" class="ctl_common" @click="missionPage++" :disabled="missionPage == scenarioObj.mission.length-1"><h1>다음</h1></button>
          </div>
        </div>

        <!-- 보상 -->
        <div v-if="majorItem === 'rewards'">
          rewards
        </div>
      </div>
        <!-- <h2 class="flag_info_item">{{ scenarioObj }}</h2> -->
    </div>
    <div class="controller_area">
      <button type="button" class="btn_common" @click="fnClosePop()"><h1>닫기</h1></button>
    </div>
  </div>
</template>

<script>
import GeneiImgArea from '@/components/layer/utils/geneiImgArea'
import ScrollTextArea from '@/components/layer/utils/scrollTextArea'
import CharacterInfoArea from '@/components/layer/utils/characterInfoArea'
import * as XLSX from 'xlsx';

export default {
  props: {
    scenarioObj: Object
  },
  components: {
    GeneiImgArea,
    ScrollTextArea,
    CharacterInfoArea,
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
      
      subInfoPage : 0,

      missionPage : 0,
    };
  },
  watch : {
    scenarioIdx: function() {
      this.fnInit();
    },
  },
  activated() {
    console.info('activated')
  },
  created() {
    
  },
  async mounted() {
    console.info('mounted!')
    await this.fnInit();
  },
  methods: {
    async fnInit() {
      // console.info('scenarioDetailInfoArea.vue initialize.');
      this.dataLoadingText = '시나리오 초기화 중';

      const majorItemArr = ['preview', 'subInfo', 'mission', 'rewards'];
      this.majorItemList = [];

      if (typeof this.scenarioObj === 'object' && this.scenarioObj !== null && this.scenarioObj.idx) {
        for (const majorItemId of majorItemArr) {
          if (majorItemId in this.scenarioObj) {
            this.majorItemList.push(majorItemId);
          } else {
            console.error(`create object: ${majorItemId}`);
          }
        }

        const promises = this.majorItemList.map(async (majorItemId) => {
          console.info('INIT FUNCTION : ', majorItemId)
          if(majorItemId === 'preview') {
            await this.fnInit_preview();
          }
          if(majorItemId === 'subInfo') {
            await this.fnInit_subInfo();
          }
        });

        await Promise.all(promises);

        if (this.majorItemList.length === 0) {
          this.dataLoadingText = '시나리오 데이터를 불러오는데 실패했습니다.';
          return;
        }
        //
        this.$store.commit('storeScene/setScenarioInfo', this.scenarioObj);
        await this.fnGetScenarioCharData();
      }
    },
    async fnSetMajorItem(objId) {
      console.info('objId:', objId)
      this.majorItem = objId;
      if(this.majorItem === 'preview') {
        this.previewPage = 0
      }
    },
    // 개요
    async fnInit_preview() {
      console.info('fnInit_preview');
      this.dataLoadingText = '개요 정보를 초기화하는 중';
      this.previewArray =  [];
      this.previewPage = 0;
      //TODO
      let lastImgPath = "";
      const imagePromises = this.scenarioObj.previewImg.map(async (imgPath, index) => {
        if (imgPath) {
          try {
            // 이미지를 미리 로드
            const image = new Image();
            await new Promise((resolve, reject) => {
              image.onload = resolve;
              image.onerror = reject;
              image.src = imgPath;
            });

            // 이미지가 로드되었으면 lastImgPath 업데이트
            lastImgPath = imgPath;
          } catch (error) {
            console.error('Error loading image', error);
          }
        }
        // previewArray 업데이트
        this.previewArray.push({
          text: this.scenarioObj.preview[index],
          imgPath: lastImgPath,
        });
      });
      // 모든 이미지가 로드될 때까지 대기
      await Promise.all(imagePromises);
    },
    async fnInit_subInfo() {
      console.info('fnInit_preview');
    },

    // 엑셀에서 데이터를 가져온다.
    async fnGetScenarioCharData() {
      this.dataLoadingText = '인물 정보를 세팅하는 중';
      let filePath = 'data/scenario/TN_GEN_CHAR.xlsx';
      if (this.scenarioObj.mod === 'Y' && this.scenarioObj.id) {
        filePath = `data/scenario/${this.scenarioObj.id}/TN_GEN_CHAR.xlsx`;
      }
      console.info('fnGetScenarioCharData FROM ', filePath)
      
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        if( jsonData && jsonData.length > 0) {
          // console.info('캐릭터 정보 onload ', jsonData.length, '-> ', jsonData)
          this.$store.commit('storeScene/setCharacterList', jsonData);
          this.fnSetMajorItem('preview');
        } else {
          console.error('캐릭터 정보 onload failed');
        }
      };
      fetch(filePath)
        .then(response => response.blob()) // 파일을 Blob으로 변환합니다.
        .then(blob => reader.readAsArrayBuffer(blob)); // FileReader를 사용해 Blob을 읽습니다.
    },
    async fnGetScenarioNationData() {

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
  background-image: url("@/assets/images/common/background/background.jpg");
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
    .main_context {
      flex : 1;
      flex-direction: row;
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
      height: 100%;
      flex-direction: column;
      overflow-y: auto;

      .preview_img {
        border: 3px solid rgb(202, 200, 52);
        flex: 1;
        max-height: 10rem;
        background: rgb(152, 152, 152);
      }

      .preview_txt {
        flex : 1;
        // min-height: 12rem;
        // max-height: 12rem;
        background-color: black;
        border: 4px solid rgb(86, 22, 139);
        margin-top: 1rem; 
        font-size: 1.4rem;
        text-align: left;
        white-space: pre-line;
        overflow-y: auto;
      }

      .page_box {
        flex : 1;
        position: relative;
        max-height: 2rem;
        bottom: 0;
        flex-shrink: 0;
      }

      .preview_btn {
        flex: 1;
        margin-top: 8px;
        max-height: 2.5rem;
        position: relative;
        bottom: 0;
        flex-direction: row;
        justify-content: space-between;
        display: flex;
        flex-shrink: 0;
        width: 100%;
        .ctl_common {
          flex: 1;
          border-radius: 0.1em;
          margin: 0.1rem;
          color: gray;
          background-color: rgba(0, 0, 0, 1);
          box-shadow: 0 0 0 2px #c2daf7;
          border-radius: 0.5em;
          color: #c2daf7;
          z-index: 800;
        }
        .ctl_common:disabled {
          color: grey;
          cursor: not-allowed;
        }
      }

      .mission_txt {
        height: 24rem;
        background-color: black;
        border: 4px solid rgb(86, 22, 139);
        margin-top: 1rem;
        text-align: left;
        white-space: pre-line;
        overflow-y: auto;
      }

      margin-top: auto;
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

<template>
  <div class="body_layer">
    <div :class="'subPop_container'+(layerPop ? ' on' : ' off')">
      <div class="subPop_div">
        <component :is="layerPop"></component>
      </div>
      <button type="button" class="btn_back" @click="fnCallLayerPop('')">
        <h1>뒤로</h1>
      </button>
    </div>
    <div class="tip_container">
      <span id="tips" style="white-space: pre-line;">{{ tipTxt }}</span>
    </div>
    <div class="title_container" v-if="titleFlag === ''" @click="setTitleFlag('on')">
      <h1 class="blinking">화면을 터치해주세요.</h1>
    </div>
    <div class="title_container" v-if="titleFlag === 'on'">
      <button type="button" class="btn_title" @click="setTitleFlag('S')">
        <h1>싱글플레이</h1>
        <h4>홀로 자유롭게 플레이할 수 있습니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('M')" disabled>
        <h1>멀티플레이</h1>
        <h4>시즌별로 진행하는 멀티플레이입니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('O')" disabled>
        <h1>환경 설정</h1>
        <h4>여러 환경요소를 설정합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('D')">
        <h1>데이터</h1>
        <h4>게임의 데이터 정보입니다.</h4>
      </button>
    </div>
    <div class="title_container" v-if="titleFlag === 'S'">
      <button type="button" class="btn_title" @click="fnCallLayerPop('SN')">
        <h1>새 게임</h1>
        <h4>새로운 시나리오와 인물을 선택하여 플레이합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallLayerPop('SC')" disabled>
        <h1>계속하기</h1>
        <h4>마지막 플레이 이력 : 없음</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallLayerPop('SL')" disabled>
        <h1>불러오기</h1>
        <h4>저장된 데이터 : 0개</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('on')">
        <h1>뒤로</h1>
      </button>
    </div>
    <div class="title_container" v-if="titleFlag === 'M'">
    </div>
    <div class="title_container" v-if="titleFlag === 'O'">
    </div>
    <!-- Data -->
    <div class="title_container" v-if="titleFlag === 'D'">
      <button type="button" class="btn_title" @click="fnCallSubMenu('DP')">
        <h1>인물</h1>
        <h4>인물 관련 정보를 검색합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallLayerPop('DS')">
        <h1>성계표</h1>
        <h4>성계 정보를 검색합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallLayerPop('GT')" disabled>
        <h1>함선</h1>
        <h4>함선 정보를 검색합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('on')">
        <h1>뒤로</h1>
      </button>
    </div>
    <div class="sub_layout_container" v-if="subMenuFlag" @click="fnCallSubMenu('')">
      <div class="sub_layout_btn_area" v-if="subMenuFlag === 'DP'">
        <button type="button" class="sub_layout_btn" @click="fnCallLayerPop('DPP')">
          <h1>캐릭터</h1>
          <h4>시나리오별 캐릭터 데이터입니다.</h4>
        </button>
        <button type="button" class="sub_layout_btn" @click="fnCallLayerPop('DPT')" disabled>
          <h1>특성</h1>
          <h4>공통 특성 데이터입니다.</h4>
        </button>


      </div>
    </div>



  </div>
</template>

<script>
import { tipMeta } from "@/assets/txt/tip.js";
import LayerPopNewGame from '@/components/layouts/mains/title/details/LayerPopNewGame.vue'
import LayerPopDicPerson from '@/components/layouts/mains/title/details/LayerPopDicPerson.vue'
import LayerPopDicStarzone from '@/components/layouts/mains/title/details/LayerPopDicStarzone.vue'

export default {
  name: 'layerTitle',
  components: {
    LayerPopNewGame,
    // LayerPopMultiGame,
    // LayerPopOption,
    LayerPopDicPerson,
    LayerPopDicStarzone,
  },
  props: {
    
  },
  data() {
    return {
      //title영역
      titleFlag : '',
      layerPop : '',
      layerPopName: '',
      //tip영역
      tipIdx: 0,
      tipTxt : '',
      //login영역
      isLogin : false,
      //subMenu
      subMenuFlag : '',
    };
  },
  mounted() {
    this.userData = this.$store.getters['storeUser/getCurrentUser'];
    this.fnStartTipRotation();
  },
  activated() {
  },
  beforeDestroy() {
    // 컴포넌트 파기 시에 Interval 정리
    clearInterval(this.tipRotationInterval);
  },
  methods : {
    //Tip처리
    fnStartTipRotation() {
      this.tipTxt = tipMeta[this.tipIdx];
      this.tipRotationInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * tipMeta.length);
        this.tipIdx = randomIndex !== this.tipIdx ? randomIndex : (randomIndex + 1) % tipMeta.length;
        this.tipTxt = tipMeta[this.tipIdx];
      }, 5000);
    },
    //LayerTitle영역에서 현재 선택된 title을 세팅한다.
    setTitleFlag(flg) {
      this.titleFlag = flg;
    },
    //LayerTitle영역에서 호출할 SubPopup을 세팅한다.
    fnCallLayerPop(flg) {
      console.info('fnCallLayerPop', flg)
      let layerName = ''
      switch (flg) {
        case 'SN': layerName = "LayerPopNewGame"; break;  //새 게임 호출
        case 'SC': layerName = ""; break;  //계속하기
        case 'SL': layerName = ""; break;  //계속하기
        case 'DS': layerName = "LayerPopDicStarzone"; break;  //계속하기
        case 'DPP': layerName = "LayerPopDicPerson"; break;  //계속하기
      
        default:
          break;
      }
      console.info(flg, layerName)

      this.layerPop  = layerName;
    },
    fnCallSubMenu(smId) {
      this.subMenuFlag = smId;
    },
    fnChangeMainLayer () {
      var id  = ''
      if(this.userData.isLogin) {
        id    = 'Main'
      } else {
        id    = 'Login'
      }
      this.$store.commit('storeMain/setLayer', id);
    },
  }
}
</script>
<style lang="scss" scoped>
// @import "@/assets/styles/components/layer/mains/LayerTitle.scss"
</style>
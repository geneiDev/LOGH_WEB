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
      <button type="button" class="btn_title" @click="setTitleFlag('G')" disabled>
        <h1>가이드</h1>
        <h4>게임을 진행하는데 있어 필요한 정보입니다.</h4>
      </button>
    </div>
    <div class="title_container" v-if="titleFlag === 'S'">
      <button type="button" class="btn_title" @click="fnCallNewGame()">
        <h1>새 게임</h1>
        <h4>새로운 시나리오와 인물을 선택하여 플레이합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('SC')" disabled>
        <h1>계속하기</h1>
        <h4>마지막 플레이 이력 : 없음</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('SL')" disabled>
        <h1>불러오기</h1>
        <h4>저장된 데이터 : 0개</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('on')">
        <h1>뒤로</h1>
      </button>
    </div>
  </div>
</template>

<script>
import { tipMeta } from "@/assets/txt/tip.js";
import LayerPopNewGame from '@/components/layer/commons/LayerPopNewGame.vue'

export default {
  name: 'layerTitle',
  components: {
    LayerPopNewGame,
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
    };
  },
  mounted() {
    this.userData = this.$store.getters['storeUser/getCurrentUser'];
    this.fnStartTipRotation();
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
      this.layerPop  = flg;
    },

    //새 게임 호출
    fnCallNewGame () {
      this.layerPop = "LayerPopNewGame";
    },





    fnChangeMainLayer () {
      var id  = ''
      if(this.userData.isLogin) {
        id    = 'Main'
      } else {
        id    = 'Login'
      }
      this.$store.commit('storeMain/setLayer', id);
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/components/layer/mains/LayerTitle.scss"
</style>
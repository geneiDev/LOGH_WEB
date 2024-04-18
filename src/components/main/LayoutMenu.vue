<template>
  <div class="body_layer">
    <div class="title_container" v-if="titleFlag === ''">
      <button type="button" class="btn_title" @click="setTitleFlag('S')">
        <h1>싱글플레이</h1>
        <h4>홀로 자유롭게 플레이할 수 있습니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('M')" disabled>
        <h1>멀티플레이</h1>
        <h4>시즌별로 진행하는 멀티플레이입니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('data')">
        <h1>데이터</h1>
        <h4>게임의 데이터 정보입니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('O')" disabled>
        <h1>환경 설정</h1>
        <h4>여러 환경요소를 설정합니다.</h4>
      </button>
    </div>
    <div class="title_container" v-if="titleFlag === 'S'">
      <button type="button" class="btn_title" @click="fnCallRouter('newGame')">
        <h1>새 게임</h1>
        <h4>새로운 시나리오와 인물을 선택하여 플레이합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallRouter('SC')" disabled>
        <h1>계속하기</h1>
        <h4>마지막 플레이 이력 : 없음</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallRouter('SL')" disabled>
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
    <div class="title_container" v-if="titleFlag === 'data'">
      <button type="button" class="btn_title" @click="fnCallSubMenu('dataPersonList')">
        <h1>인물</h1>
        <h4>인물 관련 정보를 검색합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallRouter('dataStarzone')">
        <h1>성계표</h1>
        <h4>성계 정보를 검색합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallRouter('GT')" disabled>
        <h1>함선</h1>
        <h4>함선 정보를 검색합니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="setTitleFlag('')">
        <h1>뒤로</h1>
      </button>
    </div>
    <div class="sub_layout_container" v-if="subMenuFlag" @click="fnCallSubMenu('')">
      <div class="sub_layout_btn_area" v-if="subMenuFlag === 'dataPersonList'">
        <button type="button" class="sub_layout_btn" @click="fnCallRouter('dataPerson')">
          <h1>캐릭터</h1>
          <h4>시나리오별 캐릭터 데이터입니다.</h4>
        </button>
        <button type="button" class="sub_layout_btn" @click="fnCallRouter('DPT')" disabled>
          <h1>특성</h1>
          <h4>공통 특성 데이터입니다.</h4>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// const axios = require('axios');
// import global from '@/common/utils/global';
import MessagePopup from '@/components/layouts/items/messagePopup.vue';

export default {
  name: 'layerTitle',
  components: {
    // ConfirmPopup,
  },
  props: {
    
  },
  mounted() {
    if(this.$route.params.titleFlag) {
      const flag = this.$route.params.titleFlag
      this.fnCheckRegisted(flag);
    }
  },
  data() {
    return {
      //title영역
      titleFlag : '',
      layerPop : '',
      layerPopName: '',
      //login영역
      isLogin : false,
      //subMenu
      subMenuFlag : '',
    };
  },
  methods : {
    //최초 화면에서 임시 계정 여부를 체크하고 관련 프로세스를 처리한다.
    fnCheckRegisted() {
      const userData = this.$store.getters['storeUser/getCurrentUser'];
      console.info(userData);
      if(!userData.isLogin && userData.tmpUser === 'Y') {
        this.$modal.show(MessagePopup, {
          // modal : this.$modal,
          title: '확인',
          text: '사용자 정보가 존재하지 않습니다.\n사용자 등록 화면으로 이동합니다.',
          time: 2,
        },
        {
          name: 'dynamic-modal',
          width : '100%',
          height : '130px',
          draggable: true,
        });
        this.titleFlag = 'on';
        this.fnCallRouter('user');
      } else if(userData.isLogin && userData.tmpUser === 'N') {
        //일일 로그인 포인트 지급 여부 확인


        this.$modal.show(MessagePopup, {
          // modal : this.$modal,
          title: '확인',
          text: '일일 로그인 포인트를 100 받았습니다.',
          time: 0,
        },
        {
          name: 'dynamic-modal',
          width : '100%',
          height : '130px',
          draggable: true,
        });

      }
    },
    //LayerTitle영역에서 현재 선택된 title을 세팅한다.
    setTitleFlag(flg) {
      this.titleFlag = flg;
    },
    //LayerTitle영역에서 호출할 SubPopup을 세팅한다.
    fnCallRouter(layerName) {
      this.$router.push({ name: layerName });
    },
    fnCallSubMenu(smId) {
      this.subMenuFlag = smId;
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "./LayoutMenu.scss";
</style>
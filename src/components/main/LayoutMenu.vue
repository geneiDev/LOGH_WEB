<template>
  <div class="body_layer">
    <div class="title_container">
      <button type="button" class="btn_title" @click="fnCallRouter('mainSingle')">
        <h1>싱글플레이</h1>
        <h4>홀로 자유롭게 플레이할 수 있습니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallRouter('mainMulti')" :disabled="!isLogin">
        <h1>멀티플레이</h1>
        <h4>시즌별로 진행하는 멀티플레이입니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallRouter('mainDic')">
        <h1>데이터</h1>
        <h4>게임의 데이터 정보입니다.</h4>
      </button>
      <button type="button" class="btn_title" @click="fnCallRouter('mainAchive')" :disabled="!isLogin">
        <h1>사용자 정보</h1>
        <h4>각종 플레이 이력을 확인합니다.</h4>
      </button>
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
    this.fnCheckRegisted();
  },
  computed: {
    isLogin() {
      const userData = this.$store.getters['storeUser/getCurrentUser'];
      return userData.isLogin;
    },
    routerName() {
      return this.$route.name;
    },
  },
  data() {
    return {
      
    };
  },
  methods : {
    //최초 화면에서 임시 계정 여부를 체크하고 관련 프로세스를 처리한다.
    fnCheckRegisted() {
      if(!this.isLogin) {
        this.$modal.show(MessagePopup, {
          // modal : this.$modal,
          title: '확인',
          text: '로그인이 되지 않았습니다.\n사용자의 정보가 유실될 수 있으며 각종 보상을 받을 수 없습니다.',
          time: 0,
        },
        {
          name: 'dynamic-modal',
          width : '100%',
          height : '130px',
          draggable: true,
        });
      }
      return;
    },



    fnCheckRegisted2() {
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
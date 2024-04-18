<template>
<div class="layer_header_menu">
  <div v-if="!userData.isLogin" class="login_info_container">
    <button class="login_button" @click="fnCallRouter('user')"><h1>로그인</h1></button>
  </div>
  <div v-else class="user_info_container">
    <div>
      포인트 : {{userData.points}}
    </div>
    <div>
      최근 플레이 : 플레이 이력 없음
    </div>
    <button class="login_button" @click="fnCallRouter('user')"><h1>정보수정</h1></button>
    <button class="login_button" @click="fnUserLogout()"><h1>로그아웃</h1></button>
  </div>
  <div class="option_info_container">
    <ul>
      <li>{{ userData.langType }}</li>
      <li>{{ userData }}</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</div>
</template>

<script>
import MessagePopup from '@/components/layouts/items/messagePopup.vue';
export default {
  props: {
    menuId  : {
      type    : String,
      required: false
    },
  },
  data() {
    return {
      userData : {
        isLogin : false,
        langType : '',
        lastLogin: '',
        userId : '',
        userName : '',
        userPic : '',
        points: 0,
      },
    };
  },
  mounted() {
    this.fnInitData();
  },
  methods : {
    async fnInitData() {
      this.userData = this.$store.getters['storeUser/getCurrentUser'];

    },
    fnCallRouter(layerName) {
      if(this.$parent.$refs.menu_check) {
        this.$parent.$refs.menu_check.click();
      }
      this.$router.push({ name: layerName });
    },
    fnUserLogout() {
      if(this.$parent.$refs.menu_check) {
        this.$parent.$refs.menu_check.click();
      }
      this.$modal.show(MessagePopup, {
        title: '확인',
        text: '로그아웃되었습니다.',
        time: 150,
      },
      {
        name: 'dynamic-modal',
        width : '100%',
        height : '130px',
        draggable: true,
      })

      this.$store.dispatch('storeUser/logout', { root: true });
      this.$router.push({ name: 'mainTitle' });
    },
  },

  

}
</script>

<style lang="scss" scoped>
  // @import "@/assets/styles/components/layer/commons/LayerHeaderMenu.scss"
.layer_header_menu {
  background-image: url("~@/assets/images/common/background/background.jpg");
  background-size: contain;
  max-width: 100vw;
  color: #c2daf7;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: calc(100vh - 6rem);
  .login_info_container {
    flex: 1;
    width: 100vw;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 6rem;
    .login_button {
      position: relative;
      color: #c2daf7;
      box-shadow: 0 0 0 2px #c2daf7;
      border-radius: 0.5em;
      margin : 0.8rem;
      background-color: rgb(0, 0, 0, 0);
      width:80%;
      height: 4.5rem;
    }
  }
  .option_info_container {
    flex: 6;
    width: 96vw;
    background-color: rgb(8, 6, 6);
    overflow-y: hidden;
    border: 0.2em solid blueviolet;
    margin : 0.8rem;
  }
}



  // div {
  //   flex: 1;
  //   width: 100vw;
  //   padding: 1.3rem;
  // }
  // ul {
  //   flex: 1;
  //   list-style-type: none;
  //   margin: 0;
    
  //   li {
  //     width: 100%;
  //     border-bottom: 0.2em solid gray;
  //   }
  // }

</style>
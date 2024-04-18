<template>
<div class="body_layer">
  <div class="title_container" @click="fnCallRouterMain()">
    <span style="margin-top:1px;margin-bottom:2rem"><span style="font-weight:bold">{{userData.userName}}</span> 님 반갑습니다.</span>
    <h1 class="blinking">화면을 터치해주세요.</h1>
  </div>
</div>
</template>

<script>
import ConfirmPopup from '@/components/layouts/items/confirmPopup.vue';
export default {
  name: 'routeMain',
  components: {
  },
  props: {
    
  },
  data() {
    return {
      userData : {},
    };
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  mounted() {
    this.userData = this.$store.getters['storeUser/getCurrentUser'];
  },
  methods : {
    fnCallRouterMain() {
      const that = this;
      // 로그인 체크 후 이후 로직 진행
      if(this.userData.isLogin) {
        this.$router.push({ name: 'mainMenu' });
        return;
      }
      this.$modal.show(ConfirmPopup, {
        modal : this.$modal,
        title: '확인',
        text: `사용자 정보가 존재하지 않습니다.\n회원가입을 하시겠어요?`,
        buttons: [
          {
            title: '예',
            func: () => {
              that.$router.push({ name: 'user' });
            }
          },
          {
            title: '아니오',
            func: () => {
              that.$router.push({ name: 'mainMenu' });
            }
          }
        ]
      },
      {
        name: 'dynamic-modal',
        width : '100%',
        height : '130px',
        draggable: true,
      });
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "./LayoutMenu.scss";
</style>
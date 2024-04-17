<template>
<div class="user_main_template">
  <div v-if="!isLogin" class="button_container">
    <div class="login_area">
      <div class="login_area_title">
        <h2>기존 사용자로 로그인합니다.</h2>
      </div>
      <div class="login_info">
        <div class="login_input_area">
          <input type="text" class="login_input" placeholder="ID" id="genei_id" v-model="userId" autocomplete="off">
          <input type="password" class="login_input" placeholder="PASSWORD" id="genei_pwd" v-model="userPwd" autocomplete="off">
        </div>
        <div class="login_button_area">
          <button type="button" class="login_button" @click="fnCallLogin()"></button>
          <button type="button" class="find_id_button" @click="fnCallLogin()"></button>
        </div>
      </div>
      <div class="sns_info">
        <button type="button" class="btn_sns kakao" value="K"><span>카카오톡으로 로그인</span></button>
        <button type="button" class="btn_sns naver" value="N"><span>네이버로 로그인</span></button>
      </div>
      <span class="login_options">
        <span>
          <input type="checkbox" id="autoLogin">
          <label for="autoLogin" class="label">자동 로그인</label>
        </span>
        <span class="label">아이디/비밀번호 찾기</span>
      </span>
    </div>
    <div class="regist_area">
      <div class="login_area_title">
        <h2>신규 사용자 정보를 등록합니다.</h2>
      </div>
      <button type="button" class="btn_regist" @click="fnCallRouter('userInfo')">
        <h1>사용자 등록</h1>
      </button>
    </div>
  </div>
  <div v-if="isLogin" class="button_container">
    aaa
  </div>
</div>
</template>
<script>

const axios = require('axios');
import global from '@/common/utils/global';

export default {
  name: 'userMain',
  components: {
  },
  props: {
      
  },
  data() {
    return {
      isLogin : false,
      userId : '',
      userPwd : '',
    };
  },
  mounted() {
    const userData = this.$store.getters['storeUser/getCurrentUser'];
    console.info(userData)
    if(!userData.isLogin) {
      this.userId = userData.userId||'';
    }
  },
  methods : {
    //LayerTitle영역에서 호출할 SubPopup을 세팅한다.
    fnCallRouter(layerName) {
      this.$router.push({ name: layerName });
    },
    async fnCallLogin() {
      let {userId, userPwd} = '';
      userId = this.userId;
      userPwd = this.userPwd;
      if(!userId) {
        return;
      }
      if(!userPwd) {
        return;
      }
      const userParam = { 
        userId, 
        userPwd 
      }
      const response = await axios.post(`${global.CONST.API_URL}/user/login`, userParam);
      const userData = response.data.user||undefined;
      if(userData) {
        this.$store.dispatch('storeUser/login', response.data.user, { root: true });
      }

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./LayerUserMain.scss";
</style>
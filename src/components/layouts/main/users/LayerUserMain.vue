<template>
<div>
  <div v-if="!isLogin" class="button_container">
    <div class="login_area">
      <div class="login_area_title">
        <!-- <h1>로그인</h1> -->
        <h4>기존 사용자로 로그인합니다.</h4>
      </div>
      <div class="login_info">
        <div class="login_input_area">
          <input type="text" class="login_input" placeholder="ID" id="genei_id" v-model="userId" autocomplete="off">
          <input type="password" class="login_input" placeholder="PASSWORD" id="genei_pwd" v-model="userPwd" autocomplete="off">
        </div>
        <div class="login_button_area">
          <button type="button" class="find_id_button" @click="fnCallLogin()"></button>    
          <button type="button" class="login_button" @click="fnCallLogin()"></button>    
        </div>
      </div>
      <span>
        <!-- <span class="label"><input type="checkbox">자동 로그인</span> -->
        <!-- <span class="label">아이디/비밀번호 찾기</span> -->
      </span>
      
      
      <div class="sns_info">
        <button type="button" class="btn_sns kakao" value="K"><span>카카오톡으로 로그인</span></button>
        <button type="button" class="btn_sns naver" value="N"><span>네이버로 로그인</span></button>
      </div>
    </div>
    <div class="regist_area">
      <button type="button" class="btn_regist" @click="fnCallRouter('userInfo')">
        <h1>사용자 등록</h1>
        <h4>신규 사용자 정보를 등록합니다.</h4>
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
      console.info(response)

    }
  }
}
</script>

<style lang="scss" scoped>
.button_container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding-top: 5%;
  padding-bottom: 5%;
  max-width: 100vw;
  .login_area {
    color: #c2daf7;
    width: 100vw;
    flex: 1;
    background-color: rgba(255, 255, 255, 0);
    .login_area_title {
      padding: 1.5rem;
    }
    .login_info {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 10rem;
      .login_input_area {
        position: relative;
        display: flex;
        height: 100%;
        flex-direction: column;
        .login_input {
          flex: 1;
          margin: 0.5rem;
          display: flex;
          font-size: 1.6rem;
        }
      }
      .login_button_area {
        position: relative;
        // background-color: blue;
        flex : 1;
        height: 100%;
        .find_id_button {
          background: url("~@/assets/images/common/icon/btnPersonSearch.png");
          background-size: cover;
          height: 5rem;
          width: 100%;
          // color: #c2daf7;
          flex: 1;
          filter: invert(100%);
          background-color: rgba(255, 255, 255, 0);
        }
        .login_button {
          background: url("~@/assets/images/common/icon/btnLogin.png");
          background-size: cover;
          height: 5rem;
          width: 100%;
          // color: #c2daf7;
          flex: 1;
          filter: invert(100%);
          background-color: rgba(255, 255, 255, 0);
        }
      }
      
    }
    .label {
      margin: 2rem;

    }
    .sns_info {
      flex: 1;
      .btn_sns {
        margin: 0.5rem;
        background-size: contain;
        width: 65px;
        height: 65px;
        background: url("~@/assets/images/common/icon/icoLoginBtn.png") no-repeat ;
        border-radius: 25%;
        background-size: 35px;
        span {
          display: none;
        }
        &.kakao {
          background-position: 14px -58px;
          background-color: gray;
        }
        &.kakao.on {
          background-position: 14px -58px;
          background-color: #ffe53d;
        }
        &.naver {
          background-position: 14px -128px;
          background-color: gray;
        }
        &.naver.on {
          background-position: 14px -128px;
          background-color: #00dc44;
        }
      }
    }
  }
  .btn_regist {
    color: #c2daf7;
    width: 80vw;
    flex: 1;
    border: 1px solid;
    background-color: rgba(255, 255, 255, 0);
  }
  
}

  </style>
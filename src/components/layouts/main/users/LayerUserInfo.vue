<template>
  <div class="body_layer">
    <div class="user_info_section">
      <ul class="user_info_row">
        <li class="user_info_header">닉네임</li>
        <li class="user_info_col">{{ userData.userName }}<i/></li>
      </ul>
      <ul class="user_info_row">
        <li class="user_info_header">LOGIN ID</li>
        <li class="user_info_col">{{ userData.userId }}</li>
      </ul>
      <ul class="user_info_row">
        <li class="user_info_header">비밀번호</li>
        <li class="user_info_col">********</li>
      </ul>
      <ul class="user_info_row">
        <li class="user_info_header">이미지</li>
        <li class="user_info_col"></li>
      </ul>
      <ul class="user_info_row">
        <li class="user_info_header">연결</li>
        <li class="user_info_col"></li>
      </ul>
    </div>
    
    <div class="login_bot">


    </div>

    <!-- <div class="login_bot">
      <ul class="login_btn_group">
        <li id="FirstLogin">
          <button type="button" class="btn_base kakao" value="K"><span>카카오톡으로 로그인</span></button>
          <button type="button" class="btn_base naver" value="N"><span>네이버로 로그인</span></button>
          <button type="button" class="btn_base facebook" value="F"><span>페이스북으로 로그인</span></button>
        </li>
        <li id="SecondLogin">
          <button type="button" class="btn_base email" value="E"><span>이메일로 로그인</span></button>
          <button type="button" class="btn_base phone" value="P"><span>휴대폰으로 로그인</span></button>
          <button type="button" class="btn_base apple" value="A"><span>애플계정으로 로그인</span></button>
        </li>
      </ul>
    </div>
		<div class="login_bot">
			<p class="notice"><a href="" class="link" id="AccSearch">혹시, 계정이 없으신가요? 회원가입</a></p>
			<p class="notice"><a href="" class="link" id="AccSearch">혹시, 계정을 잊어버리셨나요? 계정찾기</a></p>
		</div> -->
    {{ currentUser }}
	</div>
</template>

<script>

export default {
  name: 'userInfo',
  computed: {
    currentUser() {
      return this.$store.getters['storeUser/getCurrentUser'];
    },
  },
  data() {
    return {
      userData : {},
    };
  },
  props: {
    
  },
  mounted() {
    console.info(this.currentUser.lastLogin);
    this.userData = this.currentUser;
  },
}
</script>

<style lang="scss" scoped>
.body_layer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top : 1rem;
  margin-bottom : 1rem;
  .user_info_section {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    .user_info_row {
      position: relative;
      width: 98%;
      border: 2px solid #3498db;
      display: flex;
      align-items: center;
      margin-top: 1rem;
    }
    .user_info_header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.6rem;
      border: 1px solid #3498db;
      font-size: 1.2rem;
      font-weight: bold;
      flex: 1;
      max-width: 30%;
    }
    .user_info_col {
      position: relative;
      display: flex;
      max-width: 70%;
      flex: 1;
      font-size: 1.6rem;
      align-items: center;
      justify-content: center;
    }
    
    .user_info_text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.6rem;
      flex-grow: 1; /* 동일한 비율로 확장 */
    }
  }



  .login_bot {
    margin: auto;
  }
  
  .login_btn_group {
    width:90vw;
    li + li {
      margin-top: 1rem;
    }
  }
  
  .btn_base {
    background-size: contain;
    width: 65px;
    height: 65px;
    background: url("~@/assets/images/common/icon/icoLoginBtn.png") no-repeat ;
    border-radius: 25%;
    background-size: 35px;
    // display: flex;
    // flex-direction: column;

    span {
      display: none;
    }

    &.kakao {
      background-position: 14px -58px;
      background-color: #ffe53d;
    }
    &.naver {
      background-position: 14px -128px;
      background-color: #00dc44;
    }
    &.facebook {
      background-position: 14px -204px;
      background-color: #315aa0;
    }
    &.email {
      background-position: 14px -275px;
      background-color: #6bb2ff;
    }
    &.phone {
      background-position: 14px 14px;
      background-color: #4385f0;
    }
    &.apple {
      background-position: 14px -350px;
      background-color: #ffffff;
    }
  }
  
  .btn_base + .btn_base {
    margin-left: 5vw;
  }
}
</style>
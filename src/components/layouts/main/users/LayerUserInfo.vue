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
        <li class="user_info_col">
          <div class="profile_img" v-if="userData.userPic">
            <genei-img-area :imgSrc="userData.userPic"/>
          </div>
        </li>
      </ul>
      <ul class="user_info_row">
        <li class="user_info_header">SNS연동</li>
        <li class="user_info_col">
          <button type="button" class="btn_base kakao" value="K"><span>카카오톡으로 로그인</span></button>
          <button type="button" class="btn_base naver" value="N"><span>네이버로 로그인</span></button>
          <button type="button" class="btn_base facebook" value="F"><span>페이스북으로 로그인</span></button>
        </li>
      </ul>
      <div class="login_btn_group">
        <button type="button" class="ctl_common"><h1>저장</h1></button>
        <button type="button" class="ctl_common"><h1>초기화</h1></button>
      </div>
    </div>
	</div>
</template>

<script>
import GeneiImgArea from '@/components/layer/utils/geneiImgArea'
export default {
  components: {
    GeneiImgArea
  },
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
    // console.info(this.currentUser.lastLogin);
    this.userData = this.currentUser;
  },
  methods : {

  },
}
</script>

<style lang="scss" scoped>
.user_info_section {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  top: 0;
  .user_info_row {
    position: relative;
    width: 98%;
    border: 2px solid #3498db;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    flex: 1;
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
    .profile_img {
			height: 9.5vh;
			width: 4.5rem;
			border: 2px solid white;
			margin: 0.2rem;
		}
  }
  .login_btn_group {
    flex: 1;
    margin-top: 8px;
    position: relative;
    bottom: 0;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
    flex-shrink: 0;
    width: 98%;
    align-items: center;
    border: 2px solid #3498db;
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
      max-height: 2.5rem;
    }
  }
}
.btn_base {
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
  &.facebook {
    background-position: 14px -204px;
    background-color: gray;
  }
  &.facebook.on {
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
</style>
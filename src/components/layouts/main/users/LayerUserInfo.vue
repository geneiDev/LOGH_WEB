<template>
<div class="body_layer">
  <div class="user_info_section">
    <ul class="user_info_row" @click="fnChangeTmpUserData('userName')">
      <li class="user_info_header">닉네임</li>
      <li class="user_input_area">
        <input type="text" class="user_info_input" :placeholder="tmpUserData.userName">
      </li>
    </ul>
      <ul class="user_info_row">
        <li class="user_info_header">LOGIN ID</li>
        <li class="user_input_area" v-if="tmpUserData.tmpUser === 'Y'">
          <input type="text" class="user_info_input" v-model="tmpUserData.userId" :placeholder="tmpUserData.userId">
        </li>
        <li class="user_info_col" v-else>
          {{tmpUserData.userId}}<i/>
        </li>
      </ul>
      <ul class="user_info_row">
        <li class="user_info_header">비밀번호</li>
        <li class="user_info_col">********</li>
      </ul>
      <ul class="user_info_row" v-if="tmpUserData.tmpUser === 'Y'">
        <li class="user_info_header">대표이미지</li>
        <li class="user_info_col">
          <div class="profile_img" v-if="tmpUserData.userPic">
            <genei-img-area :imgSrc="tmpUserData.userPic"/>
          </div>
        </li>
      </ul>
      <ul class="user_info_row">
        <li class="user_info_header">SNS연동</li>
        <li class="user_info_col">
          <button type="button" class="btn_base kakao" value="K"><span>카카오톡으로 로그인</span></button>
          <button type="button" class="btn_base naver" value="N"><span>네이버로 로그인</span></button>
        </li>
      </ul>
      <div class="login_btn_group" v-if="tmpUserData.tmpUser === 'Y'">
        <button type="button" class="ctl_common" @click="fnUpdateUserData"><h1>승인</h1></button>
        <button type="button" class="ctl_common" @click="fnClosePage()"><h1>취소</h1></button>
      </div>
      <div class="login_btn_group" v-else>
        <button type="button" class="ctl_common" @click="fnUpdateUserData"><h1>저장</h1></button>
        <button type="button" class="ctl_common"><h1>초기화</h1></button>
      </div>
    </div>
    <div class="modify_area" :class="currentData ? 'on' : ''">
      <div v-if="currentData === 'userName'">
        <h1>닉네임 변경</h1>
        <h3>닉네임은 한글/영어/숫자로만 작성 가능합니다.</h3>
        <div>
          <input type="text" class="modify_input" v-model="tmpUserData.userId" :placeholder="tmpUserData.userName">
        </div>
        <button type="button" class="ctl_common" @click="fnUpdateTmpUserData"><h1>확인</h1></button>
        <button type="button" class="ctl_common" @click="fnChangeTmpUserData()"><h1>취소</h1></button>
      </div>
    </div>
</div>
</template>

<script>
const axios = require('axios');
import global from '@/common/utils/global';

import GeneiImgArea from '@/components/layer/utils/geneiImgArea'
import ConfirmPopup from '@/components/layouts/items/confirmPopup.vue';

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
      currentData : '',
      tmpUserData : {},
    };
  },
  props: {
    
  },
  mounted() {
    this.tmpUserData = { ...this.currentUser };
  },
  methods : {
    //닉네임을 바꾸기 위한 POP_UP창을 호출한다.
    fnChangeTmpUserData(current) {
      this.currentData = current
    },
    fnUpdateTmpUserData() {

    },
    fnClosePage() {
      this.$router.push({ name: 'user' });
    },


    // fnChangeUserName() {
    //   console.info('fnChangeUserName');
    //   const that = this;
    //   this.$modal.show(ConfirmPopup, {
    //     modal : this.$modal,
    //     title: '확인',
    //     text: `slr`,
    //     buttons: [
    //       {
    //         title: '예',
    //         func: () => {
    //           that.$router.push({ name: 'user' });
    //         }
    //       },
    //       {
    //         title: '아니오',
    //         func: () => {
    //           that.$router.push({ name: 'mainMenu' });
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     name: 'dynamic-modal',
    //     width : '100%',
    //     height : '130px',
    //     draggable: true,
    //   });
    // },





    fnChangeUserName2() {
      //.replace(/[^a-zA-Z0-9]/g, '');
      let tmpUserName = this.tmpUserName.replace(/[^a-zA-Z0-9가-힣]/g, '');
      this.tmpUserName = tmpUserName;
    },
    async fnUpdateUserData() {
      const userParam = this.userData;
      const tmpMessage = this.userData.TMP_USER === 'Y' ? '' : '정규 사용자로 등록하고\n';
      async function saveUserData() {
        userParam.TMP_USER = 'N';

        const response = await axios.post(`${global.CONST.API_URL}/user/update`, userParam);
        console.info(response)
      } 

      this.$modal.show(ConfirmPopup, {
          modal : this.$modal,
          title: '확인',
          text: `${tmpMessage}사용자 데이터를 저장합니다.`,
          buttons: [
            {
              title: '확인',
              handleConfirm: () => {
                saveUserData();
              }
            },
            {
              title: '취소',
              handleCancel: () => {
                
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
  },
  
}
</script>

<style lang="scss" scoped>
.ctl_common {
  flex: 1;
  border-radius: 0.1em;
  margin: 1.4rem;
  color: gray;
  background-color: rgba(0, 0, 0, 1);
  box-shadow: 0 0 0 2px #c2daf7;
  border-radius: 0.5em;
  color: #c2daf7;
  max-height: 2.5rem;
}
.modify_area {
  position: absolute;
  top : 0;
  width: 100%;
  height: 0;
  z-index: 120;
  display: none;
  &.on {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    .modify_input {
      font-size: 1.6rem;
      flex: 1;
      flex-grow: 1;
      max-width: 80%;
    }
  }
}
.user_info_section {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 100;
  .user_info_row {
    position: relative;
    width: 98%;
    border: 2px solid #3498db;
    display: flex;
    align-items: center;
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
      flex-direction: row;
      max-width: 70%;
      flex: 1;
      font-size: 1.6rem;
      align-items: center;
      justify-content: center;
    }
    .user_input_area {
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: 70%;
      flex: 1;
      font-size: 1.6rem;
      align-items: center;
      justify-content: center;
      .user_info_input {
        font-size: 1.6rem;
        flex: 1;
        flex-grow: 1;
        max-width: 80%;
        text-align: center;
      }
      .user_info_msg {
        flex: 1;
        font-size: 1.2rem;
        min-height: 1.2rem;
        color: red;
      }
    }
    .user_info_text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.6rem;
      flex-grow: 1;
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
    position: relative;
    bottom: 0;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
    flex-shrink: 0;
    width: 98%;
    align-items: center;
    border: 2px solid #3498db;
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
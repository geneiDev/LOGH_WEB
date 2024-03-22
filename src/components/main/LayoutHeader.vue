<!-- LayoutHeader.vue 
    @DESC : 사용자의 정보를 출력한다.
-->
<template>
  <div class="layout_header">
    <div class="preloader_div" v-if="!preloader">
      <div class="preloader_text" v-for="row in preloader_text" :key="row.rn">{{ row.text }}</div>
      <div v-for="errRow in preloaderErr" :key="errRow.ERR_CODE">
        <button @click="preloader = true">{{errRow.TEXT}}</button>
      </div>
    </div>
    <div class="profile_container">
      <div class="profile_img">
        <genei-img-area :imgSrc="userData.userPic"/>
      </div>
      <ul class="profile_data_container">
        <li class="profile_data"><h3>{{ userData.userName }}</h3></li>
        <li class="system_text" @click="fnShowSystemTextDetail()">
          <h5 class="text-center" v-if="tipLogs.length > 0"> {{ tipLogs[tipLogs.length - 1].text || '' }} </h5>
        </li>
      </ul>
      <div class="system_detail" ref="system_detail">
        <div v-for="tip in tipLogs" :key="tip.idx">
          <div :class="`system_text ${tip.flag}`" @click="fnClickSystemDetail(tip)">
            <i /><span class="text">{{tip.text}}</span>
          </div>
          <!-- <div v-else>
            <h5 class="text-center">{{tip}}</h5>
          </div> -->
        </div>
      </div>
      <div class="btn_menu">
        <input class="menu-check" type="checkbox" id="menu-check" ref="menu_check"/>
        <label class="menu-icon" for="menu-check">
          <span class="menu-sticks"></span>
        </label>
        <div class="menu">
          <layer-header-menu :menuId="headerMenuId"></layer-header-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');
  import { mapState } from 'vuex';
  import global from '@/common/utils/global';
  // import isEqual from 'lodash/isEqual';

  import { tipMeta } from "@/assets/txt/tip.js";
  import LayerHeaderMenu from '@/components/layer/commons/LayerHeaderMenu.vue'
  import GeneiImgArea from '@/components/layer/utils/geneiImgArea'

  export default {
    components: {
      LayerHeaderMenu,
      GeneiImgArea
    },
    data() {
      return {
        isLogin : false,
        isHeaderVisible: false,
        
        userData : {
          isLogin : false,
          langType : '',
          lastLogin: '',
          userId : '',
          userName : '',
          userPic : '',
          points: 0,
        },
        preloaderErr : [],
        preloader : false,
        preloader_text : [],

        //header의 popup형 subMenu
        headerMenuId : '',

        //tip영역
        tipDelay : 30000,
        tipIdx: 0,
        tipLogs : [],
      };
    },
    computed: {
      ...mapState('storeInfo', ['systemMsg']), // Vuex store의 systemMsg 상태를 가져옴
    },
    watch: {
      systemMsg: {
        handler(newMsg) {
          this.tipLogs = newMsg;
        },
        deep: true
      },
    },
    mounted() {
      this.fnAddSystemText('접속을 환영합니다.', 'msg');
      this.fnStartTipRotation();
      this.fnInitData();
    },
    methods : {
      async fnInitData() {
        let validInit = true;
        validInit = await this.fnGetUserData();
        if(validInit) {
          this.userData = this.$store.getters['storeUser/getCurrentUser'];
          if(this.userData.isLogin) {
            console.info('로그인됨.', this.userData)
            if(this.userData.tmpUser === 'N') {
              //asdf
            } else {
              this.fnAddSystemText('임시 사용자입니다.\n로그인 정보를 등록해주세요.', 'err');
            }
          } else {
            this.fnAddSystemText('서버에 접속할 수 없습니다.', 'err');
          }
        }
        await this.fnInitTraitData();
        await this.fnInitSheepsData();
        await this.fnInitScenarioData();
        // await this.fnInitStarzoneData();

        console.info(`사소한 결함 코드들(${this.preloaderErr.length}):`, this.preloaderErr);
        console.info('치명적인 결함 없음: ', validInit);
        if(validInit) {
          await this.fnInitializeEnds();
        }
      },
      /** SystemMessage 영역 처리 */
      // 영역 확장 및 축소
      fnShowSystemTextDetail() {
        const systemDetail = this.$refs.system_detail;
        const hasOnClass = systemDetail.classList.contains('on');
        if (!hasOnClass) {
          systemDetail.classList.add('on');
        } else {
          systemDetail.classList.remove('on');
        }
      },
      // 확장 영역 클릭
      fnClickSystemDetail(info) {
        //클릭시 detail정보가 존재하면 popup으로 detail정보를 오픈한다.
        console.info(info);
      },
      async fnAddSystemErr (err) {
        console.info(err)
        const errorInfo = global.errorHandler(err)
        this.preloaderErr.push({
          RN : (this.preloaderErr.length),
          ERR_CODE : errorInfo.code,
          TEXT : `SERVER ERROR ${errorInfo.text}`,
          DETAIL_INFO : errorInfo.detailInfo,
        });
        // this.tipLogs.push({
        //   type : 'error',
        //   idx : this.tipLogs.length,
        //   text : errorInfo.text,
        //   detailInfo : errorInfo.detailInfo,
        // });
      },
      fnAddSystemText(text, flag, event) {
        if(!flag) flag = 'msg'
        if(!text) return;
        const msg = {
          text, flag, event
        }
        this.$store.dispatch('storeInfo/addSystemMsg', msg, { root: true });
      },



      fnStartTipRotation() {
        
        this.tipRotationInterval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * tipMeta.length);
          this.tipIdx = randomIndex !== this.tipIdx ? randomIndex : (randomIndex + 1) % tipMeta.length;
          this.fnAddSystemText(tipMeta[this.tipIdx], 'tip');
        }, this.tipDelay);
      },
      async fnAddPreloaderMsg (text, rn) {
        if(!rn) rn = this.preloader_text.length;
        this.preloader_text.push({ rn, text }) 
        return rn;
      },

      

      /** @DESC : 로컬스토리지에서 사용자 정보를 체크한다.  */
      async fnGetUserData() {
        const that    = this;
        const os      = this.$store.getters['storeUser/getOS'];
        await this.fnAddPreloaderMsg(`OS정보 : ${os}`);

        const browser = this.$store.getters['storeUser/getBrowser'];
        await this.fnAddPreloaderMsg(`브라우져 정보 : ${browser}`);

        const uuid    = this.$store.getters['storeUser/getUUID'];
        if(!uuid || uuid.length !== 36) {
          await this.fnAddPreloaderMsg('\n※고유 키 체크 중 오류가 발생했습니다.');
          await this.fnAddPreloaderMsg('에러 정보 송신 중.');
          await this.fnAddPreloaderMsg('재접속하시거나 다른 브라우져를 이용해주세요.');
          return false;
        }
        await this.fnAddPreloaderMsg('\n사용자 정보를 받는중');
        const userId  = localStorage.getItem('userId') || '';
        const userPwd = localStorage.getItem('userPwd') || '';
        const API_URL = global.CONST.API_URL;
        const loginParam = { uuid, userId, userPwd }
        async function fetchDataFromApi() {
          try {
            const response = await axios.post(`${API_URL}/user/isRegisted`, loginParam);
            if(response.data.result === 'Y' && response.data.user) {
              const userData = response.data.user
              userData.IS_LOGIN = true;
              await that.fnAddPreloaderMsg(`※ 로그인되었습니다. ${userData.TMP_USER === 'Y' ? '\n(임시 사용자입니다.)' : ''}`);
              that.$store.dispatch('storeUser/login', userData, { root: true });
              return true;
            } else {
              await that.fnAddPreloaderMsg('※ 고유 키 체크 중 오류가 발생했습니다.');
              await that.fnAddPreloaderMsg('에러 정보 송신 중.');
              await that.fnAddPreloaderMsg('재접속하시거나 다른 브라우져를 이용해주세요.');
              return false;
            }
          } catch (error) {
            console.info('error', error)
            await that.fnAddSystemErr('SE001');
            const userData = {
              IS_LOGIN    : false,
              LANG_TYPE   : 'KR',
              LAST_LOGIN  : 'X',
              USER_ID     : '',
              USER_NAME   : `로컬-${loginParam.uuid.substr(0,8)}`,
              USER_PIC    : '/images/person/CH_000000.png',
              POINT       : '획득불가',
              UUID        : loginParam.uuid,
            }
            that.$store.dispatch('storeUser/login', userData, { root: true });
            return true;
          }
        }
        const rst = await fetchDataFromApi();
        return rst;
      },
      
      
      //특성 데이터
      async fnInitTraitData() {
        this.fnAddPreloaderMsg('공통 특성 데이터 로딩 중');
        this.$store.commit('storeInfo/createTraitList');
        const traitList = await this.$store.getters['storeInfo/getTraitList'];
        this.fnAddPreloaderMsg(`:총 ${traitList.length}건의 특성 데이터\n`);
      },
      //함선 데이터
      async fnInitSheepsData() {
        this.fnAddPreloaderMsg('공통 함선 데이터 로딩 중');
        this.$store.commit('storeInfo/createSheepList');
        const sheepList = this.$store.getters['storeInfo/getSheepList'];
        this.fnAddPreloaderMsg(`:총 ${sheepList.length}건의 함선 데이터\n`);
      },

      async fnInitScenarioData() {
        this.fnAddPreloaderMsg('시나리오 데이터 로딩 중');
        this.$store.commit('storeScene/createScenarioList');
        const scenarioList = this.$store.getters['storeScene/getScenarioList'];
        this.fnAddPreloaderMsg(`>총 ${scenarioList.length}건의 시나리오 데이터\n`);
      },
      async fnInitStarzoneData() {
        this.fnAddPreloaderMsg('기본 시나리오의 성계 지도를 가져오는 중');
        this.$store.commit('storeScene/createStarzoneList');
        const starzoneList = this.$store.getters['storeScene/getStarzoneList'];
        this.fnAddPreloaderMsg(`>총 ${starzoneList.length}건의 성계 데이터\n`);
      },
      async fnInitCharacterData() {
        this.fnAddPreloaderMsg('기본 시나리오의 등장 인물들을 가져오는 중');
        await this.$store.commit('storeScene/createCharacterList', 'T1');
        await new Promise(resolve => setTimeout(resolve, 0));
        const charData = this.$store.getters['storeScene/getCharacterList'];
        await this.fnAddPreloaderMsg(`>총 ${charData.length}건의 인물 데이터\n`);
      },
      async fnInitializeEnds() {
        if(this.preloaderErr.length > 0) {
          this.fnAddPreloaderMsg('이슈가 존재합니다.');
        }
        this.fnAddPreloaderMsg('\n데이터 초기화 완료');
        let cnt = 3;
        // 3, 2, 1을 systemMsg에 추가하는 로직
        const countDownInterval = setInterval(() => {
          if (cnt > 0) {
            this.fnAddPreloaderMsg(`${cnt}초 후 초기화 모듈 종료합니다.`);
            cnt--;
          } else {
            clearInterval(countDownInterval); // 카운트다운 종료
            if(this.preloaderErr.length > 0) {
              this.fnAddPreloaderMsg('\n초기화 중 이슈가 발생했습니다.');
              this.fnAddPreloaderMsg('이슈를 확인 후 진행하세요.');
            } else {
              this.preloader = true; // 3초 후에 preloader 값을 변경
            }

          }
        }, 1000);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "./LayoutHeader.scss";
</style>
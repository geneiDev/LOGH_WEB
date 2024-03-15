<!-- LayoutHeader.vue 
    @DESC : 사용자의 정보를 출력한다.
-->
<template>
  <div class="layout_header">
    <div class="preloader_div" v-if="!preloader">
      <!-- <div class="preloader_uuid">GUEST ID :<br>{{this.$store.getters['storeUser/getUUID']}}</div> -->
      <div class="preloader_text" v-for="row in preloader_text" :key="row.rn">{{ row.text }}</div>
    </div>
    <div class="profile_container">
      <div class="profile_img">
        <genei-img-area :imgSrc="userData.pic"/>
      </div>
      <ul>
        <li class="profile_data"><h3>{{ userData.name }}</h3></li>
        <li class="profile_data"><h3>{{ userData.points }} PT</h3></li>
      </ul>
      <div class="btn_menu">
        <input class="menu-check" type="checkbox" id="menu-check" />
        <label class="menu-icon" for="menu-check">
          <span class="menu-sticks"></span>
        </label>
        <div class="menu">
          <div>
            <layer-header-menu></layer-header-menu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');
  import global from '@/common/utils/global';
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
          isLogin: false,
          lastLogin: '',
          uuid : '',
          userId: '',
          userPwd: '',
          name: '',
          langType : '',
          pic: '',
          points: 0,
        },
        preloaderErr : [],
        preloader : false,
        preloader_text : [],
      };
    },
    watch: {

    },
    mounted() {
      this.fnInitData();
    },
    methods : {
      async fnInitData() {
        let validInit = true;
        validInit = await this.fnGetUserData();
        // await this.fnInitTraitData();
        // await this.fnInitSheepsData();
        // await this.fnInitScenarioData();
        // await this.fnInitStarzoneData();
        // await this.fnInitCharacterData();

        console.info('사소한 결함 : ', this.preloaderErr);
        console.info('치명적인 결함 : ', validInit);
        if(validInit) {
          await this.fnInitializeEnds();
        }
      },
      async fnAddSystemMsg (text, rn) {
        if(!rn) rn = this.preloader_text.length;
        this.preloader_text.push({ rn, text }) 
        return rn;
      },
      /** @DESC : 로컬스토리지에서 사용자 정보를 체크한다.  */
      async fnGetUserData() {
        const that    = this;
        const os      = this.$store.getters['storeUser/getOS'];
        await this.fnAddSystemMsg(`OS정보 : ${os}`);

        const browser = this.$store.getters['storeUser/getBrowser'];
        await this.fnAddSystemMsg(`브라우져 정보 : ${browser}`);

        const uuid    = this.$store.getters['storeUser/getUUID'];
        if(!uuid || uuid.length !== 36) {
          await this.fnAddSystemMsg('\n※고유 키 체크 중 오류가 발생했습니다.');
          await this.fnAddSystemMsg('에러 정보 송신 중.');
          await this.fnAddSystemMsg('재접속하시거나 다른 브라우져를 이용해주세요.');
          return false;
        }
        await this.fnAddSystemMsg('\n사용자 정보를 받는중');
        const userId  = localStorage.getItem('userId') || '';
        const userPwd = localStorage.getItem('userPwd') || '';
        const API_URL = global.CONST.API_URL;
        const loginParam = { uuid, userId, userPwd }
        async function fetchDataFromApi() {
          try {
            const response = await axios.post(`${API_URL}/user/login`, loginParam);
            if (response.data.success) {
              console.info('로그인 성공:', response.data);
              await that.fnAddSystemMsg('로그인 성공');
              // 여기에서 사용자 토큰이나 세션 정보를 저장하거나 다음 작업을 수행할 수 있습니다.
              return true;
            } else {
              console.error('로그인 실패:', response.data.error);
              await that.fnAddSystemMsg('로그인 실패: ' + response.data.error);
              return true;
            }
          } catch (error) {
            await that.fnAddSystemMsg('로그인 서버에 접속할 수 없습니다.');
            that.preloaderErr.push({'E001' : error});
            that.fnSetUserData(loginParam)
            return true;
          }
        }
        const rst = await fetchDataFromApi();
        console.info('fetchDataFromApi', rst);
        return rst;
      },
      fnSetUserData(info) {
        this.userData.isLogin   = info.isLogin || false;
        this.userData.langType  = info.langType || 'KR';
        this.userData.lastLogin = info.lastLogin || 'K';
        this.userData.name      = info.name || 'GUEST';
        this.userData.pic       = info.pic || '/images/person/CH_000000.png';
        this.userData.points    = info.points || '0';
        this.userData.userId    = info.userId || '';
        this.userData.userPwd   = info.userPwd || '';
        this.userData.uuid      = info.uuid || '';
      },


      
      //특성 데이터
      async fnInitTraitData() {
        this.fnAddSystemMsg('공통 특성 데이터 로딩 중');
        this.$store.commit('storeInfo/createTraitList');
        const traitList = await this.$store.getters['storeInfo/getTraitList'];
        this.fnAddSystemMsg(`:총 ${traitList.length}건의 특성 데이터\n`);
      },
      //함선 데이터
      async fnInitSheepsData() {
        this.fnAddSystemMsg('공통 함선 데이터 로딩 중');
        this.$store.commit('storeInfo/createSheepList');
        const sheepList = this.$store.getters['storeInfo/getSheepList'];
        this.fnAddSystemMsg(`:총 ${sheepList.length}건의 함선 데이터\n`);
      },

      async fnInitScenarioData() {
        this.fnAddSystemMsg('시나리오 데이터 로딩 중');
        this.$store.commit('storeScene/createScenarioList');
        const scenarioList = this.$store.getters['storeScene/getScenarioList'];
        this.fnAddSystemMsg(`>총 ${scenarioList.length}건의 시나리오 데이터\n`);
      },
      async fnInitStarzoneData() {
        this.fnAddSystemMsg('기본 시나리오의 성계 지도를 가져오는 중');
        this.$store.commit('storeScene/createStarzoneList');
        const starzoneList = this.$store.getters['storeScene/getStarzoneList'];
        this.fnAddSystemMsg(`>총 ${starzoneList.length}건의 성계 데이터\n`);
      },
      async fnInitCharacterData() {
        this.fnAddSystemMsg('기본 시나리오의 등장 인물들을 가져오는 중');
        await this.$store.commit('storeScene/createCharacterList', 'T1');
        await new Promise(resolve => setTimeout(resolve, 0));
        const charData = this.$store.getters['storeScene/getCharacterList'];
        await this.fnAddSystemMsg(`>총 ${charData.length}건의 인물 데이터\n`);
      },
      async fnInitializeEnds() {
        this.fnAddSystemMsg('\n데이터 초기화 완료');
        if(this.preloaderErr.length > 0) {
          this.fnAddSystemMsg('이슈가 존재합니다.');
          // return;
        }
        let cnt = 3;
        // 3, 2, 1을 systemMsg에 추가하는 로직
        const countDownInterval = setInterval(() => {
          if (cnt > 0) {
            this.fnAddSystemMsg(`${cnt}초 후 초기화 모듈 종료합니다.`);
            cnt--;
          } else {
            clearInterval(countDownInterval); // 카운트다운 종료
            this.preloader = true; // 3초 후에 preloader 값을 변경
          }
        }, 1000);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "./LayoutHeader.scss";
</style>
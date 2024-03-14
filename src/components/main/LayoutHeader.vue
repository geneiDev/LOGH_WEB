<!-- LayoutHeader.vue 
    @DESC : 사용자의 정보를 출력한다.
-->
<template>
  <div class="layout_header">
    <div class="preloader_div" v-if="!preloader">
      <div class="preloader_uuid">사용자 고유 ID :<br>{{this.$store.getters['storeUser/getUUID']}}</div>
      <div class="preloader_text" v-for="row in preloader_text" :key="row.rn">{{ row.text }}</div>
    </div>
    <div class="profile_container">
      <img class="profile_img" src="@/assets/images/common/users/silhouette-male-person.png" alt="" @click="fnGetUserData">
      <ul>
        <li class="profile_data"><h3>{{ userData.name }}</h3></li>
        <li class="profile_data" v-if="userData.isLogin"><h3>{{ userData.points }}</h3></li>
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
  import LayerHeaderMenu from '@/components/layer/commons/LayerHeaderMenu.vue'
  const axios = require('axios');

  export default {
    components: {
      LayerHeaderMenu,
    },
    data() {
      return {
        isLogin : false,
        isHeaderVisible: false,
        
        userData : {},

        preloaderChk : false,
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
        const browser = this.$store.getters['storeUser/getBrowser'];
        const os = this.$store.getters['storeUser/getOS'];
        const uuid = this.$store.getters['storeUser/getUUID'];
        await this.fnAddSystemMsg(`OS정보 : ${os}`);
        await this.fnAddSystemMsg(`브라우져 정보 : ${browser}`);
        await this.fnAddSystemMsg(`데이터 서버 접근 권한 : ${typeof axios === 'function' ? 'ON' : 'OFF'}`);
        if(!axios && uuid) {
          await this.fnAddSystemMsg('\n권한 없음. 재접속 요망');
          return false;
        }
        
        await this.fnAddSystemMsg('\n사용자 정보를 받는중');
        await this.fnAddSystemMsg('유져 서버 점검 중.');
        await this.fnAddSystemMsg('2024.03.15 18:00 점검 종료 예정');

        // console.info(loginParam)
        // axios.get(`/api/user`, { params: loginParam }).then(response => {
        //   console.info(response)
        //   if (response.data) {
            
        //     // this.$store.commit('setUser', response.data); // setUser mutation을 호출하여 사용자 정보를 저장합니다.
        //   }
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        // });
        // this.userData = this.$store.getters['storeUser/getCurrentUser'];
        // if(this.userData.isLogin) {
        //   await this.fnAddSystemMsg('>로그인 성공');
        // } else {
        //   await this.fnAddSystemMsg('>로그인 이력 없음');
        // }
        // console.info('>fnGetUserData E')
        // await this.fnAddSystemMsg('\n');
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
        this.fnAddSystemMsg('데이터 초기화 완료\n');
        let cnt = 3;

        // 3, 2, 1을 systemMsg에 추가하는 로직
        const countDownInterval = setInterval(() => {
          if (cnt > 0) {
            this.fnAddSystemMsg(`${cnt}초 후 초기화 모듈 종료합니다.`);
            cnt--;
          } else {
            clearInterval(countDownInterval); // 카운트다운 종료
            // this.preloader = true; // 3초 후에 preloader 값을 변경
          }
        }, 1000);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "./LayoutHeader.scss";
</style>
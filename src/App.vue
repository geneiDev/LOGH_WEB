<template>
  <div id="app" class="sky" v-if="isOnload">
    <div id="app_header" v-show="routerName !== 'mainTitle'">
      <layout-header></layout-header>
    </div>
    <div id="app_body">
      <router-view></router-view>
    </div>
    <div id="app_footer" v-show="routerName !== 'mainTitle'">
      <layout-footer></layout-footer>
    </div>
  </div>
</template>

<script>
import global from '@/common/utils/global';
import LayoutHeader from '@/components/main/LayoutHeader.vue'
import LayoutFooter from '@/components/main/LayoutFooter.vue'

const axios = require('axios');
export default {
  namp : 'App',
  components: {
    LayoutHeader,
    LayoutFooter
  },
  data() {
    return {
      isOnload : false,
    };
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  watch: {
  },
  async created() {
    if (this.$store) {
      const currentEnv = global.commonUtils.fnDetectEnv();
      this.$store.commit('storeUser/setBrowser', currentEnv.browser);
      this.$store.commit('storeUser/setOS', currentEnv.os);

      let uuid = localStorage.getItem('uuid');

      if (!uuid || uuid.length !== 36) {
        const { v4: uuidv4 } = require('uuid');
        uuid = uuidv4();
        localStorage.setItem('uuid', uuid);
      }
      this.$store.commit('storeUser/setUUID', localStorage.getItem('uuid'));
    }
  },
  async mounted() {
    if (this.$store) {
      const browser = this.$store.getters['storeUser/getBrowser'];
      const os = this.$store.getters['storeUser/getOS'];
      const uuid = this.$store.getters['storeUser/getUUID'];
      console.log('Browser:', browser);
      console.log('OS:', os);
      console.log('UUID:', uuid);
      if(browser && os && uuid) {
        console.info('※ SYSTEM INIT...OK')
        this.fnGetCurrentUUID();
      } else {
        console.info('※ SYSTEM INIT...FAIL')
        console.info((`browser:${browser} && os:${os} && uuid:${uuid}`))
      }
    }
  },
  methods: {
    async fnGetCurrentUUID() {
      const that        = this;
      const uuid        = localStorage.getItem('uuid')||'';
      const currentUUID = localStorage.getItem('currentUUID')||'';

      const userId      = localStorage.getItem('userId')||'';
      const userPwd     = localStorage.getItem('userPwd')||'';
      if((uuid === currentUUID) && userId && userPwd) {
        /*  브라우져에서 추출한 uuid와 기존 localstorage의 currentUUID가 동일한 경우
            이미 로그인이 정상적으로 수행된 이력이 있는 사용자로 처리하여, 자동으로 로그인을 수행시킨다.
            그 외엔 새로운 UUID를 생성하고 신규 유져로 취급한다.
        */
        console.info('사용자 정보 정상!');
        this.fnCallLogin();
        return;
      }
      console.info('사용자 정보 체크 대상');
      const API_URL = global?.CONST.API_URL;
      async function fetchDataFromApi() {
        try {
            const response = await axios.post(`${API_URL}/user/getUUID`, {'uuid' : uuid} );
            console.info('response:', response);
            if(response.status === 200) {
              const userId = response.data.USER_ID||'';
              let userData = {
                IS_LOGIN    : false,
                LANG_TYPE   : 'KR',
                LAST_LOGIN  : 'K',
                USER_ID     : userId,
                UUID        : uuid,
                USER_NAME   : '',
                USER_PIC    : '/images/person/CH_000000.png',
                POINT       : 0,
                TMP_USER    : 'Y',
              }
              if(!userId) {
                console.info('완전 신규 유져임.');
                localStorage.setItem('currentUUID', uuid);
              }
              that.$store.dispatch('storeUser/login', userData, { root: true }).then(() => {
                that.isOnload = true;
              });
            } else {
              // global.CONST.API_URL = 'http://43.202.214.224:8081';
              // console.info('개발계 접속됨. : ', API_URL)
            }
        } catch (error) {
          console.info('서버죽음1', error);
          // global.CONST.API_URL = 'http://43.202.214.224:8081';
        }
      }
      fetchDataFromApi();
    },
    async fnCallLogin() {
      const userId      = localStorage.getItem('userId')||'';
      const userPwd     = localStorage.getItem('userPwd')||'';
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
        const uuid        = localStorage.getItem('uuid')||'';
        localStorage.setItem('currentUUID', uuid);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userPwd', userPwd);
        this.$store.dispatch('storeUser/login', response.data.user, { root: true });
        console.info('로그인됨;');
      }
      this.isOnload = true;
    },

    fnGetFooterType () {
      const currentRouteName = this.$route.name || '';
      if (!currentRouteName) {
        return false;
      } else {
        return true;
      }
    },
    fnValidInit() {

    },
    fnGetOuterLink() {
      //    https://gineipaedia.com/
    }
  }
};
</script>
<style lang="scss">
  @import "@/assets/styles/App.scss";
</style>

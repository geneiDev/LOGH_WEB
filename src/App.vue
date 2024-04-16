<template>
  <div id="app" class="sky">
    <div id="pre_loader" v-if="isOnload">
      <div id="app_header">
        <layout-header></layout-header>
      </div>
      <div id="app_body">
        <router-view></router-view>
      </div>
      <div id="app_footer">
        <layout-footer></layout-footer>
      </div>    
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
  watch: {
  },
  created() {
    if (this.$store) {
      const currentEnv = global.commonUtils.fnDetectEnv();
      this.$store.commit('storeUser/setBrowser', currentEnv.browser);
      this.$store.commit('storeUser/setOS', currentEnv.os);

      let uuid    = localStorage.getItem('uuid');
      if (!uuid || uuid.length !== 36) {
        const { v4: uuidv4 } = require('uuid');
        uuid = uuidv4();
        localStorage.setItem('uuid', uuid);
      }
      this.$store.commit('storeUser/setUUID', uuid);
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
        // await this.fnDetectServer();
        this.isOnload = await true;
      }
    }
  },
  methods: {
    // 현재 브라우저를 검출하는 함수
    async fnDetectServer() {
      console.info('※ SERVER INIT')
      const API_URL = global?.CONST.API_URL;
      async function fetchDataFromApi() {
          try {
            const response = await axios.post(`${API_URL}/`);
            if(response.status !== 200) {
              global.CONST.API_URL = 'http://43.202.214.224:8081';
            } else {
              console.info('개발계 접속됨. : ', API_URL)
            }
        } catch (error) {
          global.CONST.API_URL = 'http://43.202.214.224:8081';
        }
      }
      fetchDataFromApi();
    },
    fnGetFooterType () {
      const currentRouteName = this.$route.name || '';
      if (!currentRouteName) {
        return false;
      } else {
        return true;
      }
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

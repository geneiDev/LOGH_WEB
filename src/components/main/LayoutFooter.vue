<template>
  <div class="navigation">
    <ul v-if="routerType === 'main'" class="navi_row">
      <li class="side20" @click="fnChangeMainLayer('home')"><a class="iHome"><span class=""></span></a></li>
    </ul>
    <ul v-else-if="routerType === 'dic'" class="navi_row">
      <li class="side20" @click="fnChangeMainLayer('home')"><a class="iHome"><span class=""></span></a></li>
    </ul>
    <ul v-else class="navi_row">
      <li class="side20" @click="fnChangeMainLayer('home')"><a class="iHome"><span class=""></span></a></li>
      {{ routerName }} -> '{{routerType}}'
    </ul>
    <div class="bottomNaviBox" v-if="naviPopIdx">
      <div class="footerContainer">
        <layer-footer-menu :naviPopIdx="naviPopIdx"></layer-footer-menu>
      </div>
      <div class="footerContainer">
        <button class="btn_navi_close" @click="fnPopBottomNavi(0)"></button>
      </div>
    </div>
  </div>
</template>

<script>
import LayerFooterMenu from '@/components/layer/commons/LayerFooterMenu.vue'

export default {
  components: {
    LayerFooterMenu,
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
    routerType() {
      const routerName = this.$route.name;
      const mainType = ['mainMenu', 'user', 'dataStarzone'];
      if (mainType.some(type => routerName.startsWith(type))) {
        return 'main'
      } else {
        console.info('null routerName :', routerName)
        return ''
      }
      
    },
  },

  data () {
    return {
      naviPopIdx : 0
    }
  },
  mounted() {
    
  },
  methods: {
    fnPopBottomNavi (idx) {
      if(this.naviPopIdx === idx) {
        return this.naviPopIdx = 0;
      }
      this.naviPopIdx = idx;
    },
    fnChangeMainLayer (id) {
      console.info(id)
      if(id === 'home') {
        // mainTitle
        this.$router.push({ name: 'mainTitle' });
      }
    }
    
  }
}
</script>

<style lang="scss">
.navigation {
  position: absolute;
  z-index: 400;
  bottom: 0;
  width: 100%;
  height: 100%;
  border: 0.1rem solid #f3f3f3;
  border-radius: 1rem 1rem 0 0;
  padding-top: 0.5rem;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  .navi_row {
    position: relative;
    bottom: 0;
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .side20 {
    position: absolute;
    bottom : 0;
    max-height: 4rem;
    max-width: 100%;
    min-height: 100%;
    min-width: 4rem;
    max-width: 20vw;
    background-image: url("@/assets/images/common/icon/iHome.png");
    background-size: cover;
    background-position: center;
  }
}

</style>
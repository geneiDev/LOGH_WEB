<template>
  <div class="navigation">
    <ul v-if="routerType === 'main'">
      <li class="side"><a class="iHome" @click="fnChangeMainLayer('home')"><span class="material-symbols-outlined">home</span></a></li>
    </ul>
    <ul v-if="routerType === 'dic'">
      <li class="side"><a class="btn_navi_base" @click="fnChangeMainLayer('home')"><span class="material-symbols-outlined">home</span></a></li>
      <li class="side"><a class="btn_navi_base" @click="fnChangeMainLayer('home')"><span class="material-symbols-outlined">home</span></a></li>
      <li class="side"><a class="btn_navi_base" @click="fnChangeMainLayer('home')"><span class="material-symbols-outlined">home</span></a></li>
      <li class="side"><a class="btn_navi_base" @click="fnChangeMainLayer('home')"><span class="material-symbols-outlined">home</span></a></li>
      <li class="side"><a class="btn_navi_base" @click="fnChangeMainLayer('home')"><span class="material-symbols-outlined">home</span></a></li>
    </ul>
    <ul v-else>
      '{{routerType}}'
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
    routerType() {
      const routerName = this.$route.name;
      const mainType = ['mainMenu', 'userInfo'];
      if(mainType.includes(routerName)) {
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
      if(id === 'home') {
        this.$router.push({ name: 'mainMenu' });
      }
    }
    
  }
}
</script>

<style lang="scss">
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 300,
  'GRAD' 0,
  'opsz' 40
}
.material-symbols-outlined .on {
  font-variation-settings:
  'FILL' 0,
  'wght' 300,
  'GRAD' 0,
  'opsz' 40
}
.navigation {
  position: relative;
  z-index: 400;
  background-color: rgba(0, 0, 0, 1);
  bottom: 0;
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  padding-top: 0.5rem;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  ul {
    z-index: 400 !important;
    height: 4.8rem;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    list-style-type: none;
    .side {
      position: relative;
      flex: 1;
      border: 0.1em solid gray;
      min-height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.2);
      max-width: 20vw;
      .iHome {
        background-color: rgba(255, 255, 255, 0.2);
        max-width: 20vw;
      }
      .btn_navi_base {
        width:100%;
      }
      .btn_navi_base.on {
        background-color: rgba(255, 255, 255, 0.2);
      }
      
    }
    li + li {
      margin-left: 0.3em;
    }
  }

  ul + ul {
    margin-top: 0.3em;
  }
  ul.on {
    background-color: rgb(135, 135, 135);
  }

}

</style>
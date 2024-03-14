<template>
  <div class="navigation">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

    <div class="dimmed"></div>
    <ul :class="naviPopIdx ? 'on' : ''">
      
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(1)" id="1">1</a></li>
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(2)" id="2">2</a></li>
      <li class="side"><a class="btn_navi_base" @click="fnChangeMainLayer('')"><span class="material-symbols-outlined">home</span></a></li>
      
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(4)" id="4">4</a></li>
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(5)" id="5">5</a></li>
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
  watch: {
    
  },
  data () {
    return {
      naviPopIdx : 0
    }
  },
  methods: {
    fnPopBottomNavi (idx) {
      if(this.naviPopIdx === idx) {
        return this.naviPopIdx = 0;
      }
      this.naviPopIdx = idx;
    },
    fnChangeMainLayer (id) {
      this.$store.commit('storeMain/setLayer', id);
    }
    
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layouts/items/LayoutFooter.scss"
</style>
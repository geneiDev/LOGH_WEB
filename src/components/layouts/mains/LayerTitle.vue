<template>
  <div class="body_layer" @click="fnChangeMainLayer()">
      <h3 class="blinking">PRESS</h3>
  </div>
</template>

<script>
export default {
  name: 'layerTitle',
  props: {
    
  },
  data() {
    return {
      isLogin : false,
      isHeaderVisible: false,
      userData : {}
    };
  },
  mounted() {
    this.userData = this.$store.getters['storeUser/getCurrentUser'];
  },
  methods : {
    fnChangeMainLayer () {
      var id  = ''
      if(this.userData.isLogin) {
        id    = 'Main'
      } else {
        id    = 'Login'
      }
      this.$store.commit('storeMain/setLayer', id);
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/components/layer/mains/LayerTitle.scss"
</style>
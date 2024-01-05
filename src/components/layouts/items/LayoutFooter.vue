<template>
  <div class="app_bottom_navi">
    <div class="navigation">
      <div class="navi_pop">
        
      </div>
      <div  v-if="naviPopIdx != 0">
        <button class="pop_hide">▼</button>
      </div>
      
      <ul>
        <li class="side"><a @click="fnPopBottomNavi" id="1">1</a></li>
        <li class="side"><a @click="fnPopBottomNavi" id="2">2</a></li>
        <li class="side"><a @click="fnPopBottomNavi" id="3">3</a></li>
        <li class="side"><a @click="fnPopBottomNavi" id="4">4</a></li>
        <li class="side"><a @click="fnPopBottomNavi" id="5">5</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    globals: {
      type: Object,
      required: true
    }
  },
  watch: {
    
  },
  data () {
    return {
      naviPopIdx : 0
    }
  },
  methods: {
    fnPopBottomNavi (ev) {
      console.info(ev);
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layouts/items/LayoutFooter.scss"
</style>
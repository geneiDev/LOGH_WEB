<template>
  <div class="navigation">
    <div class="dimmed"></div>
    <ul>
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(1)" id="1">1</a></li>
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(2)" id="2">2</a></li>
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(3)" id="3">3</a></li>
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(4)" id="4">4</a></li>
      <li class="side"><a class="btn_navi_base" @click="fnPopBottomNavi(5)" id="5">5</a></li>
    </ul>
    <div class="bottomNaviBox" v-if="naviPopIdx">
      <div class="navi_sub_box" v-if="naviPopIdx === 1">
        <button class="btn_navi_sub">1-1</button>
        <button class="btn_navi_sub">1-2</button>
        <button class="btn_navi_sub">1-3</button>
        <button class="btn_navi_sub">1-4</button>
        <button class="btn_navi_sub">1-5</button>
      </div>
      <div v-if="naviPopIdx === 2">
        2
      </div>
      <div v-if="naviPopIdx === 3">
        3
      </div>
      <div v-if="naviPopIdx === 4">
        4
      </div>
      <div v-if="naviPopIdx === 5">
        5
      </div>
      <button class="btn_navi_close" @click="fnPopBottomNavi(0)"></button>
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
    fnPopBottomNavi (idx) {
      this.naviPopIdx = idx;
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layouts/items/LayoutFooter.scss"
</style>
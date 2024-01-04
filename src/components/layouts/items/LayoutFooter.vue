<template>
  <div class="app_bottom_navi">
    <div class="navigation">
      <ul>
        <li class="side"><a>사용자</a></li>
        <li class="side"><a id="Main" @click="fnPopBottomNavi()">메인</a></li>
        <li class="side"><a>옵션</a></li>
        <li class="side"><a>정보</a></li>
      </ul>
      <ul>
        <li class="side"><a>사용자</a></li>
        <li class="side"><a id="Main" @click="fnPopBottomNavi()">메인</a></li>
        <li class="side"><a>옵션</a></li>
        <li class="side"><a>정보</a></li>
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
    }
  },
  methods: {
    fnPopBottomNavi () {
      

    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layouts/items/LayoutFooter.scss"
</style>
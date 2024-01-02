<template>
  <div class="app_bottom_navi">
    <div class="navigation">
      <ul>
        <li class="side"><a id="Title">{{globals}}</a></li>
        <li class="side"><a>33767543</a></li>
        <li class="side"><a>33767544</a></li>
        <li class="side"><a>33767545</a></li>
        <li class="side"><a>33767546</a></li>
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
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layouts/items/LayoutFooter.scss"
</style>
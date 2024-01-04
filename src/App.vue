<template>
  <div id="app">
    <div id="app_header">
      <layout-header></layout-header>
    </div>
    <div id="app_body">
      <component :is=" LayerComponent"></component>
    </div>
    <div id="app_footer">
      <layout-footer :globals="globals"></layout-footer>
    </div>
  </div>
</template>

<script>
import LayoutHeader from './components/layouts/items/LayoutHeader.vue'
import LayoutFooter from './components/layouts/items/LayoutFooter.vue'
//Body
import LayerTitle from './components/layouts/mains/LayerTitle.vue'
import LayerLogin from './components/layouts/users/LayerLogin.vue'

export default {
  name: 'App',
  components: {
    LayoutHeader,
    LayoutFooter,
    LayerTitle,
    LayerLogin
  },
  data() {
    return {
      globals : {
         Layer: '',
      },
    };
  },
  computed: {
     LayerComponent() {
      return this.globals.Layer;
    },
  },
  mounted() {
    this.fnChangeMainLayer();
  },
  watch: {
  },
  methods: {
    fnChangeMainLayer(id) {
      if(!id || id === '')  {
        id = 'Title'
      }
      // console.info('fnChangeMainLayer:', id)
      this.globals. Layer = 'Layer' + id;
    },
  }
}
</script>
<style lang="scss">
    @import "@/assets/styles/App.scss";
  </style>
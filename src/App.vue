<template>
  <div id="app">
    <layout-header></layout-header>
    <div id="app_body">
      {{ globals.bodyName }}
      <component :is="bodyNameComponent"></component>
    </div>
    <layout-footer :globals="globals"></layout-footer>
  </div>
</template>

<script>
import LayoutHeader from './components/layouts/items/LayoutHeader.vue'
import LayoutFooter from './components/layouts/items/LayoutFooter.vue'
import LayerTitle from './components/layouts/mains/LayerTitle.vue'
import LayerLogin from './components/layouts/users/LayerLogin.vue'
import { mapGetters } from 'vuex';


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
        bodyName: 'LayerTitle',
      },
    };
  },
  computed: {
    ...mapGetters(['']),
    bodyNameComponent() {
      return ''//this.getBodyName === 'LayerTitle' ? LayerTitle : LayerLogin;
    },
  },
  mounted() {
    this.fnChangeMainLayer('Title');
  },
  watch: {
    // bodyName(to, from) {
    //   console.info(to, from);
    //   this.fnChangeMainLayer(to);
    // }
  },
  methods: {
    fnChangeMainLayer(id) {
      this.globals.bodyName = 'Layer' + id;
    },
  }
}
</script>
<style lang="scss">
    @import "@/assets/styles/App.scss";
  </style>
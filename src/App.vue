<template>
  <div id="app" class="sky">
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
import { mapGetters } from 'vuex';
//common
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
    ...mapGetters('user', ['getCurrentUser']),
    LayerComponent() {
      return 'Layer' + this.globals.Layer;
    },
  },
  mounted() {
    this.$store.commit('storeMain/setLayer', '');
  },
  watch: {
    async '$store.state.storeMain.layer'(newLayer, oldLayer) {
      console.info('MOVE TO :', oldLayer, ' > ', newLayer);
      return this.globals.Layer = newLayer.trim();
    },
    currentUser(newCurrentUser) {
      console.info('userInfo Chagened:', newCurrentUser);
      // 'currentUser'가 변경될 때 수행할 동작을 여기에 추가
      // 예: this.fnChangeMainLayer(newCurrentUser.someProperty);
    },
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
  @import "@/assets/styles/App.scss";
</style>
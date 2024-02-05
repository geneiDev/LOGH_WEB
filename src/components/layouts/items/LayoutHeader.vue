<!-- LayoutHeader.vue 
    @DESC : 사용자의 정보를 출력한다.
-->
<template>
<div class="layout_header">
  <div class="profile_container">
    <img class="profile_img" src="@/assets/images/person/etc/user/silhouette-male-person.png" alt="" @click="fnGetUserData">
    <ul>
      <li class="profile_data"><h3>{{ userData.name }}</h3></li>
      <li class="profile_data" v-if="userData.isLogin"><h3>{{ userData.points }}</h3></li>
    </ul>
    <div class="btn_menu">
      <input class="menu-check" type="checkbox" id="menu-check" />
      <label class="menu-icon" for="menu-check">
        <span class="menu-sticks"></span>
      </label>
      <div class="menu">
        <div>
          <layer-header-menu></layer-header-menu>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import LayerHeaderMenu from '@/components/layer/commons/LayerHeaderMenu.vue'

  export default {
    components: {
      LayerHeaderMenu,
    },
    data() {
      return {
        isLogin : false,
        isHeaderVisible: false,
        userData : {},
      };
    },
    computed: {
      
    },
    created() {
      this.fnGetUserData()
    },
    mounted() {

    },
    methods : {
      fnGetUserData() {
        this.userData = this.$store.getters['storeUser/getCurrentUser'];
        if(this.userData.isLogin) {
          console.info('fnGetUserData', this.userData)
        } else {
          //로그인 세션 이동
          console.info('fnGetUserData', this.userData)
        }
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/components/layouts/items/LayoutHeader.scss";
</style>
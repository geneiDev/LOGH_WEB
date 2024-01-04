<!-- LayoutHeader.vue 
    @DESC : 사용자의 정보를 출력한다.
-->
<template>
  <div class="app_header">
      <img class="profile_img" src="@/assets/images/person/etc/user/silhouette-male-person.png" alt="">
      <ul>
        <li class="profile_data"><h3>{{ userData.name }}</h3></li>
        <li class="profile_data"><h3>{{ userData.points }}</h3></li>
      </ul>
      <div class="btn_menu">
        <input class="menu-check" type="checkbox" id="menu-check" />
        <label class="menu-icon" for="menu-check">
          <span class="menu-sticks"></span>
        </label>
        <div class="menu">
          <div>
            
          </div>
        </div>
      </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        isLogin : false,
        isHeaderVisible: false,
        userData : {}
      };
    },
    computed: {
      
    },
    created() {
      this.fnInitUserData()
    },
    mounted() {
      this.fnGetUserData()
    },
    methods : {
      fnInitUserData() {
        console.info(this.$store)
        const user = {
          isLogin : false,
          id  : '',
          name : 'GUEST',
          pic: '@/assets/images/person/etc/user/silhouette-male-person.png',
          points : 0,
        }
        this.$store.commit('setCurrentUser', user);
      },
      fnGetUserData() {
        console.info(this.$store.state.user);
        this.userData = this.$store.getters.getCurrentUser;
        console.info('userData:', this.userData);
      },
      fnIsLogin() {
        if(!this.userData.isLogin) {
          console.info('goto login')
        }
      }
    }
  };
</script>
  
<style lang="scss" scoped>
@import "@/assets/styles/components/layouts/items/LayoutHeader.scss";
</style>
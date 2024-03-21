<template>
  <div class="layer_menu">
    <div class="user_info_container">
      <div v-if="userData.tmpUser === 'Y'">
        임시사용자 사용자 정보 창으로 이동.
      </div>
      <div v-else>
        임시사용자아님.
      </div>


    </div>


    <ul>
      <li>{{ userData }}</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>  
</template>

<script>
export default {
  props: {
    menuId  : {
      type    : String,
      required: false
    },
  },
  data() {
    return {
      userData : {
        isLogin : false,
        langType : '',
        lastLogin: '',
        userId : '',
        userName : '',
        userPic : '',
        points: 0,
      },
    };
  },
  mounted() {
    this.fnInitData();
  },
  methods : {
    async fnInitData() {
      this.userData = this.$store.getters['storeUser/getCurrentUser'];

    },
  },

  

}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layer/commons/LayerHeaderMenu.scss"
</style>
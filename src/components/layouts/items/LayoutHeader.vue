<!-- LayoutHeader.vue 
    @DESC : 사용자의 정보와 가장 최근 소켓 통신의 글을 3줄까지 출력한다.
-->
<template>
  <div v-resize="handleResize" class="app_header">
    <div :class="{ 'app_header': true, 'visible': isHeaderVisible }">
      <span>{{ userData.currentUser.id }}</span>
      <span>{{ userData.currentUser.name }}</span>
      <span>ccc</span>
      <!-- 추가 필요한 사용자 정보 표시 -->
    </div>
  </div>
</template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    data() {
    return {
      isHeaderVisible: false,
      userData : {
        currentUser : {
          id  : '10',
          name : 'aa',
          pic : '',
          points : 0,
        },
        currentPerson : {

        },
      }
    };
  },
    computed: {
        ...mapState('user', ['currentUser']),
    },
    created() {
      this.isHeaderVisible = true;
      setTimeout(() => {
        this.isHeaderVisible = false;
      }, 5000); // 5초 후에 숨김
    },
    mounted() {
        // 스토어 상태가 변경될 때마다 호출되는 콜백 등록
        this.$store.subscribe((mutation, state) => {
        // mutation 타입이 'user/setCurrentUser'일 때만 로그 출력
          if (mutation.type === 'user/setCurrentUser') {
            console.log('currentUser가 변경되었습니다.', state.user.currentUser);
          }
        });

    },
    methods : {
      handleResize(rect) {
        // rect에는 변경된 크기와 위치 정보가 포함됩니다.
        console.log(rect.width, rect.height, rect.top, rect.left);
      }
    }
  };
  </script>
  
  <style lang="scss">
@import "@/assets/styles/components/layouts/items/LayoutHeader.scss";
</style>
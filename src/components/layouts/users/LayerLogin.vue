<template>
  <div class="body_layer">
    <div class="login_bot">
      <ul class="login_btn_group">
        <li id="FirstLogin">
          <button type="button" class="btn_base kakao" value="K"><span>카카오톡으로 로그인</span></button>
          <button type="button" class="btn_base naver" value="N"><span>네이버로 로그인</span></button>
          <button type="button" class="btn_base facebook" value="F"><span>페이스북으로 로그인</span></button>
        </li>
        <li id="SecondLogin">
          <button type="button" class="btn_base email" value="E"><span>이메일로 로그인</span></button>
          <button type="button" class="btn_base phone" value="P"><span>휴대폰으로 로그인</span></button>
          <button type="button" class="btn_base apple" value="A"><span>애플계정으로 로그인</span></button>
        </li>
        
      </ul>
    </div>
		<div class="login_bot">
      <button type="button" class="btn_base kakao1" value="R"><span>회원가입하기</span></button>
			<p class="notice">혹시, 계정을 잊어버리셨나요?<a href="LO-02-03-1.html" class="link" id="AccSearch">계정찾기</a></p>
		</div>
	</div>
</template>

<script>

export default {
  name: 'layerLogin',
  computed: {
    currentUser() {
      return this.$store.getters['storeUser/getCurrentUser'];
    },
  },
  props: {
    
  },
  mounted() {
    console.info(this.currentUser.lastLogin);
    if(!this.currentUser.lastLogin) {
      this.currentUser.lastLogin = 'K'
    }
    

  },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/components/layer/users/LayerLogin.scss"
</style>
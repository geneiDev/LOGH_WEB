<template>
  <div class="confirm_popup">
    <span class="input-group-addon">
      <span class="pop_text">{{ text }}</span>
    </span>
    <div class="confirm_pop_btn_row"> 
      <input class="confirm_pop_btn" @click="handleConfirm" type="button" value="확인">
      <input class="confirm_pop_btn" @click="handleCancel" type="button" value="취소">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String
    },
    buttons: Array,
  },
  methods : {
    handleConfirm() {
      this.buttons[0].handleConfirm();
      this.$emit('close');
    },
    handleCancel() {
      this.buttons[1].handleCancel();
      this.$emit('close');
    },
  }
}
</script>
<style>
.vm--modal {
  background-color: black !important;
}
.confirm_popup {
  background-color: black;
  border: 2px solid #f3f3f3;
  color: #c2daf7;
  height: auto;
  width: 100%;
  max-width: 95vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 화면 중앙 정렬 */
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.input-group-addon {
  /* font-size: 1.6rem; */
  display: flex;
  white-space: pre-line;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 3;
}
.pop_text {
    flex: 1;
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
  }
.confirm_pop_btn_row {
  flex: 1;
  max-height: 20%;
  max-width: 100vw;
  margin-top: 1rem;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  
}
.confirm_pop_btn {
  flex: 1;
  background: black;
  color: #c2daf7;
  font-size: 2rem;
}

</style>
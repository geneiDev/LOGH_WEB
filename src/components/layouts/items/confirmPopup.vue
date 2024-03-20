<template>
  <div class="confirm_popup">
    <span class="input-group-addon">
      {{ text }}
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
<style scoped>
.confirm_popup {
  background: black;
  color: #c2daf7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.input-group-addon {
  font-size: 1.6rem;
  display: flex;
  white-space: pre-line;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 3;
}
.confirm_pop_btn_row {
  flex: 1;
  max-height: 30%;
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
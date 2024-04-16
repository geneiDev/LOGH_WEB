<template>
  <div class="message_popup">
    <span class="input-group-addon">
      <span class="pop_text">{{ text }}</span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String
    },
    time: {
      type: Number
    },
  },
  data() {
    return {
    };
  },
  mounted() {
    if(this.time && !isNaN(this.time) && this.time > 0) {
      this.fnCloseTimer();
    }
  },
  methods : {
    fnCloseTimer() {
      setTimeout(() => {
        this.$emit('close');
      }, this.time*1000);
    },
  }
}
</script>
<style>
.vm--modal {
  background-color: rgba(0, 0, 0, 0);
  max-height: 100vh;
  max-width: 100vw;
}
.message_popup {
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
.pop_text {
  flex: 1;
  font-size: 1.35rem;
}
</style>
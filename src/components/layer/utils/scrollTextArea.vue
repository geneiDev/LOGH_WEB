<template>
  <div class="scroll_text_area">
    {{ previewTxt }}
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      previewTxt: '',
      typingInterval: null, // 변수 추가
    };
  },
  watch: {
    'options.text': function () {
      this.startTyping();
    },
  },
  mounted() {
    this.startTyping();
  },
  methods: {
    startTyping() {
      let index = 0;
      // console.info('props', this.options.text)
      this.previewTxt = '';
      if (!this.options.text) {
        return;
      }

      // 기존의 setInterval을 중지
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
      }

      const itv = (this.options.itv) ? this.options.itv : 50;
      const characters = this.options.text.split("");

      // 새로운 setInterval 시작
      if (characters.length > 0) {
        this.typingInterval = setInterval(() => {
          this.previewTxt += characters[index]
          index++;
          if (index === characters.length) {
            clearInterval(this.typingInterval);
          }
        }, itv);
      }
    },
  },
};
</script>

<style scoped>
.scroll_text_area {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>

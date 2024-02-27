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
      previewTxt : '',
    };
  },
  // computed: {
  //   getScrollTextAreaOptions() {
  //     return {
  //       text: this.scenarioObj.preview[this.previewPage],
  //       itv: 50,
  //     };
  //   },
  // },
  watch : {
    'options.text' : function() {
      this.startTyping();  
    }
  },
  mounted() {
    this.startTyping();
  },
  methods: {
    startTyping() {
      let index = 0;
      // console.info('props', this.options)
      this.previewTxt = '';
      if(!this.options.text) {
        return;
      }
      const itv = (this.options.itv) ? this.options.itv : 50;
      const characters = this.options.text.split("");
      if (characters .length > 0) {
        const typingInterval = setInterval(() => {
          this.previewTxt += characters[index]
          index++;
          if (index === characters.length) {
            clearInterval(typingInterval);
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

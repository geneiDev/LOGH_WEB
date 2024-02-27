<template>
  <div class="imgArea">
    <img :src="currentImgSrc" alt="이미지 준비중" />
  </div>
</template>

<script>
import defaultImage from '@/assets/images/common/background.jpg';

export default {
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentImgSrc: defaultImage,
    };
  },
  watch: {
    imgSrc: function () {
      this.fnGetImage();
    },
  },
  mounted() {
    this.fnGetImage();
  },
  methods: {
    fnGetImage() {
      // 이미지가 없을 경우 디폴트 이미지로 설정
      if (this.imgSrc) {
        try {
          this.currentImgSrc = this.imgSrc;  
        } catch (error) {
          console.info(error)
          this.currentImgSrc = this.defaultImgSrc; 
        }
      }
      console.info(this.currentImgSrc);
    },
  },
};
</script>

<style>
/* 필요한 스타일을 추가할 수 있습니다. */
</style>

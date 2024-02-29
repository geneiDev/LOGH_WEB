<template>
  <div class="imgArea">
    <img class="genei_img" :src="currentImgSrc" alt="" />
    {{ currentImgSrc }}
  </div>
</template>

<script>
import defaultImage from '@/assets/images/common/background/background.jpg';

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
      if (this.imgSrc) {
        let absolutePath = this.imgSrc
        try {
          if(!absolutePath.includes('http')) {
            const dynamicPath = `@/${absolutePath}`;
            this.currentImgSrc = dynamicPath
          } else {
            this.currentImgSrc = this.imgSrc;
          }
          this.currentImgSrc = this.imgSrc;  
        } catch (error) {
          console.info('errorerror', error)
          this.currentImgSrc = defaultImage; 
        }
      }
      // console.info(this.currentImgSrc);
    },
  },
};
</script>

<style>
.imgArea {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.genei_img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: contain;
  object-position: center center;
  background-color: black;
}
</style>

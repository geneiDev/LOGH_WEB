<template>
  <div class="imgArea">
    <img class="genei_img" :src="currentImgSrc" alt="" />
    {{ currentImgSrc }}
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
      if (this.imgSrc) {
        // let srcString = this.imgSrc
        try {
          if(!this.imgSrc.includes('https:')) {
            // console.info(this.imgSrc)
            // const assetPath = 'assets/images/';
            // if(!this.imgSrc.includes(assetPath)) {
            //   srcString = assetPath+srcString;
            //   console.info(srcString)
            // }
            // const imgPath = `@/${this.imgSrc}`;
            const dynamicPath = `@/${this.imgSrc}`;
            import(dynamicPath).then(imgImport => {
              console.info('imgImport', imgImport)
              const dynamicImg = require(dynamicPath);
              console.info('dynamicImg:', dynamicImg)

            }).catch(error => {
              console.info('import', error)
              this.currentImgSrc = defaultImage;
            });
          }
          this.currentImgSrc = this.imgSrc;  
        } catch (error) {
          console.info('errorerror', error)
          this.currentImgSrc = defaultImage; 
        }
      }
      console.info(this.currentImgSrc);
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
  height: auto;
  min-width: 100%;
  min-height: 100%;
}
</style>

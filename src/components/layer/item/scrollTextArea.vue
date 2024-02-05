<template>
  <div class="opening-div">
    <div class="opening-crawl" :style="{ transform: `translateY(${position}%)` }">
      <span v-for="line in openingLines" :key="line">{{ line }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openingLines: [
      ],
      position: 0,
    };
  },
  methods: {
    startOpeningCrawl() {
      const animationDuration = 60; // 애니메이션 지속 시간 (초)
      setInterval(() => {
        this.position = -100; // 텍스트를 위로 올리는 위치
        setTimeout(() => {
          this.position = 0;
        }, 10);
      }, animationDuration * 1000);
    },
  },
  mounted() {
    this.startOpeningCrawl();
  },
};
</script>

<style scoped>
.opening-div {
  max-height: 8rem;
  overflow: hidden;
}

.opening-crawl {
  white-space: pre-line;
  position: relative;
  transition: transform 0.01s;
}
</style>

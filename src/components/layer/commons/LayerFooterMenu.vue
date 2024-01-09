<template>
  <div class="layer_menu">
    <ul v-if="naviPopIdx === 1">
      <li @click="fnChangeMainLayer(11)">11</li>
      <li @click="fnChangeMainLayer(12)">12</li>
      <li @click="fnChangeMainLayer(13)">13</li>
      <li @click="fnChangeMainLayer(14)">14</li>
    </ul>
    <ul v-if="naviPopIdx === 2">
      <li @click="fnChangeMainLayer(11)">21</li>
      <li @click="fnChangeMainLayer(12)">22</li>
      <li @click="fnChangeMainLayer(13)">23</li>
      <li @click="fnChangeMainLayer(14)">24</li>
    </ul>
    <ul v-if="naviPopIdx === 3">
      <li @click="fnChangeMainLayer(11)">31</li>
      <li @click="fnChangeMainLayer(12)">32</li>
      <li @click="fnChangeMainLayer(13)">33</li>
      <li @click="fnChangeMainLayer(14)">34</li>
    </ul>
    <ul v-if="naviPopIdx === 4">
      <li @click="fnChangeMainLayer(11)">41</li>
      <li @click="fnChangeMainLayer(12)">42</li>
      <li @click="fnChangeMainLayer(13)">43</li>
      <li @click="fnChangeMainLayer(14)">44</li>
    </ul>
    <ul v-if="naviPopIdx === 5">
      <li @click="fnChangeMainLayer(11)">51</li>
      <li @click="fnChangeMainLayer(12)">52</li>
      <li @click="fnChangeMainLayer(13)">53</li>
      <li @click="fnChangeMainLayer(14)">54</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    naviPopIdx: {
      type: Number,
      required: false
    }
  },
  // 나머지 컴포넌트 로직 및 메서드 등을 추가할 수 있습니다.
}
</script>

<style lang="scss">
  @import "@/assets/styles/components/layer/commons/LayerHeaderMenu.scss"
</style>
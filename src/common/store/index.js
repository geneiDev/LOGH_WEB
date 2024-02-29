// src/common/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

//store
import storeMain from './storeMain';
import storeUser from './storeUser';
import storeInfo from './storeInfo';
import storeScene from './storeScene';

//util
import layoutUtil from '@/common/utils/commonutil/store/layoutUtil';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layoutUtil,
    storeMain,
    storeUser,
    storeInfo,
    storeScene,
  },
});
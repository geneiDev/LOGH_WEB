// src/common/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

//store
import storeMain from './storeMain';
import storeUser from './storeUser';
import storeInfo from './storeInfo';
import storeScene from './storeScene';

//util


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    storeMain,
    storeUser,
    storeInfo,
    storeScene,
  },
});
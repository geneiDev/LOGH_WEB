// src/common/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import storeInfo from './storeInfo';
import storeMain from './storeMain';
import storeUser from './storeUser';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main: storeMain,
    user: storeUser,
    info: storeInfo,
  },
});
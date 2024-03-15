export default {
  namespaced: true,
  state: {
    API_URL : '',
    layer : ''
  },
  mutations: {
    // setLayer(state, layerId) {
    //   if (!layerId || layerId === '') {
    //     layerId = 'Title';
    //   }
    //   state.layer = layerId;
    // },
    setApiUrl(state, env) {
      state.API_URL = env;
    },
  },
  actions: {
    // gotoLayer({ commit }, layerId) {
    //   commit('setLayer', layerId);
    // },
  },
  getters: {
    getApiUrl: (state) => state.API_URL,
    // getLayer: (state) => state.layer,
  },
};
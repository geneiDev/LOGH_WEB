export default {
  namespaced: true,
  state: {
    layer : ''
  },
  mutations: {
    setLayer(state, layerId) {
      if (!layerId || layerId === '') {
        layerId = 'Title';
      }
      state.layer = layerId;
    },
  },
  actions: {
    gotoLayer({ commit }, layerId) {
      commit('setLayer', layerId);
    },
  },
  getters: {
    getLayer: (state) => state.layer,
  },
};
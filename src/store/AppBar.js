export default {
  namespaced: true,
  state: () => ({
    drawer: true,
    search: "",
  }),
  mutations: {
    set_drawer(state, val) {
      state.drawer = val;
    },
    set_search(state, val) {
      state.search = val;
    },
  },
  actions: {},
};

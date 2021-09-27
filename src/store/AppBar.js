export default {
  namespaced: true,
  state: () => ({
    drawer: false,
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

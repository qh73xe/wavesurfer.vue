import Vue from "vue";
import Vuetify from "vuetify/lib";
import ja from "@/locale/ja.ts";
import en from "@/locale/en.ts";

Vue.use(Vuetify);
Vue.component("my-component", {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = "ja";
    }
  }
});

export default new Vuetify({
  lang: {
    locales: { ja, en },
    current: "ja"
  }
});

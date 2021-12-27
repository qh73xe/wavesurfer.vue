import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ja from "@/locale/ja.ts";
import en from "@/locale/en.ts";
Vue.use(Vuetify);

export const options = {
  lang: {
    locales: { ja, en },
    current: "ja",
  },
};

export default new Vuetify(options);

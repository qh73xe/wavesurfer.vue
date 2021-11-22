import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ja from "@/locale/ja";
import en from "@/locale/en";

Vue.use(Vuetify);

export const options = {
  theme: {
    dark: false,
  },
  icons: {
    iconfont: "mdiSvg",
  },
  lang: {
    locales: { ja, en },
    current: "ja",
  },
};

export default new Vuetify(options);

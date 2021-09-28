import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export const options = {
  theme: {
    dark: false,
  },
  lang: {
    current: "ja",
  },
};

export default new Vuetify(options);

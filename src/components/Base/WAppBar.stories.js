import vuetify from "@/plugins/vuetify";
import WAppBar from "./WAppBar";

export default {
  component: WAppBar,
};

const Template = () => ({
  components: { WAppBar },
  vuetify,
  template: "<w-app-bar />",
  data: () => ({}),
});

export const Default = Template.bind({});
Default.args = {};

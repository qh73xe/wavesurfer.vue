import vuetify from "@/plugins/vuetify";
import WAppBar from "./WAppBar";

export default {
  component: WAppBar,
  title: "Components/WAppBar",
};

const Template = (args, { argTypes }) => ({
  components: { WAppBar },
  vuetify,
  props: Object.keys(argTypes),
  template: "<w-app-bar />",
  data: () => ({}),
});

export const Default = Template.bind({});
Default.args = {};

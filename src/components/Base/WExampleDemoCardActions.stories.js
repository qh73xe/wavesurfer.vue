import vuetify from "@/plugins/vuetify";
import WExampleDemoCardActions from "./WExampleDemoCardActions";
import WExampleDemoCard from "./WExampleDemoCard";

export default {
  component: WExampleDemoCardActions,
  title: "Components/WExampleDemoCardActions",
};

const Template = (args) => ({
  components: { WExampleDemoCardActions, WExampleDemoCard },
  vuetify,
  setup() {
    return args;
  },
  template: `
  <w-example-demo-card>
    <w-example-demo-cards-actions v-bind="args" />
  </w-example-demo-card>
  `,
});

export const Default = Template.bind({});
Default.args = {};

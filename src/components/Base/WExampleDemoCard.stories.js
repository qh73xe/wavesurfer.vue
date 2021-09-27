import vuetify from "@/plugins/vuetify";
import WExampleDemoCard from "./WExampleDemoCard";

export default {
  component: WExampleDemoCard,
  title: "Components/WExampleDemoCard",
};

const Template = (args) => ({
  components: { WExampleDemoCard },
  vuetify,
  setup() {
    return { args };
  },
  template: `<w-example-demo-card v-bind="args">
  <template v-slot:toolbar>
    This is Toolbar
  </template>
  <template v-slot:input-form>
    This is input form.
  </template>
  This is children.
  </w-example-demo-card>`,
});

export const Default = Template.bind({});
Default.args = {
  title: "this is title",
};

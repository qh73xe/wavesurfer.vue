import vuetify from "@/plugins/vuetify";
import WExampleHelpDialog from "./WExampleHelpDialog";

export default {
  component: WExampleHelpDialog,
  title: "Components/WExampleHelpDialog",
};

const Template = () => ({
  components: { WExampleHelpDialog },
  vuetify,
  template: `
  <w-example-help-dialog v-bind="args">
    <span
      class="font-weight-light subtitle-1"
      v-html="this is help text"
    />
  </w-example-help-dialog>
  `,
});

export const Default = Template.bind({});
Default.args = {};

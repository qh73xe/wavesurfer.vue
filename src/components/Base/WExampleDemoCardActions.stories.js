import WExampleDemoCardActions from "./WExampleDemoCardActions";
import WExampleDemoCard from "./WExampleDemoCard";

export default {
  component: WExampleDemoCardActions,
};

const Template = (_, { argTypes }) => ({
  components: { WExampleDemoCardActions, WExampleDemoCard },
  props: Object.keys(argTypes),
  template: `
  <w-example-demo-card>
    <WExampleDemoCardActions :ws="ws" />
  </w-example-demo-card>
  `,
});

export const Default = Template.bind({});
Default.args = {
  ws: {},
};

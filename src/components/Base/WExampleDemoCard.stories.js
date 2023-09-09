import WExampleDemoCard from "./WExampleDemoCard";

export default {
  component: WExampleDemoCard,
};

const Template = (args, { argTypes }) => ({
  components: { WExampleDemoCard },
  props: Object.keys(argTypes),
  computed: {
    inputFormSlot: function () {
      return args["input-form"];
    },
  },
  template: `
    <w-example-demo-card :title="title">
      <template v-slot:toolbar>
        {{toolbar}}
      </template>
      <template v-slot:input-form>
        {{inputFormSlot}}
      </template>
      <template v-if="${"default" in args}" slot="default">
        ${args.default}
      </template>
    </w-example-demo-card>`,
});

export const Default = Template.bind({});
Default.args = {
  title: "this is title",
  default: "This is default slot.",
  toolbar: "This is toolbar slot.",
  "input-form": "This is input form slot.",
};

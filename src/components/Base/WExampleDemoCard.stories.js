import vuetify from "@/plugins/vuetify";
import WExampleCard from "@/components/Base/WExampleDemoCard.vue";

export default {
  component: WExampleCard,
  title: "Components/WExampleCard",
};

const Template = (args, { argTypes }) => ({
  components: { WExampleCard },
  vuetify,
  props: Object.keys(argTypes),
  template: `
    <w-example-card v-bind="$props">
      <template v-slot:toolbar>
        this is toolbar slots
      </template>
      <template v-slot:input-form>
        this is input-form slots
      </template>
      this is default slots
    </w-example-card>`,
});

export const Default = Template.bind({});
Default.args = { title: "Card Title" };

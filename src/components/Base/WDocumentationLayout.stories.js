import vuetify from "@/plugins/vuetify";
import WDocumentationLayout from "./WDocumentationLayout";

export default {
  component: WDocumentationLayout,
  title: "Components/WDocumentationLayout",
};

const Template = (args, { argTypes }) => ({
  components: { WDocumentationLayout },
  vuetify,
  props: Object.keys(argTypes),
  template:
    '<w-documentation-layout v-bind="$props">子要素</w-documentation-layout>',
});

export const Default = Template.bind({});
Default.args = {
  heading: "The Title of Headline",
  desc: "This is description",
};

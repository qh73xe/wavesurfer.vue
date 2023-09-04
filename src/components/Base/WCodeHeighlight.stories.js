import vuetify from "@/plugins/vuetify";
import WCodeHeighlight from "@/components/Base/WCodeHeighlight.vue";

export default {
  component: WCodeHeighlight,
};

const Template = () => ({
  components: { WCodeHeighlight },
  vuetify,
  template:
    "<w-code-heighlight>$ yarn add https://github.com/qh73xe/wavesurfer.vue.git</w-code-heighlight>",
});

export const Default = Template.bind({});
Default.args = {};

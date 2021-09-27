import vuetify from "@/plugins/vuetify";
import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";

export default {
  component: WaveSurfer,
  title: "Components/WaveSurfer",
};

const Template = () => ({
  components: { WaveSurfer },
  vuetify,
  template: `<wave-surfer source='https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc/demo.wav' />`,
});

export const Default = Template.bind({});
Default.args = {};

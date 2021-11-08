import vuetify from "@/plugins/vuetify";
import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";

export default {
  component: WaveSurfer,
  title: "Example/Annotation",
};

const Template = () => ({
  components: { WaveSurfer },
  vuetify,
  data: () => ({
    source:
      "https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc/demo.wav",
    ws: null,
    tg: {
      tier1: {
        type: "interval",
        values: [
          {
            time: 1,
            text: "hoge",
          },
        ],
      },
    },
  }),
  mounted: function () {
    this.ws = this.$refs.ws;
  },
  template: `<wave-surfer
          ref="ws" 
          scrollParent
          showTextGrid
          :value="tg"
          :source="source" />`,
});

export const Default = Template.bind({});
Default.args = {};

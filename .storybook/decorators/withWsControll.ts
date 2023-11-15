import { shallowReactive } from 'vue';
import type { Decorator } from '@storybook/vue3';
import WaveSurfer from '../../src/components/WaveSurfer.vue';
import WSController from "../../src/components/controller/WSController.vue";

const getSource = (file: string) => {
  const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
  if (file === 'stereo') return `${dataURL}/${file}.mp3`;
  if (file === 'mono') return `${dataURL}/demo.wav`;
  if (file === 'video') return `${dataURL}/nasa.mp4`;
  return '';
};

const options = shallowReactive({source : ""});

const withWsControll: Decorator = (story, context) => {
  options.source = getSource(context.globals.file || "");
  return {
    components: { story, WaveSurfer, WSController },
    setup() {
      return { options };
    },
    template: `
    <WaveSurfer
      interact
      autoScroll
      autoCenter
      progressColor="#555"
      cursorColor="#333"
      :cursorWidth="1"
      :source="options.source"
      :hideScrollbar="false"
      :minPxPerSec="100"
    >
      <WSController />
      <story />
    </WaveSurfer>
  `,
  };
};

export default withWsControll;

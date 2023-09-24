import { ref, shallowReactive } from 'vue';
import type { Decorator } from '@storybook/vue3';

import WaveSurfer from '../../src/components/WaveSurfer.vue';

const getSource = (file: string) => {
  const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
  if (file === 'stereo') return `${dataURL}/${file}.mp3`;
  if (file === 'mono') return `${dataURL}/demo.wav`;
  if (file === 'video') return `${dataURL}/nasa.mp4`;
  return '';
};

const getMedia = (file: string) => {
  if (file === 'stereo') return 'audio'
  if (file === 'mono') return 'audio'
  if (file === 'video') return 'video'
  return '';
};


const options = shallowReactive({
  source : "",
  media: "",
});

const withWsMedia: Decorator = (story, context) => {
  options.source = getSource(context.globals.file || "");
  options.media = getMedia(context.globals.file || "");
  return {
    components: { story, WaveSurfer },
    setup() {
      const media = ref<HTMLMediaElement>();
      return { media, options };
    },
    template: `
    <WaveSurfer
      interact
      progressColor="#555"
      cursorColor="#333"
      :cursorWidth="1"
      :source="media || ''"
    >
      <video v-if="options.media === 'video'" ref="media" width=500 :src="options.source" controls playsinline />
      <audio v-if="options.media === 'audio'" ref="media" :src="options.source" controls />
      <story />
    </WaveSurfer>
  `,
  };
};

export default withWsMedia;

import type { Meta, StoryObj } from '@storybook/vue3';

import { ref, watch } from 'vue';
import type { WaveSurferOptions } from 'wavesurfer.js';
import WaveSurfer from './WaveSurfer.vue';

type Options = Omit<WaveSurferOptions, 'container'>

const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOptions = [
  `${dataURL}/demo.wav`,
  `${dataURL}/nasa.mp4`,
  `${dataURL}/demo_video.mp4`,
  `${dataURL}/speech.wav`,
  `${dataURL}/stereo.mp3`,
];
const meta = {
  component: WaveSurfer,
  argTypes: {
    source: { options: sourceOptions },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WaveSurfer>;

export default meta;
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    source: sourceOptions[0],
    height: -1,
    waveColor: '#999',
    progressColor: '#555',
    cursorColor: '#333',
    cursorWidth: 1,
    barWidth: 0,
    barGap: 0,
    barRadius: 0,
    barHeight: 1,
    barAlign: 'center',
    minPxPerSec: 50,
    fillParent: true,
    duration: undefined,
    mediaControls: false,
    autoplay: false,
    interact: true,
    dragToSeek: true,
    hideScrollbar: false,
    audioRate: 1,
    autoScroll: false,
    autoCenter: true,
    sampleRate: 8000,
    normalize: false,
  },
};

export const Video: Story = {
  args: {
    ...Default.args,
    source: sourceOptions[1],
    autoCenter: true,
  },
  render: (args) => ({
    components: { WaveSurfer },
    setup() {
      const { source, ...options } = args;
      const media = ref<HTMLMediaElement>();
      const src = ref<string>(source);
      const wsOptions = ref<Options>(options);
      watch(args, (value) => {
        src.value = value.source;
        wsOptions.value = { ...value, source: undefined };
      });

      return { src, wsOptions, media };
    },
    template: `
      <WaveSurfer v-bind="wsOptions" :source="media">
        <video ref="media" width=500 :src="src" controls playsinline />
      </WaveSurfer>
    `,
  }),
};

export const Bars: Story = {
  args: {
    ...Default.args,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
  },
};

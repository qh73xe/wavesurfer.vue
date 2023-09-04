import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import WaveSurfer from './WaveSurfer.vue';

const meta = {
  component: WaveSurfer,
  tags: ['autodocs'],
} satisfies Meta<typeof WaveSurfer>;

export default meta;
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    source: 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc/demo.wav',
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
    source: 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc/nasa.mp4',
    autoCenter: true,
  },
  render: (args) => ({
    components: { WaveSurfer },
    setup() {
      const media = ref<HTMLMediaElement>();
      const { source, ...options } = args;
      return { source, options, media };
    },
    template: `
      <video ref="media" :src="source" controls/>
      <WaveSurfer v-if="media" v-bind="options" :source="media" />
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

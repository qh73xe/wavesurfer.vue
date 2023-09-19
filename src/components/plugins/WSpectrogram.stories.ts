import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, inject } from 'vue';

import WSKey from '../../providers/WaveSurferProvider';
import WaveSurfer from '../WaveSurfer.vue';
import WSpectrogram from './WSpectrogram.vue';
import type { WSStore } from '../../providers/WaveSurferProvider';

const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOptions = [
  `${dataURL}/demo.wav`,
  `${dataURL}/nasa.mp4`,
  `${dataURL}/demo_video.mp4`,
  `${dataURL}/speech.wav`,
  `${dataURL}/stereo.mp3`,
];

const meta = {
  component: WSpectrogram,
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof WSpectrogram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    labels: true,
    height: 128,
    splitChannels: false,
  },
  render: (args) => ({
    components: { WaveSurfer, WSpectrogram },
    setup() {
      const wsStore = inject(WSKey) as WSStore;
      const source = sourceOptions[4];
      const onZoom = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          const minPxPerSec = event.target.valueAsNumber;
          if (wsStore) wsStore.zoom(minPxPerSec);
        }
      };

      const onPlayPause = () => {
        if (wsStore) wsStore.playPause();
      };

      return { source, args, onZoom, onPlayPause };
    },
    template: `
      <WaveSurfer
        interact
        progressColor="#555"
        cursorColor="#333"
        :cursorWidth="1"
        :source="source"
      >
        <label>
          Zoom: <input type="range" min="10" max="1000" value="100" @input="onZoom" />
        </label>
        <div>
          <button @click="onPlayPause">Play/Pause</button>
        </div>
        <WSpectrogram v-bind="args" />
      </WaveSurfer>
    `,
  }),
};

export const Options: Story = {
  args: {
    fftSamples: 4 * 512,
    height: 128,
    labels: true,
    labelsBackground: "#ff0000",
    labelsColor: "#fff500",
    labelsHzColor: "#0002f1",
    noverlap: 512,
    windowFunc: "hamming",
    frequencyMin: 0,
    frequencyMax: 4000,
    splitChannels: true,
  },
  render: Basic.render
};

export const Video: Story = {
  args: {
    ...Basic.args,
    frequencyMax: 5000,
    splitChannels: false,
  },
  render: (args) => ({
    components: { WaveSurfer, WSpectrogram },
    setup() {
      const source = sourceOptions[1];
      const media = ref<HTMLMediaElement>();

      return { source, media, args };
    },
    template: `
      <WaveSurfer
        interact
        autoScroll
        progressColor="#555"
        cursorColor="#333"
        :minPxPerSec="200"
        :cursorWidth="1"
        :source="media"
      >
        <video ref="media" width=500 :src="source" controls playsinline />
        <WSpectrogram v-bind="args" />
      </WaveSurfer>
    `,
  }),
};

export const SlotExample: Story = {
  args: {
    labels: true,
    height: 128,
    splitChannels: true,
  },
  render: (args) => ({
    components: { WaveSurfer, WSpectrogram },
    setup() {
      const source = ref('');
      const onClick = () => {
        source.value = sourceOptions[0];
      };
      return { source, args, onClick };
    },
    template: `
      <WaveSurfer
        interact
        progressColor="#555"
        cursorColor="#333"
        :cursorWidth="1"
        :source="source"
      >
        <WSpectrogram v-bind="args">
          <button @click="onClick">load source</button>
          <div>There is no source for Spectrogram...</div>
        </WSpectrogram>
      </WaveSurfer>
    `,
  }),
};

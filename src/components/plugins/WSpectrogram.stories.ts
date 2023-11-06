import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, inject } from 'vue';

import withWs from '../../../.storybook/decorators/withWsControll';
import withWsMedia from '../../../.storybook/decorators/withWsMedia';

import WSKey from '../../providers/WaveSurferProvider';
import WaveSurfer from '../WaveSurfer.vue';
import WSpectrogram from './WSpectrogram.vue';
import type { WSStore } from '../../providers/WaveSurferProvider';

const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOption = {
 "mono": `${dataURL}/demo.wav`,
 "stereo": `${dataURL}/stereo.mp3`,
 "video": `${dataURL}/nasa.mp4`,
 "speech": `${dataURL}/speech.wav`,
} as const;
const windowFuncOption = {
  "bartlett": "bartlett",
  "bartlettHann": "bartlettHann",
  "blackman": "blackman",
  "cosine": "cosine",
  "gauss": "gauss",
  "hamming": "hamming",
  "hann": "hann",
  "lanczoz": "lanczoz",
  "rectangular": "rectangular",
  "triangular": "triangular"
} as const;

const meta = {
  component: WSpectrogram,
  argTypes: {
    onClick: { action: 'onClick' },
    onReady: { action: 'onReady' },
    windowFunc: { options: Object.values(windowFuncOption) }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WSpectrogram>;

export default meta;

type Story = StoryObj<typeof meta>;
export const BasicStory: Story = {
  decorators: [withWs],
  args: {
    labels: true,
    height: 128,
    splitChannels: false,
  }
};

export const Options: Story = {
  decorators: [withWs],
  args: {
    fftSamples: 4 * 512,
    height: 128,
    labels: true,
    labelsBackground: "#ff0000",
    labelsColor: "#fff500",
    labelsHzColor: "#0002f1",
    noverlap: 512,
    windowFunc: windowFuncOption.bartlett,
    frequencyMin: 0,
    frequencyMax: 4000,
    splitChannels: true,
  }
};

export const MediaElement: Story = {
  decorators: [withWsMedia],
  args: {
    ...BasicStory.args,
    frequencyMax: 5000,
    splitChannels: false,
  },
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
      const wsStore = inject(WSKey) as WSStore;
      const loaded = wsStore.loaded;

      const onClick = () => {
        source.value = sourceOption.mono
      };
      const onReset = () => {
        source.value = "";
      };

      return { source, args, loaded, onClick, onReset };
    },
    template: `
      <WaveSurfer
        interact
        progressColor="#555"
        cursorColor="#333"
        :cursorWidth="1"
        :source="source"
      >
        <div v-if="loaded"><button @click="onReset">reset source</button></div>
        <WSpectrogram v-bind="args">
          <button @click="onClick">load source</button>
          <div>There is no source for Spectrogram...</div>
        </WSpectrogram>
      </WaveSurfer>
    `,
  }),
};

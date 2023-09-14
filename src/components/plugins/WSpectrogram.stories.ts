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
  render: (args) => ({
    components: { WaveSurfer, WSpectrogram },
    setup() {
      const wsStore = inject(WSKey) as WSStore;
      const source = sourceOptions[0];
      const showSpec = ref<boolean>(false);

      const onLoad = () => {
        showSpec.value = true;
      };

      const onZoom = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          const minPxPerSec = event.target.valueAsNumber;
          if (wsStore) wsStore.zoom(minPxPerSec);
        }
      };

      const onPlayPause = () => {
        if (wsStore) wsStore.playPause();
      };

      return { source, args, showSpec, onLoad, onZoom, onPlayPause };
    },
    template: `
      <WaveSurfer
        interact
        progressColor="#555"
        cursorColor="#333"
        :cursorWidth="1"
        :source="source"
        @load="onLoad"
      >
        <label>
          Zoom: <input type="range" min="10" max="1000" value="100" @input="onZoom" />
        </label>
        <div>
          <button @click="onPlayPause">Play/Pause</button>
        </div>
        <WSpectrogram v-if="showSpec" v-bind="args" />
      </WaveSurfer>
    `,
  }),
  tags: ['autodocs'],
} satisfies Meta<typeof WSpectrogram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    labels: true,
    height: 128,
    splitChannels: true,
  },
};

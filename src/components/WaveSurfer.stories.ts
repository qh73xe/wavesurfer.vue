import type { Meta, StoryObj } from '@storybook/vue3';

import { ref, watch, inject } from 'vue';
import WaveSurfer, { WaveSurferProps } from './WaveSurfer.vue';
import WSKey from '../providers/WaveSurferProvider';
import type { WSStore } from '../providers/WaveSurferProvider';

const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOption = {
 "mono": `${dataURL}/demo.wav`,
 "stereo": `${dataURL}/stereo.mp3`,
 "video": `${dataURL}/nasa.mp4`,
 "speech": `${dataURL}/speech.wav`,
} as const;
const options = Object.values(sourceOption);

const meta = {
  component: WaveSurfer,
  argTypes: {
    source: { options },
    onAudioprocess: { action: 'onAudioProcess' },
    onClick: { action: 'onClick' },
    onDecode: { action: 'onDecode' },
    onDestroy: { action: 'onDestroy' },
    onDrag: { action: 'onDrag' },
    onFinish: { action: 'onFinish' },
    onInteraction: { action: 'onInteraction' },
    onLoad: { action: 'onLoad' },
    onLoading: { action: 'onLoading' },
    onPause: { action: 'onPause' },
    onPlay: { action: 'onPlay' },
    onReady: { action: 'onReady' },
    onRedraw: { action: 'onRedraw' },
    onScroll: { action: 'onScroll' },
    onSeeking: { action: 'onSeeking' },
    onTimeupdate: { action: 'onTimeupdate' },
    onZoom: { action: 'onZoom' },
    onKeydown: { action: 'onKeydown' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WaveSurfer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** WaveSurfer コンポーネントの利用例です. */
export const BasicStory: Story = { args: { source: sourceOption.mono } };

/** WaveSurfer コンポーネントのオプショナルな設定を定義した例です. */
export const OptionsStory: Story = {
  args: {
    source: sourceOption.mono,
    height: 128,
    waveColor: '#ff4e00',
    progressColor: '#dd5e98',
    cursorColor: '#ddd5e9',
    cursorWidth: 2,
    barGap: 0,
    barWidth: 0,
    barRadius: 0,
    barHeight: 0,
    normalize: false,
    barAlign: 'center',
    minPxPerSec: 1,
    fillParent: true,
    mediaControls: true,
    interact: true,
    dragToSeek: false,
    hideScrollbar: false,
    audioRate: 1,
    autoScroll: true,
    autoCenter: true,
    sampleRate: 8000,
    splitChannels: true,
  },
};

/** WaveSurfer コンポーネントのオプショナルな設定を定義した例です. */
export const SplitChannelsStory: Story = {
  args: {
    ...BasicStory.args,
    source: sourceOption.stereo,
    splitChannels: true,
  },
};


export const ZoomStory: Story = {
  args: { ...BasicStory.args },
  render: (args) => ({
    components: { WaveSurfer },
    setup() {
      const wsStore = inject(WSKey) as WSStore;
      const onZoom = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          const minPxPerSec = event.target.valueAsNumber;
          if (wsStore) wsStore.zoom(minPxPerSec);
        }
      };
      const onChange = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          const checked = event.target.checked;
          if (wsStore) wsStore.setOptions({ [event.target.value]: checked });
        }
      };
      const onPlayPause = () => {
        if (wsStore) wsStore.playPause();
      };

      const onForward = () => {
        if (wsStore) wsStore.skip(5);
      };

      const onBack = () => {
        if (wsStore) wsStore.skip(-5);
      };

      return { args, onZoom, onChange, onPlayPause, onForward, onBack };
    },
    template: `
      <WaveSurfer v-bind="args">
        <label>
          Zoom: <input type="range" min="10" max="1000" value="100" @input="onZoom" />
        </label>
        <label><input type="checkbox" checked value="scrollbar" @change="onChange" /> Scroll bar</label>
        <label><input type="checkbox" checked value="fillParent" @change="onChange" /> Fill parent</label>
        <label><input type="checkbox" checked value="autoCenter" @change="onChange" /> Auto center</label>
        <div style="margin: 1em 0 2em;">
          <button @click="onPlayPause">Play/Pause</button>
          <button id="backward" @click="onBack">Backward 5s</button>
          <button id="forward" @click="onForward">Forward 5s</button>
        </div>
      </WaveSurfer>
    `,
  }),
};

export const VideoStory: Story = {
  args: {
    ...BasicStory.args,
    source: sourceOption.video,
    autoCenter: true,
  },
  render: (args) => ({
    components: { WaveSurfer },
    setup() {
      const { source, ...options } = args;
      const media = ref<HTMLMediaElement>();
      const src = ref<string | HTMLMediaElement>(source);
      const wsOptions = ref<WaveSurferProps>({ ...options, source: '' });
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

export const BarsStory: Story = {
  args: {
    ...BasicStory.args,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
  },
};

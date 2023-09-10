import type { Meta, StoryObj } from '@storybook/vue3';

import WS from 'wavesurfer.js';
import { ref, watch, inject } from 'vue';
import WaveSurfer, { Props as WaveSurferProps } from './WaveSurfer.vue';
import WSKey from "../../providers/WaveSurferProvider"
import type { WSStore } from "../../providers/WaveSurferProvider"


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
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WaveSurfer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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
    barAlign: undefined,
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

export const Zoom: Story = {
  args: { ...Basic.args },
  render: (args) => ({
    components: { WaveSurfer },
    setup() {
      const wsStore = inject(WSKey) as WSStore
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

export const Video: Story = {
  args: {
    ...Basic.args,
    source: sourceOptions[1],
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

export const Bars: Story = {
  args: {
    ...Basic.args,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
  },
};

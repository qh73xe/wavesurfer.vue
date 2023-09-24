import { inject, shallowReactive } from 'vue';
import type { Decorator } from '@storybook/vue3';

import WSKey from '../../src/providers/WaveSurferProvider';
import type { WSStore } from '../../src/providers/WaveSurferProvider';

import WaveSurfer from '../../src/components/WaveSurfer.vue';

const getSource = (file: string) => {
  const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
  if (file === 'stereo') return `${dataURL}/${file}.mp3`;
  if (file === 'mono') return `${dataURL}/demo.wav`;
  if (file === 'video') return `${dataURL}/nasa.mp4`;
  return '';
};

const options = shallowReactive({source : ""});

const withWs: Decorator = (story, context) => {
  options.source = getSource(context.globals.file || "");
  return {
    components: { story, WaveSurfer },
    setup() {
      const wsStore = inject(WSKey) as WSStore;
      const loaded = wsStore.loaded;

      const onZoom = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          const minPxPerSec = event.target.valueAsNumber;
          if (wsStore) wsStore.zoom(minPxPerSec);
        }
      };

      const onPlayPause = () => {
        if (wsStore) wsStore.playPause();
      };

      return { loaded, options, onZoom, onPlayPause };
    },
    template: `
    <WaveSurfer
      interact
      progressColor="#555"
      cursorColor="#333"
      :cursorWidth="1"
      :source="options.source"
    >
      <div v-if="loaded">
        <label>
          Zoom: <input type="range" min="10" max="1000" value="100" @input="onZoom" />
        </label>
        <div>
          <button @click="onPlayPause">Play/Pause</button>
        </div>
      </div>
      <story />
    </WaveSurfer>
  `,
  };
};

export default withWs;

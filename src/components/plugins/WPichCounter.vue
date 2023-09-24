<script setup lang="ts">
import { inject, watch } from 'vue';
import WSKey from '../../providers/WaveSurferProvider';
import type { WSStore } from '../../providers/WaveSurferProvider';

export interface WPichCounterProps {
  pitchColor?: string | CanvasGradient;
  height?: number;
}
const props = withDefaults(defineProps<WPichCounterProps>(), {
  pitchColor: '#E91E63',
  height: 100,
});


type Frequency = number | null
type Frequencies = Frequency[]
const emit = defineEmits<{
  ready: [frequencies: Frequency, baseFrequency: number];
}>();


const workerURL = new URL('../../worker/pitch-worker', import.meta.url);
const pitchWorker = new Worker(workerURL, { type: 'module' });

const wsStore = inject(WSKey) as WSStore;
const loaded = wsStore.loaded;


const init = () => {
  if (wsStore && wsStore.wavesurfer.value) {
    const ws = wsStore.wavesurfer.value;
    wsStore.wavesurfer.value.on('decode', () => {
      const data = ws.getDecodedData()
      if (data) {
        const peaks = data.getChannelData(0)
        const sampleRate = data.sampleRate
        pitchWorker.postMessage({ peaks, sampleRate })
      }
    })
  }
}

const render = (frequencies: Frequencies, baseFrequency: number) => {
  if (wsStore && wsStore.wavesurfer.value) {
    const ws = wsStore.wavesurfer.value;

    // Render the frequencies on a canvas
    const pitchColor = props.pitchColor;
    const height = props.height;

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.height = height
    canvas.width = frequencies.length
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    if (ctx) {
      const pointSize = devicePixelRatio
      frequencies.forEach((frequency, index) => {
        if (!frequency) return
        const y = Math.round(height - (frequency / (baseFrequency * 2)) * height)
        ctx.fillStyle = pitchColor
        ctx.fillRect(index, y, pointSize, pointSize)
      })
      ws.getWrapper().appendChild(canvas)
      ws.once('load', () => canvas.remove())
    }
  }
}

pitchWorker.onmessage = (e) => {
  const { frequencies, baseFrequency } = e.data
  render(frequencies, baseFrequency);
  emit('ready', frequencies, baseFrequency);
};

watch(loaded, (newValue) => {
  if (newValue) init();
});
</script>

<template>
  <slot />
</template>

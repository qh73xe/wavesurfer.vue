<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import Spectrogram from 'wavesurfer.js/plugins/spectrogram';
import type SpectrogramPlugin from 'wavesurfer.js/plugins/spectrogram';

import WSKey from '../../providers/WaveSurferProvider';
import type { WSStore } from '../../providers/WaveSurferProvider';

export type WindowFunc =
  | 'bartlett'
  | 'bartlettHann'
  | 'blackman'
  | 'cosine'
  | 'gauss'
  | 'hamming'
  | 'hann'
  | 'lanczoz'
  | 'rectangular'
  | 'triangular';

export interface SpectrogramProps {
  /** Number of samples to fetch to FFT. Must be a power of 2. */
  fftSamples?: number;
  /** Height of the spectrogram view in CSS pixels */
  height?: number;
  /** Set to true to display frequency labels. */
  labels?: boolean;
  labelsBackground?: string;
  labelsColor?: string;
  labelsHzColor?: string;
  /** Size of the overlapping window. Must be < fftSamples. Auto deduced from canvas size by default. */
  noverlap?: number;
  /** The window function to be used. */
  windowFunc?: WindowFunc;
  /** Some window functions have this extra value. (Between 0 and 1) */
  alpha?: number;
  /** Min frequency to scale spectrogram. */
  frequencyMin?: number;
  /** Max frequency to scale spectrogram. Set this to samplerate/2 to draw whole range of spectrogram. */
  frequencyMax?: number;
  /**
   * A 256 long array of 4-element arrays. Each entry should contain a float between 0 and 1 and specify r, g, b, and alpha.
   * Each entry should contain a float between 0 and 1 and specify r, g, b, and alpha.
   */
  colorMap?: number[][];
  /** Render a spectrogram for each channel independently when true. */
  splitChannels?: boolean;
}

const props = withDefaults(defineProps<SpectrogramProps>(), {
  labels: true,
  height: 128,
  splitChannels: true,
});

const spectrogram = ref<SpectrogramPlugin | null>(null);
const wsStore = inject(WSKey) as WSStore;
const loaded = wsStore.loaded;

/** Spectrogram インスタンスを WaveSurfer に登録する */
const init = (conf?: SpectrogramProps) => {
  if (wsStore) {
    const option = conf || props;
    const spec = Spectrogram.create(option);
    wsStore.registerPlugin<SpectrogramPlugin>(spec);
    spectrogram.value = spec;
  }
};

/** Spectrogram のレンダーを実行する */
const render = () => {
  if (spectrogram.value && loaded) {
    try {
      spectrogram.value.render();
    } catch (e) {
      console.error(e);
    }
  }
};

/** media 読み込みを監視し Spectrogram の初期化を行う */
watch(loaded, (newValue) => {
  if (newValue) {
    init();
    render();
  }
});

/** props を監視し Spectrogram に反映する */
watch(props, (newValue) => {
  if (spectrogram.value) {
    spectrogram.value.destroy();
    init(newValue);
    render();
  }
});
</script>

<template><slot v-if="!loaded" /></template>

<script setup lang="ts">
import WSToolbar from './controller/WSToolbar.vue';
import AddTierDialog, { NewTierProps } from './dialog/AddTierDialog.vue';
import WaveSurfer from './WaveSurfer.vue';
import WSpectrogram from './plugins/WSpectrogram.vue';
import WTextGrid from './plugins/WTextGrid.vue';
import type { TextGrid } from './plugins/textgrid';
import { ref } from 'vue';

export interface KeyMap {
  key: string;
  repeat: boolean;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey?: boolean;
  callback: () => void;
}

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


export interface TextGridProps {
  /** Allow/dissallow dragging the region */
  drag?: boolean
  /** Height of the spectrogram view in CSS pixels */
  height?: number;
  /** ボーダーカラー */
  borderColor?: string;
  /** レンダー対象のデータ形式 */
  data?: TextGrid;
  /** Tier 名を表示するか否か */
  showLabel?: boolean;
}

export interface TextEditorProps {
  source: string | HTMLMediaElement;
  height?: number | 'auto';
  waveColor?: string | string[] | CanvasGradient;
  progressColor?: string | string[] | CanvasGradient;
  cursorColor?: string;
  cursorWidth?: number;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
  barHeight?: number;
  barAlign?: 'center' | 'top' | 'bottom';
  minPxPerSec?: number;
  fillParent?: boolean;
  mediaControls?: boolean;
  interact?: boolean;
  dragToSeek?: boolean;
  hideScrollbar?: boolean;
  audioRate?: number;
  autoScroll?: boolean;
  autoCenter?: boolean;
  sampleRate?: number;
  normalize?: boolean;
  keymaps?: KeyMap[];
  splitChannels?: boolean;
  spectrogram?: SpectrogramProps;
  textgrid?: TextGridProps;
}

const props = withDefaults(defineProps<TextEditorProps>(), {
  source: '',
  interact: true,
  autoScroll: true,
  autoCenter: true,
  minPxPerSec: 100,
  waveColor: '#999',
  progressColor: '#555',
  cursorWidth: 1,
  cursorColor: '#333',
  fillParent: true,
  labels: true,
  height: 128,
  splitChannels: true,
  spectrogram: () => ({ 
    height: 256,
    frequencyMax: 5000,
    splitChannels: false,
  }),
});

const textGridData = ref<TextGrid>(props.textgrid?.data || {});

const addIntervalTierDialog = ref(false);
const addPointTierDialog = ref(false);
const duplicateTierDialog = ref(false);

const onToolbarClick = (name: string) => {
  if (name === "add-interval-tier") {
    addIntervalTierDialog.value = true;
  } else if (name === "add-point-tier") {
    addPointTierDialog.value = true;
  } else if (name === "duplicate-tier") {
    duplicateTierDialog.value = true;
  }
};
const onTierSubmit = (newItem: NewTierProps) => {
  if (newItem.tierName) {
    if (newItem.tierType === "interval") {
      textGridData.value = {
        ...textGridData.value,
        [newItem.tierName]: {
          name: newItem.tierName,
          type: "interval",
          items: [],
        },
      }
    } else if (newItem.tierType === "point") {
      textGridData.value = {
        ...textGridData.value,
        [newItem.tierName]: {
          name: newItem.tierName,
          type: "point",
          items: [],
        },
      }
    } else {
      console.log("duplicate", newItem.tierType)
    }
  }
}
</script>

<template>
  <v-card>
    <w-s-toolbar @click="onToolbarClick" />
    <add-tier-dialog @submit="onTierSubmit" v-model="addIntervalTierDialog" tier-type="interval"/>
    <add-tier-dialog @submit="onTierSubmit" v-model="addPointTierDialog" tier-type="point"/>
    <add-tier-dialog @submit="onTierSubmit" v-model="duplicateTierDialog" tier-type="duplicate"/>
    <wave-surfer
      :source="source"
      :height="height"
      :waveColor="waveColor"
      :progressColor="progressColor"
      :cursorColor="cursorColor"
      :cursorWidth="cursorWidth"
      :barWidth="barWidth"
      :barGap="barGap"
      :barRadius="barRadius"
      :barHeight="barHeight"
      :barAlign="barAlign"
      :minPxPerSec="minPxPerSec"
      :fillParent="fillParent"
      :mediaControls="mediaControls"
      :interact="interact"
      :dragToSeek="dragToSeek"
      :hideScrollbar="hideScrollbar"
      :audioRate="audioRate"
      :autoScroll="autoScroll"
      :autoCenter="autoCenter"
      :sampleRate="sampleRate"
      :normalize="normalize"
      :keymaps="keymaps"
      :splitChannels="splitChannels"
    >
      <slot />
      <w-spectrogram 
        :fftSamples="spectrogram?.fftSamples"
        :height="spectrogram?.height"
        :labels="spectrogram?.labels"
        :labelsBackground="spectrogram?.labelsBackground"
        :labelsColor="spectrogram?.labelsColor"
        :labelsHzColor="spectrogram?.labelsHzColor"
        :noverlap="spectrogram?.noverlap"
        :windowFunc="spectrogram?.windowFunc"
        :alpha="spectrogram?.alpha"
        :frequencyMin="spectrogram?.frequencyMin"
        :frequencyMax="spectrogram?.frequencyMax"
        :colorMap="spectrogram?.colorMap"
        :splitChannels="spectrogram?.splitChannels"
      />
      <w-text-grid 
        :drag="textgrid?.drag"
        :height="textgrid?.height"
        :borderColor="textgrid?.borderColor"
        :data="textGridData"
        :showLabel="textgrid?.showLabel"
      />
    </wave-surfer>
  </v-card>
</template>

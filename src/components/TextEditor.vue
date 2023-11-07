<script setup lang="ts">
import { inject, ref } from 'vue';

import WSKey from '../providers/WaveSurferProvider';
import type { WSStore } from '../providers/WaveSurferProvider';

import useTiers from '../hooks/useTiers';
import WSToolbar from './controller/WSToolbar.vue';
import AddTierDialog, { NewTierProps } from './dialog/AddTierDialog.vue';
import RenameTierDialog from './dialog/RenameTierDialog.vue';
import WaveSurfer from './WaveSurfer.vue';
import WSpectrogram from './plugins/WSpectrogram.vue';
import WTextGrid from './plugins/WTextGrid.vue';
import type { TextGrid, TierEvent, TierUpdateEvent, TierMouseEvent } from './plugins/textgrid';

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

const wsStore = inject(WSKey) as WSStore;

/** 音声波形の表示幅 */
const minPxPerSec = ref<number>(props.minPxPerSec);

/** アノテーションデータ */
const textGridData = ref<TextGrid>(props.textgrid?.data || {});

/** INTERVAL TIER 追加ダイアログの開閉フラク */
const addIntervalTierDialog = ref<boolean>(false);

/** POINT TIER 追加ダイアログの開閉フラク */
const addPointTierDialog = ref<boolean>(false);

/** TIER 複製ダイアログの開閉フラク */
const duplicateTierDialog = ref<boolean>(false);

/** TIER 名称変更ダイアログの開閉フラク */
const renameTierDialog = ref<boolean>(false);

/** TIER ITEM の Text 変更フィールド文字列 */
const intervalText = ref<string>("");

/** 選択された TIER ITEM の 時刻情報 */
const activeTierItemTime = ref<number | null>(null);

const textfield = ref<HTMLInputElement | null>(null);

/** TIER 操作フック */
const { 
  setActiveTierID,
  createTier,
  duplicateActiveTier,
  updateTierItem,
  renameActiveTier,
  removeActiveTier,
  removeActiveTierTexts,
  updateActiveTierItemText,
} = useTiers();

/** ツールバーからの関数発火 */
const onToolbarClick = (name: string) => {
  if (name === "zoom-in") {
    onZoomIn();
  } else if (name === "zoom-out") {
    onZoomOut();
  } else if (name === "add-interval-tier") {
    addIntervalTierDialog.value = true;
  } else if (name === "add-point-tier") {
    addPointTierDialog.value = true;
  } else if (name === "duplicate-tier") {
    duplicateTierDialog.value = true;
  } else if (name === "rename-tier") {
    renameTierDialog.value = true;
  } else if (name === "remove-all-text-from-tier") {
      onRemoveAllTextFromTier();
  } else if (name === "remove-entire-tier") {
      onRemoveEntireTier();
  } else {
    console.log(name)
  }
};

const onZoomIn = () => {
  if (wsStore) {
    minPxPerSec.value = minPxPerSec.value + 10;
    wsStore.zoom(minPxPerSec.value);
  }
}

const onZoomOut = () => {
  if (wsStore) {
    const newValue = minPxPerSec.value - 10;
    if (newValue >= props.minPxPerSec) {
      minPxPerSec.value = newValue;
      wsStore.zoom(minPxPerSec.value);
    }
  }
}


const onRemoveEntireTier = () => {
  textGridData.value = removeActiveTier(textGridData.value);
  setActiveTierID(null);
}

const onRemoveAllTextFromTier = () => {
  textGridData.value = removeActiveTierTexts(textGridData.value)
  setActiveTierID(null);
}

/** TIER 新規/コピーダイアログ承認時の動作  */
const onTierDialogSubmit = (newItem: NewTierProps) => {
  const name = newItem.tierName;
  const type = newItem.tierType;
  if (name) {
    if (type === "duplicate") {
      textGridData.value = duplicateActiveTier(name, textGridData.value);
      setActiveTierID(null);
    } else {
      textGridData.value = createTier({ name, type }, textGridData.value);
      setActiveTierID(null);
    }
  }
}

/** TIER 名変更ダイアログ承認時の動作  */
const onTierRenameDialogSubmit = (newName: string) => {
  textGridData.value = renameActiveTier(newName, textGridData.value)
}

const setActiveItem = (event: TierEvent) => {
  // アクティブな TIER を決定
  setActiveTierID(event.tierID);
  activeTierItemTime.value = event.item.time;
  if(textfield.value) {
    // テキスト入力フィールドにテキストをセット
    intervalText.value = event.item.text;
    textfield.value.focus();
  }
}

const onChangeTextGrid = (event: TierUpdateEvent) => {
  setActiveItem(event);
  textGridData.value = updateTierItem(event.tierID, event.index, event.item, textGridData.value);
}


/** TIER 選択時の動作  */
const onTextGridClick = (event: TierMouseEvent) => {
  setActiveItem(event);
}

const onUpdateText = (text: string) => {
  intervalText.value = text;
  const time = activeTierItemTime.value;
  if (time) {
    const newItem = { time, text }
    textGridData.value = updateActiveTierItemText(newItem, textGridData.value);
  }
}
</script>

<template>
  <v-card>
    <w-s-toolbar @click="onToolbarClick" />
    <add-tier-dialog @submit="onTierDialogSubmit" v-model="addIntervalTierDialog" tier-type="interval"/>
    <add-tier-dialog @submit="onTierDialogSubmit" v-model="addPointTierDialog" tier-type="point"/>
    <add-tier-dialog @submit="onTierDialogSubmit" v-model="duplicateTierDialog" tier-type="duplicate"/>
    <rename-tier-dialog @submit="onTierRenameDialogSubmit" v-model="renameTierDialog" />
    <v-text-field
      :model-value="intervalText"
      @update:modelValue="onUpdateText"
      ref="textfield"
      density="compact"
      variant="solo"
      single-line
      hide-details
    />
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
        @click="onTextGridClick"
        @updated="onChangeTextGrid"
      />
    </wave-surfer>
  </v-card>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import WSKey from '../../providers/WaveSurferProvider';

import type { WSStore } from '../../providers/WaveSurferProvider';
import Plugin from './textgrid'
import type { TextGrid } from './textgrid';

export interface TextGridProps {
  /** Allow/dissallow dragging the region */
  drag?: boolean
  /** Height of the spectrogram view in CSS pixels */
  height?: number;
  /** ボーダーカラー */
  borderColor?: string;
  /** レンダー対象のデータ形式 */
  textGrid?: TextGrid;
  /** Tier 名を表示するか否か */
  showLabel?: boolean;
}
const props = withDefaults(defineProps<TextGridProps>(), {
  drag: true,
  showLabel: true,
});
const emit = defineEmits<{
  ready: [];
  click: [relativeX: number];
}>();
const textgrid = ref<Plugin | null>(null);
const wsStore = inject(WSKey) as WSStore;
const loaded = wsStore.loaded;

/** Spectrogram インスタンスを WaveSurfer に登録する */
const init = (conf?: TextGridProps) => {
  if (wsStore) {
    const option = conf || props;
    const tg = Plugin.create(option);
    tg.on('ready', () => emit('ready'));
    wsStore.registerPlugin<Plugin>(tg);
  }
};

/** props を監視し Spectrogram に反映する */
watch(props, (newValue) => {
  if (textgrid.value) {
    init(newValue);
  }
});

/** media 読み込みを監視し Spectrogram の初期化を行う */
watch(loaded, (newValue) => {
  if (newValue) init();
});

</script>

<template>
  <slot />
</template>

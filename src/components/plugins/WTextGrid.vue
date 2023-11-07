<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import WSKey from '../../providers/WaveSurferProvider';

import type { WSStore } from '../../providers/WaveSurferProvider';
import Plugin from './textgrid'
import type { TextGrid, TierUpdateEvent, TierMouseEvent } from './textgrid';

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
const props = withDefaults(defineProps<TextGridProps>(), {
  drag: true,
  showLabel: true,
});
const emit = defineEmits<{
  ready: [event: Plugin];
  click: [event: TierMouseEvent];
  dblclick: [event: TierMouseEvent];
  update: [event: TierUpdateEvent];
  updated: [event: TierUpdateEvent];
  mouseenter: [event: MouseEvent, index: number];
  mouseleave: [event: MouseEvent, index: number];
}>();
const textgrid = ref<Plugin | null>(null);
const wsStore = inject(WSKey) as WSStore;
const loaded = wsStore.loaded;

/** Spectrogram インスタンスを WaveSurfer に登録する */
const init = (conf?: TextGridProps) => {
  if (wsStore) {
    if (textgrid.value) {
      textgrid.value.destroy();
      textgrid.value = null;
    }
    const option = conf || props;
    const tg = Plugin.create(option);
    tg.on('ready', () => emit('ready', tg));
    tg.on('tier-click', (event: TierMouseEvent) => emit('click', event));
    tg.on('tier-dblclick', (event: TierMouseEvent) => emit('dblclick', event));
    tg.on('tier-mouseenter', (event: MouseEvent, index: number) => emit('mouseenter', event, index));
    tg.on('tier-mouseleave', (event: MouseEvent, index: number) => emit('mouseleave', event, index));
    tg.on('tier-update', (event: TierUpdateEvent) => emit('update', event));
    tg.on('tier-update-end', (event: TierUpdateEvent) => emit('updated', event));
    wsStore.registerPlugin<Plugin>(tg);
    textgrid.value = tg;
  }
};

/** props を監視し TextGrid の再レンダーを行う */
watch(props, (newValue) => {
  if (textgrid.value && newValue.data) {
    textgrid.value.setData(newValue.data);
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

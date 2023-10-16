<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import WSKey from '../../providers/WaveSurferProvider';

import type { WSStore } from '../../providers/WaveSurferProvider';
import Plugin from './textgrid'
import type { TextGrid } from './textgrid';

export interface TextGridProps {
  tg?: TextGrid;
}
const props = withDefaults(defineProps<TextGridProps>(), {});
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
    tg.on('click', (relativeX) => emit('click', relativeX));
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

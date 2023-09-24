<script setup lang="ts">
  import { inject, ref, watch } from 'vue';
  import Regions from 'wavesurfer.js/plugins/regions';
  import type RegionsPlugin from 'wavesurfer.js/plugins/regions';

  import WSKey from '../../providers/WaveSurferProvider';
  import type { WSStore } from '../../providers/WaveSurferProvider';

   const regions = ref<RegionsPlugin | null>(null);

  const wsStore = inject(WSKey) as WSStore;
  const loaded = wsStore.loaded;


  /** Spectrogram インスタンスを WaveSurfer に登録する */
  const init = () => {
    if (wsStore) {
      const reg = Regions.create();
      wsStore.registerPlugin<RegionsPlugin>(reg);
      regions.value = reg;
    }
  };

  /** media 読み込みを監視し Spectrogram の初期化を行う */
  watch(loaded, (newValue) => {
    if (newValue) init();
  });
</script>

<template><slot v-if="!loaded" /></template>

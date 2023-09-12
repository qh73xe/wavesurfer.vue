<template>
  <div ref="spectrogram" />
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import Spectrogram from 'wavesurfer.js/plugins/spectrogram';

import WSKey from '../../providers/WaveSurferProvider';
import type { WSStore } from '../../providers/WaveSurferProvider';

const wsStore = inject(WSKey) as WSStore;
const spectrogram = ref<HTMLDivElement>();

const init = () => {
  console.log('spectrogram:init');
  if (wsStore && spectrogram.value) {
    wsStore.registerPlugin(Spectrogram.create({ container: spectrogram.value }));
  }
};

onMounted(() => {
  console.log('spectrogram:onMounted');
  if (wsStore && wsStore.wavesurfer.value) {
    init();
  }
});
</script>

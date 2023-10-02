<script setup lang="ts">
import { inject } from 'vue';
import WSKey from '../../providers/WaveSurferProvider';
import type { WSStore } from '../../providers/WaveSurferProvider';

export interface WSControllerProps {
  /** スキップの長さ */
  skip?: number;
  /** ロンクスキップの長さ */
  longSkip?: number;
  /** zoom の基準値 */
  minPxPerSec?: number;
  /** vutify のテーマ */
  theme?: string
  /** 背景色 */
  color?: string
  /** バーの大きさ */
  density?: string
}

const props = withDefaults(defineProps<WSControllerProps>(), {
  skip: 1,
  longSkip: 5,
  theme: "dark",
  color: "blue-grey-darken-4",
  density: "compact",
});

const emit = defineEmits<{
  "update:minPxPerSec": [event: number];
}>();

const wsStore = inject(WSKey) as WSStore;

const onPlayPause = () => {
  if (wsStore) wsStore.playPause();
};

const onSkipNext = () => {
  if (wsStore) wsStore.skip(props.skip);
};

const onSkipPrevious = () => {
  if (wsStore) wsStore.skip(-1 * props.skip);
};

const onSkipForward = () => {
  if (wsStore) wsStore.skip(props.longSkip);
};

const onSkipBackword = () => {
  if (wsStore) wsStore.skip(-1 * props.longSkip);
};

const onZoomIn = () => {
  if (wsStore) {
    const minPxPerSec = props.minPxPerSec || 100;
    wsStore.zoom(minPxPerSec + 10);
    emit("update:minPxPerSec", minPxPerSec);
  }
};

const onZoomOut = () => {
  if (wsStore) {
    const minPxPerSec = props.minPxPerSec || 100;
    const newValue = minPxPerSec - 10 > 1 ? minPxPerSec - 10 : 1;
    wsStore.zoom(newValue);
    emit("update:minPxPerSec", newValue);
  }
};
</script>

<template>
  <v-card :color="props.color" :theme="props.theme">
    <v-toolbar :density="props.density">
      <v-btn @click="onSkipBackword" icon="mdi-skip-backward" />
      <v-btn @click="onSkipPrevious" icon="mdi-skip-previous" />
      <v-btn @click="onZoomOut" icon="mdi-magnify-minus" />
      <slot name="prepend" />

      <v-spacer />
      <v-btn @click="onPlayPause" icon="mdi-play-pause" />
      <v-spacer />

      <slot name="append" />
      <v-btn @click="onZoomIn" icon="mdi-magnify-plus" />
      <v-btn @click="onSkipNext" icon="mdi-skip-next" />
      <v-btn @click="onSkipForward" icon="mdi-skip-forward" />
    </v-toolbar>
  </v-card>
</template>

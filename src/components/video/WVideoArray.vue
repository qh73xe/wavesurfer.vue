<script setup lang="ts">
import { ref } from 'vue';
import WVideo from './WVideo.vue';

export interface WVideoArrayProps {
  /** 表示対象の video ソース */
  source: string;
  /** 音声のミュート設定 */
  muted: boolean;
  /** 見た目を flat にするか否か */
  flat: boolean;
  /** 角を丸めるか否か */
  tile: boolean;
}

const props = withDefaults(
  defineProps<WVideoArrayProps>(),
  {
    source: '',
    muted: true,
    flat: false,
    tile: false,
  },
);

const emit = defineEmits<{
  loadeddata: [vide: HTMLVideoElement];
}>();

const video = ref<HTMLVideoElement | null>(null);
const prevVideo = ref<HTMLVideoElement | null>(null);
const nextVideo = ref<HTMLVideoElement | null>(null);

const onPrevLoadeddata = (event: HTMLVideoElement) => {
  prevVideo.value = event;
};

const onNextLoadeddata = (event: HTMLVideoElement) => {
  nextVideo.value = event;
};
const onLoadeddata = (event: HTMLVideoElement) => {
  video.value = event;
  emit('loadeddata', event);
};
</script>

<template>
  <v-row>
    <v-col class="pa-0">
      <w-video
        muted
        flat
        :source="props.source"
      >
        <slot name="prev" />
      </w-video>
    </v-col>
    <v-col class="pa-0">
      <w-video
        flat
        :source="props.source"
        @loadeddata="onLoadeddata"
      >
        <slot name="current" />
      </w-video>
    </v-col>
    <v-col class="pa-0">
      <w-video
        muted
        flat
        :source="props.source"
      >
        <slot name="next" />
      </w-video>
    </v-col>
  </v-row>
</template>

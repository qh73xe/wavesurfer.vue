<script setup lang="ts">
import { ref } from 'vue';
import WVideo from './WVideo.vue';

export interface WVideoArrayProps {
  /** 表示対象の video ソース */
  source: string;
  /** 音声のミュート設定 */
  muted?: boolean;
  /** 見た目を flat にするか否か */
  flat?: boolean;
  /** 角を丸めるか否か */
  tile?: boolean;
  // どの程度前後をずらすか?
  frameOffset?: number;
  // 1秒あたりのフレーム数
  frameRate?: number;
}

const props = withDefaults(
  defineProps<WVideoArrayProps>(),
  {
    source: '',
    muted: true,
    flat: false,
    tile: false,
    frameOffset: 1,
    frameRate: 1/30,
  },
);

const emit = defineEmits<{
  loadeddata: [vide: HTMLVideoElement];
  timeupdate: [time: number];
  "timeupdate:prev": [time: number];
  "timeupdate:next": [time: number];
}>();

const video = ref<HTMLVideoElement | null>(null);
const prevVideo = ref<HTMLVideoElement | null>(null);
const nextVideo = ref<HTMLVideoElement | null>(null);
const frameOffset = ref<number>(props.frameOffset || 1);
const frameRate = ref<number>(props.frameRate || 30);

/** 動画読み込み終了時に親要素に Media Element を伝達 */
const onLoadeddata = (event: HTMLVideoElement) => {
  video.value = event;
  emit('loadeddata', event);
};
/** 動画読み込み終了時に親要素に Media Element を伝達 */
const onPrevLoadeddata = (event: HTMLVideoElement) => {
  prevVideo.value = event;
};
/** 動画読み込み終了時に親要素に Media Element を伝達 */
const onNextLoadeddata = (event: HTMLVideoElement) => {
  nextVideo.value = event;
};

const syncTime = (time: number) => {
  const offsetTime = frameOffset.value * frameRate.value;
  if (prevVideo.value) {
    if (time - offsetTime < 0 && prevVideo.value) {
      prevVideo.value.currentTime = 0;
    } else  {
      prevVideo.value.currentTime = time;
    }
  }
  if (nextVideo.value) {
    const duration = nextVideo.value.duration;
    if (offsetTime + time > duration) {
      nextVideo.value.currentTime = time;
    } else {
      nextVideo.value.currentTime = time + offsetTime;
    }
  }
};
/** 中央フレーム更新時に前後フレーム時刻を変更 */
const onTimeupdate = (time: number) => {
  emit('timeupdate', time);
  syncTime(time);
};
/** 前フレーム更新時に親要素に通達 */
const onPrevTimeupdate = (time: number) => {
  emit('timeupdate:prev', time);
};

/** 後フレーム更新時に親要素に通達 */
const onNextTimeupdate = (time: number) => {
  emit('timeupdate:next', time);
};

</script>

<template>
  <v-row>
    <v-col class="pa-0">
      <w-video
        muted
        :flat="props.flat"
        :tile="props.tile"
        @loadeddata="onPrevLoadeddata"
        @timeupdate="onPrevTimeupdate"
        :source="props.source"
      >
        <slot name="prev" />
      </w-video>
    </v-col>
    <v-col class="pa-0">
      <w-video
        :flat="props.flat"
        :tile="props.tile"
        :muted="props.muted"
        :source="props.source"
        @loadeddata="onLoadeddata"
        @timeupdate="onTimeupdate"
      >
        <slot name="current" />
      </w-video>
    </v-col>
    <v-col class="pa-0">
      <w-video
        muted
        :flat="props.flat"
        :tile="props.tile"
        :source="props.source"
        @loadeddata="onNextLoadeddata"
        @timeupdate="onNextTimeupdate"
      >
        <slot name="next" />
      </w-video>
    </v-col>
  </v-row>
</template>

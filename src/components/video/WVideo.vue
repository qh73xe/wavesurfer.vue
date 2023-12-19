<script setup lang="ts">
import { ref, computed } from 'vue';

export interface WVideoProps {
  /** 表示対象の video ソース */
  source: string;
  /** 音声のミュート設定 */
  muted?: boolean;
  /** 見た目を flat にするか否か */
  flat?: boolean;
  /** 角を丸めるか否か */
  tile?: boolean;
  /** Video 操作用コントロールを表示するか否か */
  controls?: boolean;
}
export interface ResizeEvent {
  width: number;
  height: number;
}
/** 表示対象の video ソース */

const props = withDefaults(defineProps<WVideoProps>(), {
  source: '',
  muted: false,
  flat: false,
  tile: false,
  controls: false,
});

const emit = defineEmits<{
  resize: [event: ResizeEvent];
  loadeddata: [vide: HTMLVideoElement];
  timeupdate: [time: number];
}>();

const video = ref<HTMLVideoElement | null>(null);
const duration = ref<number | null>(null);
const currentTime = ref<number>(0);
const playIcon = ref<'mdi-play' | 'mdi-pause'>('mdi-play');

const videoStyle = {
  width: '100%',
  height: 'auto',
};
const canvasStyle = { position: 'relative' };
const actionStyle = {
  position: 'absolute',
  bottom: '0px',
  left: '0px',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

/** リサイズイベントハンドラ */
const onResize = () => {
  if (video.value) {
    emit('resize', {
      width: video.value.clientWidth,
      height: video.value.clientHeight,
    });
  }
};

/** 動画読み込み終了イベントハンドラ */
const onLoaded = () => {
  onResize();
  if (video.value) {
    duration.value = video.value.duration;
    emit('loadeddata', video.value);
  }
};

const onTimeupdate = () => {
  if (video.value) {
    currentTime.value = video.value.currentTime;
    emit('timeupdate', video.value.currentTime);
  }
};

const play = () => {
  if (video.value) {
    video.value.play();
    playIcon.value = 'mdi-pause';
  }
};

const pause = () => {
  if (video.value) {
    video.value.pause();
    playIcon.value = 'mdi-play';
  }
};

const onPlayClick = () => {
  if (video.value) {
    if (video.value.paused) {
      play();
    } else {
      pause();
    }
  }
};

const secTostring = (seconds: number): string => {
  const date = new Date(seconds * 1000).toUTCString();
  const result = date.match(/(\d\d:\d\d:\d\d)/);
  if (result) return result[0];
  return '00:00:00';
};

const durationText = computed(() => {
  if (duration.value) {
    return secTostring(duration.value);
  }
  return '00:00:00';
});

const currentTimeText = computed(() => {
  if (currentTime.value) {
    return secTostring(currentTime.value);
  }
  return '00:00:00';
});
</script>

<template>
  <v-card
    :flat="props.flat"
    :tile="props.tile"
    :style="canvasStyle"
    v-resize="onResize"
    tabindex="0"
  >
    <video
      ref="video"
      :style="videoStyle"
      :src="props.source"
      :muted="props.muted"
      @loadeddata="onLoaded"
      @timeupdate="onTimeupdate"
    />
    <slot />
    <v-card-actions v-if="controls" :style="actionStyle">
      <v-btn icon color="white" @click="onPlayClick">
        <v-icon>{{ playIcon }}</v-icon>
      </v-btn>
      <span class="text-caption text-white">
        {{ currentTimeText }} / {{ durationText }}
      </span>
    </v-card-actions>
  </v-card>
</template>

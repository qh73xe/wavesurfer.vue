<script setup lang="ts">
import type { WaveSurferOptions } from 'wavesurfer.js';
import { ref, computed, watch, onMounted, inject } from 'vue';

import WSKey from "../providers/WaveSurferProvider"
import type { WSStore } from "../providers/WaveSurferProvider"

export interface WaveSurferProps {
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
  barAlign?: 'top' | 'bottom';
  minPxPerSec?: number;
  fillParent?: boolean;
  duration?: number;
  mediaControls?: boolean;
  autoplay?: boolean;
  interact?: boolean;
  dragToSeek?: boolean;
  hideScrollbar?: boolean;
  audioRate?: number;
  autoScroll?: boolean;
  autoCenter?: boolean;
  sampleRate?: number;
  normalize?: boolean;
}

const props = withDefaults(defineProps<WaveSurferProps>(), { 
  source: '',
  waveColor: "#999",
  progressColor: "#555",
  cursorColor: "#333",
  fillParent: true,
});

const emit = defineEmits<{
  (e: 'audioprocess', currentTime: number): void;
  (e: 'click', relativeX: number): void;
  (e: 'decode', duration: number): void;
  (e: 'destroy'): void;
  (e: 'drag', relativeX: number): void;
  (e: 'finish'): void;
  (e: 'interaction', newTime: number): void;
  (e: 'load', url: string): void;
  (e: 'loading', percent: number): void;
  (e: 'pause'): void;
  (e: 'play'): void;
  (e: 'ready', duration: number): void;
  (e: 'redraw'): void;
  (e: 'scroll', visibleStartTime: number, visibleEndTime: number): void;
  (e: 'seeking', currentTime: number): void;
  (e: 'timeupdate', currentTime: number): void;
  (e: 'zoom', minPxPerSec: number): void;
}>();

const wsStore = inject(WSKey) as WSStore
const waveform = ref<HTMLDivElement>();

/** メディアエレメント */
const media = computed((): HTMLMediaElement | undefined => {
  if (props.source instanceof HTMLMediaElement) {
    return props.source;
  }
  return undefined;
});

/** WaveSurfer 初期化時オプション */
const wsOptions = computed(
  (): WaveSurferOptions => ({
    container: waveform.value || '',
    height: props.height === -1 ? 'auto' : props.height,
    waveColor: props.waveColor,
    progressColor: props.progressColor,
    cursorColor: props.cursorColor,
    cursorWidth: props.cursorWidth,
    barWidth: props.barWidth,
    barGap: props.barGap === 0 ? undefined : props.barGap,
    barRadius: props.barRadius,
    barHeight: props.barHeight,
    barAlign: props.barAlign,
    minPxPerSec: props.minPxPerSec,
    fillParent: props.fillParent,
    duration: props.duration,
    mediaControls: props.mediaControls,
    autoplay: props.autoplay,
    interact: props.interact,
    dragToSeek: props.dragToSeek,
    hideScrollbar: props.hideScrollbar,
    audioRate: props.audioRate,
    autoScroll: props.autoScroll,
    autoCenter: props.autoCenter,
    sampleRate: props.sampleRate,
    normalize: props.normalize,
    media: media.value,
  }),
);

/** WaveSurfer のインスタンス化を実施します */
const init = () => {
  if (wsStore) {
    wsStore.init(wsOptions.value)
    if (wsStore.wavesurfer.value) {
      wsStore.wavesurfer.value.on('audioprocess', (currentTime: number) => {
        emit('audioprocess', currentTime);
      });
      wsStore.wavesurfer.value.on('click', (relativeX: number) => {
        emit('click', relativeX);
      });
      wsStore.wavesurfer.value.on('decode', (duration: number) => {
        emit('decode', duration);
      });
      wsStore.wavesurfer.value.on('destroy', () => {
        emit('destroy');
      });
      wsStore.wavesurfer.value.on('drag', (relativeX: number) => {
        emit('drag', relativeX);
      });
      wsStore.wavesurfer.value.on('finish', () => {
        emit('finish');
      });
      wsStore.wavesurfer.value.on('interaction', (newTime: number) => {
        emit('interaction', newTime);
      });
      wsStore.wavesurfer.value.on('load', (url: string) => {
        emit('load', url);
      });
      wsStore.wavesurfer.value.on('loading', (percent: number) => {
        emit('loading', percent);
      });
      wsStore.wavesurfer.value.on('pause', () => {
        emit('pause');
      });
      wsStore.wavesurfer.value.on('play', () => {
        emit('play');
      });
      wsStore.wavesurfer.value.on('ready', (duration: number) => {
        emit('ready', duration);
      });
      wsStore.wavesurfer.value.on('redraw', () => {
        emit('redraw');
      });
      wsStore.wavesurfer.value.on('scroll', (visibleStartTime: number, visibleEndTime: number) => {
        emit('scroll', visibleStartTime, visibleEndTime);
      });
      wsStore.wavesurfer.value.on('seeking', (currentTime: number) => {
        emit('seeking', currentTime);
      });
      wsStore.wavesurfer.value.on('timeupdate', (currentTime: number) => {
        emit('timeupdate', currentTime);
      });
      wsStore.wavesurfer.value.on('zoom', (minPxPerSec: number) => {
        emit('zoom', minPxPerSec);
      });
    }
  }
};

/** 音声データを読み込み, wavesurfer に反映させます / */
const load = async (url: string, channelData?: WaveSurferOptions['peaks'], duration?: number) => {
  if (wsStore) wsStore.load(url, channelData, duration)
};

/** media が loadeddata イベントを発火した際のハンドラ */
const onMediaLoadeddata = async () => {
  if (media.value && wsStore) await wsStore.load(media.value.currentSrc)
};

/** wsOptions を監視し, 変更があった場合再レンダを実施する */
watch(wsOptions, (newValue, oldValue) => {
  if (newValue.media && oldValue.media === undefined) {
    init();
  } else {
    if (wsStore) wsStore.setOptions(newValue)
  }
});

/** props.source を監視し, 変更があった場合再レンダを実施する.
 *
 * source が HTMLMediaElement の場合には,onMediaLoadeddata が呼ばれるため
 * それ以外の場合のみ load 関数を実施するようにします.
 */
watch(props, async (newValue) => {
  const { source } = newValue;
  if (source && !(source instanceof HTMLMediaElement)) {
    await load(source);
  }
});

/** media 情報を監視し, loadeddata にイベントハンドラを付与する */
watch(media, (newValue, oldValue) => {
  const event = 'loadeddata';
  if (oldValue) {
    oldValue.removeEventListener(event, onMediaLoadeddata, false);
  }
  if (newValue) {
    newValue.addEventListener(event, onMediaLoadeddata, false);
  }
});

onMounted(async () => {
  init();
  if (props.source && !(props.source instanceof HTMLMediaElement)) {
    await load(props.source);
  }
});
</script>
<template>
  <div class="ws" tabindex="-1">
    <slot></slot>
    <div ref="waveform" />
  </div>
</template>

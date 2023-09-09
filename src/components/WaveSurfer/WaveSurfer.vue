<template>
  <div class="ws">
    <slot></slot>
    <div ref="waveform" tabindex="2" />
  </div>
</template>

<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js';
import type { WaveSurferOptions } from 'wavesurfer.js';
import { ref, computed, watch, onMounted } from 'vue';

const wavesurfer = ref<null | WaveSurfer>(null);
const waveform = ref<HTMLDivElement>();

const props = withDefaults(defineProps<{
  source: string | HTMLMediaElement,
  height?: number | 'auto',
  waveColor?: string | string[] | CanvasGradient,
  progressColor?: string | string[] | CanvasGradient,
  cursorColor?: string,
  cursorWidth?: number,
  barWidth?: number,
  barGap?: number,
  barRadius?: number,
  barHeight?: number,
  barAlign?: 'top' | 'bottom',
  minPxPerSec?: number,
  fillParent?: boolean,
  duration?: number,
  mediaControls?: boolean,
  autoplay?: boolean,
  interact?: boolean,
  dragToSeek?: boolean,
  hideScrollbar?: boolean,
  audioRate?: number,
  autoScroll?: boolean,
  autoCenter?: boolean,
  sampleRate?: number,
  normalize?: boolean,
}>(), { source: "" });

/** メディアエレメント */
const media = computed((): HTMLMediaElement | undefined => {
  if (props.source instanceof HTMLMediaElement) {
    return props.source;
  }
  return undefined;
});

/** WaveSurfer 初期化時オプション */
const wsOptions = computed((): WaveSurferOptions => ({
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
}));

/** WaveSurfer のインスタンス化を実施します */
const initWaveSurfer = () => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }
  try {
    wavesurfer.value = WaveSurfer.create(wsOptions.value);
  } catch {
    wavesurfer.value = null;
  }
};

/** 音声データを読み込み, wavesurfer に反映させます / */
const load = async (url: string, channelData?: WaveSurferOptions['peaks'], duration?: number) => {
  if (wavesurfer.value) {
    await wavesurfer.value.load(url, channelData, duration);
  }
};

/** 新しいオプションを, wavesurfer に反映させます */
const redender = (options: WaveSurferOptions) => {
  if (wavesurfer.value) {
    wavesurfer.value.setOptions(options);
  }
};

/** media が loadeddata イベントを発火した際のハンドラ */
const onMediaLoadeddata = async () => {
  if (media.value) {
    await load(media.value.currentSrc);
  }
};

/** wsOptions を監視し, 変更があった場合再レンダを実施する */
watch(wsOptions, (newValue, oldValue) => {
  if (newValue.media && oldValue.media === undefined) {
    initWaveSurfer();
  } else {
    redender(newValue);
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
  initWaveSurfer();
  if (props.source && !(props.source instanceof HTMLMediaElement)) {
    await load(props.source);
  }
});
</script>

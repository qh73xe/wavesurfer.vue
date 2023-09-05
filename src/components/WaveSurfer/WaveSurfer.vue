<template>
  <div class="ws">
    <slot></slot>
    <div ref="waveform" tabindex="2" />
  </div>
</template>

<script setup lang="ts">
import { isEqual } from 'lodash';
import WaveSurfer from 'wavesurfer.js';
import type { WaveSurferOptions } from 'wavesurfer.js';
import {
  ref, computed, watch, onMounted,
} from 'vue';

const wavesurfer = ref<null | WaveSurfer>(null);
const waveform = ref<HTMLDivElement>();

const props = defineProps({
  source: {
    type: [String, HTMLMediaElement],
    default: '',
  },
  /** The height of the waveform in pixels, or "auto" to fill the container height */
  height: { type: Number, default: -1 },
  /** The color of the waveform */
  waveColor: { type: String, default: '#999' },
  /** The color of the progress mask */
  progressColor: { type: String, default: '#555' },
  /** The color of the playpack cursor */
  cursorColor: { type: String, default: '#333' },
  /** The cursor width */
  cursorWidth: { type: Number, default: 1 },
  /** If set, the waveform will be rendered with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
  barWidth: { type: Number, default: 0 },
  /** Spacing between bars in pixels */
  barGap: { type: Number, default: 0 },
  /** Rounded borders for bars */
  barRadius: { type: Number, default: 0 },
  /** A vertical scaling factor for the waveform */
  barHeight: { type: Number, default: 1 },
  /** Vertical bar alignment */
  barAlign: {
    validator: (prop) => {
      if (prop === undefined) return true;
      if (typeof prop === 'string') {
        if (prop === 'top') return true;
        if (prop === 'bottom') return true;
        if (prop === 'center') return true;
      }
      return false;
    },
    default: undefined,
  },
  /** Minimum pixels per second of audio (i.e. the zoom level) */
  minPxPerSec: { type: Number, default: 50 },
  /** Stretch the waveform to fill the container, true by default */
  fillParent: { type: Boolean, default: true },
  /** Pre-computed audio duration in seconds */
  duration: {
    validator: (prop) => typeof prop === 'number' || prop === undefined,
    default: undefined,
  },
  /** Whether to show default audio element controls */
  mediaControls: { type: Boolean, default: false },
  /** Play the audio on load */
  autoplay: { type: Boolean, default: false },
  /** Pass false to disable clicks on the waveform */
  interact: { type: Boolean, default: true },
  /** Allow to drag the cursor to seek to a new position */
  dragToSeek: { type: Boolean, default: true },
  /** Hide the scrollbar */
  hideScrollbar: { type: Boolean, default: false },
  /** Audio rate, i.e. the playback speed */
  audioRate: { type: Number, default: 1 },
  /** Automatically scroll the container to keep the current position in viewport */
  autoScroll: { type: Boolean, default: false },
  /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
  autoCenter: { type: Boolean, default: true },
  /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
  sampleRate: { type: Number, default: 8000 },
  /** Stretch the waveform to the full height */
  normalize: { type: Boolean, default: false },
});

const media = computed((): HTMLMediaElement | undefined => {
  if (props.source instanceof HTMLMediaElement) {
    return props.source;
  }
  return undefined;
});

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
  barAlign: props.barAlign === 'center' ? undefined : props.barAlign,
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
  if (wavesurfer.value) wavesurfer.value.destroy();
  wavesurfer.value = WaveSurfer.create(wsOptions.value);
};

/** Load an audio file by URL, with optional pre-decoded audio data */
const load = async (url: string, channelData?: WaveSurferOptions['peaks'], duration?: number) => {
  if (wavesurfer.value) {
    await wavesurfer.value.load(url, channelData, duration);
  }
};

/** 新しいオプションを反映します */
const redender = (options: WaveSurferOptions) => {
  if (wavesurfer.value) {
    wavesurfer.value.setOptions(options);
  }
};

/** wsOptions を監視し, 変更があった場合再レンダを実施する */
watch(wsOptions, (newValue, oldValue) => {
  if (!isEqual(newValue, oldValue)) {
    redender(newValue);
  }
});

onMounted(async () => {
  initWaveSurfer();
  if (props.source && !(props.source instanceof HTMLMediaElement)) {
    await load(props.source);
  }
});
</script>

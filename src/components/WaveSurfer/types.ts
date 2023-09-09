export interface WaveSurferProps {
  source: string | HTMLMediaElement;
  /** The height of the waveform in pixels, or "auto" to fill the container height */
  height?: number | 'auto';
  /** The color of the waveform */
  waveColor?: string | string[] | CanvasGradient;
  /** The color of the progress mask */
  progressColor?: string | string[] | CanvasGradient;
  /** The color of the playpack cursor */
  cursorColor?: string;
  /** The cursor width */
  cursorWidth?: number;
  /** If set, the waveform will be rendered with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
  barWidth?: number;
  /** Spacing between bars in pixels */
  barGap?: number;
  /** Rounded borders for bars */
  barRadius?: number;
  /** A vertical scaling factor for the waveform */
  barHeight?: number;
  /** Vertical bar alignment */
  barAlign?: 'top' | 'bottom';
  /** Minimum pixels per second of audio (i.e. the zoom level) */
  minPxPerSec?: number;
  /** Stretch the waveform to fill the container, true by default */
  fillParent?: boolean;
  /** Pre-computed audio duration in seconds */
  duration?: number;
  /** Whether to show default audio element controls */
  mediaControls?: boolean;
  /** Play the audio on load */
  autoplay?: boolean;
  /** Pass false to disable clicks on the waveform */
  interact?: boolean;
  /** Allow to drag the cursor to seek to a new position */
  dragToSeek?: boolean;
  /** Hide the scrollbar */
  hideScrollbar?: boolean;
  /** Audio rate, i.e. the playback speed */
  audioRate?: number;
  /** Automatically scroll the container to keep the current position in viewport */
  autoScroll?: boolean;
  /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
  autoCenter?: boolean;
  /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
  sampleRate?: number;
  /** Stretch the waveform to the full height */
  normalize?: boolean;
}

export interface ScrollEmit {
  visibleStartTime: number;
  visibleEndTime: number;
}
export interface WaveSurferEmit {
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
  (e: 'scroll', callback: ScrollEmit): void;
  (e: 'seeking', currentTime: number): void;
  (e: 'timeupdate', currentTime: number): void;
  (e: 'zoom', minPxPerSec: number): void;
}

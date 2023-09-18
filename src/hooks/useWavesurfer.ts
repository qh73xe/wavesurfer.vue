import { ref } from 'vue';

import WaveSurfer from 'wavesurfer.js';
import type { WaveSurferOptions } from 'wavesurfer.js';
import type { GenericPlugin } from 'wavesurfer.js/dist/base-plugin.js';

interface NamedParameter {
  channels?: number;
  maxLength?: number;
  precision?: number;
}
export type WaveSurferObj = null | WaveSurfer

export default function useWaveSurfer() {
  const wavesurfer = ref<WaveSurferObj>(null);
  const loaded = ref<boolean>(false);

  /** Create a new WaveSurfer instance */
  const init = (option: WaveSurferOptions) => {
    if (wavesurfer.value) {
      wavesurfer.value.destroy();
    }
    const ws = WaveSurfer.create(option);
    wavesurfer.value = ws
  }

  /** Unmount wavesurfer */
  const destroy = (): void => {
    if (wavesurfer.value) {
      wavesurfer.value.unAll();
      wavesurfer.value.destroy();
      loaded.value = false;
      wavesurfer.value = null
    }
  }

  /** Empty the waveform by loading a tiny silent audio */
  const empty = (): void => {
    if (wavesurfer.value) {
      wavesurfer.value.empty();
      loaded.value = false;
    }
  }

  /** Get decoded peaks */
  const exportPeaks = (params?: NamedParameter): number[][] => {
    if (wavesurfer.value) {
      return wavesurfer.value.exportPeaks(params);
    }
    return []
  }

  /** Get all registered plugins */
  const getActivePlugins = (): GenericPlugin[] => {
    if (wavesurfer.value) {
      return wavesurfer.value.getActivePlugins();
    }
    return []
  }

  /** Get the current audio position in seconds */
  const getCurrentTime = (): number => {
    if (wavesurfer.value) {
      return wavesurfer.value.getCurrentTime();
    }
    return 0
  }

  /** Get the decoded audio data */
  const getDecodedData = (): null | AudioBuffer => {
    if (wavesurfer.value) {
      return wavesurfer.value.getDecodedData();
    }
    return null
  }

  /** Get the duration of the audio in seconds */
  const getDuration = (): number => {
    if (wavesurfer.value) {
      return wavesurfer.value.getDuration();
    }
    return 0
  }

  /** Get the minPxPerSec of the params in wavesurfer  */
  const getMinPxPerSec = (): number => {
    if (wavesurfer.value) {
      return wavesurfer.value.options.minPxPerSec || 0
    }
    return 0
  }


  /** Get the HTML media element */
  const getMediaElement = (): HTMLMediaElement|null => {
    if (wavesurfer.value) {
      return wavesurfer.value.getMediaElement();
    }
    return null
  }
  /** Get the audio muted state */
  const getMuted = (): boolean => {
    if (wavesurfer.value) {
      return wavesurfer.value.getMuted();
    }
    return false
  }

  /** Get the playback speed */
  const getPlaybackRate = (): number => {
    if (wavesurfer.value) {
      return wavesurfer.value.getPlaybackRate();
    }
    return -1
  }

  /** Get the current scroll position in pixels */
  const getScroll = (): number => {
    if (wavesurfer.value) {
      return wavesurfer.value.getScroll();
    }
    return -1
  }

  /** Get the audio volume */
  const getVolume = (): number => {
    if (wavesurfer.value) {
      return wavesurfer.value.getVolume();
    }
    return -1
  }

  /** For plugins only: get the waveform wrapper div */
  const getWrapper = (): HTMLElement | null=> {
    if (wavesurfer.value) {
      return wavesurfer.value.getWrapper();
    }
    return null
  }

  /** Check if the audio is playing */
  const isPlaying = (): boolean => {
    if (wavesurfer.value) {
      return wavesurfer.value.isPlaying();
    }
    return false
  }

  /** Load an audio file by URL, with optional pre-decoded audio data */
  const load = async(url: string, channelData?: WaveSurferOptions['peaks'], duration?: number) => {
    if (wavesurfer.value) {
      const result = await wavesurfer.value.load(url, channelData, duration);
      loaded.value = true;
      return result
    }
  }

  /** Load an audio blob */
  const loadBlob = async(blob: Blob, channelData?: WaveSurferOptions['peaks'], duration?: number) => {
    if (wavesurfer.value) {
      const result = await wavesurfer.value.loadBlob(blob, channelData, duration);
      loaded.value = true;
      return result
    }
  }

  /** Pause the audio */
  const pause = (): void => {
    if (wavesurfer.value) wavesurfer.value.pause();
  }

  /** Start playing the audio */
  const play = async() => {
    if (wavesurfer.value) await wavesurfer.value.play();
  }

  /** Play or pause the audio */
  const playPause = async() => {
    if (wavesurfer.value) await wavesurfer.value.playPause();
  }

  /** Register a wavesurfer.js plugin */
  const registerPlugin = <T extends GenericPlugin>(plugin: T): T => {
    if (wavesurfer.value){
      return wavesurfer.value.registerPlugin(plugin)
    }
    return plugin
  }

  /** Seek to a percentage of audio as [0..1] (0 = beginning, 1 = end) */
  const seekTo = (progress: number) : void => {
    if (wavesurfer.value) wavesurfer.value.seekTo(progress)
  }

  const setMuted = (muted: boolean) : void => {
    if (wavesurfer.value) wavesurfer.value.setMuted(muted)
  }

  /** Set new wavesurfer options and re-render it */
  const setOptions = (options: Partial<WaveSurferOptions>) : void => {
    if (wavesurfer.value) wavesurfer.value.setOptions(options)
  }

  /** Set the playback speed, pass an optional false to NOT preserve the pitch */
  const setPlaybackRate = (rate: number, preservePitch?: boolean): void => {
    if (wavesurfer.value) wavesurfer.value.setPlaybackRate(rate, preservePitch)
  }

  /** Set a sink id to change the audio output device */
  const setSinkId = async(sinkId: string) => {
    if (wavesurfer.value) await wavesurfer.value.setSinkId(sinkId)
  }

  /** Jumpt to a specific time in the audio (in seconds) */
  const setTime = (time: number): void => {
    if (wavesurfer.value) wavesurfer.value.setTime(time)
  }

  /** Set the audio volume */
  const setVolume = (volume: number): void => {
    if (wavesurfer.value) wavesurfer.value.setVolume(volume)
  }

  /** Skip N or -N seconds from the current position */
  const skip = (seconds: number): void => {
    if (wavesurfer.value) wavesurfer.value.skip(seconds)
  }

  /** Stop the audio and go to the beginning */
  const stop = (): void => {
    if (wavesurfer.value) wavesurfer.value.stop()
  }

  /** Toggle if the waveform should react to clicks */
  const toggleInteraction = (isInteractive: boolean): void => {
    if (wavesurfer.value) wavesurfer.value.toggleInteraction(isInteractive)
  }

  /** Zoom the waveform by a given pixels-per-second factor */
  const zoom = (minPxPerSec: number): void => {
    if (wavesurfer.value) wavesurfer.value.zoom(minPxPerSec)
  }

  return {
    wavesurfer,
    loaded,
    init,
    destroy,
    empty,
    exportPeaks,
    getActivePlugins,
    getCurrentTime,
    getDecodedData,
    getDuration,
    getMediaElement,
    getMinPxPerSec,
    getMuted,
    getPlaybackRate,
    getScroll,
    getVolume,
    getWrapper,
    isPlaying,
    load,
    loadBlob,
    pause,
    play,
    playPause,
    registerPlugin,
    seekTo,
    setMuted,
    setOptions,
    setPlaybackRate,
    setSinkId,
    setTime,
    setVolume,
    skip,
    stop,
    toggleInteraction,
    zoom,
  };
}

<template>
  <div ref="waveform" id="waveform"></div>
</template>
<script>
import WaveSurfer from "./wavesurfer.js";
export default {
  name: "WaveSurfer.vue",
  data: () => ({
    wasesurfer: null,
    options: {}
  }),
  props: {
    source: {
      type: String,
      default: ""
    },
    audioRate: {
      type: Number,
      default: 1
    },
    audioContext: {
      type: Object,
      default: () => {}
    },
    audioScriptProcessor: {
      type: Object,
      default: () => {}
    },
    autoCenter: {
      type: Boolean,
      default: true
    },
    backend: {
      type: String,
      default: "WebAudio"
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    barGap: {
      validator: prop => typeof prop === "number" || prop === null,
      default: null
    },
    barHeight: {
      type: Number,
      default: 1
    },
    barMinHeight: {
      validator: prop => typeof prop === "number" || prop === null,
      default: null
    },
    barRadius: {
      type: Number,
      default: 0
    },
    barWidth: {
      validator: prop => typeof prop === "number" || prop === null,
      default: null
    },
    closeAudioContext: {
      type: Boolean,
      default: false
    },
    cursorColor: {
      type: String,
      default: "#333"
    },
    cursorWidth: {
      type: Number,
      default: 1
    },
    drawingContextAttributes: {
      type: Object,
      default: function() {
        return { desynchronized: true };
      }
    },
    fillParent: {
      type: Boolean,
      default: true
    },
    forceDecode: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 128
    },
    hideScrollbar: {
      type: Boolean,
      default: false
    },
    interact: { type: Boolean, default: true },
    loopSelection: { type: Boolean, default: true },
    maxCanvasWidth: { type: Number, default: 4000 },
    mediaControls: { type: Boolean, default: false },
    mediaType: { type: String, default: "audio" },
    minPxPerSec: { type: Number, default: 50 },
    normalize: { type: Boolean, default: false },
    partialRender: { type: Boolean, default: false },
    pixelRatio: { type: Number, default: 1 },
    progressColor: { type: String, default: "#555" },
    removeMediaElementOnDestroy: { type: Boolean, default: true },
    responsive: {
      default: false
    },
    scrollParent: { type: Boolean, default: false },
    skipLength: { type: Number, default: 2 },
    splitChannels: { type: Boolean, default: false },
    waveColor: { type: String, default: "#999" },
    xhr: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    initWaveSurper: function() {
      if (this.wasesurfer === null) {
        this.$nextTick(() => {
          const options = {
            container: this.$refs.waveform,
            audioRate: this.audioRate,
            audioContext: this.audioContext,
            audioScriptProcessor: this.audioScriptProcessor,
            autoCenter: this.autoCenter,
            backend: this.backend,
            backgroundColor: this.backgroundColor,
            barGap: this.barGap,
            barHeight: this.barHeight,
            barMinHeight: this.barMinHeight,
            barRadius: this.barRadius,
            barWidth: this.barWidth,
            closeAudioContext: this.closeAudioContext,
            cursorColor: this.cursorColor,
            cursorWidth: this.cursorWidth,
            drawingContextAttributes: this.drawingContextAttributes,
            fillParent: this.fillParent,
            forceDecode: this.forceDecode,
            height: this.height,
            hideScrollbar: this.hideScrollbar,
            interact: this.interact,
            loopSelection: this.loopSelection,
            maxCanvasWidth: this.maxCanvasWidth,
            mediaControls: this.mediaControls,
            mediaType: this.mediaType,
            minPxPerSec: this.minPxPerSec,
            normalize: this.normalize,
            partialRender: this.partialRender,
            pixelRatio: this.pixelRatio,
            progressColor: this.progressColor,
            removeMediaElementOnDestroy: this.removeMediaElementOnDestroy,
            responsive: this.responsive,
            scrollParent: this.scrollParent,
            skipLength: this.skipLength,
            splitChannels: this.splitChannels,
            waveColor: this.waveColor,
            xhr: this.xhr
          };
          if (this.$refs.waveform) {
            this.wasesurfer = WaveSurfer.create(options);
          }
          if (this.source) {
            this.load(this.source);
          }
        });
      }
    },
    runWaveSurfer: function(func, args = null) {
      if (this.wasesurfer) {
        if (args) {
          return this.wasesurfer[func](...args);
        } else {
          return this.wasesurfer[func]();
        }
      }
      return null;
    },
    cancelAjax: function() {
      return this.runWaveSurfer("cancelAjax");
    },
    destroy: function() {
      return this.runWaveSurfer("destroy");
    },
    empty: function() {
      return this.runWaveSurfer("empty");
    },
    getActivePlugins: function() {
      return this.runWaveSurfer("getActivePlugins");
    },
    getBackgroundColor: function() {
      return this.runWaveSurfer("getBackgroundColor");
    },
    getCurrentTime: function() {
      return this.runWaveSurfer("getCurrentTime");
    },
    getCursorColor: function() {
      return this.runWaveSurfer("getCursorColor");
    },
    getDuration: function() {
      return this.runWaveSurfer("getDuration");
    },
    getPlaybackRate: function() {
      return this.runWaveSurfer("getPlaybackRate");
    },
    getProgressColor: function() {
      return this.runWaveSurfer("getProgressColor");
    },
    getVolume: function() {
      return this.runWaveSurfer("getVolume");
    },
    getMute: function() {
      return this.runWaveSurfer("getMute");
    },
    getFilters: function() {
      return this.runWaveSurfer("getFilters");
    },
    getWaveColor: function() {
      return this.runWaveSurfer("getCurrentTime");
    },
    exportPCM(length, accuracy, noWindow, start) {
      const args = [length, accuracy, noWindow, start];
      return this.runWaveSurfer("exportPCM", args);
    },
    isPlaying: function() {
      return this.runWaveSurfer("isPlaying");
    },
    load: function(url, peaks, preload) {
      const args = [url, peaks, preload];
      return this.runWaveSurfer("load", args);
    },
    loadBlob: function(url) {
      const args = [url];
      return this.runWaveSurfer("loadBlob", args);
    },
    on: function(eventName, callback) {
      const args = [eventName, callback];
      return this.runWaveSurfer("on", args);
    },
    un: function(eventName, callback) {
      const args = [eventName, callback];
      return this.runWaveSurfer("un", args);
    },
    unAll: function() {
      return this.runWaveSurfer("unAll");
    },
    pause: function() {
      return this.runWaveSurfer("pause");
    },
    play: function(start, end) {
      const args = [start, end];
      return this.runWaveSurfer("play", args);
    },
    playPause: function() {
      return this.runWaveSurfer("playPause");
    },
    seekAndCenter: function(progress) {
      return this.runWaveSurfer("seekAndCenter", [progress]);
    },
    seekTo: function(progress) {
      return this.runWaveSurfer("seekTo", [progress]);
    },
    setBackgroundColor: function(color) {
      return this.runWaveSurfer("setBackgroundColor", [color]);
    },
    setCursorColor: function(color) {
      return this.runWaveSurfer("setCursorColor", [color]);
    },
    setHeight: function(height) {
      return this.runWaveSurfer("setHeight", [height]);
    },
    setFilter: function(filters) {
      return this.runWaveSurfer("setFilter", [filters]);
    },
    setPlaybackRate: function(rate) {
      return this.runWaveSurfer("setPlaybackRate", [rate]);
    },
    setPlayEnd: function(position) {
      return this.runWaveSurfer("setPlayEnd", [position]);
    },
    setVolume: function(newVolume) {
      return this.runWaveSurfer("setVolume", [newVolume]);
    },
    setMute: function(mute) {
      return this.runWaveSurfer("mute", [mute]);
    },
    setProgressColor: function(color) {
      return this.runWaveSurfer("setProgressColor", [color]);
    },
    setWaveColor: function(color) {
      return this.runWaveSurfer("setWaveColor", [color]);
    },
    skip: function(offset) {
      return this.runWaveSurfer("skip", [offset]);
    },
    skipBackward: function() {
      return this.runWaveSurfer("skipBackward");
    },
    skipForward: function() {
      return this.runWaveSurfer("skipForward");
    },
    setSinkId: function(deviceId) {
      return this.runWaveSurfer("setSinkId", [deviceId]);
    },
    stop: function() {
      return this.runWaveSurfer("stop");
    },
    toggleMute: function() {
      return this.runWaveSurfer("toggleMute");
    },
    toggleInteraction: function() {
      return this.runWaveSurfer("toggleInteraction");
    },
    toggleScroll: function() {
      return this.runWaveSurfer("toggleScroll");
    },
    zoom: function(pxPerSec) {
      return this.runWaveSurfer("zoom", [pxPerSec]);
    }
  },
  mounted: function() {
    this.initWaveSurper();
  }
};
</script>
<style scoped></style>

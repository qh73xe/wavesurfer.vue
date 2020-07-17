<template>
  <div>
    <div ref="waveform"></div>
    <div ref="timeline"></div>
  </div>
</template>
<script>
import WaveSurfer from "./wavesurfer.js";
import Timeline from "./plugin/timeline.js";
export default {
  name: "wave-surfer",
  data: () => ({
    wavesurfer: null,
    options: {}
  }),
  props: {
    source: {
      validator: function(value) {
        const value_type = typeof value;
        if (value_type == "string") {
          return true;
        } else if (value_type == "object") {
          const class_string = toString.call(value);
          if (class_string == "[object HTMLVideoElement]") {
            return true;
          } else if (class_string == "[object HTMLAudioElement]") {
            return true;
          }
        }
        return false;
      },
      default: ""
    },
    showTimeLine: {
      type: Boolean,
      default: false
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
  watch: {
    source(val, old_val) {
      if (val != old_val) {
        this.load(val);
      }
    },
    audioRate(val, old_val) {
      if (val != old_val) this.updateDrawer("audioRate", val);
    },
    autoCenter(val, old_val) {
      if (val != old_val) this.updateDrawer("autoCenter", val);
    },
    backgroundColor(val, old_val) {
      if (val != old_val) this.updateDrawer("backgroundColor", val);
    },
    barGap(val, old_val) {
      if (val != old_val) this.updateDrawer("barGap", val);
    },
    barHeight(val, old_val) {
      if (val != old_val) this.updateDrawer("barHeight", val);
    },
    barMinHeight(val, old_val) {
      if (val != old_val) this.updateDrawer("barMinHeight", val);
    },
    barRadius(val, old_val) {
      if (val != old_val) {
        this.destroy();
        this.initWaveSurfer();
      }
    },
    barWidth(val, old_val) {
      if (val != old_val) {
        this.updateDrawer("barWidth", val);
      }
    },
    closeAudioContext(val, old_val) {
      if (val != old_val) {
        this.updateDrawer("closeAudioContext", val);
      }
    },
    cursorColor(val, old_val) {
      if (val != old_val) this.updateDrawer("cursorColor", val);
    },
    cursorWidth(val, old_val) {
      if (val != old_val) {
        this.destroy();
        this.initWaveSurfer();
      }
    },
    fillParent(val, old_val) {
      if (val != old_val) this.updateDrawer("fillParent", val);
    },
    forceDecode(val, old_val) {
      if (val != old_val) this.updateDrawer("forceDecode", val);
    },
    height(val, old_val) {
      if (val != old_val) {
        this.destroy();
        this.initWaveSurfer();
      }
    },
    hideScrollbar(val, old_val) {
      if (val != old_val) this.updateDrawer("hideScrollbar", val);
    },
    interact(val, old_val) {
      if (val != old_val) this.updateDrawer("interact", val);
    },
    loopSelection(val, old_val) {
      if (val != old_val) this.updateDrawer("loopSelection", val);
    },
    maxCanvasWidth(val, old_val) {
      if (val != old_val) this.updateDrawer("maxCanvasWidth", val);
    },
    mediaControls(val, old_val) {
      if (val != old_val) this.updateDrawer("mediaControls", val);
    },
    mediaType(val, old_val) {
      if (val != old_val) this.updateDrawer("mediaType", val);
    },
    minPxPerSec(val, old_val) {
      if (val != old_val) this.updateDrawer("minPxPerSec", val);
    },
    normalize(val, old_val) {
      if (val != old_val) this.updateDrawer("normalize", val);
    },
    partialRender(val, old_val) {
      if (val != old_val) this.updateDrawer("partialRender", val);
    },
    pixelRatio(val, old_val) {
      if (val != old_val) this.updateDrawer("pixelRatio", val);
    },
    progressColor(val, old_val) {
      if (val != old_val) this.updateDrawer("progressColor", val);
    },
    removeMediaElementOnDestroy(val, old_val) {
      if (val != old_val) this.updateDrawer("removeMediaElementOnDestroy", val);
    },
    responsive(val, old_val) {
      if (val != old_val) this.updateDrawer("responsive", val);
    },
    scrollParent(val, old_val) {
      if (val != old_val) this.updateDrawer("scrollParent", val);
    },
    skipLength(val, old_val) {
      if (val != old_val) this.updateDrawer("skipLength", val);
    },
    splitChannels(val, old_val) {
      if (val != old_val) this.updateDrawer("splitChannels", val);
    },
    waveColor(val, old_val) {
      if (val != old_val) this.updateDrawer("waveColor", val);
    }
  },
  methods: {
    initWaveSurfer: function() {
      if (this.wavesurfer === null) {
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
            this.wavesurfer = WaveSurfer.create(options);

            if (this.showTimeLine) {
              this.wavesurfer
                .addPlugin(Timeline.create({ container: this.$refs.timeline }))
                .initPlugin("timeline");
            }
            this.wavesurfer.on("audioprocess", this.onAudioprocess);
            this.wavesurfer.on("dblclick", this.onDblClick);
            this.wavesurfer.on("error", this.onError);
            this.wavesurfer.on("finish", this.onFinish);
            this.wavesurfer.on("interaction", this.onInteraction);
            this.wavesurfer.on("loading", this.onLoading);
            this.wavesurfer.on("mute", this.onMute);
            this.wavesurfer.on("pause", this.onPause);
            this.wavesurfer.on("play", this.onPlay);
            this.wavesurfer.on("ready", this.onReady);
            this.wavesurfer.on("scroll", this.onScroll);
            this.wavesurfer.on("seek", this.onSeek);
            this.wavesurfer.on("volume", this.onVolume);
            this.wavesurfer.on("waveform-ready", this.onWaveformReady);
            this.wavesurfer.on("zoom", this.onZoom);
          }
          if (this.source) {
            this.load(this.source);
          }
        });
      }
    },
    updateDrawer: function(key, val) {
      if (this.wavesurfer) {
        this.wavesurfer.params[key] = val;
        this.wavesurfer.drawer.fireEvent("redraw");
      }
    },
    runWaveSurfer: function(func, args = null) {
      if (this.wavesurfer) {
        if (args) {
          return this.wavesurfer[func](...args);
        } else {
          return this.wavesurfer[func]();
        }
      }
      return null;
    },
    onAudioprocess: function(e) {
      this.$emit("audioprocess", e);
    },
    onDblclick: function(e) {
      this.$emit("dblclick", e);
    },
    onDestroy: function(e) {
      this.$emit("destroy", e);
    },
    onError: function(e) {
      this.$emit("error", e);
    },
    onFinish: function(e) {
      this.$emit("finish", e);
    },
    onInteraction: function(e) {
      this.$emit("interaction", e);
    },
    onLoading: function(e) {
      this.$emit("loading", e);
    },
    onMute: function(e) {
      this.$emit("mute", e);
    },
    onPause: function(e) {
      this.$emit("pause", e);
    },
    onPlay: function(e) {
      this.$emit("play", e);
    },
    onReady: function(e) {
      this.$emit("ready", e);
    },
    onScroll: function(e) {
      this.$emit("scroll", e);
    },
    onSeek: function(e) {
      this.$emit("seek", e);
    },
    onVolume: function(e) {
      this.$emit("volume", e);
    },
    onZoom: function(e) {
      this.$emit("zoom", e);
    },
    onWaveformReady: function(e) {
      this.$emit("waveform-ready", e);
    },
    cancelAjax: function() {
      return this.runWaveSurfer("cancelAjax");
    },
    destroy: function() {
      const res = this.runWaveSurfer("destroy");
      this.wavesurfer = null;
      this.onDestroy();
      return res;
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
    this.initWaveSurfer();
  },
  beforeDestroy: function() {
    this.destroy();
  }
};
</script>
<style scoped></style>

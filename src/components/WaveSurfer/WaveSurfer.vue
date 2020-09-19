<template>
  <div class="ws">
    <div
      ref="spectrogram"
      v-if="showSpectrogram"
      class="overflow-y-auto"
      tabindex="1"
      @keyup.stop.prevent="$emit('spectrogram-keyup', $event)"
      @keydown.stop.prevent="$emit('spectrogram-keydown', $event)"
      :style="`max-height: ${spectrogramMaxHeight}`"
      v-show="!isSpectrogramRendering"
    />
    <slot></slot>
    <div
      ref="waveform"
      tabindex="2"
      @keyup.stop.prevent="$emit('waveform-keyup', $event)"
      @keydown.stop.prevent="$emit('waveform-keydown', $event)"
      v-show="!isSpectrogramRendering"
    />
    <div ref="timeline" v-if="showTimeLine" />
    <div ref="pointline" v-if="showPointLine" />
    <slot name="textform"></slot>
    <div
      class="overflow-y-auto"
      :style="`max-height: ${textgridMaxHeight}`"
      ref="textgrid"
      v-if="showTextGrid"
    />
  </div>
</template>
<script>
import WaveSurfer from "./wavesurfer.js";
import Timeline from "./plugin/timeline.js";
import Pointline from "./plugin/pointline.js";
import Textgrid from "./plugin/textgrid.js";
import Spectrogram from "./plugin/spectrogram/index.js";
import Microphone from "./plugin/microphone/index.js";
export default {
  name: "wave-surfer",
  data: () => ({
    wavesurfer: null,
    timeline: null,
    pointline: null,
    spectrogram: null,
    textGrid: null,
    microphone: null,
    audioChunks: [],
    audioUrl: null,
    isSpectrogramRendering: false,
    isMouseEntered: false
  }),
  props: {
    flat: {
      type: Boolean,
      default: false
    },
    tile: {
      type: Boolean,
      default: false
    },
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
    showTextGrid: {
      type: Boolean,
      default: false
    },
    showTimeLine: {
      type: Boolean,
      default: false
    },
    showPointLine: {
      type: Boolean,
      default: false
    },
    showSpectrogram: {
      type: Boolean,
      default: false
    },
    showFreqLabel: {
      type: Boolean,
      default: false
    },
    rec: {
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
      default: function() {
        if (this.showSpectrogram) {
          return 64;
        }
        return 128;
      }
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
      type: Boolean,
      default: false
    },
    scrollParent: { type: Boolean, default: false },
    skipLength: { type: Number, default: 2 },
    splitChannels: { type: Boolean, default: false },
    targetChannel: { type: Number, default: 0 },
    waveColor: { type: String, default: "#999" },
    xhr: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // Spectrogram Plugin
    freqRate: {
      type: Number,
      default: 1
    },
    freqFontSize: {
      type: Number,
      default: 12
    },
    unitFontSize: {
      type: Number,
      default: 10
    },
    spectrogramMaxHeight: {
      validator: function(value) {
        if (value == null) return true;
        if (typeof value == "string") {
          if (~value.indexOf("px")) return true;
          if (~value.indexOf("%")) return true;
          if (~value.indexOf("vh")) return true;
        }
        return false;
      },
      default: "100%"
    },
    spectrogramHeight: {
      type: Number,
      default: 256
    },
    // Point Plugin
    pointWidth: { type: Number, default: 1 },
    points: {
      validator: function(value) {
        if (Array.isArray(value)) {
          for (const obj of value) {
            if (!("time" in obj)) return false;
            if (!("value" in obj)) return false;
          }
          return true;
        }
        return false;
      },
      default: () => []
    },
    // TextGrid Plugin
    textgridMaxHeight: {
      validator: function(value) {
        if (value == null) return true;
        if (typeof value == "string") {
          if (~value.indexOf("px")) return true;
          if (~value.indexOf("%")) return true;
          if (~value.indexOf("vh")) return true;
        }
        return false;
      },
      default: "100%"
    },
    playingOffset: {
      type: Number,
      default: 1
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
    freqRate(val, old_val) {
      if (this.showSpectrogram) {
        if (val != old_val) {
          this.spectrogram.params.freqRate = val;
          this.wavesurfer.fireEvent("redraw");
        }
      }
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
    playingOffset(val, old_val) {
      if (val != old_val) {
        if (this.wavesurfer) {
          if (this.wavesurfer) {
            this.wavesurfer.textgrid.params.playingOffset = val;
          }
        }
      }
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
    targetChannel(val, old_val) {
      if (this.showSpectrogram) {
        if (val != old_val) {
          this.spectrogram.params.targetChannel = val;
          this.wavesurfer.fireEvent("redraw");
        }
      }
    },
    waveColor(val, old_val) {
      if (val != old_val) this.updateDrawer("waveColor", val);
    },
    showSpectrogram(val, old_val) {
      if (val != old_val) {
        if (val) {
          this.$nextTick(() => {
            setTimeout(this.initSpectrogramPlugin, 0);
          });
        } else {
          this.wavesurfer.destroyPlugin(this.spectrogram.name);
        }
      }
    }
  },
  methods: {
    initWaveSurferEvent: function() {
      if (this.wavesurfer) {
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
    },
    initRecOptions: function(options) {
      if (this.rec) {
        const isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );
        if (isSafari) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          options.audioContext = new AudioContext();
          options.audioScriptProcessor = this.audioContext.createScriptProcessor(
            1024,
            1,
            1
          );
        }
        options.cursorWidth = 0;
        options.interact = false;
      }
      return options;
    },
    initTileLinePlugin: function() {
      if (this.showTimeLine) {
        this.timeline = Timeline.create({
          container: this.$refs.timeline
        });
        this.wavesurfer.addPlugin(this.timeline).initPlugin("timeline");
      }
    },
    initSpectrogramPlugin: function() {
      if (this.showSpectrogram) {
        this.spectrogram = Spectrogram.create({
          labels: this.showFreqLabel,
          canvasHeight: this.spectrogramHeight,
          freqRate: this.freqRate,
          freqFontSize: this.freqFontSize,
          unitFontSize: this.unitFontSize,
          targetChannel: this.targetChannel,
          container: this.$refs.spectrogram
        });
        this.wavesurfer.addPlugin(this.spectrogram).initPlugin("spectrogram");
        this.wavesurfer.on(
          "spectrogram-render-start",
          this.onSpectrogramRenderStart
        );
        this.wavesurfer.on(
          "spectrogram-render-end",
          this.onSpectrogramRenderEnd
        );
      }
    },
    initTextGridPlugin: function() {
      if (this.showTextGrid) {
        this.textgrid = Textgrid.create({
          container: this.$refs.textgrid,
          playingOffset: this.playingOffset
        });
        this.wavesurfer.addPlugin(this.textgrid).initPlugin("textgrid");
        this.wavesurfer.on("textgrid-dblclick", this.onTextGridDblClick);
        this.wavesurfer.on("textgrid-click", this.onTextGridClick);
        this.wavesurfer.on("textgrid-update", this.onTextGridUpdate);
        this.wavesurfer.on("tier-update", this.onTierUpdate);
        this.wavesurfer.on("tier-add", this.onTierAdd);
        this.wavesurfer.on("tier-delete", this.onTierDelete);

        this.wavesurfer.on(
          "textgrid-current-update",
          this.onTextGridCurrentUpdate
        );
        this.wavesurfer.on("textgrid-keydown", payload => {
          this.$emit("textgrid-keydown", payload);
        });
        this.wavesurfer.on("textgrid-keyup", payload => {
          this.$emit("textgrid-keyup", payload);
        });
      }
    },
    initPointLinePlugin: function() {
      if (this.showPointLine) {
        this.pointline = Pointline.create({
          container: this.$refs.pointline,
          points: this.points,
          pointWidth: this.pointWidth
        });
        this.wavesurfer.addPlugin(this.pointline).initPlugin("pointline");
        this.wavesurfer.pointline.on("addPoint", point => {
          this.$emit("addPoint", point);
        });
        this.wavesurfer.pointline.on("updatePoint", point => {
          this.$emit("updatePoint", point);
        });
        this.wavesurfer.pointline.on("deletePoint", point => {
          this.$emit("deletePoint", point);
        });
      }
    },
    initRecPlugin: function() {
      if (this.rec) {
        this.microphone = Microphone.create({
          bufferSize: 4096,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1,
          constraints: {
            video: false,
            audio: true
          }
        });
        this.wavesurfer.addPlugin(this.microphone).initPlugin("microphone");
        this.wavesurfer.microphone.on("deviceReady", stream => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          mediaRecorder.addEventListener("dataavailable", event => {
            this.audioChunks.push(event.data);
          });
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(this.audioChunks);
            this.audioUrl = URL.createObjectURL(audioBlob);
            this.downloadWave();
          });
        });
        this.wavesurfer.microphone.on("deviceError", code => {
          this.$emit("deviceError", code);
        });
      } else {
        if (this.source) {
          this.load(this.source);
        }
      }
    },
    initWaveSurfer: function() {
      if (this.wavesurfer === null) {
        this.$nextTick(() => {
          let options = {
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
          options = this.initRecOptions(options);

          if (this.$refs.waveform) {
            this.wavesurfer = WaveSurfer.create(options);
            this.initWaveSurferEvent();
            this.initTileLinePlugin();
            this.initSpectrogramPlugin();
            this.initTextGridPlugin();
            this.initPointLinePlugin();
            this.initRecPlugin();
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
    addPoint: function(point) {
      this.wavesurfer.pointline.addPoint(point);
    },
    deletePoint: function(id) {
      this.wavesurfer.pointline.deletePoint(id);
    },
    updatePoint: function(id, point) {
      this.wavesurfer.pointline.updatePoint(id, point);
    },
    addTier: function(key, type, parent = null) {
      this.wavesurfer.textgrid.addTier(key, type, parent);
    },
    updateTier: function(key, obj) {
      this.wavesurfer.textgrid.updateTier(key, obj);
    },
    deleteTier: function(key) {
      this.wavesurfer.textgrid.deleteTier(key);
    },
    copyTier: function(ref, key, type, parent, withText = true) {
      this.wavesurfer.textgrid.copyTier(ref, key, type, parent, withText);
    },
    addTierValue: function(key, obj) {
      this.wavesurfer.textgrid.addTierValue(key, obj);
    },
    setTierValue: function(key, idx, object) {
      this.wavesurfer.textgrid.setTierValue(key, idx, object);
    },
    deleteTierValue: function(key, idx) {
      this.wavesurfer.textgrid.deleteTierValue(key, idx);
    },
    splitTierValue(key, idx, opt = null) {
      this.wavesurfer.textgrid.splitTierValue(key, idx, opt);
    },
    playTextGrid: function(key, idx) {
      this.wavesurfer.textgrid.play(key, idx);
    },
    loadTextGrid: function(file) {
      this.wavesurfer.textgrid.loadTextGrid(file);
    },
    loadJson: function(file) {
      this.wavesurfer.textgrid.loadJson(file);
    },
    setTextGrid: function(obj) {
      this.wavesurfer.textgrid.loadObj(obj);
    },

    downloadTextGrid: function(filename) {
      this.wavesurfer.textgrid.downloadTextGrid(filename);
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
    onTextGridClick(e) {
      this.$emit("textgrid-click", e);
    },
    onTextGridDblClick(e) {
      this.$emit("textgrid-dblclick", e);
    },
    onTierAdd(textgrid) {
      this.$emit("tier-add", textgrid);
    },
    onTierDelete(textgrid) {
      this.$emit("tier-delete", textgrid);
    },
    onTierUpdate(textgrid) {
      this.$emit("tier-update", textgrid);
    },
    onTextGridUpdate(textgrid) {
      this.$emit("textgrid-update", textgrid);
    },
    onTextGridCurrentUpdate(current) {
      this.$emit("textgrid-current-update", current);
    },
    onSpectrogramRenderStart(e) {
      this.isSpectrogramRendering = true;
      this.$emit("spectrogram-render-start", e);
    },
    onSpectrogramRenderEnd(e) {
      this.isSpectrogramRendering = false;
      this.$emit("spectrogram-render-end", e);
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
      return this.runWaveSurfer("getWaveColor");
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
      const vm = this;
      setTimeout(function() {
        vm.runWaveSurfer("load", args);
      }, 1);
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
    playPause: function(start, end) {
      const args = [start, end];
      return this.runWaveSurfer("playPause", args);
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
    },
    recStart: function() {
      if (this.rec) {
        if (this.wavesurfer) this.wavesurfer.microphone.start();
      }
    },
    recStop: function() {
      if (this.rec) {
        if (this.wavesurfer) {
          if (this.wavesurfer.microphone.active)
            this.wavesurfer.microphone.stop();
        }
      }
    },
    downloadWave: function() {
      let link = document.createElement("a");
      link.href = this.audioUrl;
      link.download = "rec.wav";
      link.click();
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
<style scoped>
.ws {
  text-align: justify;
  text-justify: inter-ideograph;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>

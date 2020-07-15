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
    load: function(source) {
      if (this.wasesurfer) {
        this.wasesurfer.load(source);
      }
    },
    play: function() {
      if (this.wasesurfer) {
        this.wasesurfer.play();
      }
    }
  },
  mounted: function() {
    this.initWaveSurper();
  }
};
</script>
<style scoped></style>

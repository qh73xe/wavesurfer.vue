<template>
  <w-documentation-layout :heading="heading" :desc="$vuetify.lang.t(desc)">
    <v-data-table
      :headers="
        headers.map(x => {
          return {
            text: $vuetify.lang.t(x.text),
            value: x.value
          };
        })
      "
      :items="options"
      :items-per-page="-1"
      :search="search"
      class="elevation-1"
    />
  </w-documentation-layout>
</template>
<script>
import WDocumentationLayout from "@/components/Base/WDocumentationLayout.vue";
const locale = "$vuetify.document.options";
export default {
  name: "Options.vue",
  components: {
    WDocumentationLayout
  },
  data: () => ({
    locale: locale,
    heading: "wavesurfer.vue/documentation/options",
    desc: `${locale}.desc`,
    headers: [
      { text: `${locale}.headers.option`, value: "option" },
      { text: `${locale}.headers.type`, value: "type" },
      { text: `${locale}.headers.default`, value: "default" },
      {
        text: `${locale}.headers.description`,
        value: "description"
      }
    ],
    options: []
  }),
  computed: {
    search: {
      get() {
        return this.$store.state.app_bar.search;
      },
      set(val) {
        this.$store.commit("app_bar/set_search", val);
      }
    }
  },
  mounted: function() {
    this.options = [
      {
        option: "source",
        type: "string or HTML Video Element or HTML Audio Element",
        default: "''",
        description: this.$vuetify.lang.t(`${this.locale}.options.source`)
      },
      {
        option: "showTimeLine",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(`${this.locale}.options.showTimeLine`)
      },
      {
        option: "showSpectrogram",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.showSpectrogram`
        )
      },
      {
        option: "audioRate",
        type: "float",
        default: "1",
        description: this.$vuetify.lang.t(`${this.locale}.options.audioRate`)
      },
      {
        option: "audioContext",
        type: "object",
        default: "{}",
        description: this.$vuetify.lang.t(`${this.locale}.options.audioContext`)
      },
      {
        option: "audioScriptProcessor",
        type: "object",
        default: "{}",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.audioScriptProcessor`
        )
      },
      {
        option: "autoCenter",
        type: "boolean",
        default: "true",
        description: this.$vuetify.lang.t(`${this.locale}.options.autoCenter`)
      },
      {
        option: "backend",
        type: "string",
        default: "WebAudio",
        description: this.$vuetify.lang.t(`${this.locale}.options.backend`)
      },
      {
        option: "backgroundColor",
        type: "string",
        default: "none",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.backgroundColor`
        )
      },
      {
        option: "barGap",
        type: "number",
        default: "none",
        description: this.$vuetify.lang.t(`${this.locale}.options.barGap`)
      },
      {
        option: "barHeight",
        type: "number",
        default: "1",
        description: this.$vuetify.lang.t(`${this.locale}.options.barHeight`)
      },
      {
        option: "barMinHeight",
        type: "number",
        default: "null",
        description: this.$vuetify.lang.t(`${this.locale}.options.barMinHeight`)
      },
      {
        option: "barRadius",
        type: "number",
        default: "0",
        description: this.$vuetify.lang.t(`${this.locale}.options.barRadius`)
      },
      {
        option: "barWidth",
        type: "number",
        default: "none",
        description: this.$vuetify.lang.t(`${this.locale}.options.barWidth`)
      },
      {
        option: "closeAudioContext",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.closeAudioContext`
        )
      },
      {
        option: "cursorColor",
        type: "string",
        default: "#333",
        description: this.$vuetify.lang.t(`${this.locale}.options.cursorColor`)
      },
      {
        option: "cursorWidth",
        type: "integer",
        default: "1",
        description: this.$vuetify.lang.t(`${this.locale}.options.cursorWidth`)
      },
      {
        option: "drawingContextAttributes",
        type: "object",
        default: "{desynchronized: true}",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.drawingContextAttributes`
        )
      },
      {
        option: "fillParent",
        type: "boolean",
        default: "true",
        description: this.$vuetify.lang.t(`${this.locale}.options.fillParent`)
      },
      {
        option: "forceDecode",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(`${this.locale}.options.forceDecode`)
      },
      {
        option: "freqRate",
        type: "number",
        default: "1",
        description: this.$vuetify.lang.t(`${this.locale}.options.freqRate`)
      },
      {
        option: "height",
        type: "integer",
        default: "128",
        description: this.$vuetify.lang.t(`${this.locale}.options.height`)
      },
      {
        option: "hideScrollbar",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.hideScrollbar`
        )
      },
      {
        option: "interact",
        type: "boolean",
        default: "true",
        description: this.$vuetify.lang.t(`${this.locale}.options.interact`)
      },
      {
        option: "loopSelection",
        type: "boolean",
        default: "true",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.loopSelection`
        )
      },
      {
        option: "maxCanvasWidth",
        type: "integer",
        default: "4000",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.maxCanvasWidth`
        )
      },
      {
        option: "mediaControls",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.mediaControls`
        )
      },
      {
        option: "mediaType",
        type: "string",
        default: "audio",
        description: this.$vuetify.lang.t(`${this.locale}.options.mediaType`)
      },
      {
        option: "minPxPerSec",
        type: "integer",
        default: "50",
        description: this.$vuetify.lang.t(`${this.locale}.options.minPxPerSec`)
      },
      {
        option: "normalize",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(`${this.locale}.options.normalize`)
      },
      {
        option: "partialRender",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.partialRender`
        )
      },
      {
        option: "pixelRatio",
        type: "integer",
        default: "window.devicePixelRatio",
        description: this.$vuetify.lang.t(`${this.locale}.options.pixelRatio`)
      },
      {
        option: "progressColor",
        type: "string",
        default: "#555",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.progressColor`
        )
      },
      {
        option: "removeMediaElementOnDestroy",
        type: "boolean",
        default: "true",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.removeMediaElementOnDestroy`
        )
      },
      {
        option: "responsive",
        type: "boolean or float",
        default: "false",
        description: this.$vuetify.lang.t(`${this.locale}.options.responsive`)
      },
      {
        option: "scrollParent",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(`${this.locale}.options.scrollParent`)
      },
      {
        option: "skipLength",
        type: "float",
        default: "2",
        description: this.$vuetify.lang.t(`${this.locale}.options.skipLength`)
      },
      {
        option: "splitChannels",
        type: "boolean",
        default: "false",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.splitChannels`
        )
      },
      {
        option: "targetChannel",
        type: "number",
        default: "0",
        description: this.$vuetify.lang.t(
          `${this.locale}.options.targetChannel`
        )
      },
      {
        option: "waveColor",
        type: "string",
        default: "#999",
        description: this.$vuetify.lang.t(`${this.locale}.options.waveColor`)
      },
      {
        option: "xhr",
        type: "Object",
        default: "{}",
        description: this.$vuetify.lang.t(`${this.locale}.options.xhr`)
      }
    ];
  }
};
</script>

<style scoped></style>

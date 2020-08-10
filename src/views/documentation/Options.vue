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
    const options = [
      {
        option: "source",
        type: "string or HTML Video Element or HTML Audio Element",
        default: "''"
      },
      {
        option: "showTextGrid",
        type: "boolean",
        default: "false"
      },
      {
        option: "showTimeLine",
        type: "boolean",
        default: "false"
      },
      {
        option: "showPointLine",
        type: "boolean",
        default: "false"
      },
      {
        option: "showSpectrogram",
        type: "boolean",
        default: "false"
      },
      {
        option: "showFreqLabel",
        type: "boolean",
        default: "false"
      },
      {
        option: "rec",
        type: "boolean",
        default: "false"
      },
      {
        option: "audioRate",
        type: "float",
        default: "1"
      },
      {
        option: "audioContext",
        type: "object",
        default: "{}"
      },
      {
        option: "audioScriptProcessor",
        type: "object",
        default: "{}"
      },
      {
        option: "autoCenter",
        type: "boolean",
        default: "true"
      },
      {
        option: "backend",
        type: "string",
        default: "WebAudio"
      },
      {
        option: "backgroundColor",
        type: "string",
        default: "none"
      },
      {
        option: "barGap",
        type: "number",
        default: "none"
      },
      {
        option: "barHeight",
        type: "number",
        default: "1"
      },
      {
        option: "barMinHeight",
        type: "number",
        default: "null"
      },
      {
        option: "barRadius",
        type: "number",
        default: "0"
      },
      {
        option: "barWidth",
        type: "number",
        default: "none"
      },
      {
        option: "closeAudioContext",
        type: "boolean",
        default: "false"
      },
      {
        option: "cursorColor",
        type: "string",
        default: "#333"
      },
      {
        option: "cursorWidth",
        type: "integer",
        default: "1"
      },
      {
        option: "drawingContextAttributes",
        type: "object",
        default: "{desynchronized: true}"
      },
      {
        option: "fillParent",
        type: "boolean",
        default: "true"
      },
      {
        option: "forceDecode",
        type: "boolean",
        default: "false"
      },
      {
        option: "height",
        type: "integer",
        default: "128"
      },
      {
        option: "hideScrollbar",
        type: "boolean",
        default: "false"
      },
      {
        option: "interact",
        type: "boolean",
        default: "true"
      },
      {
        option: "loopSelection",
        type: "boolean",
        default: "true"
      },
      {
        option: "maxCanvasWidth",
        type: "integer",
        default: "4000"
      },
      {
        option: "mediaControls",
        type: "boolean",
        default: "false"
      },
      {
        option: "mediaType",
        type: "string",
        default: "audio"
      },
      {
        option: "minPxPerSec",
        type: "integer",
        default: "50"
      },
      {
        option: "normalize",
        type: "boolean",
        default: "false"
      },
      {
        option: "partialRender",
        type: "boolean",
        default: "false"
      },
      {
        option: "pixelRatio",
        type: "integer",
        default: "window.devicePixelRatio"
      },
      {
        option: "progressColor",
        type: "string",
        default: "#555"
      },
      {
        option: "removeMediaElementOnDestroy",
        type: "boolean",
        default: "true"
      },
      {
        option: "responsive",
        type: "boolean or float",
        default: "false"
      },
      {
        option: "scrollParent",
        type: "boolean",
        default: "false"
      },
      {
        option: "skipLength",
        type: "float",
        default: "2"
      },
      {
        option: "splitChannels",
        type: "boolean",
        default: "false"
      },
      {
        option: "targetChannel",
        type: "number",
        default: "0"
      },
      {
        option: "waveColor",
        type: "string",
        default: "#999"
      },
      {
        option: "xhr",
        type: "Object",
        default: "{}"
      },
      {
        option: "freqRate",
        type: "Number",
        default: 1
      },
      {
        option: "freqFontSize",
        type: "Number",
        default: 12
      },
      {
        option: "unitFontSize",
        type: "Number",
        default: 10
      },
      {
        option: "spectrogramHeight",
        type: "Number",
        default: 256
      },
      {
        option: "pointWidth",
        type: "Number",
        default: 1
      },
      {
        option: "points",
        type: "Array",
        default: []
      }
    ];
    this.options = options.map(x => {
      x.description = this.$vuetify.lang.t(
        `${this.locale}.options.${x.option}`
      );
      return x;
    });
  }
};
</script>

<style scoped></style>

<template>
  <w-documentation-layout :heading="heading" :desc="desc">
    <v-data-table
      :headers="headers"
      :items="options"
      :items-per-page="-1"
      class="elevation-1"
    />
  </w-documentation-layout>
</template>
<script>
import WDocumentationLayout from "@/components/Base/WDocumentationLayout.vue";
export default {
  name: "Options.vue",
  components: {
    WDocumentationLayout
  },
  data: () => ({
    heading: "wavesurfer.vue/documentation/options",
    desc:
      "This is the list of props you can pass to <wave-suefer /> to create an instance of the player.",
    headers: [
      { text: "option", value: "option" },
      { text: "type", value: "type" },
      { text: "default", value: "default" },
      { text: "description", value: "description" }
    ],
    options: [
      {
        option: "audioRate",
        type: "float",
        default: "1",
        description: "Speed at which to play audio. Lower number is slower."
      },
      {
        option: "audioContext",
        type: "object",
        default: "{}",
        description:
          "Use your own previously initialized AudioContext or leave blank."
      },
      {
        option: "audioScriptProcessor",
        type: "object",
        default: "{}",
        description:
          "Use your own previously initialized ScriptProcessorNode or leave blank."
      },
      {
        option: "autoCenter",
        type: "boolean",
        default: "true",
        description:
          "If a scrollbar is present, center the waveform around the progress."
      },
      {
        option: "backend",
        type: "string",
        default: "WebAudio",
        description:
          "WebAudio, MediaElement or MediaElementWebAudio. MediaElement is a fallback for unsupported browsers."
      },
      {
        option: "backgroundColor",
        type: "string",
        default: "none",
        description: "Change background color of the waveform container."
      },
      {
        option: "barGap",
        type: "number",
        default: "none",
        description:
          "The optional spacing between bars of the wave, if not provided will be calculated in legacy format."
      },
      {
        option: "barHeight",
        type: "number",
        default: "1",
        description:
          "Height of the waveform bars. Higher number than 1 will increase the waveform bar heights."
      },
      {
        option: "barMinHeight",
        type: "number",
        default: "null",
        description:
          "Minimum height to draw a waveform bar. Default behavior is to not draw a bar during silence."
      },
      {
        option: "barRadius",
        type: "number",
        default: "0",
        description: "The radius that makes bars rounded."
      },
      {
        option: "barWidth",
        type: "number",
        default: "none",
        description:
          "If specified, the waveform will be drawn like this: \u2581\u2009\u2582\u2009\u2587\u2009\u2583\u2009\u2585\u2009\u2582"
      },
      {
        option: "closeAudioContext",
        type: "boolean",
        default: "false",
        description:
          "Close and nullify all audio contexts when the destroy method is called."
      },
      {
        option: "cursorColor",
        type: "string",
        default: "#333",
        description:
          "The fill color of the cursor indicating the playhead position."
      },
      {
        option: "cursorWidth",
        type: "integer",
        default: "1",
        description: "Measured in pixels."
      },
      {
        option: "drawingContextAttributes",
        type: "object",
        default: "{desynchronized: true}",
        description: "Specify canvas 2d drawing context attributes."
      },
      {
        option: "fillParent",
        type: "boolean",
        default: "true",
        description:
          "Whether to fill the entire container or draw only according to minPxPerSec."
      },
      {
        option: "forceDecode",
        type: "boolean",
        default: "false",
        description:
          "Force decoding of audio using web audio when zooming to get a more detailed waveform."
      },
      {
        option: "height",
        type: "integer",
        default: "128",
        description: "The height of the waveform. Measured in pixels."
      },
      {
        option: "hideScrollbar",
        type: "boolean",
        default: "false",
        description:
          "Whether to hide the horizontal scrollbar when one would normally be shown."
      },
      {
        option: "interact",
        type: "boolean",
        default: "true",
        description:
          "Whether the mouse interaction will be enabled at initialization. You can switch this parameter at any time later on."
      },
      {
        option: "loopSelection",
        type: "boolean",
        default: "true",
        description:
          "(Use with regions plugin) Enable looping of selected regions."
      },
      {
        option: "maxCanvasWidth",
        type: "integer",
        default: "4000",
        description:
          "Maximum width of a single canvas in pixels, excluding a small overlap (2 * pixelRatio, rounded up to the next even integer). If the waveform is longer than this value, additional canvases will be used to render the waveform, which is useful for very large waveforms that may be too wide for browsers to draw on a single canvas. This parameter is only applicable to the MultiCanvas renderer."
      },
      {
        option: "mediaControls",
        type: "boolean",
        default: "false",
        description:
          "(Use with backend MediaElement) this enables the native controls for the media element."
      },
      {
        option: "mediaType",
        type: "string",
        default: "audio",
        description: "'audio' or 'video'. Only used with backend MediaElement."
      },
      {
        option: "minPxPerSec",
        type: "integer",
        default: "50",
        description: "Minimum number of pixels per second of audio."
      },
      {
        option: "normalize",
        type: "boolean",
        default: "false",
        description: "If true, normalize by the maximum peak instead of 1.0."
      },
      {
        option: "partialRender",
        type: "boolean",
        default: "false",
        description:
          "Use the PeakCache to improve rendering speed of large waveforms."
      },
      {
        option: "pixelRatio",
        type: "integer",
        default: "window.devicePixelRatio",
        description: "Can be set to 1 for faster rendering."
      },
      {
        option: "progressColor",
        type: "string",
        default: "#555",
        description:
          "The fill color of the part of the waveform behind the cursor. When progressColor and waveColor are the same the progress wave is not rendered at all."
      },
      {
        option: "removeMediaElementOnDestroy",
        type: "boolean",
        default: "true",
        description:
          "Set to false to keep the media element in the DOM when the player is destroyed. This is useful when reusing an existing media element via the loadMediaElement method."
      },
      {
        option: "responsive",
        type: "boolean or float",
        default: "false",
        description:
          "If set to true resize the waveform, when the window is resized. This is debounced with a 100ms timeout by default. If this parameter is a number it represents that timeout."
      },
      {
        option: "scrollParent",
        type: "boolean",
        default: "false",
        description:
          "Whether to scroll the container with a lengthy waveform. Otherwise the waveform is shrunk to the container width (see fillParent)."
      },
      {
        option: "skipLength",
        type: "float",
        default: "2",
        description:
          "Number of seconds to skip with the skipForward() and skipBackward() methods."
      },
      {
        option: "splitChannels",
        type: "boolean",
        default: "false",
        description:
          "Render with seperate waveforms for the channels of the audio."
      },
      {
        option: "waveColor",
        type: "string",
        default: "#999",
        description: "The fill color of the waveform after the cursor."
      },
      {
        option: "xhr",
        type: "Object",
        default: "{}",
        description:
          "XHR options. For example: let xhr = { cache: 'default', mode: 'cors', method: 'GET', credentials: 'same-origin', redirect: 'follow', referrer: 'client', headers: [ { key: 'Authorization', value: 'my-token' } ]};"
      }
    ]
  })
};
</script>

<style scoped></style>

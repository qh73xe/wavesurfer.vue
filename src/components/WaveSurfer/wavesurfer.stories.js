import WaveSurfer from "@/components/WaveSurfer/WaveSurfer.vue";

export default {
  component: WaveSurfer,
  title: "Components/WaveSurfer",
  argTypes: {
    "spectrogram-keyup": { action: "spectrogram-keyup" },
    "spectrogram-keydown": { action: "spectrogram-keydown" },
    "waveform-keyup": { action: "waveform-keyup" },
    "waveform-keydown": { action: "waveform-keydown" },
    "textgrid-keydown": { action: "textgrid-keydown" },
    "textgrid-keyup": { action: "textgrid-keyup" },
    addPoint: { action: "add-point" },
    updatePoint: { action: "update-point" },
    deletePoint: { action: "delete-point" },
    deviceError: { action: "device-error" },
    audioprocess: { action: "audio-process" },
    dblclick: { action: "dblclick" },
    destroy: { action: "destroy" },
    error: { action: "error" },
    finish: { action: "finish" },
    interaction: { action: "interaction" },
    loading: { action: "loading" },
    mute: { action: "mute" },
    pause: { action: "pause" },
    play: { action: "play" },
    ready: { action: "ready" },
    scroll: { action: "scroll" },
    seek: { action: "seek" },
    "textgrid-click": { action: "textgrid-click" },
    "textgrid-dblclick": { action: "textgrid-dblclick" },
    "tier-add": { action: "tier-add" },
    "tier-delete": { action: "tier-delete" },
    "tier-update": { action: "tier-update" },
    "textgrid-update": { action: "textgrid-update" },
    "textgrid-current-update": { action: "textgrid-current-update" },
    "spectrogram-render-start": { action: "spectrogram-render-start" },
    "spectrogram-render-end": { action: "spectrogram-render-end" },
    volume: { action: "volume" },
    zoom: { action: "zoom" },
    "waveform-ready": { action: "waveform-ready" },
  },
};

const Template = (_, { argTypes }) => ({
  components: { WaveSurfer },
  props: Object.keys(argTypes),
  template: `
    <wave-surfer 
      :source="source"
      :flat="flat"
      :tile="tile"
      :showTextGrid="showTextGrid"
      :showTimeLine="showTimeLine"
      :showPointLine="showPointLine"
      :showSpectrogram="showSpectrogram"
      :showFreqLabel="showFreqLabel"
      :rec="rec"
      :audioRate="audioRate"
      :autoCenter="autoCenter"
      :backend="backend"
      :backgroundColor="backgroundColor"
      :barGap="barGap"
      :barHeight="barHeight"
      :barMinHeight="barMinHeight"
      :barRadius="barRadius"
      :barWidth="barWidth"
      :closeAudioContext="closeAudioContext"
      :cursorColor="cursorColor"
      :cursorWidth="cursorWidth"
      :duration="duration"
      :drawingContextAttributes="drawingContextAttributes"
      :fillParent="fillParent"
      :forceDecode="forceDecode"
      :height="height"
      :hideScrollbar="hideScrollbar"
      :interact="interact"
      :loopSelection="loopSelection"
      :maxCanvasWidth="maxCanvasWidth"
      :mediaControls="mediaControls"
      :mediaType="mediaType"
      :minPxPerSec="minPxPerSec"
      :normalize="normalize"
      :partialRender="partialRender"
      :pixelRatio="pixelRatio"
      :progressColor="progressColor"
      :removeMediaElementOnDestroy="removeMediaElementOnDestroy"
      :responsive="responsive"
      :scrollParent="scrollParent"
      :skipLength="skipLength"
      :splitChannels="splitChannels"
      :targetChannel="targetChannel"
      :waveColor="waveColor"
      :xhr="xhr"
      :freqRate="freqRate"
      :freqFontSize="freqFontSize"
      :unitFontSize="unitFontSize"
      :spectrogramMaxHeight="spectrogramMaxHeight"
      :spectrogramHeight="spectrogramHeight"
      :pointWidth="pointWidth"
      :points="points"
      :textgridMaxHeight="textgridMaxHeight"
      :playingOffset="playingOffset"
      @spectrogram-keyup="spectrogram-keyup"
      @spectrogram-keydown="spectrogram-keydown"
      @waveform-keyup="waveform-keyup"
      @waveform-keydown="waveform-keydown"
      @textgrid-keydown="textgrid-keydown"
      @textgrid-keyup="textgrid-keyup"
      @addPoint="addPoint"
      @updatePoint="updatePoint"
      @deletePoint="deletePoint"
      @deviceError="deviceError"
      @audioprocess="audioprocess"
      @dblclick="dblclick"
      @destroy="destroy"
      @error="error"
      @finish="finish"
      @interaction="interaction"
      @loading="loading"
      @mute="mute"
      @pause="pause"
      @play="play"
      @ready="ready"
      @scroll="scroll"
      @seek="seek"
      @textgrid-click="textgrid-click"
      @textgrid-dblclick="textgrid-dblclick"
      @tier-add="tier-add"
      @tier-update="tier-update"
      @textgrid-update="textgrid-update"
      @textgrid-current-update="textgrid-current-update"
      @spectrogram-render-start="spectrogram-render-start"
      @spectrogram-render-end="spectrogram-render-end"
      @volume="volume"
      @zoom="zoom"
      @waveform-ready="waveform-ready"
    />`,
});

export const Default = Template.bind({});
Default.args = {
  source:
    "https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc/demo.wav",
  flat: false,
  tile: false,
  showTextGrid: false,
  showTimeLine: false,
  showPointLine: false,
  showSpectrogram: false,
  showFreqLabel: false,
  rec: false,
  audioRate: 1,
  audioContext: {},
  audioScriptProcessor: {},
  autoCenter: true,
  backend: "WebAudio",
  backgroundColor: "",
  barGap: null,
  barHeight: 1,
  barMinHeight: null,
  barRadius: 0,
  barWidth: null,
  closeAudioContext: false,
  cursorColor: "#333",
  cursorWidth: 1,
  duration: null,
  drawingContextAttributes: { desynchronized: true },
  fillParent: true,
  forceDecode: false,
  height: 64,
  hideScrollbar: false,
  interact: true,
  loopSelection: true,
  maxCanvasWidth: 4000,
  mediaControls: false,
  mediaType: "audio",
  minPxPerSec: 50,
  normalize: false,
  partialRender: false,
  pixelRatio: 1,
  progressColor: "#555",
  removeMediaElementOnDestroy: true,
  responsive: false,
  scrollParent: false,
  skipLength: 2,
  splitChannels: false,
  targetChannel: 0,
  waveColor: "#999",
  xhr: {},
  freqRate: 1,
  freqFontSize: 12,
  unitFontSize: 10,
  spectrogramMaxHeight: "100%",
  spectrogramHeight: 256,
  pointWidth: 1,
  points: [],
  textgridMaxHeight: "100%",
  playingOffset: 1,
};

import AudioElement from "@/views/examples/AudioElement.vue";
import VideoElement from "@/views/examples/VideoElement.vue";
import Bars from "@/views/examples/Bars.vue";
import SplitChannels from "@/views/examples/SplitChannels.vue";
import Timeline from "@/views/examples/Timeline.vue";
import Pointline from "@/views/examples/Pointline.vue";
import Spectrogram from "@/views/examples/Spectrogram.vue";
import VideoSpectrogram from "@/views/examples/VideoSpectrogram.vue";
import TextGrid from "@/views/examples/TextGrid.vue";
import Recording from "@/views/examples/Recording.vue";
const basename = "example";
export default [
  {
    path: `/${basename}/audio-element`,
    name: `${basename}-audio-element`,
    text: `Audio-Element`,
    component: AudioElement
  },
  {
    path: `/${basename}/bars`,
    name: `${basename}-bars`,
    text: `Bars`,
    component: Bars
  },
  {
    path: `/${basename}/split-cannels`,
    name: `${basename}-split-cannels`,
    text: `SplitChannels`,
    component: SplitChannels
  },
  {
    path: `/${basename}/timeline`,
    name: `${basename}-timeline`,
    text: `Timeline`,
    component: Timeline
  },
  {
    path: `/${basename}/pointline`,
    name: `${basename}-pointline`,
    text: `Pointline`,
    component: Pointline
  },
  {
    path: `/${basename}/textgrid`,
    name: `${basename}-textgrid`,
    text: `TextGrid`,
    component: TextGrid
  },
  {
    path: `/${basename}/spectrogram`,
    name: `${basename}-spectrogram`,
    text: `Spectrogram`,
    component: Spectrogram
  },
  {
    path: `/${basename}/video-element`,
    name: `${basename}-video-element`,
    text: `Video-Element`,
    component: VideoElement
  },
  {
    path: `/${basename}/video-spectrogram`,
    name: `${basename}-video-spectrogram`,
    text: `Video-Spectrogram`,
    component: VideoSpectrogram
  },
  {
    path: `/${basename}/recording`,
    name: `${basename}-recording`,
    text: `Recording`,
    component: Recording
  }
];

import AudioElement from "@/views/examples/AudioElement.vue";
import VideoElement from "@/views/examples/VideoElement.vue";
import Bars from "@/views/examples/Bars.vue";
import SplitChannels from "@/views/examples/SplitChannels.vue";
import Timeline from "@/views/examples/Timeline.vue";
const basename = "example";
export default [
  {
    path: `/${basename}/audio-element`,
    name: `${basename}-audio-element`,
    text: `Audio-Element`,
    component: AudioElement
  },
  {
    path: `/${basename}/video-element`,
    name: `${basename}-video-element`,
    text: `Video-Element`,
    component: VideoElement
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
  }
];

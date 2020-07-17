import AudioElement from "@/views/examples/AudioElement.vue";
import VideoElement from "@/views/examples/VideoElement.vue";
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
    path: `/${basename}/timeline`,
    name: `${basename}-timeline`,
    text: `Timeline`,
    component: Timeline
  }
];

import AudioElement from "@/views/examples/AudioElement.vue";
import VideoElement from "@/views/examples/VideoElement.vue";
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
  }
];

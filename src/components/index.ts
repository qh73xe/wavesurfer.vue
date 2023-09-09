import type { App } from 'vue';
import WaveSurfer from './WaveSurfer/WaveSurfer.vue';

export default {
  install(app: App) {
    app.component('WaveSurfer', WaveSurfer);
  },
};

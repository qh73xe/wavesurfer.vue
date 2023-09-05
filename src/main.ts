import type { App } from 'vue';
import WaveSurfer from './components/WaveSurfer/WaveSurfer.vue';

export default {
  install(app: App) {
    app.component('WaveSurfer', WaveSurfer);
  },
};

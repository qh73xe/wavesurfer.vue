import type { App } from 'vue';
import WaveSurfer from './components/WaveSurfer/WaveSurfer.vue';
import WaveSurferProvider from './providers/WaveSuferProvider.vue';

export default {
  install(app: App) {
    app.component('WaveSurfer', WaveSurfer);
    app.component('WaveSurferProvider', WaveSurferProvider);
  },
};

import type { App } from 'vue';
import WaveSurfer from './components/WaveSurfer.vue';
import WSpectrogram from './components/plugins/WSpectrogram.vue';
import WRegions from './components/plugins/WRegions.vue';
import WPichCounter from './components/plugins/WPichCounter.vue';
import WaveSurferProvider from './providers/WaveSurferProvider.vue';

export { default as WSKey } from './providers/WaveSurferProvider';
export type { WSStore } from './providers/WaveSurferProvider';

export default {
  install(app: App) {
    app.component('WaveSurfer', WaveSurfer);
    app.component('WSpectrogram', WSpectrogram);
    app.component('WRegions', WRegions);
    app.component('WPichCounter', WPichCounter);
    app.component('WaveSurferProvider', WaveSurferProvider);
  },
};

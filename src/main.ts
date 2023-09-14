import type { App } from 'vue';
import WaveSurfer from './components/WaveSurfer.vue';
import WSpectrogram from './components/plugins/WSpectrogram.vue';
import WaveSurferProvider from './providers/WaveSurferProvider.vue';
export {default as WSKey} from "./providers/WaveSurferProvider"
export type { WSStore } from "./providers/WaveSurferProvider"

export {WaveSurfer, WaveSurferProvider}

export default {
  install(app: App) {
    app.component('WaveSurfer', WaveSurfer);
    app.component('WSpectrogram', WSpectrogram);
    app.component('WaveSurferProvider', WaveSurferProvider);
  },
};

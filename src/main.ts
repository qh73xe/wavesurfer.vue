import type { App } from 'vue';
import WaveSurfer from './components/WaveSurfer/WaveSurfer.vue';
import WaveSurferProvider from './providers/WaveSurferProvider.vue';
export {default as WSKey} from "./providers/WaveSurferProvider"
export type { WSStore } from "./providers/WaveSurferProvider"


export default {
  install(app: App) {
    app.component('WaveSurfer', WaveSurfer);
    app.component('WaveSurferProvider', WaveSurferProvider);
  },
};

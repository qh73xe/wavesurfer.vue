import { App } from 'vue';
import TextEditor from './components/TextEditor.vue';
import WaveSurfer from './components/WaveSurfer.vue';
import WSpectrogram from './components/plugins/WSpectrogram.vue';
import WTextGrid from './components/plugins/WTextGrid.vue';
import WRegions from './components/plugins/WRegions.vue';
import WPichCounter from './components/plugins/WPichCounter.vue';
import WSController from './components/controller/WSController.vue';
import WSToolbarMenu from './components/controller/WSToolbarMenu.vue';
import WSToolbar from './components/controller/WSToolbar.vue';
import TEDialog from './components/dialog/TEDialog.vue';
import FileUploadDialog from './components/dialog/FileUploadDialog.vue';
import FileDownloadDialog from './components/dialog/FileDownloadDialog.vue';
import AddTierDialog from './components/dialog/AddTierDialog.vue'
import RenameTierDialog from './components/dialog/RenameTierDialog.vue';

import WaveSurferProvider from './providers/WaveSurferProvider.vue';
export { default as WSKey } from './providers/WaveSurferProvider';
export type { WSStore } from './providers/WaveSurferProvider';

const plugin: any = {
  install: (app: App<any>, options?: { [key: string]: any }): any => {
    app.component('TextEditor', TextEditor);
    app.component('WaveSurfer', WaveSurfer);
    app.component('WSpectrogram', WSpectrogram);
    app.component('WTextGrid', WTextGrid);
    app.component('WRegions', WRegions);
    app.component('WPichCounter', WPichCounter);
    app.component('WaveSurferProvider', WaveSurferProvider);
    app.component('WSController', WSController);
    app.component('WSToolbar', WSToolbar);
    app.component('WSToolbarMenu', WSToolbarMenu);
    app.component('TEDialog', TEDialog);
    app.component('FileUploadDialog', FileUploadDialog);
    app.component('FileDownloadDialog', FileDownloadDialog);
    app.component('AddTierDialog', AddTierDialog);
    app.component('RenameTierDialog', RenameTierDialog);
    app.provide('$wavesurfer', options);
  },
};

export default plugin;

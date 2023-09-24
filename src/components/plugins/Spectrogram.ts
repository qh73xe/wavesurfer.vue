import BaseSpectrogram, { SpectrogramPluginOptions } from 'wavesurfer.js/plugins/spectrogram';

class SpectrogramPlugin extends BaseSpectrogram {
  static create(options?: SpectrogramPluginOptions) {
    return new SpectrogramPlugin(options || {})
  }
  override render() {
    try {
      super.render();
    } catch (e) {
      console.debug(e)
    }
  }
}

export default SpectrogramPlugin;

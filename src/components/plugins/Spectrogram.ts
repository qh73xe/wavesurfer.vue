import BaseSpectrogramPlugin, { SpectrogramPluginOptions } from 'wavesurfer.js/plugins/spectrogram';

class SpectrogramPlugin extends BaseSpectrogramPlugin {
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
  override getFrequencies(buffer: AudioBuffer): number[] {
    if (buffer) {
      return super.getFrequencies(buffer);
    }
    return []
  }
}

export default SpectrogramPlugin;

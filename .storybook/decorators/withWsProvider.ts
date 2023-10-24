import type { Decorator } from '@storybook/vue3';
import WaveSurferProvider from '../../src/providers/WaveSurferProvider.vue';

const withWsProvider: Decorator = (story) => ({
  components: { story, WaveSurferProvider },
  template: `
    <WaveSurferProvider><story /></WaveSurferProvider>
  `,
});

export default withWsProvider;

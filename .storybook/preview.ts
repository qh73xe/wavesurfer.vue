import type { Preview } from '@storybook/vue3'
import WaveSurferProvider from '../src/providers/WaveSurferProvider.vue';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (story) => ({
      components: { story, WaveSurferProvider },
      template: '<WaveSurferProvider><story /></WaveSurferProvider>',
    }),
  ],
}

export default preview

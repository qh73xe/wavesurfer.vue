import type { Preview } from '@storybook/vue3'
import withWsProvider from './decorators/withWsProvider';

const sources = [
  'stereo',
  'mono',
  'video',
  'no source',
];

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
  globalTypes: {
    file: {
      description: 'Global source for wavesurfer',
      defaultValue: sources[0],
      toolbar: {
        title: 'Source',
        icon: 'folder',
        items: sources,
        dynamicTitle: true,
      },
    },
  },
  decorators: [ withWsProvider ],
}

export default preview

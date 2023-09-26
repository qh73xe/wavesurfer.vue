import { setup } from '@storybook/vue3';
import type { Preview } from '@storybook/vue3';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import withWsProvider from './decorators/withWsProvider';
import withVuetifyTheme from './decorators/withVutifyTheme';

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
});

setup((app) => {
  app.use(vuetify);
});

const sources = ['stereo', 'mono', 'video', 'no source'];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
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
  decorators: [withWsProvider, withVuetifyTheme],
};

export default preview;

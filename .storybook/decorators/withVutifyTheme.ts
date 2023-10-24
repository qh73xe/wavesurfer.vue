import type { Decorator } from '@storybook/vue3';
import { h } from 'vue';
import VuetifyWrapper from './VuetifyWrapper.vue';

const withVuetifyTheme: Decorator = (storyFn, context) => {
  const story = storyFn();
  return () => {
    return h(
      VuetifyWrapper,
      {},
      {
        story: () => h(story, { ...context.args }),
      }
    );
  };
};
export default withVuetifyTheme;

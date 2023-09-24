import type { Meta, StoryObj } from '@storybook/vue3';

import WPichCounter from './WPichCounter.vue';
import withWs from '../../../.storybook/decorators/withWs';

const meta: Meta<typeof WPichCounter> = {
  component: WPichCounter,
  argTypes: { onReady: { action: 'onReady' } },
  tags: ['autodocs'],
} satisfies Meta<typeof WPichCounter>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WPichCounterStory: Story = {
  decorators: [withWs],
  args: {
    pitchColor: '#880E4F',
    height: 100,
  },
};

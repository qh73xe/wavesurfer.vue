import type { Meta, StoryObj } from '@storybook/vue3';
import WSController from "./WSController.vue";

import withWs from '../../../.storybook/decorators/withWs';

const meta: Meta<typeof WSController> = {
  component: WSController,
  tags: ['autodocs'],
} satisfies Meta<typeof WSController>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WSControllerStory: Story = {
  decorators: [withWs],
  args: {},
};

import type { Meta, StoryObj } from '@storybook/vue3';
import WSToolbar from "./WSToolbar.vue";

const meta: Meta<typeof WSToolbar> = {
  component: WSToolbar,
  tags: ['autodocs'],
  argTypes: { onClick: { action: 'onClick' } },
} satisfies Meta<typeof WSToolbar>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WSToolbarStory: Story = { args: {} };

import type { Meta, StoryObj } from '@storybook/vue3';
import WTextGridField from './WTextGridField.vue';

const meta: Meta<typeof WTextGridField> = {
  component: WTextGridField,
  tags: ['autodocs'],
} satisfies Meta<typeof WTextGridField>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WTextGridFieldStory: Story = { args: {} };

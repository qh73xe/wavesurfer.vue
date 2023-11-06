import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3';
import AddTierDialog, { AddTierDialogProps } from "./AddTierDialog.vue";

const meta: Meta<typeof AddTierDialog> = {
  component: AddTierDialog,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onReset: { action: 'onReset' },
    onCancel: { action: 'onCancel' },
  },
  tags: ['autodocs'],
  render: (args: AddTierDialogProps) => ({
    components: { AddTierDialog },
    setup() {
      const modelValue = ref(args.modelValue)
      const updateModel = (event: boolean) => modelValue.value = event
      return { args, modelValue, updateModel };
    },
    template: `
      <add-tier-dialog
        v-bind="args"
        :modelValue="modelValue"
        @update:modelValue="updateModel"
      />
    `,
  }),
} satisfies Meta<typeof AddTierDialog>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Interval tier を作成するためのダイアログのテストです */
export const AddIntervalTierDialogStory: Story = {
  args: {
    modelValue: true,
    tierType: 'interval',
  },
};

/** Point tier を作成するためのダイアログのテストです */
export const AddPointTierDialogStory: Story = {
  args: {
    modelValue: true,
    tierType: 'point',
  },
};

/** Tier をコピーするためのダイアログのテストです */
export const DuplicateTierDialogStory: Story = {
  args: {
    modelValue: true,
    tierType: 'duplicate',
  },
};

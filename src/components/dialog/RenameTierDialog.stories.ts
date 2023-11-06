import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3';
import RenameTierDialog, { RenameTierDialogProps } from "./RenameTierDialog.vue";

const meta: Meta<typeof RenameTierDialog> = {
  component: RenameTierDialog,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onReset: { action: 'onReset' },
    onCancel: { action: 'onCancel' },
  },
  tags: ['autodocs'],
  render: (args: RenameTierDialogProps) => ({
    components: { RenameTierDialog },
    setup() {
      const modelValue = ref(args.modelValue)
      const updateModel = (event: boolean) => modelValue.value = event
      return { args, modelValue, updateModel };
    },
    template: `
      <rename-tier-dialog
        v-bind="args"
        :modelValue="modelValue"
        @update:modelValue="updateModel"
      />
    `,
  }),
} satisfies Meta<typeof RenameTierDialog>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Tier 名を変更するためのダイアログのテストです */
export const RenameTierDialogStory: Story = { args: { modelValue: true } };

/** Initical value が設定されている場合のテストです */
export const IniticalValueStory: Story = {
  args: { 
    modelValue: true,
    initialValue: {
      tierName: 'Tier 1',
    }
  },
};

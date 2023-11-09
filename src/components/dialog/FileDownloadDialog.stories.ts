import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3';
import FileDownloadDialog, { FileDownloadDialogProps } from "./FileDownloadDialog.vue";

const meta: Meta<typeof FileDownloadDialog> = {
  component: FileDownloadDialog,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onReset: { action: 'onReset' },
    onCancel: { action: 'onCancel' },
  },
  tags: ['autodocs'],
  render: (args: FileDownloadDialogProps) => ({
    components: { FileDownloadDialog },
    setup() {
      const modelValue = ref(args.modelValue)
      const updateModel = (event: boolean) => modelValue.value = event
      return { args, modelValue, updateModel };
    },
    template: `
      <div>
        <file-download-dialog
          v-bind="args"
          :modelValue="modelValue"
          @update:modelValue="updateModel"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof FileDownloadDialog>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Tier 名を変更するためのダイアログのテストです */
export const FileDownloadDialogStory: Story = { args: { modelValue: true } };

export const OptionStory: Story = {
  args: {
    ...FileDownloadDialogStory.args,
    title: "ファイルダウンロード",
    suffix: ".TextGrid",
  }
};

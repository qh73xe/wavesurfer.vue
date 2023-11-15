import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3';
import FileUploadDialog, { FileUploadDialogProps, FileSubmitEvent } from "./FileUploadDialog.vue";

const meta: Meta<typeof FileUploadDialog> = {
  component: FileUploadDialog,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onReset: { action: 'onReset' },
    onCancel: { action: 'onCancel' },
  },
  tags: ['autodocs'],
  render: (args: FileUploadDialogProps) => ({
    components: { FileUploadDialog },
    setup() {
      const modelValue = ref(args.modelValue)
      const name = ref("")
      const file = ref("")
      const type = ref("")

      const updateModel = (event: boolean) => modelValue.value = event
      const onSubmit = (event: FileSubmitEvent) => {
        name.value = event.name
        file.value = event.file
        type.value = event.type
      }
      return { args, modelValue, updateModel, onSubmit, name, file, type };
    },
    template: `
      <div>
        <p v-if="name">name: {{ name }}</p>
        <p v-if="type">type: {{ type }}</p>
        <p v-if="file">file: {{ file }}</p>
        <file-upload-dialog
          v-bind="args"
          :modelValue="modelValue"
          @update:modelValue="updateModel"
          @submit="onSubmit"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof FileUploadDialog>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Tier 名を変更するためのダイアログのテストです */
export const FileUploadDialogStory: Story = { args: { modelValue: true } };

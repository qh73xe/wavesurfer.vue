import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3';
import TEDialog, { TEDialogProps } from "./TEDialog.vue";

const meta: Meta<typeof TEDialog> = {
  component: TEDialog,
  argTypes: {
    onCancel: { action: 'onCancel' },
    onSubmit: { action: 'onSubmit' },
    onReset: { action: 'onReset' },
  },
  render: (args: TEDialogProps) => ({
    components: { TEDialog },
    setup() {
      const modelValue = ref(args.modelValue)
      const position = ref(-1)
      const name = ref("")
      const updateModel = (event: boolean) => modelValue.value = event
      return { args, position, name, modelValue, updateModel };
    },
    template: `
      <t-e-dialog
        v-bind="args"
        :modelValue="modelValue"
        @update:modelValue="updateModel"
      >
        <v-card-text>
          <v-text-field
            v-model="position"
            label="Position:"
          />
          <v-text-field
            v-model="name"
            label="Name:"
          />
        </v-card-text>
      </t-e-dialog>
    `,
  }),
  tags: ['autodocs'],
} satisfies Meta<typeof TEDialog>;
export default meta;

type Story = StoryObj<typeof meta>;
export const TEDialogStory: Story = { 
  args: { 
    modelValue: true,
    title: "Add interval tier"
  },
};

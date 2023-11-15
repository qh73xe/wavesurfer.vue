import type { Meta, StoryObj } from '@storybook/vue3';
import WSToolbarMenu from "./WSToolbarMenu.vue";

const meta: Meta<typeof WSToolbarMenu> = {
  component: WSToolbarMenu,
  tags: ['autodocs'],
  argTypes: { onClick: { action: 'onClick' } },
} satisfies Meta<typeof WSToolbarMenu>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WSToolbarMenuStory: Story = {
  args: { 
    title: "Menu",
    items: [
      { id: "Home", title: 'Home' },
      { id: "About", title: 'About' },
      { id: "some-divider", title: 'divider' },
      { id: "with-header", title: 'Contact1', header: "Contact" },
      { id: "Contact", title: 'Contact2' },
    ]
  }
};

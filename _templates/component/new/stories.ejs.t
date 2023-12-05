---
to: src/components/<%= category %>/<%= name %>.stories.ts
---
import type { Meta, StoryObj } from '@storybook/vue3';
import <%= name %> from './<%= name %>.vue';

const meta: Meta<typeof <%= name %>> = {
  component: <%= name %>,
  tags: ['autodocs'],
} satisfies Meta<typeof <%= name %>>;
export default meta;

type Story = StoryObj<typeof meta>;
export const <%= name %>Story: Story = { args: {} };

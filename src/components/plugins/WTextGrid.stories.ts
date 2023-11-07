import type { Meta, StoryObj } from "@storybook/vue3";
import WTextGrid from "./WTextGrid.vue";

import withWs from "../../../.storybook/decorators/withWsControll";

const meta: Meta<typeof WTextGrid> = {
  component: WTextGrid,
  argTypes: {
    onReady: { action: "onReady" },
    onClick: { action: 'onClick' },
    onDblclick: { action: 'onDblclick' },
    onMouseenter: { action: 'onMouseenter' },
    onMouseleave: { action: 'onMouseleave' },
    onUpdate: { action: 'onUpdate' },
    onUpdated: { action: 'onUpdated' },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WTextGrid>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WTextGridStory: Story = {
  decorators: [withWs],
  args: {
    drag: true,
    data: {
      test2: {
        name: "test",
        type: "point",
        items: [
          {
            time: 1.5,
            text: "test1",
          },
          {
            time: 10.5,
            text: "test2",
          },
        ],
      },
      test1: {
        name: "test",
        type: "interval",
        items: [
          {
            time: 1,
            text: "test1",
          },
          {
            time: 5,
            text: "test3",
          },
          {
            time: 5.5,
            text: "test4",
          },
          {
            time: 10,
            text: "test5",
          },
          {
            time: 3,
            text: "test2",
          },
        ],
      },
    },
    showLabel: true,
  },
};
export const WithoutLabelStory: Story = {
  decorators: [withWs],
  args: {
    ...WTextGridStory.args,
    showLabel: false,
  },
};

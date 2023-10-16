import type { Meta, StoryObj } from '@storybook/vue3';
import WTextGrid from "./WTextGrid.vue";

import withWs from '../../../.storybook/decorators/withWs';
import withWsMedia from '../../../.storybook/decorators/withWsMedia';

const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOptions = [
  `${dataURL}/demo.wav`,
  `${dataURL}/nasa.mp4`,
  `${dataURL}/demo_video.mp4`,
  `${dataURL}/speech.wav`,
  `${dataURL}/stereo.mp3`,
];

const meta: Meta<typeof WTextGrid> = {
  component: WTextGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof WTextGrid>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WTextGridStory: Story = {
  decorators: [withWs],
  args: {
    tg: {
      test1: {
        name: "test",
        type: "interval",
        items: [],
      },
      test2: {
        name: "test",
        type: "interval",
        items: [],
      }
    }
  },
};

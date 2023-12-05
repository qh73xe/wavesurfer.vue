import type { Meta, StoryObj } from '@storybook/vue3';
import WVideoArray from './WVideoArray.vue';

const dataURL =
  'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOption = {
  mono: `${dataURL}/demo.wav`,
  stereo: `${dataURL}/stereo.mp3`,
  video: `${dataURL}/nasa.mp4`,
  speech: `${dataURL}/speech.wav`,
} as const;

const options = Object.values(sourceOption);

const meta: Meta<typeof WVideoArray> = {
  component: WVideoArray,
  argTypes: { source: { options: options } },
  tags: ['autodocs'],
} satisfies Meta<typeof WVideoArray>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WVideoArrayStory: Story = {
  args: {
    source: sourceOption.video,
    flat: true,
    tile: true,
    muted: true,
  },
};

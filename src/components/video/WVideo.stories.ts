import type { Meta, StoryObj } from '@storybook/vue3';
import WVideo from './WVideo.vue';

const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOption = {
 "mono": `${dataURL}/demo.wav`,
 "stereo": `${dataURL}/stereo.mp3`,
 "video": `${dataURL}/nasa.mp4`,
 "speech": `${dataURL}/speech.wav`,
} as const;
const options = Object.values(sourceOption);

const meta: Meta<typeof WVideo> = {
  component: WVideo,
  argTypes: { 
    source: { options: options },
    onResize: { action: 'onResize' },
    onLoadeddata: { action: 'onLoadeddata' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WVideo>;
export default meta;

type Story = StoryObj<typeof meta>;
export const WVideoStory: Story = { 
  args: {
    source: sourceOption.video,
    flat: true,
    tile: true,
    muted: true,
    controls: true,
  }
};

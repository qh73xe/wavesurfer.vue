import type { Meta, StoryObj } from '@storybook/vue3';

import TextEditor from './TextEditor.vue';

const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOption = {
 "mono": `${dataURL}/demo.wav`,
 "stereo": `${dataURL}/stereo.mp3`,
 "video": `${dataURL}/nasa.mp4`,
 "speech": `${dataURL}/speech.wav`,
} as const;
const options = Object.values(sourceOption);
const meta = {
  component: TextEditor,
  argTypes: { source: { options: options } },
  tags: ['autodocs'],
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Praat / TextEditor の再現を行います. */
export const BasicStory: Story = { 
  args: { 
    source: sourceOption.mono,
    textgrid: {
      drag: true,
      data: {
        t2: {
          name: "t2",
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
        t1: {
          name: "t1",
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
      }
  }
};

/** ステレオ音声が渡された際の表示例です. */
export const StereoSoundStory: Story = { 
  args: { 
    ...BasicStory.args,
    source: sourceOption.stereo,
  }
};

/** 動画が渡された際の表示例です. */
export const VideoStory: Story = {args: {source: sourceOption.video,}};

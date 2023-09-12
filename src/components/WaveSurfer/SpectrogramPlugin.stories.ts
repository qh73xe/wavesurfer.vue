import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import WaveSurfer from './WaveSurfer.vue';
import SpectrogramPlugin from './SpectrogramPlugin.vue';

const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const sourceOptions = [
  `${dataURL}/demo.wav`,
  `${dataURL}/nasa.mp4`,
  `${dataURL}/demo_video.mp4`,
  `${dataURL}/speech.wav`,
  `${dataURL}/stereo.mp3`,
];

const meta = {
  component: SpectrogramPlugin,
  argTypes: {},
  render: (args) => ({
    components: { WaveSurfer, SpectrogramPlugin },
    setup() {
      const source = sourceOptions[0]
      const showSpec = ref<boolean>(false)
      const onLoad = () => {
        console.log("onLoad")
        showSpec.value = true
      }

      return { source, args, showSpec, onLoad }
    },
    template: `
      <WaveSurfer :source="source" @load="onLoad">
        <SpectrogramPlugin v-if="showSpec" v-bind="args" />
      </WaveSurfer>
    `,
  }),
  tags: ['autodocs'],
} satisfies Meta<typeof SpectrogramPlugin>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Basic: Story = { args: {} };

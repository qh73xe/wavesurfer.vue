<script setup lang="ts">
import { ref } from 'vue';
import TEDialog from './TEDialog.vue';
import {
  toBase64,
  info,
  initVideoObject,
  VideoObject,
} from '../../io/file';

export interface FileSubmitEvent {
  /** 登録するファイル  */
  file: string;
  /** 登録するファイル名  */
  name: string;
  /** 登録するファイルの MineType  */
  type: string;
  /** メディアファイルの詳細情報  */
  option: VideoObject;
}
export interface FileUploadDialogProps {
  /** ダイアログの開閉 */
  modelValue: boolean;
  initialValue?: Partial<FileSubmitEvent>;
}
const props = withDefaults(
  defineProps<FileUploadDialogProps>(),
  {
    initialValue: () => ({
      name: '',
      type: '',
      file: '',
    }),
  },
);
const emit = defineEmits<{
  'update:modelValue': [event: boolean];
  cancel: [];
  submit: [event: FileSubmitEvent];
  reset: [];
}>();

/** フォームタイトル */
const title = 'Read from File';
/** ファイル名 */
const name = ref(props.initialValue.name);
/** ファイル実態 */
const file = ref(props.initialValue.file);
/** ファイル種別 */
const type = ref(props.initialValue.type);
/** ファイル詳細 */
const fileOption = ref(initVideoObject());

const onUpdate = async (files: File[]) => {
  if (files.length > 0) {
    name.value = files[0].name;
    type.value = files[0].type;
    file.value = await toBase64(files[0]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        info(
          reader.result,
          files[0].name,
          (event: VideoObject) => {
            fileOption.value = event;
          },
        );
      }
    };
  }
};
const onCancel = () => {
  name.value = props.initialValue.name;
  file.value = props.initialValue.file;
  fileOption.value = initVideoObject();
  emit('cancel');
};
const onSubmit = () => {
  if (file.value && name.value && type.value) {
    const event: FileSubmitEvent = {
      file: file.value,
      name: name.value,
      type: type.value,
      option: fileOption.value,
    };
    emit('submit', event);
    name.value = props.initialValue.name;
    file.value = props.initialValue.file;
    fileOption.value = initVideoObject();
  }
};
const onReset = () => {
  name.value = props.initialValue.name;
  file.value = props.initialValue.file;
  fileOption.value = initVideoObject();
  emit('reset');
};
</script>

<template>
  <t-e-dialog
    :title="title"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    @cancel="onCancel"
    @submit="onSubmit"
    @reset="onReset"
  >
    <v-card-text>
      <v-file-input
        v-if="!file"
        show-size
        accept="video/mp4,video/webm,audio/mp3,audio/wav"
        label="Media File"
        variant="underlined"
        @update:modelValue="onUpdate"
      />
      <v-text-field
        v-if="name"
        v-model="name"
        variant="underlined"
        label="File Name"
      />

      <v-text-field
        v-if="fileOption.videoStream.fps"
        v-model="fileOption.videoStream.fps"
        variant="underlined"
        label="Frame Rate (fps)"
        suffix="fps"
      />

      <v-text-field
        v-if="fileOption.duration"
        v-model="fileOption.duration"
        variant="underlined"
        label="Duration"
        suffix="sec"
      />

      <v-text-field
        v-if="fileOption.originSize.width"
        v-model="fileOption.originSize.width"
        variant="underlined"
        label="Size: Width"
        suffix="pixel"
      />

      <v-text-field
        v-if="fileOption.originSize.height"
        v-model="fileOption.originSize.height"
        variant="underlined"
        label="Size: Height"
        suffix="pixel"
      />
    </v-card-text>
  </t-e-dialog>
</template>

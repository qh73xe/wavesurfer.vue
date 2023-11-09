<script setup lang="ts">
import { ref } from 'vue';
import TEDialog from './TEDialog.vue';
import { toBase64 } from '../../io/file';

export interface FileSubmitEvent {
  /** 登録するファイル  */
  file: string;
  /** 登録するファイル名  */
  name: string;
  /** 登録するファイルの MineType  */
  type: string;
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
const type = ref(props.initialValue.type);

const onUpdate = async (files: File[]) => {
  if (files.length > 0) {
    name.value = files[0].name;
    type.value = files[0].type;
    file.value = await toBase64(files[0]);
  }
};
const onCancel = () => {
  name.value = props.initialValue.name;
  file.value = props.initialValue.file;
  emit('cancel');
};
const onSubmit = () => {
  if (file.value && name.value && type.value) {
    const event: FileSubmitEvent = {
      file: file.value,
      name: name.value,
      type: type.value,
    }
    emit('submit', event);
  }
};
const onReset = () => {
  name.value = props.initialValue.name;
  file.value = props.initialValue.file;
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
        show-size
        accept="video/mp4,video/webm,audio/mp3,audio/wav"
        label="Media File"
        @update:modelValue="onUpdate"
      />
    </v-card-text>
  </t-e-dialog>
</template>

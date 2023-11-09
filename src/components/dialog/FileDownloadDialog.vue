<script setup lang="ts">
import { ref } from 'vue';
import TEDialog from './TEDialog.vue';

export interface FileDownloadEvent {
  /** 登録するファイル名  */
  name: string;
}

export interface FileDownloadDialogProps {
  /** ダイアログの開閉 */
  modelValue: boolean;
  /** ダイアログタイトル */
  title?: string;
  /** Displays suffix text */
  suffix?: string;
  /** フォーム初期値 */
  initialValue?: FileDownloadEvent;
}
const props = withDefaults(
  defineProps<FileDownloadDialogProps>(), 
  {
    title: 'File Download',
    initialValue: () => ({ name: '' }),
  }
);
const emit = defineEmits<{
  'update:modelValue': [event: boolean];
  cancel: [];
  submit: [name: string];
  reset: [];
}>();

/** ファイル名 */
const name = ref<string>(props.initialValue.name || "");
const suffix = ref<string>(props.suffix || "");
const title = ref<string>(props.title || "");

const onUpdate = (value: string) => {
  name.value = value;
};
const onCancel = () => {
  name.value = props.initialValue.name || "";
  emit('cancel');
};
const onSubmit = () => {
  if (name.value) {
    emit('submit', name.value);
  } else {
    emit('submit', "Download");
  }
};
const onReset = () => {
  name.value = props.initialValue.name;
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
      <v-text-field
        :modelValue="name"
        :suffix="suffix"
        @update:modelValue="onUpdate"
        label="File Name:"
        variant="underlined"
      />
    </v-card-text>
  </t-e-dialog>
</template>

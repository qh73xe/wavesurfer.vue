<script setup lang="ts">
export interface TEDialogProps {
  /** ダイアログの開閉 */
  modelValue: boolean;
  /** ダイアログのタイトル */
  title: string;
}

const emit = defineEmits<{
  'update:modelValue': [event: boolean];
  'cancel': [];
  'submit': [];
  'reset': [];
}>();

withDefaults(defineProps<TEDialogProps>(), {});
const onClose = () => {
  emit('update:modelValue', false)
  emit('cancel')
};
const onSubmit = () => {
  emit('update:modelValue', false)
  emit('submit')
};
const onReset = () => {
  emit('reset')
};
</script>

<template>
  <v-dialog
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    width="auto"
  >
    <v-card min-width="512px">
      <v-toolbar density="compact">
        <v-spacer />
        <span class="ms-2">{{ title }}</span>
        <v-spacer />
      </v-toolbar>
      <slot />
      <v-card-actions>
        <v-btn @click="onReset">Standards</v-btn>
        <v-spacer />
        <v-btn variant="outlined" @click="onClose">Cancel</v-btn>
        <v-btn color="primary" variant="elevated" @click="onSubmit">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

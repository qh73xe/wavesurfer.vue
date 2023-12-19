<script setup lang="ts">
import { ref } from 'vue';

export interface WTextGridFieldProps {
  modelValue?: string;
}

const props = withDefaults(
  defineProps<WTextGridFieldProps>(),
  {},
);
const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const textfield = ref<HTMLInputElement | null>(null);
defineExpose({ textfield });

const onUpdateText = (value: string) =>
  emit('update:modelValue', value);
</script>

<template>
  <v-text-field
    :model-value="props.modelValue"
    @update:modelValue="onUpdateText"
    ref="textfield"
    density="compact"
    variant="solo"
    single-line
    hide-details
  />
</template>

<style scoped>
.v-text-field ::v-deep(.v-field) {
  border-radius: 0px;
}
</style>

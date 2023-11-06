<script setup lang="ts">
import { ref, computed } from 'vue';
import TEDialog from "./TEDialog.vue"


export interface InitialProps {
  /** 作成する Tier 名 */
  tierName: string,
}
export interface RenameTierDialogProps {
  /** ダイアログの開閉 */
  modelValue: boolean;
  initialValue?: InitialProps
}
const props = withDefaults(defineProps<RenameTierDialogProps>(), {
  initialValue: () => ({ tierName: "" })
});
const emit = defineEmits<{
  'update:modelValue': [event: boolean];
  'cancel': [];
  'submit': [event: string];
  'reset': [];
}>();


/** 作成する Tier の名前 */
const tierName = ref(props.initialValue.tierName);

/** フォームタイトル */
const title = "Rename Tier";

const onTierNameChange = (value: string) => {
  tierName.value = value;
}
const onCancel = () => {
  tierName.value = props.initialValue.tierName;
  emit('cancel');
}
const onSubmit = () => {
  emit('submit', tierName.value);
}
const onReset = () => {
  tierName.value = props.initialValue.tierName;
  emit('reset');
}

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
        :modelValue="tierName"
        @update:modelValue="onTierNameChange"
        label="Name:"
        variant="underlined"
      />
    </v-card-text>
  </t-e-dialog>
</template>

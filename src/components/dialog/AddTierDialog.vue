<script setup lang="ts">
import { ref, computed } from 'vue';
import TEDialog from "./TEDialog.vue"

export interface InitialProps {
  /** 作成する Tier 名 */
  tierName: string,
}

export type TierType = "interval" | "point" | "duplicate";
export interface NewTierProps extends InitialProps {
  tierType: TierType
}

export interface AddTierDialogProps {
  /** ダイアログの開閉 */
  modelValue: boolean;
  /** 作成する Tier の種類 */
  tierType: TierType
  /** フォーム初期値 */
  initialValue?: InitialProps
}
const props = withDefaults(defineProps<AddTierDialogProps>(), { initialValue: () => ({ tierName: "" }) });
const emit = defineEmits<{
  'update:modelValue': [event: boolean];
  'cancel': [];
  'submit': [event: NewTierProps];
  'reset': [];
}>();


/** 作成する Tier の名前 */
const tierName = ref(props.initialValue.tierName);

/** フォームタイトル */
const title = computed((): string => {
  if (props.tierType === "interval") {
    return "Add Interval Tier";
  }
  if (props.tierType === "point") {
    return "Add Point Tier";
  }
  return "Duplicate Tier";
});

const onTierNameChange = (value: string) => {
  tierName.value = value;
}
const onCancel = () => {
  tierName.value = props.initialValue.tierName;
  emit('cancel');
}
const onSubmit = () => {
  emit('submit', {
    tierName: tierName.value,
    tierType: props.tierType,
  });
  tierName.value = props.initialValue.tierName;
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

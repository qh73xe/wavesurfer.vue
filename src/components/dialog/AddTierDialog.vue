<script setup lang="ts">
import { ref, computed } from 'vue';
import TEDialog from "./TEDialog.vue"

export interface InitialProps {
  /** 作成する Tier 名 */
  tierName: string,
  /** 作成する Tier の位置 */
  tierPosition: number,
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
const props = withDefaults(defineProps<AddTierDialogProps>(), {
  initialValue: () => ({
    tierName: "",
    tierPosition: -1,
  })
});
const emit = defineEmits<{
  'update:modelValue': [event: boolean];
  'cancel': [];
  'submit': [event: NewTierProps];
  'reset': [];
}>();


/** 作成する Tier の名前 */
const tierName = ref(props.initialValue.tierName);

/** 作成する Tier の位置 */
const tierPosition = ref(props.initialValue.tierPosition);
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

const onTierPositionChange = (value: string) => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    tierPosition.value = -1;
  } else {
    tierPosition.value = parsed;
  }
}
const onTierNameChange = (value: string) => {
  tierName.value = value;
}
const onCancel = () => {
  tierName.value = props.initialValue.tierName;
  tierPosition.value = props.initialValue.tierPosition;
  emit('cancel');
}
const onSubmit = () => {
  emit('submit', {
    tierName: tierName.value,
    tierPosition: tierPosition.value,
    tierType: props.tierType,
  });
}
const onReset = () => {
  tierName.value = props.initialValue.tierName;
  tierPosition.value = props.initialValue.tierPosition;
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
        type="number"
        :modelValue="tierPosition"
        @update:modelValue="onTierPositionChange"
        hint="-1 (= at buttom)"
        persistent-hint
        label="Position:"
        variant="underlined"
      />
      <v-text-field
        :modelValue="tierName"
        @update:modelValue="onTierNameChange"
        label="Name:"
        variant="underlined"
      />
    </v-card-text>
  </t-e-dialog>
</template>

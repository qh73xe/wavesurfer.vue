---
to: src/components/<%= category %>/<%= name %>.vue
---
<script setup lang="ts">
import { ref } from 'vue'

export interface <%= name %>Props { }

const props = withDefaults(defineProps<<%= name %>Props>(), { });
const emit = defineEmits<{}>();

</script>

<template>
  <slot />
</template>

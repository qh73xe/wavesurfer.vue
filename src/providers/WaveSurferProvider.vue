<template>
  <slot></slot>
</template>

<script setup lang="ts">
  import { provide } from 'vue'
  import WSKey from "./WaveSurferProvider"
  import useWavesurfer from "../hooks/useWavesurfer"
  provide(WSKey, useWavesurfer())
</script>

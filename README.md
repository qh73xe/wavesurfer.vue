# wavesurfer.vue

`wavesurfer.vue` は `wavesurfer.js` を vue で使用するためのラッパーです.
Web Audio API および HTML5 Canvas の上に構築されたカスタマイズ可能な音声波形の視覚化を提供します.

## Quick Start

以下のコマンドより導入可能です.

```
$ yarn add wavesurfer.vue
```

`wavesurfer.vue` はプラグインとして作成されています.
利用を開始するには `main.ts` に以下の記述を行います.

```typescript
import { createApp } from 'vue'
import WaveSurfer from "wavesurfer.vue";
import App from './App.vue'

const app = createApp(App)
app.use(WaveSurfer)
app.mount('#app')
```

`WaveSurfer` コンポーネントは以下のように利用します.

```vue
<script setup lang="ts">
const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const source = `${dataURL}/demo.wav`
</script>

<template>
  <wave-surfer :source="source" />
</template>
```

## 開発者用情報

### Project setup

```
yarn install
```

#### Compiles and hot-reloads for development

```
yarn dev
```

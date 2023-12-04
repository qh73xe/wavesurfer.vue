# wavesurfer.vue

`wavesurfer.vue` は [wavesurfer.js](https://wavesurfer-js.org/) を `vue` で使用するためのラッパーです.
Web Audio API および HTML5 Canvas の上に構築されたカスタマイズ可能な音声波形の視覚化を提供します.

## Quick Start

以下のコマンドより導入可能です.

```bash
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
<template>
  <WaveSurferProvider>
    <wave-surfer
      interact
      autoScroll
      progressColor="#555"
      cursorColor="#333"
      :cursorWidth="1"
      :hideScrollbar="false"
      :minPxPerSec="100"
      :source="source"
    />
  </WaveSurferProvider>
</template>

<script lang="ts" setup>
const dataURL = 'https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc';
const source = `${dataURL}/demo.wav`
</script>
```

## 開発者用情報

### Project setup

```bash
yarn install
```

#### Compiles and hot-reloads for development

```bash
yarn dev
```

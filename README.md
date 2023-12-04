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

### Vuetify3 と共に利用する

このライブラリで用意しているいくつかのコンポーネントには
`Vutify3` という UI キットを利用しています.

これらのツールを利用する場合,
以下のコマンドから環境構築を行うことがおすすめされています.

```{bash}
yarn create vuetify
```

これを前提に利用を開始する場合には,
まず, `src/plugins/vutify.ts` において,
Vutify3 の全ての機能を有効にする必要があります.

具体的には以下のように設定を行ってください.

```{typescript}
/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
```

その上で, `src/plugins/index.ts` において,
Wavsurfer.vue を有効にします.

```{typescript}
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import WaveSurfer from "wavesurfer.vue";
import vuetify from './vuetify'
...

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    ...
    .use(WaveSurfer)
}
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

# wavesurfer.vue

`wavesurfer.vue` は `wavesurfer.js` を vue で使用するためのラッパーです.
Web Audio API および HTML5 Canvas の上に構築されたカスタマイズ可能な音声波形の視覚化を提供します.

## Quick Start

以下のコマンドより導入可能です.

```
$ yarn add wavesurfer.vue
```

Vue ファイル内部では以下のような記述を行います.

```
<template>
  <wave-surfer :source="source" />
</template>

<script>
import WaveSurfer from "wavesurfer.vue";
export default {
  components: {
    WaveSurfer
  },
  data: () => ({
    source: "https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/misc/demo.wav"
  }),
};
</script>
```


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

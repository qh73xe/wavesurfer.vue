# wavesurfer.vue

wavesurfer.vue は, [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js) に対する vue.js 用のラッパーです.

個人的によく利用するライブラリなので, 操作そのものを独立させるために独立したリポジトリ管理を行うことにしました.

- demo: [wavesurfer.vue](https://qh73xe.github.io/wavesurfer.vue?version=ffeebc95b79d05c50e9983934d7eb7466a51db12/)

## Quick start

このライブラリを利用するには以下のコマンドを使用します:
```
$ yarn add https://github.com/qh73xe/wavesurfer.vue.git
```

その後, 以下のように `<wave-surfer>` コンポーネントを利用します:
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
    source: "https://raw.githubusercontent.com/qh73xe/wavesurfer.vue/master/src/assets/media/demo.wav",
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

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/main.ts'),
      name: 'wavesurfer.vue',
      fileName: 'wavesurfer.vue.lib',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' } },
    },
  },
  plugins: [
    dts(),
    vue(),
    checker({
      vueTsc: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,vue}"' },
    }),
  ],
});

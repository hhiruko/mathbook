import { defineConfig } from 'vite';

export default defineConfig({
  base: '/mathbook/',
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'preact',
  },
});
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const libraryRoot = path.resolve(__dirname, '../lib')

export default defineConfig({
  plugins: [vue({})],
  resolve: {
    alias: [
      {
        find: '@postfix/ui',
        replacement: path.resolve(libraryRoot, 'index.js'),
      },
      {
        find: '@',
        replacement: libraryRoot,
      },
    ],
    dedupe: ['vue'],
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
})

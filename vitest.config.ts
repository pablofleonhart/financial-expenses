/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'c8', // or 'c8'
      reporter: ['text', 'json', 'html']
    },
  },
})
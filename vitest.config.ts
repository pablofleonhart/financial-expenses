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
      all: true,
      exclude: ['*.cjs', '**/generated.ts', 'coverage', 'dist', 'node_modules'],
      provider: 'istanbul', // or 'c8'
      reporter: ['text', 'json', 'html']
    },
    reporters: ['verbose'],
    watch: false
  },
})
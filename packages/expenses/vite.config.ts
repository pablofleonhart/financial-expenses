import federation from "@originjs/vite-plugin-federation";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'expenses',
      filename: 'remoteEntry.js',
      exposes: {
        './ExpensesApp': './src/bootstrap',
      },
      remotes:{
          some: 'remote_some'
      },
      shared: ['vue']
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

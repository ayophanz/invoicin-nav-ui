import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker";
import * as dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: "src/main.js",
      preserveEntrySignatures: "exports-only",
      output: {
        format: "system",
        entryFileNames: "[name].js",
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  base: "http://localhost/",
  server: {
    port: 9001,
  },
  plugins: [
    checker({
      typescript: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: "/src",
        },
      },
    }),
  ],
});

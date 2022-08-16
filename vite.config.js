import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          emitFile: true,
          file: "stats.html",
        }),
      ],
    },
  },
  plugins: [vue()],
});

import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import path from "path";
process.env.VITE_APP_VERSION = process.env.npm_package_version
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin({})],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name?.split(".").at(1) ?? "";
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `assets/${extType}/[name][extname]`;
        },
        entryFileNames: "assets/js/[name].js",
      },
    },
  },
});

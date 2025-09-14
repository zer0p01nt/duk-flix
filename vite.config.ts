import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@types", replacement: resolve(__dirname, "src/types") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      { find: "@styles", replacement: resolve(__dirname, "src/styles") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
    ],
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/turbo-space-zebra/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})

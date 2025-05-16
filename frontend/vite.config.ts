/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Important: Use the Node.js environment
    globals: true, // Optional: Makes test functions globally available (describe, it, expect)
    coverage: {
      provider: "v8", // or 'istanbul'
      reporter: ["text", "json", "html"], // Choose your reporters
      include: ["*/.ts"], // Files to include in coverage
      exclude: ["src/types/*", "src/config/*"], // Files to exclude in coverage
    },
  },
});

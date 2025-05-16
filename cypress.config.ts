import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    defaultCommandTimeout: 10000, 
    setupNodeEvents(on, config) {},
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});

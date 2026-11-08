import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  esbuild: { jsx: "automatic" },
  test: {
    include: ["tests/**/*.test.{ts,tsx}"],
    environment: "node",
    setupFiles: ["tests/setup.ts"],
    restoreMocks: true,
    // Tests must never reach the real database or email provider.
    env: {
      DATABASE_URL: "postgresql://test:test@127.0.0.1:1/test",
      RESEND_API_KEY: "",
      AUTH_SECRET: "test-secret",
    },
  },
});

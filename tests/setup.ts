import { afterEach } from "vitest";

afterEach(async () => {
  // Unmount anything rendered by component tests (jsdom only).
  if (typeof document !== "undefined") {
    const { cleanup } = await import("@testing-library/react");
    cleanup();
  }
});

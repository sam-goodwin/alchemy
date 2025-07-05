// Test handler that imports node:async_hooks to trigger specific warnings
import { AsyncLocalStorage } from "node:async_hooks";

export default {
  async fetch(): Promise<Response> {
    const als = new AsyncLocalStorage();
    return new Response(
      `AsyncLocalStorage available: ${typeof als.run === "function"}`,
    );
  },
};

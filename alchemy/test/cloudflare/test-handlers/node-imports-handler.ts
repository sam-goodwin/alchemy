// Test handler that imports node: modules to trigger warnings
import fs from "node:fs";
import crypto from "node:crypto";

export default {
  async fetch(): Promise<Response> {
    // Basic usage to avoid tree-shaking
    const hasFs = typeof fs.readFileSync === "function";
    const hasCrypto = typeof crypto.randomUUID === "function";

    return new Response(
      `Node imports available: fs=${hasFs}, crypto=${hasCrypto}`,
    );
  },
};

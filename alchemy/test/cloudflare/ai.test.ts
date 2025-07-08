import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { Ai } from "../../src/cloudflare/ai.ts";
import { Worker } from "../../src/cloudflare/worker.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";
import { fetchAndExpectOK } from "./fetch-utils.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("AI Resource Binding", () => {
  test("create worker with AI binding and make a prompt call", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-ai-worker`;

    let worker: Worker | undefined;

    try {
      // Create a worker with an AI binding
      worker = await Worker(workerName, {
        name: workerName,
        adopt: true,
        script: `
          export default {
            async fetch(request, env) {
              // Process a simple AI prompt using the AI binding
              const response = await env.MYAI.run("@cf/meta/llama-3.1-8b-instruct", {
                prompt: "What is the capital of France?",
              });

              // Return the AI response as JSON
              return new Response(JSON.stringify(response), {
                headers: { "Content-Type": "application/json" },
              });
            },
          };
        `,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          MYAI: Ai(),
        },
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.bindings?.MYAI).toBeDefined();
      expect(worker.url).toBeTruthy();

      // Test the AI prompt by calling the worker endpoint
      const response = await fetchAndExpectOK(worker.url!);
      expect(response.status).toEqual(200);
      expect(response.headers.get("content-type")).toContain(
        "application/json",
      );

      // Parse the response and verify it contains the expected AI model output
      const result: any = await response.json();
      expect(result).toBeDefined();

      // For the specific question, we expect the response to contain "Paris"
      // But since AI responses can vary, we'll check for a minimum of structure instead
      expect(typeof result.response).toBe("string");
      expect(result.response.length).toBeGreaterThan(0);
    } finally {
      await destroy(scope);
    }
  }, 60000); // Longer timeout for AI operations
});

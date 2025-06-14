import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { listQueueConsumers } from "../../src/cloudflare/queue-consumer.ts";
import { Queue } from "../../src/cloudflare/queue.ts";
import { Worker } from "../../src/cloudflare/worker.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import { CloudflareApiError } from "../../src/cloudflare/api-error.ts";
import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const api = await createCloudflareApi({});

describe("QueueConsumer Resource", () => {
  const queueConsumerTests = test.variant(
    ["vanilla", "wfp"],
    "create, update, and delete queue consumer",
    async (scope, platform: "vanilla" | "wfp") => {
      // Use BRANCH_PREFIX for deterministic, non-colliding resource names
      const testId = `${BRANCH_PREFIX}-test-queue-consumer-${platform}`;
      const queueName = `${testId}-queue`;
      const workerName = `${testId}-worker`;
      let queue: Queue | undefined;
      let worker: Worker | undefined;

      try {
        queue = await Queue(`${testId}-queue`, {
          name: queueName,
          adopt: true,
        });

        expect(queue.id).toBeTruthy();
        expect(queue.name).toEqual(queueName);

        worker = await Worker(`${testId}-worker`, {
          name: workerName,
          script: `
          export default {
            async fetch(request, env, ctx) {
              return new Response("Hello World");
            },
            async queue(batch, env, ctx) {
              return batch.messages.map(() => ({ status: "ack" }));
            }
          }
        `,
          platform: platform === "wfp",
          eventSources: [queue],
          adopt: true, // make test idempotent
        });

        expect(worker.id).toBeTruthy();
        expect(worker.name).toEqual(workerName);

        const consumers = await listQueueConsumers(api, queue.id);

        const thisConsumer = consumers.find((c) => c.scriptName === workerName);

        expect(thisConsumer).toBeTruthy();
      } finally {
        // Always clean up, even if test assertions fail
        await destroy(scope);

        // Verify consumers were deleted
        try {
          if (queue?.id) {
            await listQueueConsumers(api, queue.id);
          }
        } catch (err) {
          if (err instanceof CloudflareApiError && err.status === 404) {
            // expected
          } else {
            throw err;
          }
        }
      }
    },
  );

  // Register the queue consumer tests
  for (const queueConsumerTest of queueConsumerTests) {
    test(queueConsumerTest.name, queueConsumerTest.handler);
  }
});

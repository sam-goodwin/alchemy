import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { Queue, listQueues } from "../../src/cloudflare/queue.ts";
import { Worker } from "../../src/cloudflare/worker.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";
import { fetchAndExpectOK } from "./fetch-utils.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Cloudflare Queue Resource", async () => {
  // Create Cloudflare API client for direct verification
  const api = await createCloudflareApi();

  test("create and delete queue", async (scope) => {
    // Use unique queue name for this test
    const queueName = `${BRANCH_PREFIX}-test-queue-basic`;
    let queue: Queue | undefined;

    try {
      queue = await Queue(queueName, {
        name: queueName,
        adopt: true,
      });

      expect(queue.name).toEqual(queueName);
      expect(queue.id).toBeTruthy();
      expect(queue.createdOn).toBeTruthy();
      expect(queue.modifiedOn).toBeTruthy();

      // Check if queue exists by listing queues
      const queues = await listQueues(api);
      const foundQueue = queues.find((q) => q.name === queueName);
      expect(foundQueue).toBeTruthy();
      expect(foundQueue?.id).toEqual(queue.id);
    } finally {
      await alchemy.destroy(scope);

      // Verify queue was deleted
      if (queue) {
        await assertQueueDeleted(queue);
      }
    }
  }, 120000);

  test("create queue with settings", async (scope) => {
    const settingsQueueName = `${BRANCH_PREFIX}-test-queue-settings`;

    try {
      // Create a queue with custom settings
      const queue = await Queue(settingsQueueName, {
        name: settingsQueueName,
        settings: {
          deliveryDelay: 10,
          deliveryPaused: true,
          messageRetentionPeriod: 3600, // 1 hour
        },
        adopt: true,
      });

      expect(queue.name).toEqual(settingsQueueName);
      expect(queue.id).toBeTruthy();
      expect(queue.settings).toBeTruthy();
      expect(queue.settings?.deliveryDelay).toEqual(10);
      expect(queue.settings?.deliveryPaused).toEqual(true);
      expect(queue.settings?.messageRetentionPeriod).toEqual(3600);
    } finally {
      await alchemy.destroy(scope);
    }
  }, 120000);

  test("update queue settings", async (scope) => {
    const updateQueueName = `${BRANCH_PREFIX}-test-queue-update`;

    try {
      // Create a queue with initial settings
      let queue = await Queue(updateQueueName, {
        name: updateQueueName,
        settings: {
          deliveryDelay: 5,
          deliveryPaused: false,
        },
        adopt: true,
      });

      expect(queue.name).toEqual(updateQueueName);
      expect(queue.settings?.deliveryDelay).toEqual(5);
      expect(queue.settings?.deliveryPaused).toEqual(false);

      // Update the queue settings
      queue = await Queue(updateQueueName, {
        name: updateQueueName,
        settings: {
          deliveryDelay: 15,
          deliveryPaused: true,
        },
      });

      // Verify the update
      expect(queue.settings?.deliveryDelay).toEqual(15);
      expect(queue.settings?.deliveryPaused).toEqual(true);
    } finally {
      await alchemy.destroy(scope);
    }
  }, 120000);

  test("throws error on name change", async (scope) => {
    const immutableQueueName = `${BRANCH_PREFIX}-test-queue-immutable`;
    const newQueueName = `${BRANCH_PREFIX}-test-queue-new-name`;

    try {
      // Create a queue
      const queue = await Queue(immutableQueueName, {
        name: immutableQueueName,
        adopt: true,
      });

      expect(queue.name).toEqual(immutableQueueName);

      // Attempt to update name, which should throw an error
      await expect(
        Queue(immutableQueueName, {
          name: newQueueName, // Different from original
        }),
      ).rejects.toThrow("Cannot update Queue name");
    } finally {
      await alchemy.destroy(scope);
    }
  }, 120000);

  test("adopts existing queue with same name", async (scope) => {
    const adoptQueueName = `${BRANCH_PREFIX}-test-queue-adopt`;
    const firstId = `${BRANCH_PREFIX}-test-first`;
    const secondId = `${BRANCH_PREFIX}-test-second`;

    try {
      // Create first queue
      const firstQueue = await Queue(firstId, {
        name: adoptQueueName,
        settings: {
          deliveryDelay: 5,
          deliveryPaused: false,
        },
        adopt: true,
      });

      expect(firstQueue.name).toEqual(adoptQueueName);
      expect(firstQueue.id).toBeTruthy();
      expect(firstQueue.settings?.deliveryDelay).toEqual(5);
      expect(firstQueue.settings?.deliveryPaused).toEqual(false);

      // Create second queue with same name but different ID and adopt: true
      const secondQueue = await Queue(secondId, {
        name: adoptQueueName,
        adopt: true,
        settings: {
          deliveryDelay: 10,
          deliveryPaused: true,
        },
      });

      // Verify second queue adopted the first queue's ID
      expect(secondQueue.name).toEqual(adoptQueueName);
      expect(secondQueue.id).toEqual(firstQueue.id);
      expect(secondQueue.settings?.deliveryDelay).toEqual(10);
      expect(secondQueue.settings?.deliveryPaused).toEqual(true);

      // Verify only one queue exists with this name
      const queues = await listQueues(api);
      const matchingQueues = queues.filter((q) => q.name === adoptQueueName);
      expect(matchingQueues.length).toEqual(1);
      expect(matchingQueues[0].id).toEqual(firstQueue.id);
    } finally {
      await alchemy.destroy(scope);
    }
  }, 120000);

  test("create queue with dead letter queue", async (scope) => {
    const dlqName = `${BRANCH_PREFIX}-test-queue-dlq`;
    const mainQueueName = `${BRANCH_PREFIX}-test-queue-with-dlq`;

    try {
      // Create dead letter queue first
      const dlq = await Queue(dlqName, {
        name: dlqName,
        adopt: true,
      });

      expect(dlq.name).toEqual(dlqName);
      expect(dlq.id).toBeTruthy();

      // Create main queue with DLQ reference using Queue object
      const mainQueue = await Queue(mainQueueName, {
        name: mainQueueName,
        dlq: dlq,
        adopt: true,
      });

      expect(mainQueue.name).toEqual(mainQueueName);
      expect(mainQueue.id).toBeTruthy();
      expect(mainQueue.dlq).toEqual(dlq);

      const mainQueueWithStringDlq = await Queue(`${mainQueueName}-string`, {
        name: `${mainQueueName}-string`,
        dlq: dlqName,
        adopt: true,
      });

      expect(mainQueueWithStringDlq.name).toEqual(`${mainQueueName}-string`);
      expect(mainQueueWithStringDlq.dlq).toEqual(dlqName);

      // Verify both queues exist
      const queues = await listQueues(api);
      const foundDlq = queues.find((q) => q.name === dlqName);
      const foundMainQueue = queues.find((q) => q.name === mainQueueName);
      const foundStringQueue = queues.find(
        (q) => q.name === `${mainQueueName}-string`,
      );

      expect(foundDlq).toBeTruthy();
      expect(foundMainQueue).toBeTruthy();
      expect(foundStringQueue).toBeTruthy();
    } finally {
      await alchemy.destroy(scope);
    }
  }, 120000);

  const queueWorkerTests = test.variant(
    ["vanilla", "wfp"],
    "create and test worker with Queue binding",
    async (scope, platform: "vanilla" | "wfp") => {
      // Sample ESM worker script with Queue functionality

      const workerName = `${BRANCH_PREFIX}-test-worker-queue-${platform}`;
      const queueName = `${BRANCH_PREFIX}-test-queue-worker-${platform}`;

      let worker: Worker<{ MESSAGE_QUEUE: Queue }> | undefined;
      let queue: Queue | undefined;

      try {
        // Create a Queue
        queue = await Queue(queueName, {
          name: queueName,
          settings: {
            deliveryDelay: 0, // No delay for testing
            deliveryPaused: false,
          },
          adopt: true,
        });

        expect(queue.id).toBeTruthy();
        expect(queue.name).toEqual(queueName);
        expect(queue.type).toEqual("queue");

        // Create a worker with the Queue binding
        worker = await Worker(workerName, {
          name: workerName,
          adopt: true,
          script: `
          export default {
            async fetch(request, env, ctx) {
              const url = new URL(request.url);

              // Send a message to the queue
              if (url.pathname === '/send-message') {
                try {
                  const body = await request.json();
                  const messageId = await env.MESSAGE_QUEUE.send(body);

                  return new Response(JSON.stringify({
                    success: true,
                    messageId,
                    message: 'Message sent successfully'
                  }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                  });
                } catch (error) {
                  return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                  }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                  });
                }
              }

              return new Response('Queue Worker is running!', {
                status: 200,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
          };
        `,
          format: "esm",
          platform: platform === "wfp",
          url: true, // Enable workers.dev URL to test the worker
          bindings: {
            MESSAGE_QUEUE: queue,
          },
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(worker.id).toBeTruthy();
        expect(worker.name).toEqual(workerName);
        expect(worker.bindings).toBeDefined();
        expect(worker.bindings!.MESSAGE_QUEUE).toBeDefined();
        expect(worker.url).toBeTruthy();

        if (worker.url) {
          // Send a message to the queue
          const testMessage = {
            id: "msg-123",
            content: "Test message content",
            timestamp: Date.now(),
          };

          const sendResponse = await fetchAndExpectOK(
            `${worker.url}/send-message`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(testMessage),
            },
          );

          expect(sendResponse.status).toEqual(200);
          const responseData: any = await sendResponse.json();
          expect(responseData.success).toEqual(true);
          expect(responseData.message).toEqual("Message sent successfully");
        }
      } finally {
        await destroy(scope);
      }
    },
  );

  // Register the queue worker tests
  for (const queueWorkerTest of queueWorkerTests) {
    test(queueWorkerTest.name, queueWorkerTest.handler, 120000); // Increased timeout for Queue operations
  }
});

async function assertQueueDeleted(queue: Queue) {
  const api = await createCloudflareApi();
  try {
    if (!queue.id) {
      throw new Error("Queue ID is undefined");
    }

    // Try to list queues and check if our queue is still there
    const queues = await listQueues(api);
    const foundQueue = queues.find((q) => q.id === queue.id);

    if (foundQueue) {
      throw new Error(`Queue ${queue.name} was not deleted as expected`);
    }
  } catch (error: any) {
    // If we get a 404, the queue was deleted
    if (error.status === 404) {
      return; // This is expected
    } else if (error.message.includes("was not deleted as expected")) {
      throw error; // Re-throw our custom error
    } else {
      console.error("Unexpected error checking queue deletion:", error);
    }
  }
}

import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { Queue, listQueues } from "../../src/cloudflare/queue.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Cloudflare Queue Resource", async () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-queue`;

  // Create Cloudflare API client for direct verification
  const api = await createCloudflareApi();

  test("create and delete queue", async (scope) => {
    // Create a test queue
    let queue: Queue | undefined;

    try {
      queue = await Queue(testId, {
        name: testId,
      });

      expect(queue.name).toEqual(testId);
      expect(queue.id).toBeTruthy();
      expect(queue.createdOn).toBeTruthy();
      expect(queue.modifiedOn).toBeTruthy();

      // Check if queue exists by listing queues
      const queues = await listQueues(api);
      const foundQueue = queues.find((q) => q.name === testId);
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
    const settingsQueueName = `${testId}-settings`;

    try {
      // Create a queue with custom settings
      const queue = await Queue(settingsQueueName, {
        name: settingsQueueName,
        deliveryDelay: 10,
        deliveryPaused: true,
        messageRetentionPeriod: 3600, // 1 hour
      });

      expect(queue.name).toEqual(settingsQueueName);
      expect(queue.id).toBeTruthy();
      expect(queue.deliveryDelay).toEqual(10);
      expect(queue.deliveryPaused).toEqual(true);
      expect(queue.messageRetentionPeriod).toEqual(3600);
    } finally {
      await alchemy.destroy(scope);
    }
  }, 120000);

  test("update queue settings", async (scope) => {
    const updateQueueName = `${testId}-update`;

    try {
      // Create a queue with initial settings
      let queue = await Queue(updateQueueName, {
        name: updateQueueName,
        deliveryDelay: 5,
        deliveryPaused: false,
      });

      expect(queue.name).toEqual(updateQueueName);
      expect(queue.deliveryDelay).toEqual(5);
      expect(queue.deliveryPaused).toEqual(false);

      // Update the queue settings
      queue = await Queue(updateQueueName, {
        name: updateQueueName,
        deliveryDelay: 15,
        deliveryPaused: true,
      });

      // Verify the update
      expect(queue.deliveryDelay).toEqual(15);
      expect(queue.deliveryPaused).toEqual(true);
    } finally {
      await alchemy.destroy(scope);
    }
  }, 120000);

  test("throws error on name change", async (scope) => {
    const immutableQueueName = `${testId}-immutable`;
    const newQueueName = `${testId}-new-name`;

    try {
      // Create a queue
      const queue = await Queue(immutableQueueName, {
        name: immutableQueueName,
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
    const adoptQueueName = `${testId}-adopt`;
    const firstId = `${testId}-first`;
    const secondId = `${testId}-second`;

    try {
      // Create first queue
      const firstQueue = await Queue(firstId, {
        name: adoptQueueName,
        deliveryDelay: 5,
        deliveryPaused: false,
      });

      expect(firstQueue.name).toEqual(adoptQueueName);
      expect(firstQueue.id).toBeTruthy();
      expect(firstQueue.deliveryDelay).toEqual(5);
      expect(firstQueue.deliveryPaused).toEqual(false);

      // Create second queue with same name but different ID and adopt: true
      const secondQueue = await Queue(secondId, {
        name: adoptQueueName,
        adopt: true,
        deliveryDelay: 10,
        deliveryPaused: true,
      });

      // Verify second queue adopted the first queue's ID
      expect(secondQueue.name).toEqual(adoptQueueName);
      expect(secondQueue.id).toEqual(firstQueue.id);
      expect(secondQueue.deliveryDelay).toEqual(10);
      expect(secondQueue.deliveryPaused).toEqual(true);

      // Verify only one queue exists with this name
      const queues = await listQueues(api);
      const matchingQueues = queues.filter((q) => q.name === adoptQueueName);
      expect(matchingQueues.length).toEqual(1);
      expect(matchingQueues[0].id).toEqual(firstQueue.id);
    } finally {
      await alchemy.destroy(scope);
    }
  }, 120000);
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

import type { Context } from "../context.ts";
import { Resource, ResourceKind } from "../resource.ts";
import { bind } from "../runtime/bind.ts";
import { CloudflareApiError, handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import type { Bound } from "./bound.ts";

/**
 * Settings for a Cloudflare Queue
 */
export interface QueueSettings {
  /**
   * Delay in seconds before message delivery
   * Queue will not deliver messages until this time has elapsed
   */
  deliveryDelay?: number;

  /**
   * Whether delivery is paused
   * If true, the queue will not deliver messages to consumers
   */
  deliveryPaused?: boolean;

  /**
   * Period in seconds to retain messages
   * Messages will be automatically deleted after this time
   */
  messageRetentionPeriod?: number;
}

/**
 * Properties for creating or updating a Cloudflare Queue
 */
export interface QueueProps extends CloudflareApiOptions, QueueSettings {
  /**
   * Name of the queue
   * Required during creation
   * Cannot be changed after creation
   *
   * @default id
   */
  name?: string;

  /**
   * Whether to delete the queue.
   * If set to false, the queue will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;

  /**
   * Whether to adopt an existing queue with the same name if it exists
   * If true, during creation, if a queue with the same name exists, it will be adopted instead of creating a new one
   *
   * @default false
   */
  adopt?: boolean;
}

export function isQueue(eventSource: any): eventSource is Queue {
  return (
    ResourceKind in eventSource &&
    eventSource[ResourceKind] === "cloudflare::Queue"
  );
}

/**
 * Output returned after Cloudflare Queue creation/update
 */
export interface QueueResource<Body = unknown>
  extends Resource<"cloudflare::Queue">,
    QueueProps {
  /**
   * Type identifier for Cloudflare Queue
   */
  type: "queue";

  /**
   * The unique ID of the queue
   */
  id: string;

  /**
   * The name of the queue
   */
  name: string;

  /**
   * Time when the queue was created
   */
  createdOn: string;

  /**
   * Modified timestamp
   */
  modifiedOn: string;

  /**
   * Phantom property to allow type inference
   */
  Body: Body;

  Batch: MessageBatch<Body>;
}

export type Queue<Body = unknown> = QueueResource<Body> &
  Bound<QueueResource<Body>>;

/**
 * Creates and manages Cloudflare Queues.
 *
 * Queues provide a managed queue system for reliable message delivery
 * between workers and other systems.
 *
 * @example
 * // Create a basic queue with default settings
 * const basicQueue = await Queue("my-app-queue", {
 *   name: "my-app-queue"
 * });
 *
 * @example
 * // Create a queue with custom settings
 * const customQueue = await Queue("delayed-queue", {
 *   name: "delayed-queue",
 *   deliveryDelay: 30, // 30 second delay before message delivery
 *   messageRetentionPeriod: 86400 // Store messages for 1 day
 * });
 *
 * @example
 * // Create a paused queue for later activation
 * const pausedQueue = await Queue("paused-queue", {
 *   name: "paused-queue",
 *   deliveryPaused: true
 * });
 *
 * @example
 * // consume from a Worker
 * const queue = await Queue("my-queue");
 * const worker = await Worker("my-worker", {
 *   eventSources: [queue]
 * });
 *
 * @example
 * // consume from a Worker with custom settings
 * const queue = await Queue("my-queue");
 * const worker = await Worker("my-worker", {
 *   eventSources: [{
 *     queue,
 *     batchSize: 10,
 *     maxConcurrency: 5
 *   }]
 * });
 *
 * @see https://developers.cloudflare.com/queues/
 */
export async function Queue<Body = unknown>(
  name: string,
  props: QueueProps = {},
): Promise<Queue<Body>> {
  const queue = await QueueResource<Body>(name, props);
  const binding = await bind(queue);
  return {
    ...queue,
    send: binding.send,
    sendBatch: binding.sendBatch,
  } as Queue<Body>;
}

const QueueResource = Resource("cloudflare::Queue", async function <
  T = unknown,
>(this: Context<QueueResource<T>>, id: string, props: QueueProps = {}): Promise<
  QueueResource<T>
> {
  const api = await createCloudflareApi(props);
  const queueName = props.name ?? id;

  if (this.phase === "delete") {
    console.log("Deleting Cloudflare Queue:", queueName);
    if (props.delete !== false) {
      // Delete Queue
      if (!this.output?.id) {
        console.log(this.output);
      }
      await deleteQueue(api, this.output?.id);
    }

    // Return void (a deleted queue has no content)
    return this.destroy();
  }
  let queueData: CloudflareQueueResponse;

  if (this.phase === "create") {
    console.log("Creating Cloudflare Queue:", queueName);
    try {
      queueData = await createQueue(api, queueName, props);
    } catch (error) {
      if (error instanceof CloudflareApiError && error.status === 409) {
        if (!props.adopt) {
          throw error;
        }
        // Queue already exists, try to find it by name
        const existingQueue = await findQueueByName(api, queueName);
        if (!existingQueue) {
          throw new Error(
            `Queue with name ${queueName} not found despite 409 conflict`,
          );
        }
        queueData = existingQueue;
        queueData = await updateQueue(api, queueData.result.queue_id!, props);
      } else {
        throw error;
      }
    }
  } else {
    // Update operation
    if (this.output?.id) {
      console.log("Updating Cloudflare Queue:", queueName);

      // Check if name is being changed, which is not allowed
      if (queueName !== this.output.name) {
        throw new Error(
          `Cannot update Queue name after creation. Queue name is immutable. Before: ${this.output.name}, After: ${queueName}`,
        );
      }

      // Update the queue with new settings
      queueData = await updateQueue(api, this.output.id, props);
    } else {
      // If no ID exists, fall back to creating a new queue
      console.log(
        "No existing Queue ID found, creating new Cloudflare Queue:",
        queueName,
      );
      queueData = await createQueue(api, queueName, props);
    }
  }

  return this({
    type: "queue",
    id: queueData.result.queue_id || "",
    name: queueName,
    deliveryDelay: queueData.result.settings?.delivery_delay,
    deliveryPaused: queueData.result.settings?.delivery_paused,
    messageRetentionPeriod: queueData.result.settings?.message_retention_period,
    createdOn: queueData.result.created_on || new Date().toISOString(),
    modifiedOn: queueData.result.modified_on || new Date().toISOString(),
    accountId: api.accountId,
    // phantom properties
    Body: undefined as T,
    Batch: undefined! as MessageBatch<T>,
  });
});

interface CloudflareQueueResponse {
  result: {
    queue_id?: string;
    queue_name: string;
    created_on?: string;
    modified_on?: string;
    settings?: {
      delivery_delay?: number;
      delivery_paused?: boolean;
      message_retention_period?: number;
    };
  };
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

/**
 * Create a new Cloudflare Queue
 */
export async function createQueue(
  api: CloudflareApi,
  queueName: string,
  props: QueueProps,
): Promise<CloudflareQueueResponse> {
  // Prepare the create payload
  const createPayload: any = {
    queue_name: queueName,
  };

  // Add settings if provided
  if (
    props.deliveryDelay !== undefined ||
    props.deliveryPaused !== undefined ||
    props.messageRetentionPeriod !== undefined
  ) {
    createPayload.settings = {};

    if (props.deliveryDelay !== undefined) {
      createPayload.settings.delivery_delay = props.deliveryDelay;
    }

    if (props.deliveryPaused !== undefined) {
      createPayload.settings.delivery_paused = props.deliveryPaused;
    }

    if (props.messageRetentionPeriod !== undefined) {
      createPayload.settings.message_retention_period =
        props.messageRetentionPeriod;
    }
  }

  const createResponse = await api.post(
    `/accounts/${api.accountId}/queues`,
    createPayload,
  );

  if (!createResponse.ok) {
    return await handleApiError(createResponse, "creating", "Queue", queueName);
  }

  return (await createResponse.json()) as CloudflareQueueResponse;
}

/**
 * Get a Cloudflare Queue
 */
export async function getQueue(
  api: CloudflareApi,
  queueId: string,
): Promise<CloudflareQueueResponse> {
  const response = await api.get(
    `/accounts/${api.accountId}/queues/${queueId}`,
  );

  if (!response.ok) {
    return await handleApiError(response, "getting", "Queue", queueId);
  }

  return (await response.json()) as CloudflareQueueResponse;
}

/**
 * Delete a Cloudflare Queue
 */
export async function deleteQueue(
  api: CloudflareApi,
  queueId?: string,
): Promise<void> {
  if (!queueId) {
    console.log("No Queue ID provided, skipping delete");
    return;
  }

  // Delete Queue
  const deleteResponse = await api.delete(
    `/accounts/${api.accountId}/queues/${queueId}`,
  );

  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    const errorData: any = await deleteResponse.json().catch(() => ({
      errors: [{ message: deleteResponse.statusText }],
    }));
    throw new CloudflareApiError(
      `Error deleting Cloudflare Queue '${queueId}': ${errorData.errors?.[0]?.message || deleteResponse.statusText}`,
      deleteResponse,
    );
  }
}

/**
 * Update a Cloudflare Queue
 *
 * Note: According to Cloudflare API, the queue name cannot be changed after creation.
 * Only the settings can be updated.
 */
export async function updateQueue(
  api: CloudflareApi,
  queueId: string,
  props: QueueProps,
): Promise<CloudflareQueueResponse> {
  // Prepare the update payload - only include settings
  const updatePayload: any = {};

  // Add settings if provided
  if (
    props.deliveryDelay !== undefined ||
    props.deliveryPaused !== undefined ||
    props.messageRetentionPeriod !== undefined
  ) {
    updatePayload.settings = {};

    if (props.deliveryDelay !== undefined) {
      updatePayload.settings.delivery_delay = props.deliveryDelay;
    }

    if (props.deliveryPaused !== undefined) {
      updatePayload.settings.delivery_paused = props.deliveryPaused;
    }

    if (props.messageRetentionPeriod !== undefined) {
      updatePayload.settings.message_retention_period =
        props.messageRetentionPeriod;
    }
  }

  // Use PATCH for partial updates (only settings can be updated)
  const updateResponse = await api.patch(
    `/accounts/${api.accountId}/queues/${queueId}`,
    updatePayload,
  );

  if (!updateResponse.ok) {
    return await handleApiError(updateResponse, "updating", "Queue", queueId);
  }

  return (await updateResponse.json()) as CloudflareQueueResponse;
}

/**
 * List all Cloudflare Queues in an account
 */
export async function listQueues(
  api: CloudflareApi,
): Promise<{ name: string; id: string }[]> {
  const response = await api.get(`/accounts/${api.accountId}/queues`);

  if (!response.ok) {
    throw new CloudflareApiError(
      `Failed to list queues: ${response.statusText}`,
      response,
    );
  }

  const data = (await response.json()) as {
    success: boolean;
    errors?: Array<{ code: number; message: string }>;
    result?: Array<{
      queue_name: string;
      queue_id: string;
    }>;
  };

  if (!data.success) {
    const errorMessage = data.errors?.[0]?.message || "Unknown error";
    throw new Error(`Failed to list queues: ${errorMessage}`);
  }

  // Transform API response
  return (data.result || []).map((queue) => ({
    name: queue.queue_name,
    id: queue.queue_id,
  }));
}

/**
 * Find a Cloudflare Queue by name
 */
export async function findQueueByName(
  api: CloudflareApi,
  queueName: string,
): Promise<CloudflareQueueResponse | null> {
  const response = await api.get(`/accounts/${api.accountId}/queues`);

  if (!response.ok) {
    return await handleApiError(response, "listing", "Queues", "");
  }

  const data = (await response.json()) as {
    success: boolean;
    errors?: Array<{ code: number; message: string }>;
    result?: Array<{
      queue_name: string;
      queue_id: string;
      created_on?: string;
      modified_on?: string;
      settings?: {
        delivery_delay?: number;
        delivery_paused?: boolean;
        message_retention_period?: number;
      };
    }>;
  };

  if (!data.success) {
    const errorMessage = data.errors?.[0]?.message || "Unknown error";
    throw new Error(`Failed to list queues: ${errorMessage}`);
  }

  const queue = data.result?.find((q) => q.queue_name === queueName);
  if (!queue) {
    return null;
  }

  return {
    result: {
      queue_id: queue.queue_id,
      queue_name: queue.queue_name,
      created_on: queue.created_on,
      modified_on: queue.modified_on,
      settings: queue.settings,
    },
    success: true,
    errors: [],
    messages: [],
  };
}

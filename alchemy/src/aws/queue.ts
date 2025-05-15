import {
  CreateQueueCommand,
  DeleteQueueCommand,
  GetQueueAttributesCommand,
  GetQueueUrlCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";

/**
 * Properties for creating or updating an SQS queue
 */
export interface QueueProps {
  /**
   * Name of the queue
   * For FIFO queues, the name must end with the .fifo suffix
   */
  queueName: string;

  /**
   * Whether this is a FIFO queue.
   * If true, the queueName must end with .fifo suffix
   */
  fifo?: boolean;

  /**
   * The length of time (in seconds) that a message received from a queue will be invisible to other receiving components
   * Default: 30 seconds
   */
  visibilityTimeout?: number;

  /**
   * The length of time (in seconds) for which Amazon SQS retains a message
   * Default: 345600 seconds (4 days)
   */
  messageRetentionPeriod?: number;

  /**
   * The limit of how many bytes a message can contain before Amazon SQS rejects it
   * Default: 262144 bytes (256 KB)
   */
  maximumMessageSize?: number;

  /**
   * The time in seconds that the delivery of all messages in the queue will be delayed
   * Default: 0 seconds
   */
  delaySeconds?: number;

  /**
   * The length of time (in seconds) for which a ReceiveMessage action waits for a message to arrive
   * Default: 0 seconds
   */
  receiveMessageWaitTimeSeconds?: number;

  /**
   * Enables content-based deduplication for FIFO queues.
   * Only applicable when fifo is true.
   */
  contentBasedDeduplication?: boolean;

  /**
   * Specifies whether message deduplication occurs at the message group or queue level
   * Only applicable when fifo is true
   */
  deduplicationScope?: "messageGroup" | "queue";

  /**
   * Specifies whether the FIFO queue throughput quota applies to the entire queue or per message group
   * Only applicable when fifo is true
   */
  fifoThroughputLimit?: "perQueue" | "perMessageGroupId";

  /**
   * Resource tags for the queue
   */
  tags?: Record<string, string>;
}

/**
 * Output returned after SQS queue creation/update
 */
export interface Queue extends Resource<"sqs::Queue">, QueueProps {
  /**
   * ARN of the queue
   */
  arn: string;

  /**
   * URL of the queue
   */
  url: string;
}

/**
 * AWS SQS Queue Resource
 *
 * Creates and manages Amazon SQS queues with support for both standard and FIFO queues.
 * Handles queue creation, attribute configuration, and automatic cleanup of deleted queues.
 *
 * @example
 * // Create a standard queue with custom visibility timeout
 * const standardQueue = await Queue("my-queue", {
 *   queueName: "my-queue",
 *   visibilityTimeout: 30,
 *   tags: {
 *     Environment: "production"
 *   }
 * });
 *
 * @example
 * // Create a FIFO queue with content-based deduplication
 * const fifoQueue = await Queue("orders-queue", {
 *   queueName: "orders-queue.fifo",
 *   fifo: true,
 *   contentBasedDeduplication: true,
 *   visibilityTimeout: 30,
 *   tags: {
 *     Environment: "production"
 *   }
 * });
 *
 * @example
 * // Create a queue with custom message retention and size
 * const customQueue = await Queue("large-messages", {
 *   queueName: "large-messages",
 *   messageRetentionPeriod: 345600,  // 4 days
 *   maximumMessageSize: 262144,      // 256 KB
 *   visibilityTimeout: 60,
 *   delaySeconds: 5,
 *   receiveMessageWaitTimeSeconds: 20
 * });
 */
export const Queue = Resource(
  "sqs::Queue",
  async function (
    this: Context<Queue>,
    _id: string,
    props: QueueProps,
  ): Promise<Queue> {
    const client = new SQSClient({});
    // Don't automatically add .fifo suffix - user must include it in queueName
    const queueName = props.queueName;

    // Validate that FIFO queues have .fifo suffix
    if (props.fifo && !queueName.endsWith(".fifo")) {
      throw new Error("FIFO queue names must end with .fifo suffix");
    }

    if (this.phase === "delete") {
      try {
        // Get queue URL first
        const urlResponse = await client.send(
          new GetQueueUrlCommand({
            QueueName: queueName,
          }),
        );

        // Delete the queue
        await client.send(
          new DeleteQueueCommand({
            QueueUrl: urlResponse.QueueUrl,
          }),
        );

        // Wait for queue to be deleted
        let queueDeleted = false;
        while (!queueDeleted) {
          try {
            await client.send(
              new GetQueueUrlCommand({
                QueueName: queueName,
              }),
            );
            // If we get here, queue still exists
            await new Promise((resolve) => setTimeout(resolve, 1000));
          } catch (error: any) {
            if (error.name === "QueueDoesNotExist") {
              queueDeleted = true;
            } else {
              throw error;
            }
          }
        }
      } catch (error: any) {
        if (error.name !== "QueueDoesNotExist") {
          throw error;
        }
      }

      return this.destroy();
    }
    // Create queue with attributes
    const attributes: Record<string, string> = {};

    if (props.visibilityTimeout !== undefined) {
      attributes.VisibilityTimeout = props.visibilityTimeout.toString();
    }
    if (props.messageRetentionPeriod !== undefined) {
      attributes.MessageRetentionPeriod =
        props.messageRetentionPeriod.toString();
    }
    if (props.maximumMessageSize !== undefined) {
      attributes.MaximumMessageSize = props.maximumMessageSize.toString();
    }
    if (props.delaySeconds !== undefined) {
      attributes.DelaySeconds = props.delaySeconds.toString();
    }
    if (props.receiveMessageWaitTimeSeconds !== undefined) {
      attributes.ReceiveMessageWaitTimeSeconds =
        props.receiveMessageWaitTimeSeconds.toString();
    }

    // FIFO specific attributes
    if (props.fifo) {
      attributes.FifoQueue = "true";
      if (props.contentBasedDeduplication) {
        attributes.ContentBasedDeduplication = "true";
      }
      if (props.deduplicationScope) {
        attributes.DeduplicationScope = props.deduplicationScope;
      }
      if (props.fifoThroughputLimit) {
        attributes.FifoThroughputLimit = props.fifoThroughputLimit;
      }
    }

    // Convert tags to AWS format
    const tags = props.tags
      ? Object.entries(props.tags).reduce(
          (acc, [key, value]) => ({ ...acc, [key]: value }),
          {},
        )
      : undefined;

    try {
      // Create the queue
      const createResponse = await client.send(
        new CreateQueueCommand({
          QueueName: queueName,
          Attributes: attributes,
          tags,
        }),
      );

      // Get queue attributes
      const attributesResponse = await client.send(
        new GetQueueAttributesCommand({
          QueueUrl: createResponse.QueueUrl,
          AttributeNames: ["QueueArn"],
        }),
      );

      return this({
        ...props,
        arn: attributesResponse.Attributes!.QueueArn!,
        url: createResponse.QueueUrl!,
      });
    } catch (error: any) {
      if (error.name === "QueueAlreadyExists") {
        // Get existing queue URL
        const urlResponse = await client.send(
          new GetQueueUrlCommand({
            QueueName: queueName,
          }),
        );

        // Get queue attributes
        const attributesResponse = await client.send(
          new GetQueueAttributesCommand({
            QueueUrl: urlResponse.QueueUrl,
            AttributeNames: ["QueueArn"],
          }),
        );

        return this({
          ...props,
          arn: attributesResponse.Attributes!.QueueArn!,
          url: urlResponse.QueueUrl!,
        });
      }
      if (error.name === "QueueDeletedRecently") {
        // Queue was recently deleted, wait and retry
        const maxRetries = 3;
        let retryCount = 0;

        while (retryCount < maxRetries) {
          try {
            // Wait for 60 seconds before retrying
            await new Promise((resolve) => setTimeout(resolve, 61000));

            // Retry creating the queue
            const createResponse = await client.send(
              new CreateQueueCommand({
                QueueName: queueName,
                Attributes: attributes,
                tags,
              }),
            );

            // Get queue attributes
            const attributesResponse = await client.send(
              new GetQueueAttributesCommand({
                QueueUrl: createResponse.QueueUrl,
                AttributeNames: ["QueueArn"],
              }),
            );

            return this({
              ...props,
              arn: attributesResponse.Attributes!.QueueArn!,
              url: createResponse.QueueUrl!,
            });
          } catch (retryError: any) {
            if (
              retryError.name !== "QueueDeletedRecently" ||
              retryCount === maxRetries - 1
            ) {
              throw retryError;
            }
            retryCount++;
          }
        }
      }
      throw error;
    }
  },
);

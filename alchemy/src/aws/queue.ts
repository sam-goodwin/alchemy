import { Effect, Schedule } from "effect";
import { logger } from "../util/logger.ts";
import { createAwsClient } from "./client.ts";
import { EffectResource } from "./effect-resource.ts";

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
export const Queue = EffectResource<Queue, QueueProps>(
  "sqs::Queue",
  function* (_id, props) {
    const client = yield* createAwsClient({ service: "sqs" });
    const queueName = props.queueName;

    // Validate that FIFO queues have .fifo suffix
    if (props.fifo && !queueName.endsWith(".fifo")) {
      yield* Effect.fail(
        new Error("FIFO queue names must end with .fifo suffix"),
      );
    }

    if (this.phase === "delete") {
      // Get queue URL and delete it, ignoring not found errors
      const deleteQueue = Effect.gen(function* () {
        const urlResponse = yield* client.postJson<{ QueueUrl: string }>("/", {
          Action: "GetQueueUrl",
          QueueName: queueName,
          Version: "2012-11-05",
        });

        yield* client.postJson("/", {
          Action: "DeleteQueue",
          QueueUrl: urlResponse.QueueUrl,
          Version: "2012-11-05",
        });

        // Wait for queue to be deleted using Effect.repeat
        yield* client
          .postJson("/", {
            Action: "GetQueueUrl",
            QueueName: queueName,
            Version: "2012-11-05",
          })
          .pipe(
            Effect.flatMap(() => Effect.sleep(1000)), // 1 second
            Effect.repeat({
              until: () => false, // Keep trying until it fails
            }),
            Effect.catchSome((error) => {
              if (
                error._tag === "AwsNotFoundError" ||
                isQueueDoesNotExist(error)
              ) {
                return Effect.succeed(null); // Queue is deleted
              }
              return Effect.fail(error);
            }),
          );
      });

      yield* deleteQueue.pipe(
        Effect.catchAll((error) => {
          if (error._tag === "AwsNotFoundError" || isQueueDoesNotExist(error)) {
            return Effect.unit;
          }
          const message =
            error._tag === "AwsError" ? error.message : String(error);
          return Effect.sync(() => logger.log(message)).pipe(
            Effect.flatMap(() => Effect.unit),
          );
        }),
      );

      return yield* this.destroy();
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

    // Create the queue parameters
    const createParams: Record<string, any> = {
      Action: "CreateQueue",
      QueueName: queueName,
      Version: "2012-11-05",
    };

    // Add attributes
    Object.entries(attributes).forEach(([key, value], index) => {
      createParams[`Attribute.${index + 1}.Name`] = key;
      createParams[`Attribute.${index + 1}.Value`] = value;
    });

    // Add tags
    if (tags) {
      Object.entries(tags).forEach(([key, value], index) => {
        createParams[`Tag.${index + 1}.Key`] = key;
        createParams[`Tag.${index + 1}.Value`] = value;
      });
    }

    // Create queue with retry logic for recently deleted queues
    const createQueue = Effect.gen(function* () {
      const createResponse = yield* client.postJson<{ QueueUrl: string }>(
        "/",
        createParams,
      );

      // Get queue attributes
      const attributesResponse = yield* client.postJson<{
        Attributes: Record<string, string>;
      }>("/", {
        Action: "GetQueueAttributes",
        QueueUrl: createResponse.QueueUrl,
        AttributeNames: ["QueueArn"],
        Version: "2012-11-05",
      });

      return this({
        ...props,
        arn: attributesResponse.Attributes.QueueArn,
        url: createResponse.QueueUrl,
      });
    });

    // Handle queue creation with retry for recently deleted queues
    const result = yield* createQueue.pipe(
      Effect.catchSome((error) => {
        if (isQueueDeletedRecently(error)) {
          // Use Effect's built-in retry with exponential backoff
          return Effect.sync(() =>
            logger.log(
              `Queue "${queueName}" was recently deleted and can't be re-created. Waiting and retrying...`,
            ),
          ).pipe(
            Effect.flatMap(() => createQueue),
            Effect.retry({
              times: 60,
              schedule: Schedule.spaced(1000), // 1 second
            }),
          );
        }
        return Effect.fail(error);
      }),
    );

    return result;
  },
);

function isQueueDoesNotExist(error: any): boolean {
  return (
    error.name === "QueueDoesNotExist" ||
    error.Code === "AWS.SimpleQueueService.NonExistentQueue" ||
    (error._tag === "AwsError" && error.message.includes("NonExistentQueue"))
  );
}

function isQueueDeletedRecently(error: any): boolean {
  return (
    error.Code === "AWS.SimpleQueueService.QueueDeletedRecently" ||
    error.name === "QueueDeletedRecently" ||
    (error._tag === "AwsError" &&
      error.message.includes("QueueDeletedRecently"))
  );
}

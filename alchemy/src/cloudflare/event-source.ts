import type { QueueConsumerSettings } from "./queue-consumer.ts";
import type { QueueResource } from "./queue.ts";

/**
 * Base interface for event sources that can be bound to a Worker
 */
export type EventSource = QueueEventSource | QueueResource;

/**
 * Configuration for a Queue as an event source for a Worker
 */
export interface QueueEventSource extends QueueConsumerSettings {
  /**
   * The queue to consume messages from
   */
  readonly queue: QueueResource;
}

/**
 * Checks if an event source is a QueueEventSource
 * @param eventSource - The event source to check
 * @returns true if the event source is a QueueEventSource, false otherwise
 */
export function isQueueEventSource(
  eventSource: any,
): eventSource is QueueEventSource {
  return "queue" in eventSource;
}

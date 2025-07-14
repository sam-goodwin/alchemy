/**
 * Timeout configuration interface
 */
export interface TimeoutConfig {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Resource timeout error class
 */
export class ResourceTimeoutError extends Error {
  constructor(
    resourceType: string,
    resourceId: string,
    timeoutMs: number,
    operation: string,
  ) {
    super(
      `${resourceType} ${resourceId} did not complete ${operation} within ${timeoutMs}ms`,
    );
    this.name = "ResourceTimeoutError";
  }
}

/**
 * Validate timeout configuration
 */
export function validateTimeoutConfig(config: TimeoutConfig): void {
  if (config.maxAttempts <= 0) {
    throw new Error("maxAttempts must be greater than 0");
  }
  if (config.delayMs <= 0) {
    throw new Error("delayMs must be greater than 0");
  }
}

/**
 * Merge default timeout configuration with optional overrides
 */
export function mergeTimeoutConfig(
  defaultConfig: TimeoutConfig,
  override?: Partial<TimeoutConfig>,
): TimeoutConfig {
  if (!override) {
    return defaultConfig;
  }

  const merged = {
    maxAttempts: override.maxAttempts ?? defaultConfig.maxAttempts,
    delayMs: override.delayMs ?? defaultConfig.delayMs,
  };

  validateTimeoutConfig(merged);
  return merged;
}

/**
 * Wait for a resource to reach a desired state with configurable timeout
 */
export async function waitForResourceState<T>(
  checkFunction: () => Promise<T>,
  isReady: (result: T) => boolean,
  config: TimeoutConfig,
  resourceId: string,
  resourceType: string,
  operation = "become ready",
): Promise<void> {
  validateTimeoutConfig(config);
  const { maxAttempts, delayMs } = config;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await checkFunction();
      if (isReady(result)) {
        return;
      }

      console.log(
        `${resourceType} ${resourceId} not ready, waiting... (attempt ${attempt}/${maxAttempts})`,
      );

      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.log(
        `Error checking ${resourceType} status (attempt ${attempt}/${maxAttempts}):`,
        error,
      );

      // Check if this is a non-retryable error (contains "NonRetryableError" in the name)
      if (error instanceof Error && error.name.includes("NonRetryableError")) {
        throw error;
      }

      if (attempt === maxAttempts) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  const totalTimeMs = maxAttempts * delayMs;
  throw new ResourceTimeoutError(
    resourceType,
    resourceId,
    totalTimeMs,
    operation,
  );
}
/**
 * Generic function to wait for an operation to complete
 * This is the most flexible version that can handle any type of operation
 */
export async function waitForOperation<T>(
  checkFunction: () => Promise<T>,
  isComplete: (result: T) => boolean,
  config: TimeoutConfig,
  resourceId: string,
  resourceType: string,
  operation = "complete",
  onError?: (error: any, attempt: number, maxAttempts: number) => boolean, // Return true to continue retrying
): Promise<void> {
  validateTimeoutConfig(config);
  const { maxAttempts, delayMs } = config;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await checkFunction();

      if (isComplete(result)) {
        console.log(`${resourceType} ${resourceId} ${operation} completed`);
        return;
      }

      console.log(
        `${resourceType} ${resourceId} ${operation} in progress... (attempt ${attempt}/${maxAttempts})`,
      );

      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      // Allow custom error handling
      if (onError) {
        const shouldContinue = onError(error, attempt, maxAttempts);
        if (!shouldContinue) {
          // If onError returns false, it means the operation completed successfully
          // (e.g., resource was deleted and not found)
          console.log(
            `${resourceType} ${resourceId} ${operation} completed (via error handling)`,
          );
          return;
        }
      } else {
        console.log(
          `Error checking ${resourceType} ${operation} status (attempt ${attempt}/${maxAttempts}):`,
          error,
        );
      }

      if (attempt === maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  const totalTimeMs = maxAttempts * delayMs;
  throw new ResourceTimeoutError(
    resourceType,
    resourceId,
    totalTimeMs,
    operation,
  );
}

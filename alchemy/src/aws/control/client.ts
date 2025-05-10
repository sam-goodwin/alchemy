import { AwsClient } from "aws4fetch";

/**
 * Status of a Cloud Control API operation
 */
export type OperationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "CANCEL_IN_PROGRESS"
  | "CANCEL_COMPLETE";

/**
 * Progress event from a Cloud Control API operation
 */
export interface ProgressEvent {
  /**
   * Operation identifier
   */
  operationId?: string;

  /**
   * Current status of the operation
   */
  status: OperationStatus;

  /**
   * Resource model (properties) if available
   */
  resourceModel?: Record<string, any>;

  /**
   * Resource identifier if available
   */
  identifier?: string;

  /**
   * Error details if operation failed
   */
  errorCode?: string;
  message?: string;
  retryAfterSeconds?: number;
}

/**
 * Error thrown by Cloud Control API operations
 */
export class CloudControlError extends Error {
  name = "CloudControlError";
  code?: string;
  requestId?: string;
  statusCode?: number;
  operation?: string;
  resourceType?: string;
  resourceIdentifier?: string;
  retryable?: boolean;
  retryAfterSeconds?: number;
}

/**
 * Options for Cloud Control API requests
 */
export interface CloudControlOptions {
  /**
   * AWS region to use (defaults to us-east-1)
   */
  region?: string;

  /**
   * AWS access key ID (overrides environment variable)
   */
  accessKeyId?: string;

  /**
   * AWS secret access key (overrides environment variable)
   */
  secretAccessKey?: string;

  /**
   * AWS session token for temporary credentials
   */
  sessionToken?: string;

  /**
   * Maximum number of attempts for polling operations
   */
  maxPollingAttempts?: number;

  /**
   * Initial delay in milliseconds between polling attempts
   */
  initialPollingDelay?: number;

  /**
   * Maximum delay in milliseconds between polling attempts
   */
  maxPollingDelay?: number;

  /**
   * Overall timeout in milliseconds for operations
   */
  operationTimeout?: number;

  /**
   * Maximum number of retries for retryable errors
   */
  maxRetries?: number;
}

// List of retryable error codes
const RETRYABLE_ERRORS = new Set([
  "ThrottlingException",
  "ServiceUnavailable",
  "InternalFailure",
  "TooManyRequestsException",
  "RequestLimitExceeded",
  "Throttling",
  "ThrottlingException",
  "LimitExceededException",
]);

/**
 * Check if an error is retryable
 */
function isRetryableError(error: CloudControlError): boolean {
  return (
    RETRYABLE_ERRORS.has(error.code || "") ||
    (error.statusCode !== undefined &&
      (error.statusCode === 429 ||
        (error.statusCode >= 500 && error.statusCode < 600))) ||
    error.retryable === true
  );
}

/**
 * Make a request to the Cloud Control API with retry logic
 */
async function request(
  client: AwsClient,
  region: string,
  method: string,
  action: string,
  params?: any,
  maxRetries = 3
): Promise<any> {
  // Build the raw URL string without any encoding
  const baseUrl = `https://cloudcontrolapi.${region}.amazonaws.com/`;
  const queryString = `Action=${action}&Version=2021-09-30`;

  // Build additional parameters without any encoding
  const additionalParams = params
    ? Object.entries(params)
        .map(([key, value]) => {
          return `${key}=${value}`;
        })
        .join("&")
    : "";

  // Combine all parts without any encoding
  const urlStr =
    baseUrl +
    "?" +
    queryString +
    (additionalParams ? "&" + additionalParams : "");

  let lastError: CloudControlError | undefined;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const signedRequest = await client.sign(urlStr, {
        method: "POST",
      });

      console.log("signedRequest__", await signedRequest.clone().text());
      const response = await fetch(signedRequest);

      console.log("response__", response);

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({
          message: response.statusText,
        }))) as { message?: string; code?: string; retryable?: boolean };

        const error = new CloudControlError(
          errorData.message || "Unknown Cloud Control API error"
        );
        error.code = errorData.code;
        error.requestId = response.headers.get("x-amzn-requestid") || undefined;
        error.statusCode = response.status;
        error.operation = action;
        error.retryable = errorData.retryable;
        error.retryAfterSeconds = parseInt(
          response.headers.get("retry-after") || "0",
          10
        );

        if (isRetryableError(error)) {
          lastError = error;
          const retryDelay = error.retryAfterSeconds
            ? error.retryAfterSeconds * 1000
            : Math.min(Math.pow(2, attempt) * 100, 5000);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          attempt++;
          continue;
        }

        throw error;
      }

      return response.json();
    } catch (error: any) {
      if (error instanceof CloudControlError) {
        throw error;
      }

      // Handle network errors
      const networkError = new CloudControlError(
        error.message || "Network error during Cloud Control API request"
      );
      networkError.retryable = true;

      if (attempt < maxRetries) {
        lastError = networkError;
        const retryDelay = Math.min(Math.pow(2, attempt) * 100, 5000);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        attempt++;
        continue;
      }

      throw networkError;
    }
  }

  throw lastError || new CloudControlError("Maximum retries exceeded");
}

/**
 * Poll for operation completion with improved timeout and error handling
 */
async function pollOperation(
  client: AwsClient,
  region: string,
  operationId: string,
  options: Required<
    Pick<
      CloudControlOptions,
      | "maxPollingAttempts"
      | "initialPollingDelay"
      | "maxPollingDelay"
      | "operationTimeout"
    >
  >
): Promise<ProgressEvent> {
  let attempts = 0;
  let delay = options.initialPollingDelay;
  const startTime = Date.now();

  while (attempts < options.maxPollingAttempts) {
    if (Date.now() - startTime > options.operationTimeout) {
      throw new CloudControlError(
        `Operation ${operationId} timed out after ${
          options.operationTimeout / 1000
        } seconds`
      );
    }

    try {
      const response = await request(
        client,
        region,
        "POST",
        "GetResourceRequestStatus",
        {
          RequestToken: operationId,
        }
      );

      const event = response.ProgressEvent;

      // Add more detailed logging for operation progress
      console.debug(
        `Operation ${operationId} status: ${event.status}${
          event.message ? ` - ${event.message}` : ""
        }`
      );

      if (event.status === "SUCCESS") {
        return event;
      }

      if (event.status === "FAILED") {
        const error = new CloudControlError(
          `Operation ${operationId} failed: ${event.message}`
        );
        error.code = event.errorCode;
        error.operation = "GetResourceRequestStatus";
        throw error;
      }

      // Use the suggested retry delay if provided
      const waitTime = event.retryAfterSeconds
        ? event.retryAfterSeconds * 1000
        : delay;

      await new Promise((resolve) => setTimeout(resolve, waitTime));
      delay = Math.min(delay * 2, options.maxPollingDelay);
      attempts++;
    } catch (error: any) {
      if (error instanceof CloudControlError && !isRetryableError(error)) {
        throw error;
      }

      // For retryable errors, continue polling
      console.warn(
        `Error polling operation ${operationId} (attempt ${attempts + 1}):`,
        error
      );

      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(delay * 2, options.maxPollingDelay))
      );
      delay = Math.min(delay * 2, options.maxPollingDelay);
      attempts++;
    }
  }

  throw new CloudControlError(
    `Operation ${operationId} polling exceeded maximum attempts (${options.maxPollingAttempts})`
  );
}

/**
 * Create a Cloud Control API client
 */
export function createCloudControlClient(options: CloudControlOptions = {}) {
  const region = options.region || "us-east-1";
  const maxPollingAttempts = options.maxPollingAttempts || 30;
  const initialPollingDelay = options.initialPollingDelay || 1000;
  const maxPollingDelay = options.maxPollingDelay || 10000;
  const operationTimeout = options.operationTimeout || 300000; // 5 minutes default
  const maxRetries = options.maxRetries || 3;

  const client = new AwsClient({
    accessKeyId: options.accessKeyId || process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey:
      options.secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY || "",
    sessionToken: options.sessionToken || process.env.AWS_SESSION_TOKEN,
    service: "cloudcontrolapi",
    region: region,
  });

  return {
    /**
     * Create a new resource
     */
    async createResource(
      typeName: string,
      desiredState: Record<string, any>
    ): Promise<ProgressEvent> {
      const response = await request(
        client,
        region,
        "POST",
        "CreateResource",
        {
          TypeName: typeName,
          DesiredState: JSON.stringify(desiredState),
        },
        maxRetries
      );

      console.log("createResource__response__", response);

      return pollOperation(client, region, response.ProgressEvent.operationId, {
        maxPollingAttempts,
        initialPollingDelay,
        maxPollingDelay,
        operationTimeout,
      });
    },

    /**
     * Get a resource's current state
     */
    async getResource(
      typeName: string,
      identifier: string
    ): Promise<Record<string, any>> {
      const response = await request(
        client,
        region,
        "POST",
        "GetResource",
        {
          TypeName: typeName,
          Identifier: identifier,
        },
        maxRetries
      );

      return response.ResourceDescription.Properties;
    },

    /**
     * Update a resource
     */
    async updateResource(
      typeName: string,
      identifier: string,
      patchDocument: Record<string, any>
    ): Promise<ProgressEvent> {
      const response = await request(
        client,
        region,
        "POST",
        "UpdateResource",
        {
          TypeName: typeName,
          Identifier: identifier,
          PatchDocument: JSON.stringify(patchDocument),
        },
        maxRetries
      );

      return pollOperation(client, region, response.ProgressEvent.operationId, {
        maxPollingAttempts,
        initialPollingDelay,
        maxPollingDelay,
        operationTimeout,
      });
    },

    /**
     * Delete a resource
     */
    async deleteResource(
      typeName: string,
      identifier: string
    ): Promise<ProgressEvent> {
      const response = await request(
        client,
        region,
        "POST",
        "DeleteResource",
        {
          TypeName: typeName,
          Identifier: identifier,
        },
        maxRetries
      );

      return pollOperation(client, region, response.ProgressEvent.operationId, {
        maxPollingAttempts,
        initialPollingDelay,
        maxPollingDelay,
        operationTimeout,
      });
    },

    /**
     * List resources of a given type
     */
    async listResources(
      typeName: string,
      nextToken?: string
    ): Promise<{
      resources: Array<{ identifier: string; properties: Record<string, any> }>;
      nextToken?: string;
    }> {
      const response = await request(
        client,
        region,
        "POST",
        "ListResources",
        {
          TypeName: typeName,
          NextToken: nextToken,
        },
        maxRetries
      );

      return {
        resources: response.ResourceDescriptions.map((desc: any) => ({
          identifier: desc.Identifier,
          properties: desc.Properties,
        })),
        nextToken: response.NextToken,
      };
    },
  };
}

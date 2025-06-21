import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { loadConfig } from "@smithy/node-config-provider";
import { AwsClient } from "aws4fetch";
import { Effect, Schedule, Data } from "effect";
import { safeFetch } from "../util/safe-fetch.ts";

/**
 * AWS service-specific tagged errors using Effect's Data.TaggedError
 */
export class AwsError extends Data.TaggedError("AwsError")<{
  readonly message: string;
  readonly errorCode: string;
  readonly response?: Response;
  readonly data?: any;
}> {}

export class AwsNetworkError extends Data.TaggedError("AwsNetworkError")<{
  readonly message: string;
  readonly errorCode: string;
  readonly response?: Response;
  readonly data?: any;
}> {}

export class AwsThrottleError extends Data.TaggedError("AwsThrottleError")<{
  readonly message: string;
  readonly errorCode: string;
  readonly response?: Response;
  readonly data?: any;
}> {}

export class AwsNotFoundError extends Data.TaggedError("AwsNotFoundError")<{
  readonly message: string;
  readonly errorCode: string;
  readonly response?: Response;
  readonly data?: any;
}> {}

export class AwsAccessDeniedError extends Data.TaggedError(
  "AwsAccessDeniedError",
)<{
  readonly message: string;
  readonly errorCode: string;
  readonly response?: Response;
  readonly data?: any;
}> {}

export class AwsValidationError extends Data.TaggedError("AwsValidationError")<{
  readonly message: string;
  readonly errorCode: string;
  readonly response?: Response;
  readonly data?: any;
}> {}

export class AwsConflictError extends Data.TaggedError("AwsConflictError")<{
  readonly message: string;
  readonly errorCode: string;
  readonly response?: Response;
  readonly data?: any;
}> {}

export class AwsInternalServerError extends Data.TaggedError(
  "AwsInternalServerError",
)<{
  readonly message: string;
  readonly errorCode: string;
  readonly response?: Response;
  readonly data?: any;
}> {}

/**
 * Options for AWS client creation
 */
export interface AwsClientOptions {
  /**
   * AWS region to use
   */
  region?: string;

  /**
   * AWS service name (e.g., 's3', 'sqs', 'lambda')
   */
  service: string;

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
   * Maximum number of retries for retryable errors
   */
  maxRetries?: number;
}

const getRegion = loadConfig({
  environmentVariableSelector: (env) =>
    env.AWS_REGION || env.AWS_DEFAULT_REGION,
  configFileSelector: (profile) => profile.region,
  default: undefined,
});

/**
 * Create an AWS client using aws4fetch with native Effect
 */
export function createAwsClient(
  options: AwsClientOptions,
): Effect.Effect<AwsClientWrapper, AwsError> {
  return Effect.gen(function* () {
    const credentials = yield* Effect.tryPromise({
      try: () => fromNodeProviderChain()(),
      catch: (error) =>
        new AwsError({
          message:
            error instanceof Error
              ? error.message
              : "Failed to load AWS credentials",
          errorCode: "CredentialsError",
        }),
    });

    const region = yield* Effect.gen(function* () {
      if (options.region) return options.region;

      const configRegion = yield* Effect.tryPromise({
        try: () => getRegion(),
        catch: () => null,
      }).pipe(Effect.catchAll(() => Effect.succeed(null)));

      return (
        configRegion ??
        process.env.AWS_REGION ??
        process.env.AWS_DEFAULT_REGION ??
        null
      );
    });

    if (!region) {
      yield* Effect.fail(
        new AwsError({
          message:
            "No region found. Please set AWS_REGION or AWS_DEFAULT_REGION in the environment or in your AWS profile.",
          errorCode: "RegionNotFound",
        }),
      );
    }

    const client = new AwsClient({
      ...credentials,
      service: options.service,
      region,
    });

    return new AwsClientWrapper(client, {
      ...options,
      region,
    });
  });
}

export class AwsClientWrapper {
  private region: string;
  private service: string;
  private maxRetries: number;

  constructor(
    private readonly client: AwsClient,
    options: AwsClientOptions & { region: string },
  ) {
    this.region = options.region;
    this.service = options.service;
    this.maxRetries = options.maxRetries || 3;
  }

  /**
   * Make a request to AWS using aws4fetch with Effect-based error handling
   */
  public request<T>(
    method: string,
    path: string,
    _params?: Record<string, any>,
    options?: {
      headers?: Record<string, string>;
      body?: string;
      maxRetries?: number;
    },
  ): Effect.Effect<T, AwsError> {
    const maxRetries = options?.maxRetries || this.maxRetries;

    const makeRequest = Effect.tryPromise({
      try: async () => {
        // Special URL handling for S3
        const url =
          this.service === "s3"
            ? `https://s3.${this.region}.amazonaws.com${path}`
            : `https://${this.service}.${this.region}.amazonaws.com${path}`;

        const requestOptions = {
          method,
          headers: {
            // Don't set default Content-Type for all services
            ...(this.service !== "s3" && {
              "Content-Type": "application/x-amz-json-1.1",
            }),
            ...options?.headers,
          },
          ...(options?.body && { body: options.body }),
        };

        const signedRequest = await this.client.sign(url, requestOptions);
        const response = await safeFetch(signedRequest);

        if (!response.ok) {
          // Try to parse as XML for S3, JSON for others
          let data: any = {};
          try {
            if (this.service === "s3") {
              const text = await response.text();
              data = { message: text, statusText: response.statusText };
            } else {
              data = await response.json();
            }
          } catch {
            data = { statusText: response.statusText };
          }
          throw this.createError(response, data);
        }

        // For S3 HEAD requests, return empty object
        if (method === "HEAD") {
          return {} as T;
        }

        // For S3, try to parse as XML first, then JSON
        if (this.service === "s3") {
          const text = await response.text();
          // For now, return the raw text - in a real implementation you'd parse XML
          return (text ? { data: text } : {}) as T;
        }

        return (await response.json()) as T;
      },
      catch: (error): AwsError => {
        if (error instanceof AwsError) {
          return error;
        }
        return new AwsNetworkError({
          message:
            error instanceof Error
              ? error.message
              : "Network error during AWS request",
          errorCode: "NetworkError",
        });
      },
    });

    // Use Effect's retry with exponential backoff for retryable errors
    const schedule = Schedule.exponential(100); // 100ms
    return makeRequest.pipe(
      Effect.retry({
        while: (error) =>
          error._tag === "AwsThrottleError" || error._tag === "AwsNetworkError",
        times: maxRetries,
        schedule,
      }),
    );
  }

  /**
   * Make a POST request with JSON body
   */
  public postJson<T>(
    path: string,
    body: Record<string, any>,
    headers?: Record<string, string>,
  ): Effect.Effect<T, AwsError> {
    return this.request<T>("POST", path, undefined, {
      headers,
      body: JSON.stringify(body),
    });
  }

  /**
   * Make a GET request
   */
  public get<T>(
    path: string,
    headers?: Record<string, string>,
  ): Effect.Effect<T, AwsError> {
    return this.request<T>("GET", path, undefined, { headers });
  }

  /**
   * Make a DELETE request
   */
  public delete<T>(
    path: string,
    headers?: Record<string, string>,
  ): Effect.Effect<T, AwsError> {
    return this.request<T>("DELETE", path, undefined, { headers });
  }

  /**
   * Make a PUT request
   */
  public put<T>(
    path: string,
    body?: string,
    headers?: Record<string, string>,
  ): Effect.Effect<T, AwsError> {
    return this.request<T>("PUT", path, undefined, {
      headers,
      ...(body && { body }),
    });
  }

  private createError(response: Response, data: any): AwsError {
    const errorCode = data.Code || data.__type || response.status.toString();
    const message = data.Message || data.message || response.statusText;

    if (response.status === 404 || errorCode.includes("NotFound")) {
      return new AwsNotFoundError({ message, errorCode, response, data });
    }
    if (response.status === 403 || errorCode.includes("AccessDenied")) {
      return new AwsAccessDeniedError({ message, errorCode, response, data });
    }
    if (response.status === 429 || errorCode.includes("Throttling")) {
      return new AwsThrottleError({ message, errorCode, response, data });
    }
    if (response.status === 400 || errorCode.includes("ValidationException")) {
      return new AwsValidationError({ message, errorCode, response, data });
    }
    if (response.status === 409 || errorCode.includes("Conflict")) {
      return new AwsConflictError({ message, errorCode, response, data });
    }
    if (response.status >= 500) {
      return new AwsInternalServerError({ message, errorCode, response, data });
    }

    return new AwsError({ message, errorCode, response, data });
  }
}

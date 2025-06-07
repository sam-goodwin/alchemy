import { alchemy } from "../alchemy.ts";
import type { Secret } from "../secret.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { safeFetch } from "../util/safe-fetch.ts";

/**
 * Options for Fly.io API requests
 */
export interface FlyApiOptions {
  /**
   * Base URL for Fly.io API
   *
   * @default https://api.machines.dev/v1
   */
  baseUrl?: string;

  /**
   * API Token to use (overrides FLY_API_TOKEN env var)
   */
  apiToken?: Secret;
}

/**
 * Creates a FlyApi instance
 *
 * @param options API options
 * @returns FlyApi instance
 */
export function createFlyApi(
  options: Partial<FlyApiOptions> = {},
): FlyApi {
  const apiToken =
    options.apiToken ??
    (process.env.FLY_API_TOKEN
      ? alchemy.secret(process.env.FLY_API_TOKEN)
      : undefined);

  if (!apiToken) {
    throw new Error(
      "Either apiToken or FLY_API_TOKEN environment variable must be provided",
    );
  }

  return new FlyApi({
    baseUrl: options.baseUrl,
    apiToken,
  });
}

/**
 * Fly.io API client using raw fetch
 */
export class FlyApi {
  public readonly baseUrl: string;
  public readonly apiToken: Secret;

  /**
   * Create a new Fly.io API client
   * Use createFlyApi factory function instead of direct constructor.
   *
   * @param options API options
   */
  constructor(
    options: FlyApiOptions & {
      apiToken: Secret;
    },
  ) {
    this.baseUrl = options.baseUrl ?? "https://api.machines.dev/v1";
    this.apiToken = options.apiToken;
  }

  /**
   * Make a fetch request to the Fly.io API
   *
   * @param path API path (without base URL)
   * @param init Fetch init options
   * @returns Raw Response object from fetch
   */
  async fetch(path: string, init: RequestInit = {}): Promise<Response> {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiToken.unencrypted}`,
    };

    if (Array.isArray(init.headers)) {
      init.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else if (init.headers instanceof Headers) {
      init.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (init.headers) {
      headers = { ...headers, ...init.headers };
    }

    // Remove Content-Type for FormData
    if (init.body instanceof FormData) {
      delete headers["Content-Type"];
    }

    let forbidden = false;

    // Use withExponentialBackoff for automatic retry on network errors
    return withExponentialBackoff(
      async () => {
        const response = await safeFetch(`${this.baseUrl}${path}`, {
          ...init,
          headers,
        });

        if (response.status.toString().startsWith("5")) {
          throw new InternalError("5xx error");
        }
        if (response.status === 403 && !forbidden) {
          // Retry 403s once as they might be transient
          forbidden = true;
          throw new ForbiddenError();
        }
        if (response.status === 429) {
          throw new TooManyRequestsError();
        }
        return response;
      },
      // transient errors should be retried aggressively
      (error) =>
        error instanceof InternalError ||
        error instanceof TooManyRequestsError ||
        error instanceof ForbiddenError,
      10, // Maximum 10 attempts (1 initial + 9 retries)
      1000, // Start with 1s delay, will exponentially increase
    );
  }

  /**
   * Helper for GET requests
   */
  async get(path: string, init: RequestInit = {}): Promise<Response> {
    return this.fetch(path, { ...init, method: "GET" });
  }

  /**
   * Helper for HEAD requests
   */
  async head(path: string, init: RequestInit = {}): Promise<Response> {
    return this.fetch(path, { ...init, method: "HEAD" });
  }

  /**
   * Helper for POST requests
   */
  async post(
    path: string,
    body: any,
    init: RequestInit = {},
  ): Promise<Response> {
    const requestBody =
      body instanceof FormData
        ? body
        : typeof body === "string"
          ? body
          : JSON.stringify(body);
    return this.fetch(path, { ...init, method: "POST", body: requestBody });
  }

  /**
   * Helper for PUT requests
   */
  async put(
    path: string,
    body: any,
    init: RequestInit = {},
  ): Promise<Response> {
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
    return this.fetch(path, { ...init, method: "PUT", body: requestBody });
  }

  /**
   * Helper for PATCH requests
   */
  async patch(
    path: string,
    body: any,
    init: RequestInit = {},
  ): Promise<Response> {
    return this.fetch(path, {
      ...init,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  /**
   * Helper for DELETE requests
   */
  async delete(path: string, init: RequestInit = {}): Promise<Response> {
    return this.fetch(path, { ...init, method: "DELETE" });
  }
}

class InternalError extends Error {}

class TooManyRequestsError extends Error {
  constructor() {
    super(`Fly.io Rate Limit Exceeded at ${new Date().toISOString()}`);
  }
}

class ForbiddenError extends Error {}
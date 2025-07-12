import { alchemy } from "../alchemy.ts";
import type { Secret } from "../secret.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { safeFetch } from "../util/safe-fetch.ts";
import {
  getCloudflareAuthHeaders,
  type CloudflareAuthOptions,
} from "./auth.ts";
import { getCloudflareAccounts, getUserEmailFromApiKey } from "./user.ts";

/**
 * Options for Cloudflare API requests
 */
export interface CloudflareApiOptions {
  /**
   * Base URL for Cloudflare API
   *
   * @default https://api.cloudflare.com/client/v4
   */
  baseUrl?: string;

  /**
   * API Key to use (overrides CLOUDFLARE_API_KEY env var)
   */
  apiKey?: Secret;

  /**
   * API Token to use (overrides CLOUDFLARE_API_TOKEN env var)
   */
  apiToken?: Secret;

  /**
   * Account ID to use (overrides CLOUDFLARE_ACCOUNT_ID env var)
   * If not provided, will be automatically retrieved from the Cloudflare API
   */
  accountId?: string;

  /**
   * Email to use with API Key authentication
   * If not provided, will attempt to discover from Cloudflare API
   */
  email?: string;
}

/**
 * Creates a CloudflareApi instance with automatic account ID discovery if not provided
 *
 * @param options API options
 * @returns Promise resolving to a CloudflareApi instance
 */
export async function createCloudflareApi(
  options: Partial<CloudflareApiOptions> = {},
): Promise<CloudflareApi> {
  // Prioritize explicit credentials: check apiToken first, then apiKey
  let apiKey: Secret | undefined;
  let apiToken: Secret | undefined;

  if (options.apiToken !== undefined) {
    // Explicit apiToken provided
    apiToken = options.apiToken;
  } else if (options.apiKey !== undefined) {
    // Explicit apiKey provided
    apiKey = options.apiKey;
  } else if (process.env.CLOUDFLARE_API_TOKEN) {
    // No explicit credentials, check environment variables: CLOUDFLARE_API_TOKEN > CLOUDFLARE_API_KEY
    apiToken = alchemy.secret(process.env.CLOUDFLARE_API_TOKEN);
  } else if (process.env.CLOUDFLARE_API_KEY) {
    apiKey = alchemy.secret(process.env.CLOUDFLARE_API_KEY);
  }
  let email = options.email ?? process.env.CLOUDFLARE_EMAIL;
  if (apiKey && !email) {
    email = await getUserEmailFromApiKey(apiKey.unencrypted);
  }
  const accountId =
    options.accountId ??
    process.env.CLOUDFLARE_ACCOUNT_ID ??
    process.env.CF_ACCOUNT_ID ??
    (
      await getCloudflareAccounts({
        apiKey,
        apiToken,
        email,
      } as CloudflareAuthOptions)
    )[0]?.id;
  if (accountId === undefined) {
    throw new Error(
      "Either accountId or CLOUDFLARE_ACCOUNT_ID must be provided",
    );
  }
  return new CloudflareApi({
    baseUrl: options.baseUrl,
    accountId,
    email,
    apiKey,
    apiToken,
  });
}

/**
 * Cloudflare API client using raw fetch
 */
export class CloudflareApi {
  public readonly accountId: string;
  public readonly baseUrl: string;
  public readonly apiKey: Secret | undefined;
  public readonly apiToken: Secret | undefined;
  public readonly email: string | undefined;
  public readonly authOptions: CloudflareAuthOptions;

  /**
   * Create a new Cloudflare API client
   * Use createCloudflareApi factory function instead of direct constructor
   * for automatic account ID discovery.
   *
   * @param options API options
   */
  constructor(
    options: CloudflareApiOptions & {
      accountId: string;
    },
  ) {
    this.accountId = options.accountId;
    this.baseUrl = options.baseUrl ?? "https://api.cloudflare.com/client/v4";
    this.apiKey = options.apiKey;
    this.apiToken = options.apiToken;
    this.email = options.email;

    if (this.apiKey && this.apiToken) {
      throw new Error("'apiKey' and 'apiToken' cannot both be provided");
    } else if (this.apiKey && !this.email) {
      throw new Error("'email' must be provided if 'apiKey' is provided");
    }
    this.authOptions = this.apiKey
      ? {
          apiKey: this.apiKey,
          email: this.email!,
        }
      : {
          apiToken: this.apiToken,
        };
  }

  /**
   * Make a fetch request to the Cloudflare API
   *
   * @param path API path (without base URL)
   * @param init Fetch init options
   * @returns Raw Response object from fetch
   */
  public async fetch(path: string, init: RequestInit = {}): Promise<Response> {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
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
      headers = init.headers;
    }
    headers = {
      ...(await getCloudflareAuthHeaders(this.authOptions)),
      ...headers,
    };

    // TODO(sam): is this necessary?
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
          throw new InternalError(response.statusText);
        }
        if (response.status === 403 && !forbidden) {
          // we occasionally get 403s from Cloudflare tha tare actually transient
          // so, we will retry this at MOST once
          forbidden = true;
          throw new ForbiddenError();
        }
        if (response.status === 429) {
          const data: any = await response.json();
          throw new TooManyRequestsError(
            data.errors[0].message ?? response.statusText,
          );
        }
        return response;
      },
      // transient errors should be retried aggressively
      (error) =>
        error instanceof InternalError ||
        error instanceof TooManyRequestsError ||
        error instanceof ForbiddenError ||
        error.code === "ECONNRESET",
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
  constructor(message: string) {
    super(
      `Cloudflare Rate Limit Exceeded at ${new Date().toISOString()}: ${message}`,
    );
  }
}

class ForbiddenError extends Error {}

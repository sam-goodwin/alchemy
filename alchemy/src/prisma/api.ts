import type { Secret } from "../secret.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { safeFetch } from "../util/safe-fetch.ts";

/**
 * Options for Prisma API requests
 */
export interface PrismaApiOptions {
  /**
   * Base URL for Prisma API
   * @default https://api.prisma.io
   */
  baseUrl?: string;

  /**
   * API Key to use (overrides PRISMA_API_KEY env var)
   */
  apiKey?: Secret;
}

/**
 * Create a PrismaApi instance with environment variable fallback
 * @param options API options
 * @returns PrismaApi instance
 */
export function createPrismaApi(
  options: Partial<PrismaApiOptions> = {},
): PrismaApi {
  return new PrismaApi({
    baseUrl: options.baseUrl,
    apiKey: options.apiKey,
  });
}

/**
 * Get authentication headers for Prisma API
 * @param options PrismaApiOptions
 * @returns Headers for authentication
 */
export async function getPrismaAuthHeaders(
  options: Partial<PrismaApiOptions>,
): Promise<Record<string, string>> {
  const apiKey = options.apiKey?.unencrypted ?? process.env.PRISMA_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Prisma API key is required. Set PRISMA_API_KEY environment variable or provide apiKey option.",
    );
  }

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

/**
 * Prisma API client using raw fetch
 */
export class PrismaApi {
  public readonly baseUrl: string;

  /**
   * Create a new Prisma API client
   * Use createPrismaApi factory function instead of direct constructor
   *
   * @param options API options
   */
  constructor(private readonly options: PrismaApiOptions) {
    this.baseUrl = options.baseUrl ?? "https://api.prisma.io";
  }

  /**
   * Make a fetch request to the Prisma API
   *
   * @param path API path (without base URL)
   * @param init Fetch init options
   * @returns Raw Response object from fetch
   */
  async fetch(path: string, init: RequestInit = {}): Promise<Response> {
    let headers: Record<string, string> = {};

    if (Array.isArray(init.headers)) {
      init.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else if (init.headers instanceof Headers) {
      init.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (init.headers) {
      headers = init.headers as Record<string, string>;
    }

    headers = {
      ...(await getPrismaAuthHeaders(this.options)),
      ...headers,
    };

    // Use withExponentialBackoff for automatic retry on network errors
    return withExponentialBackoff(
      () =>
        safeFetch(`${this.baseUrl}${path}`, {
          ...init,
          headers,
        }),
      (error) => {
        // Only retry on network-related errors
        const errorMsg = (error as Error).message || "";
        const isNetworkError =
          errorMsg.includes("socket connection was closed") ||
          errorMsg.includes("ECONNRESET") ||
          errorMsg.includes("ETIMEDOUT") ||
          errorMsg.includes("ECONNREFUSED");

        return isNetworkError || error?.status?.toString().startsWith("5");
      },
      5, // Maximum 5 attempts (1 initial + 4 retries)
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

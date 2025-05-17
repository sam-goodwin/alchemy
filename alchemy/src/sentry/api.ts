/**
 * Options for Sentry API requests
 */
export interface SentryApiOptions {
  /**
   * API token to use (overrides environment variable)
   */
  apiToken?: string;
}

/**
 * Minimal API client using raw fetch
 */
export class SentryApi {
  /** Base URL for API */
  readonly baseUrl: string;

  /** API token */
  readonly apiToken: string;

  /**
   * Create a new API client
   *
   * @param options API options
   */
  constructor(options: SentryApiOptions = {}) {
    this.baseUrl = "https://sentry.io/api/0";
    this.apiToken = options.apiToken || process.env.SENTRY_AUTH_TOKEN || "";

    if (!this.apiToken) {
      throw new Error("SENTRY_AUTH_TOKEN environment variable is required");
    }
  }

  /**
   * Make a request to the API
   *
   * @param path API path (without base URL)
   * @param init Fetch init options
   * @returns Raw Response object from fetch
   */
  async fetch(path: string, init: RequestInit = {}): Promise<Response> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiToken}`,
    };

    if (init.headers) {
      const initHeaders = init.headers as Record<string, string>;
      Object.keys(initHeaders).forEach((key) => {
        headers[key] = initHeaders[key];
      });
    }

    if (init.body instanceof FormData) {
      delete headers["Content-Type"];
    }

    return fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers,
    });
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
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
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
   * Helper for DELETE requests
   */
  async delete(path: string, init: RequestInit = {}): Promise<Response> {
    return this.fetch(path, { ...init, method: "DELETE" });
  }
}

/**
 * Options for PlanetScale API requests
 */
export interface PlanetScaleApiOptions {
  /**
   * PlanetScale API token (overrides environment variable)
   */
  apiKey?: string;
}

/**
 * Minimal API client for PlanetScale using raw fetch
 */
export class PlanetScaleApi {
  /** Base URL for API */
  readonly baseUrl: string;

  /** API token */
  readonly apiToken: string;

  /**
   * Create a new API client
   *
   * @param options API options
   */
  constructor(options: PlanetScaleApiOptions = {}) {
    this.baseUrl = "https://api.planetscale.com/v1";
    this.apiToken = options.apiKey || process.env.PLANETSCALE_API_TOKEN || "";
    if (!this.apiToken) {
      throw new Error("PLANETSCALE_API_TOKEN environment variable is required");
    }
  }

  /**
   * Make a request to the API
   *
   * @param path API path (without base URL)
   * @param init Fetch init options
   * @returns Raw Response object from fetch
   */
  private async fetch(path: string, init: RequestInit = {}): Promise<Response> {
    const headers: Record<string, string> = {
      Authorization: `${this.apiToken}`,
      "Content-Type": "application/json",
    };

    if (init.headers) {
      Object.assign(headers, init.headers);
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
    body?: any,
    init: RequestInit = {},
  ): Promise<Response> {
    return this.fetch(path, {
      ...init,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Helper for PUT requests
   */
  async put(
    path: string,
    body?: any,
    init: RequestInit = {},
  ): Promise<Response> {
    return this.fetch(path, {
      ...init,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Helper for PATCH requests
   */
  async patch(
    path: string,
    body?: any,
    init: RequestInit = {},
  ): Promise<Response> {
    return this.fetch(path, {
      ...init,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Helper for DELETE requests
   */
  async delete(path: string, init: RequestInit = {}): Promise<Response> {
    return this.fetch(path, { ...init, method: "DELETE" });
  }
}

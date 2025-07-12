import { type Secret, secret } from "../secret.ts";

/**
 * Discord authentication type.
 */
export enum DiscordAuthType {
  /** Bot authentication using bot token */
  BOT = "Bot",
  /** OAuth2 bearer token authentication */
  BEARER = "Bearer",
  /** No authentication (for public endpoints or webhooks) */
  NONE = "None",
}

/**
 * Discord API client configuration.
 */
export interface DiscordApiOptions {
  /**
   * Authentication type.
   * @default DiscordAuthType.BOT
   */
  authType?: DiscordAuthType;

  /**
   * Bot token for bot authentication.
   * If not provided, will use DISCORD_BOT_TOKEN environment variable.
   */
  botToken?: Secret;

  /**
   * Bearer token for OAuth2 authentication.
   * Used when authType is BEARER.
   */
  bearerToken?: Secret;

  /**
   * Discord API version.
   * @default "v10"
   */
  apiVersion?: string;

  /**
   * Base URL for Discord API.
   * @default "https://discord.com/api"
   */
  baseUrl?: string;
}

/**
 * Discord API error response.
 */
export interface DiscordApiError {
  message: string;
  code: number;
  errors?: any;
}

/**
 * Discord API client for making authenticated requests.
 */
export class DiscordApi {
  private readonly authType: DiscordAuthType;
  private readonly authToken?: Secret;
  private readonly apiVersion: string;
  private readonly baseUrl: string;

  constructor(options: DiscordApiOptions = {}) {
    this.authType = options.authType || DiscordAuthType.BOT;
    this.apiVersion = options.apiVersion || "v10";
    this.baseUrl = options.baseUrl || "https://discord.com/api";

    // Set up authentication based on type
    switch (this.authType) {
      case DiscordAuthType.BOT:
        if (options.botToken) {
          this.authToken = options.botToken;
        } else {
          const envToken = process.env.DISCORD_BOT_TOKEN;
          if (!envToken) {
            throw new Error(
              "Discord bot token not provided and DISCORD_BOT_TOKEN environment variable not set",
            );
          }
          this.authToken = secret(envToken);
        }
        break;

      case DiscordAuthType.BEARER:
        if (!options.bearerToken) {
          throw new Error("Bearer token is required for OAuth2 authentication");
        }
        this.authToken = options.bearerToken;
        break;

      case DiscordAuthType.NONE:
        // No authentication needed
        break;
    }
  }

  /**
   * Get the full API URL for a given path.
   */
  private getUrl(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${this.baseUrl}/${this.apiVersion}/${cleanPath}`;
  }

  /**
   * Get headers for API requests.
   */
  private async getHeaders(
    additionalHeaders?: HeadersInit,
  ): Promise<HeadersInit> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authorization header if needed
    if (this.authType !== DiscordAuthType.NONE && this.authToken) {
      const token = this.authToken.unencrypted;
      headers.Authorization = `${this.authType} ${token}`;
    }

    // Merge additional headers
    if (additionalHeaders) {
      Object.assign(headers, additionalHeaders);
    }

    return headers;
  }

  /**
   * Handle API response and throw on error.
   */
  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const error = (await response.json()) as DiscordApiError;
      throw new Error(`Discord API Error: ${error.message} (${error.code})`);
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  /**
   * Make a GET request to the Discord API.
   */
  async get(path: string, headers?: HeadersInit): Promise<any> {
    const response = await fetch(this.getUrl(path), {
      method: "GET",
      headers: await this.getHeaders(headers),
    });

    return this.handleResponse(response);
  }

  /**
   * Make a POST request to the Discord API.
   */
  async post(path: string, body?: any, headers?: HeadersInit): Promise<any> {
    const response = await fetch(this.getUrl(path), {
      method: "POST",
      headers: await this.getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse(response);
  }

  /**
   * Make a PATCH request to the Discord API.
   */
  async patch(path: string, body?: any, headers?: HeadersInit): Promise<any> {
    const response = await fetch(this.getUrl(path), {
      method: "PATCH",
      headers: await this.getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse(response);
  }

  /**
   * Make a PUT request to the Discord API.
   */
  async put(path: string, body?: any, headers?: HeadersInit): Promise<any> {
    const response = await fetch(this.getUrl(path), {
      method: "PUT",
      headers: await this.getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse(response);
  }

  /**
   * Make a DELETE request to the Discord API.
   */
  async delete(path: string, headers?: HeadersInit): Promise<any> {
    const response = await fetch(this.getUrl(path), {
      method: "DELETE",
      headers: await this.getHeaders(headers),
    });

    return this.handleResponse(response);
  }
}

/**
 * Create a Discord API client with the given options.
 */
export function createDiscordApi(options?: DiscordApiOptions): DiscordApi {
  return new DiscordApi(options);
}

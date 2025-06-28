import { assertContext } from "../context.ts";

export class TursoApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any,
  ) {
    super(message);
    this.name = "TursoApiError";
  }
}

export interface TursoApiOptions {
  token?: string;
  baseUrl?: string;
}

export class TursoApi {
  private readonly token: string;
  private readonly baseUrl: string;

  constructor(options: TursoApiOptions = {}) {
    this.token = options.token || this.getTokenFromEnv();
    this.baseUrl = options.baseUrl || "https://api.turso.tech";
  }

  private getTokenFromEnv(): string {
    const token = process.env.TURSO_API_TOKEN;
    if (!token) {
      throw new Error(
        "TURSO_API_TOKEN environment variable is required. " +
          "Get your token from https://app.turso.tech/account",
      );
    }
    return token;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: any,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseText = await response.text();
    let responseData: any;

    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      if (!response.ok) {
        throw new TursoApiError(
          `API request failed: ${response.statusText}`,
          response.status,
          responseText,
        );
      }
      responseData = responseText;
    }

    if (!response.ok) {
      const errorMessage =
        responseData?.error || responseData?.message || response.statusText;
      throw new TursoApiError(
        `Turso API error: ${errorMessage}`,
        response.status,
        responseData,
      );
    }

    return responseData;
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>("GET", path);
  }

  async post<T>(path: string, body?: any): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  async patch<T>(path: string, body?: any): Promise<T> {
    return this.request<T>("PATCH", path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }
}

let defaultApi: TursoApi | undefined;

export function getTursoApi(forceNew = false): TursoApi {
  if (!defaultApi || forceNew) {
    defaultApi = new TursoApi();
  }
  return defaultApi;
}

export function assertOrganizationSlug(): string {
  const ctx = assertContext();
  const slug = ctx.env.TURSO_ORGANIZATION_SLUG;
  if (!slug) {
    throw new Error(
      "TURSO_ORGANIZATION_SLUG environment variable is required. " +
        "This is the slug of your Turso organization (found in the URL: https://app.turso.tech/<slug>)",
    );
  }
  return slug;
}

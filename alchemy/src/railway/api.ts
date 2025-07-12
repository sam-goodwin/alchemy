import type { Secret } from "../secret.ts";

export interface RailwayApiOptions {
  apiKey?: Secret | string;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export class RailwayApi {
  readonly baseUrl = "https://backboard.railway.app/graphql/v2";
  readonly apiKey: string;

  constructor(options: RailwayApiOptions = {}) {
    if (options.apiKey) {
      this.apiKey =
        typeof options.apiKey === "string"
          ? options.apiKey
          : options.apiKey.unencrypted;
    } else {
      const envApiKey = process.env.RAILWAY_TOKEN;
      if (!envApiKey) {
        throw new Error(
          "Railway API token is required. Provide it via the apiKey parameter or set the RAILWAY_TOKEN environment variable.",
        );
      }
      this.apiKey = envApiKey;
    }
  }

  async query<T = any>(
    query: string,
    variables?: Record<string, any>,
  ): Promise<GraphQLResponse<T>> {
    return withRailwayRetry(() =>
      this.fetch({
        query,
        variables,
      }),
    );
  }

  async mutate<T = any>(
    mutation: string,
    variables?: Record<string, any>,
  ): Promise<GraphQLResponse<T>> {
    return withRailwayRetry(() =>
      this.fetch({
        query: mutation,
        variables,
      }),
    );
  }

  private async fetch(body: {
    query: string;
    variables?: Record<string, any>;
  }): Promise<GraphQLResponse> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Railway API request failed: ${response.status} ${response.statusText}`,
      );
    }

    const result: GraphQLResponse = await response.json();

    if (result.errors && result.errors.length > 0) {
      throw new Error(
        `Railway GraphQL error: ${result.errors.map((e: any) => e.message).join(", ")}`,
      );
    }

    return result;
  }
}

export function createRailwayApi(options: RailwayApiOptions = {}): RailwayApi {
  return new RailwayApi(options);
}


function isRailwayRetryableError(error: any): boolean {
  return (
    error?.status === 429 ||
    error?.message?.includes("rate limit") ||
    error?.message?.includes("timeout")
  );
}

async function withRailwayRetry<T>(
  operation: () => Promise<T>,
  maxAttempts = 5,
  initialDelayMs = 1000,
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isRailwayRetryableError(error) || attempt === maxAttempts) {
        throw error;
      }

      const delay = initialDelayMs * 2 ** (attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

import type { Secret } from "../secret.ts";
import { withExponentialBackoff } from "../util/retry.ts";

export interface PolarClientOptions {
  apiKey?: Secret | string;
  sandbox?: boolean;
}

export interface PolarClient {
  get: (path: string) => Promise<any>;
  post: (path: string, data?: any) => Promise<any>;
  patch: (path: string, data?: any) => Promise<any>;
  delete: (path: string) => Promise<any>;
}

export function createPolarClient(
  options: PolarClientOptions = {},
): PolarClient {
  let apiKey: string;

  if (options.apiKey) {
    apiKey =
      typeof options.apiKey === "string"
        ? options.apiKey
        : options.apiKey.unencrypted;
  } else {
    const envApiKey = process.env.POLAR_API_KEY;
    if (!envApiKey) {
      throw new Error(
        "Polar API key is required. Provide it via the apiKey parameter or set the POLAR_API_KEY environment variable.",
      );
    }
    apiKey = envApiKey;
  }

  const baseUrl = options.sandbox
    ? "https://sandbox-api.polar.sh"
    : "https://api.polar.sh";

  const makeRequest = async (
    method: string,
    path: string,
    data?: any,
  ): Promise<any> => {
    const url = `${baseUrl}/v1${path}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (data && (method === "POST" || method === "PATCH")) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }

      const error = new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      );
      (error as any).status = response.status;
      (error as any).statusCode = response.status;
      (error as any).code = errorData.code;
      (error as any).type = errorData.type;
      throw error;
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  };

  return {
    get: (path: string) => withPolarRetry(() => makeRequest("GET", path)),
    post: (path: string, data?: any) =>
      withPolarRetry(() => makeRequest("POST", path, data)),
    patch: (path: string, data?: any) =>
      withPolarRetry(() => makeRequest("PATCH", path, data)),
    delete: (path: string) => withPolarRetry(() => makeRequest("DELETE", path)),
  };
}

export function handlePolarDeleteError(
  error: any,
  resourceType: string,
  resourceId?: string,
): void {
  if (error?.status === 404 || error?.statusCode === 404) {
    console.log(
      `${resourceType} ${resourceId || "unknown"} not found during deletion (already deleted)`,
    );
    return;
  }

  console.error(
    `Error deleting ${resourceType} ${resourceId || "unknown"}:`,
    error,
  );
  throw error;
}

export function isPolarConflictError(error: any): boolean {
  return error?.status === 409 || error?.statusCode === 409;
}

function isPolarRetryableError(error: any): boolean {
  return (
    error?.status === 429 ||
    error?.statusCode === 429 ||
    error?.code === "rate_limit" ||
    error?.type === "rate_limit_error"
  );
}

async function withPolarRetry<T>(
  operation: () => Promise<T>,
  maxAttempts = 5,
  initialDelayMs = 1000,
): Promise<T> {
  return withExponentialBackoff(
    operation,
    isPolarRetryableError,
    maxAttempts,
    initialDelayMs,
  );
}

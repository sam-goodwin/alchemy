import { alchemy } from "../alchemy.ts";
import type { Secret } from "../secret.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { safeFetch } from "../util/safe-fetch.ts";

export interface SupabaseApiOptions {
  baseUrl?: string;
  accessToken?: Secret;
}

export async function createSupabaseApi(
  options: Partial<SupabaseApiOptions> = {},
): Promise<SupabaseApi> {
  const accessToken =
    options.accessToken ??
    (process.env.SUPABASE_ACCESS_TOKEN
      ? alchemy.secret(process.env.SUPABASE_ACCESS_TOKEN)
      : undefined);

  if (!accessToken) {
    throw new Error("SUPABASE_ACCESS_TOKEN must be provided");
  }

  return new SupabaseApi({
    baseUrl: options.baseUrl,
    accessToken,
  });
}

export class SupabaseApi {
  public readonly baseUrl: string;
  public readonly accessToken: Secret;

  constructor(options: SupabaseApiOptions & { accessToken: Secret }) {
    this.baseUrl = options.baseUrl ?? "https://api.supabase.com/v1";
    this.accessToken = options.accessToken;
  }

  async fetch(path: string, init: RequestInit = {}): Promise<Response> {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken.unencrypted}`,
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

    return withExponentialBackoff(
      async () => {
        const response = await safeFetch(`${this.baseUrl}${path}`, {
          ...init,
          headers,
        });

        if (response.status.toString().startsWith("5")) {
          throw new InternalError("5xx error");
        }
        if (response.status === 429) {
          throw new TooManyRequestsError();
        }
        return response;
      },
      (error) =>
        error instanceof InternalError || error instanceof TooManyRequestsError,
      5,
      1000,
    );
  }

  async get(path: string, init: RequestInit = {}): Promise<Response> {
    return this.fetch(path, { ...init, method: "GET" });
  }

  async post(
    path: string,
    body: any,
    init: RequestInit = {},
  ): Promise<Response> {
    return this.fetch(path, {
      ...init,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

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

  async delete(path: string, init: RequestInit = {}): Promise<Response> {
    return this.fetch(path, { ...init, method: "DELETE" });
  }
}

class InternalError extends Error {}

class TooManyRequestsError extends Error {
  constructor() {
    super(`Supabase Rate Limit Exceeded at ${new Date().toISOString()}`);
  }
}

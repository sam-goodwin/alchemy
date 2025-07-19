import { alchemy } from "../alchemy.ts";
import type { CloudflareApiOptions } from "../cloudflare/api.ts";
import { createCloudflareApi } from "../cloudflare/api.ts";
import { getInternalWorkerBundle } from "../cloudflare/bundle/internal-worker-bundle.ts";
import { DEFAULT_COMPATIBILITY_DATE } from "../cloudflare/compatibility-date.gen.ts";
import { DurableObjectNamespace } from "../cloudflare/durable-object-namespace.ts";
import { getWorkerSettings } from "../cloudflare/worker-metadata.ts";
import {
  enableWorkerSubdomain,
  getAccountSubdomain,
  getWorkerSubdomain,
} from "../cloudflare/worker-subdomain.ts";
import { putWorker } from "../cloudflare/worker.ts";
import type { Scope } from "../scope.ts";
import type { Secret } from "../secret.ts";
import { StateStore, type State } from "../state.ts";
import { logger } from "../util/logger.ts";
import { memoize } from "../util/memoize.ts";

export interface CloudflareStateStoreOptions extends CloudflareApiOptions {
  /**
   * The name of the script to use for the state store.
   * @default "alchemy-state-service"
   */
  scriptName?: string;
  /**
   * Whether to force the worker to be updated.
   * This may be useful if you've lost the token for the state store and need to overwrite it.
   * @default false
   */
  forceUpdate?: boolean;
  /**
   * The token to use for the state store.
   * @default process.env.ALCHEMY_STATE_TOKEN
   * @note You must use the same token for all deployments on your Cloudflare account.
   */
  stateToken?: Secret<string>;
}

/**
 * A state store backed by a SQLite database in a Cloudflare Durable Object.
 *
 * @see {@link https://alchemy.run/guides/do-state-store DOStateStore}
 */
export class CloudflareStateStore extends StateStore {
  private url?: string;
  private token?: string;

  constructor(
    scope: Scope,
    private readonly options: CloudflareStateStoreOptions = {},
  ) {
    super(scope, {
      enableRetry: true,
      maxAttempts: 5,
      initialDelayMs: 100,
      isRetryable: () => true,
    });
  }

  private async ensureProvisioned(): Promise<void> {
    if (this.url && this.token) return;

    const { url, token } = await provision(this.options);
    this.url = url;
    this.token = token;
  }

  private async request<TMethod extends CloudflareStateStore.Method>(
    method: TMethod,
    params: CloudflareStateStore.API[TMethod]["params"],
  ): Promise<CloudflareStateStore.API[TMethod]["result"]> {
    await this.ensureProvisioned();

    const request: CloudflareStateStore.Request<TMethod, { chain: string[] }> =
      {
        method,
        params,
        context: { chain: this.scope.chain },
      };

    const response = await fetch(this.url!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.headers.get("Content-Type")?.includes("application/json")) {
      throw new Error(
        `[CloudflareStateStore] "${method}" request failed with status ${response.status}: Expected JSON response, but got ${response.headers.get("Content-Type")}`,
      );
    }

    const json =
      (await response.json()) as CloudflareStateStore.Response<TMethod>;
    if (!json.success) {
      throw new Error(
        `[CloudflareStateStore] "${method}" request failed with status ${response.status}: ${json.error}`,
      );
    }

    return json.result;
  }

  async init(): Promise<void> {
    return this.request("init", []);
  }

  async deinit(): Promise<void> {
    return this.request("deinit", []);
  }

  async listRaw(): Promise<string[]> {
    return this.request("list", []);
  }

  async countRaw(): Promise<number> {
    return this.request("count", []);
  }

  async getRaw(key: string): Promise<State | undefined> {
    return this.request("get", [key]);
  }

  async getBatchRaw(ids: string[]): Promise<Record<string, State>> {
    return this.request("getBatch", [ids]);
  }

  async allRaw(): Promise<Record<string, State>> {
    return this.request("all", []);
  }

  async setRaw(key: string, value: State): Promise<void> {
    return this.request("set", [key, value]);
  }

  async deleteRaw(key: string): Promise<void> {
    return this.request("delete", [key]);
  }
}

const provision = memoize(async (options: CloudflareStateStoreOptions) => {
  const scriptName = options.scriptName ?? "alchemy-state-service";
  const token =
    options.stateToken ??
    (await alchemy.secret.env(
      "ALCHEMY_STATE_TOKEN",
      undefined,
      "Missing token for DOStateStore. Please set ALCHEMY_STATE_TOKEN in the environment or set the `stateToken` option in the DOStateStore constructor.",
    ));

  const api = await createCloudflareApi(options);
  const [bundle, settings, subdomain] = await Promise.all([
    getInternalWorkerBundle("cloudflare-state-store"),
    getWorkerSettings(api, scriptName),
    getWorkerSubdomain(api, scriptName),
  ]);
  if (!settings || !settings.tags.includes(bundle.tag) || options.forceUpdate) {
    logger.log(
      `[CloudflareStateStore] ${settings ? "Updating" : "Creating"}...`,
    );
    await putWorker(api, {
      workerName: scriptName,
      compatibilityDate: DEFAULT_COMPATIBILITY_DATE,
      format: "esm",
      scriptBundle: {
        entrypoint: bundle.file.name,
        files: [bundle.file],
        hash: bundle.tag,
      },
      compatibilityFlags: [],
      bindings: {
        STORE: DurableObjectNamespace(scriptName, {
          className: "Store",
          sqlite: true,
        }),
        STATE_TOKEN: token,
      },
      tags: [bundle.tag],
    });
  }
  if (!subdomain.enabled) {
    await enableWorkerSubdomain(api, scriptName);
  }
  const url = `https://${scriptName}.${await getAccountSubdomain(api)}.workers.dev`;
  await pollUntilReady(() =>
    fetch(url, {
      method: "HEAD",
      headers: { Authorization: `Bearer ${token.unencrypted}` },
    }),
  );
  return { url, token: token.unencrypted };
});

async function pollUntilReady(fn: () => Promise<Response>) {
  // This ensures the token is correct and the worker is ready to use.
  let last: Response | undefined;
  let delay = 1000;
  for (let i = 0; i < 20; i++) {
    const res = await fn();
    if (res.ok) {
      return;
    }
    if (res.status === 401) {
      throw new Error(
        "[CloudflareStateStore] The token is invalid. Please check your ALCHEMY_STATE_TOKEN environment variable, or set `forceUpdate: true` in the CloudflareStateStore constructor to overwrite the current token.",
      );
    }
    if (!last) {
      logger.log("[CloudflareStateStore] Waiting for deployment...");
    }
    last = res;
    // Exponential backoff with jitter
    const jitter = Math.random() * 0.1 * delay;
    await new Promise((resolve) => setTimeout(resolve, delay + jitter));
    delay *= 1.5; // Increase the delay for next attempt
    delay = Math.min(delay, 10000); // Cap at 10 seconds
  }
  throw new Error(
    `[CloudflareStateStore] Failed to reach state store: ${last?.status} ${last?.statusText}`,
  );
}

export declare namespace CloudflareStateStore {
  export type API = {
    [K in
      | "init"
      | "deinit"
      | "list"
      | "count"
      | "get"
      | "getBatch"
      | "all"
      | "set"
      | "delete"]: NonNullable<StateStore[K]> extends (
      ...args: infer Args
    ) => Promise<infer Return>
      ? {
          method: K;
          params: Args;
          result: Return;
        }
      : never;
  };
  export type Method = keyof API;

  export type Request<TMethod extends Method, TContext = unknown> = {
    method: TMethod;
    params: API[TMethod]["params"];
    context: TContext;
  };

  export type SuccessResponse<TMethod extends Method> = {
    success: true;
    status: number;
    result: API[TMethod]["result"];
  };

  export type ErrorResponse = {
    success: false;
    status: number;
    error: string;
  };

  export type Response<TMethod extends Method> =
    | SuccessResponse<TMethod>
    | ErrorResponse;
}

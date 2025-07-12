import { alchemy } from "../alchemy.ts";
import { BUILD_DATE } from "../build-date.ts";
import type { CloudflareApiOptions } from "../cloudflare/api.ts";
import { createCloudflareApi } from "../cloudflare/api.ts";
import { getInternalWorkerBundle } from "../cloudflare/bundle/internal-worker-bundle.ts";
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
import { logger } from "../util/logger.ts";
import { memoize } from "../util/memoize.ts";
import { StateStoreProxy } from "./proxy.ts";

export interface DOStateStoreOptions extends CloudflareApiOptions {
  /**
   * The name of the script to use for the state store.
   * @default "alchemy-state"
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
export class DOStateStore extends StateStoreProxy {
  constructor(
    scope: Scope,
    private readonly options: DOStateStoreOptions = {},
  ) {
    super(scope);
  }

  async provision(): Promise<StateStoreProxy.Dispatch> {
    const { url, token } = await provision(this.options);
    return async (method, params) => {
      const request: StateStoreProxy.Request<
        typeof method,
        { chain: string[] }
      > = {
        method,
        params,
        context: { chain: this.scope.chain },
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (!response.headers.get("Content-Type")?.includes("application/json")) {
        throw new Error(
          `[DOStateStore] "${method}" request failed with status ${response.status}: Expected JSON response, but got ${response.headers.get("Content-Type")}`,
        );
      }
      const json = (await response.json()) as StateStoreProxy.Response<
        typeof method
      >;
      if (!json.success) {
        throw new Error(
          `[DOStateStore] "${method}" request failed with status ${response.status}: ${json.error}`,
        );
      }
      return json.result;
    };
  }
}

const provision = memoize(async (options: DOStateStoreOptions) => {
  const scriptName = options.scriptName ?? "alchemy-state";
  const token =
    options.stateToken ??
    (await alchemy.secret.env(
      "ALCHEMY_STATE_TOKEN",
      undefined,
      "Missing token for DOStateStore. Please set ALCHEMY_STATE_TOKEN in the environment or set the `stateToken` option in the DOStateStore constructor.",
    ));

  const api = await createCloudflareApi(options);
  const [bundle, settings, subdomain] = await Promise.all([
    getInternalWorkerBundle("do-state-store"),
    getWorkerSettings(api, scriptName),
    getWorkerSubdomain(api, scriptName),
  ]);
  if (!settings || !settings.tags.includes(bundle.tag) || options.forceUpdate) {
    logger.log(`[DOStateStore] ${settings ? "Updating" : "Creating"}...`);
    await putWorker(api, {
      workerName: scriptName,
      compatibilityDate: BUILD_DATE,
      format: "esm",
      scriptBundle: {
        entrypoint: bundle.file.name,
        files: [bundle.file],
        hash: bundle.tag,
      },
      compatibilityFlags: [],
      bindings: {
        STORE: new DurableObjectNamespace(scriptName, {
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
        "[DOStateStore] The token is invalid. Please check your ALCHEMY_STATE_TOKEN environment variable, or set `forceUpdate: true` in the DOStateStore constructor to overwrite the current token.",
      );
    }
    if (!last) {
      logger.log("[DOStateStore] Waiting for deployment...");
    }
    last = res;
    // Exponential backoff with jitter
    const jitter = Math.random() * 0.1 * delay;
    await new Promise((resolve) => setTimeout(resolve, delay + jitter));
    delay *= 1.5; // Increase the delay for next attempt
    delay = Math.min(delay, 10000); // Cap at 10 seconds
  }
  throw new Error(
    `[DOStateStore] Failed to reach state store: ${last?.status} ${last?.statusText}`,
  );
}

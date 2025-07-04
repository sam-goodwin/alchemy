import { logger } from "../../util/logger.ts";
import { withExponentialBackoff } from "../../util/retry.ts";
import { handleApiError } from "../api-error.ts";
import type { CloudflareApi } from "../api.ts";
import type { WorkerMetadata } from "../worker-metadata.ts";
import { getWorkerTemplate } from "../worker/shared.ts";
import type { DOStateStoreAPI } from "./types.ts";

interface DOStateStoreClientOptions {
  app: string;
  stage: string;
  url: string;
  token: string;
}

class StateStoreError extends Error {
  constructor(
    message: string,
    readonly retryable: boolean,
  ) {
    super(message);
  }
}

export class DOStateStoreClient {
  constructor(private readonly options: DOStateStoreClientOptions) {}

  async rpc<T extends keyof DOStateStoreAPI.API>(
    method: T,
    params: DOStateStoreAPI.API[T]["params"],
  ): Promise<DOStateStoreAPI.API[T]["result"]> {
    return await withExponentialBackoff(
      async () => {
        const res = await this.fetch("/rpc", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method,
            params,
          }),
        });
        if (!res.headers.get("Content-Type")?.includes("application/json")) {
          throw new StateStoreError(
            `Unexpected response of type "${res.headers.get("Content-Type")}" from state store: ${res.status} ${res.statusText} ${await res.text()}`,
            true,
          );
        }
        const body = await res.json<DOStateStoreAPI.Response>();
        if (!body.success) {
          throw new StateStoreError(
            `State store "${method}" request failed with status ${res.status}: ${body.error}`,
            res.status >= 500,
          );
        }
        return body.result;
      },
      (error) => {
        if (error instanceof StateStoreError) {
          return error.retryable;
        }
        return true;
      },
      5,
      500,
    );
  }

  async validate(): Promise<Response> {
    return await this.fetch("/rpc", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "validate",
        params: null,
      }),
    });
  }

  async waitUntilReady(): Promise<void> {
    // This ensures the token is correct and the worker is ready to use.
    let last: Response | undefined;
    let delay = 1000;
    for (let i = 0; i < 20; i++) {
      const res = await this.validate();
      if (res.ok) {
        return;
      }
      if (!last) {
        logger.log("Waiting for state store deployment...");
      }
      last = res;
      // Exponential backoff with jitter
      const jitter = Math.random() * 0.1 * delay;
      await new Promise((resolve) => setTimeout(resolve, delay + jitter));
      delay *= 1.5; // Increase the delay for next attempt
      delay = Math.min(delay, 10000); // Cap at 10 seconds
    }
    throw new Error(
      `Failed to access state store: ${last?.status} ${last?.statusText}`,
    );
  }

  async fetch(path: string, init: RequestInit = {}): Promise<Response> {
    const url = new URL(path, this.options.url);
    url.searchParams.set("app", this.options.app);
    url.searchParams.set("stage", this.options.stage);
    return await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.options.token}`,
        ...init.headers,
      },
    });
  }
}

const TAG = "alchemy-state-store:2025-06-23";

const cache = new Map<string, string>();

export async function upsertStateStoreWorker(
  api: CloudflareApi,
  workerName: string,
  token: string,
  force: boolean,
) {
  const key = `worker:${workerName}`;
  const cached = cache.get(key);
  if (cached === TAG) {
    return;
  }
  const { found, tag } = await getWorkerStatus(api, workerName);
  if (found && tag === TAG && !force) {
    cache.set(key, TAG);
    return;
  }
  const formData = new FormData();
  const worker = await getWorkerTemplate("do-state-store");
  formData.append(worker.name, worker);
  formData.append(
    "metadata",
    new Blob([
      JSON.stringify({
        main_module: worker.name,
        compatibility_date: "2025-06-01",
        compatibility_flags: ["nodejs_compat"],
        bindings: [
          {
            name: "DOFS_STATE_STORE",
            type: "durable_object_namespace",
            class_name: "DOFSStateStore",
          },
          {
            name: "DOFS_TOKEN",
            type: "secret_text",
            text: token,
          },
        ],
        migrations: !found
          ? {
              new_sqlite_classes: ["DOFSStateStore"],
            }
          : undefined,
        tags: [TAG],
        observability: {
          enabled: true,
        },
      } satisfies WorkerMetadata),
    ]),
  );

  // Put the worker with migration tag v1
  const response = await api.put(
    `/accounts/${api.accountId}/workers/scripts/${workerName}`,
    formData,
  );
  if (!response.ok) {
    throw await handleApiError(response, "upload", "worker", workerName);
  }

  const subdomainRes = await api.post(
    `/accounts/${api.accountId}/workers/scripts/${workerName}/subdomain`,
    { enabled: true, preview_enabled: false },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!subdomainRes.ok) {
    throw await handleApiError(
      subdomainRes,
      "creating worker subdomain",
      "worker",
      workerName,
    );
  }
  cache.set(key, TAG);
}

async function getWorkerStatus(api: CloudflareApi, workerName: string) {
  const res = await api.get(
    `/accounts/${api.accountId}/workers/scripts/${workerName}/settings`,
  );
  if (!res.ok) {
    return {
      found: false,
      tag: undefined,
    };
  }
  const json: {
    result: {
      tags: string[];
    };
  } = await res.json();
  return {
    found: true,
    tag: json.result.tags.find((tag) => tag.startsWith("alchemy-state-store:")),
  };
}

export async function getAccountSubdomain(api: CloudflareApi) {
  const key = `subdomain:${api.accountId}`;
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }
  const res = await api.get(`/accounts/${api.accountId}/workers/subdomain`);
  if (!res.ok) {
    throw new Error(
      `Failed to get account subdomain: ${res.status} ${res.statusText}: ${await res.text().catch(() => "unknown error")}`,
    );
  }
  const json: { result: { subdomain: string } } = await res.json();
  const subdomain = json.result.subdomain;
  cache.set(key, subdomain);
  return subdomain;
}

import type { RemoteProxyConnectionString } from "miniflare";
import { createCloudflareApi, type CloudflareApi } from "../api.ts";
import type { WorkerBindingSpec } from "../bindings.ts";
import type { CloudflareApiResponse } from "../types.ts";
import type { WorkerMetadata } from "../worker-metadata.ts";
import { getAccountSubdomain, getWorkerTemplate } from "../worker/shared.ts";
import { HTTPServer } from "./http-server.ts";

type WranglerSessionConfig =
  | {
      workers_dev: boolean;
      minimal_mode: boolean;
    }
  | {
      routes: string[];
      minimal_mode: boolean;
    };

interface WorkersPreviewSession {
  inspector_websocket: string;
  prewarm: string;
  token: string;
}

export async function createMixedModeProxy(input: {
  name: string;
  bindings: WorkerBindingSpec[];
}) {
  const api = await createCloudflareApi();
  const script = await getWorkerTemplate("mixed-mode-proxy-worker");
  const [token, subdomain] = await Promise.all([
    createWorkersPreviewToken(api, {
      name: input.name,
      metadata: {
        main_module: script.name,
        compatibility_date: "2025-06-16",
        bindings: input.bindings,
        observability: {
          enabled: false,
        },
      },
      files: [script],
      session: {
        workers_dev: true,
        minimal_mode: true,
      },
    }),
    getAccountSubdomain(api),
  ]);
  return new MixedModeProxy(
    `https://${input.name}.${subdomain}.workers.dev`,
    token,
    input.bindings,
  );
}

const DEBUG: boolean = false;

export class MixedModeProxy {
  server: HTTPServer;

  constructor(
    readonly url: string,
    readonly token: string,
    readonly bindings: WorkerBindingSpec[],
  ) {
    this.server = new HTTPServer({
      fetch: this.fetch.bind(this),
    });
  }

  get connectionString() {
    const hostname =
      this.server.hostname === "::" ? "localhost" : this.server.hostname;
    return new URL(
      `http://${hostname}:${this.server.port}`,
    ) as RemoteProxyConnectionString;
  }

  async fetch(req: Request) {
    const origin = new URL(req.url);
    const url = new URL(origin.pathname, this.url);
    url.search = origin.search;
    url.hash = origin.hash;

    const headers = new Headers(req.headers);
    headers.set("cf-workers-preview-token", this.token);
    headers.set("host", new URL(this.url).hostname);
    headers.delete("cf-connecting-ip");

    const res = await fetch(url, {
      method: req.method,
      headers,
      body: req.body,
      redirect: "manual",
    });

    // Remove headers that are not supported by miniflare
    const responseHeaders = new Headers(res.headers);
    responseHeaders.delete("transfer-encoding");
    responseHeaders.delete("content-encoding");

    if (DEBUG) {
      const clone = res.clone();
      console.log({
        request: {
          url: url.toString(),
          method: req.method,
          headers,
          body: req.body,
        },
        response: {
          status: res.status,
          headers: res.headers,
          body: await res.text(),
        },
      });
      return new Response(clone.body, {
        status: clone.status,
        headers: responseHeaders,
      });
    }

    return new Response(res.body, {
      status: res.status,
      headers: responseHeaders,
    });
  }
}

async function createWorkersPreviewToken(
  api: CloudflareApi,
  input: {
    name: string;
    metadata: WorkerMetadata;
    files: File[];
    session: WranglerSessionConfig;
  },
) {
  const session = await createWorkersPreviewSession(api);
  const formData = new FormData();
  formData.append("metadata", JSON.stringify(input.metadata));
  for (const file of input.files) {
    formData.append(file.name, file);
  }
  formData.append("wrangler-session-config", JSON.stringify(input.session));
  const res = await api
    .post(
      `/accounts/${api.accountId}/workers/scripts/${input.name}/edge-preview`,
      formData,
      {
        headers: {
          "cf-preview-upload-config-token": session.token,
        },
      },
    )
    .then((res) =>
      parseCloudflareResponse<{ preview_token: string }>(
        res,
        "Failed to create workers preview token",
      ),
    );
  // Fire and forget prewarm call
  // (see https://github.com/cloudflare/workers-sdk/blob/6c6afbd6072b96e78e67d3a863ed849c6aa49472/packages/wrangler/src/dev/create-worker-preview.ts#L338)
  void prewarm(session.prewarm, res.preview_token);
  return res.preview_token;
}

async function prewarm(url: string, previewToken: string) {
  const res = await fetch(url, {
    headers: {
      "cf-workers-preview-token": previewToken,
    },
  });
  if (!res.ok) {
    console.error(`Failed to prewarm worker: ${res.status} ${res.statusText}`);
  }
}

async function createWorkersPreviewSession(api: CloudflareApi) {
  const { exchange_url } = await api
    .get(`/accounts/${api.accountId}/workers/subdomain/edge-preview`)
    .then((res) =>
      parseCloudflareResponse<{
        exchange_url: string;
        token: string;
      }>(res, "Failed to create workers preview session"),
    );
  return await fetch(exchange_url).then((res) =>
    parseResponse<WorkersPreviewSession>(
      res,
      "Failed to create workers preview session",
    ),
  );
}

async function parseResponse<T>(res: Response, message: string): Promise<T> {
  if (!res.ok) {
    throw new Error(`${message} (${res.status} ${res.statusText})`);
  }
  const json: T = await res.json();
  return json;
}

async function parseCloudflareResponse<T>(
  res: Response,
  message: string,
): Promise<T> {
  const json: CloudflareApiResponse<T> = await res.json();
  if (!json.success) {
    throw new Error(
      `${message} (${res.status} ${res.statusText} - ${json.errors.map((e) => `${e.code}: ${e.message}`).join(", ")})`,
    );
  }
  if (!json.result) {
    throw new Error(`${message} (${res.status} ${res.statusText})`);
  }
  return json.result;
}

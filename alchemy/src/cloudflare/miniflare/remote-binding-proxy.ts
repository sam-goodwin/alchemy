import type { RemoteProxyConnectionString } from "miniflare";
import { HTTPServer } from "../../util/http-server.ts";
import { extractCloudflareResult } from "../api-response.ts";
import { createCloudflareApi, type CloudflareApi } from "../api.ts";
import type { WorkerBindingSpec } from "../bindings.ts";
import { getInternalWorkerBundle } from "../bundle/internal-worker-bundle.ts";
import type { WorkerMetadata } from "../worker-metadata.ts";

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

export async function createRemoteProxyWorker(input: {
  name: string;
  bindings: WorkerBindingSpec[];
}) {
  const api = await createCloudflareApi();
  const script = await getInternalWorkerBundle("remote-binding-proxy");
  const [token, subdomain] = await Promise.all([
    createWorkersPreviewToken(api, {
      name: input.name,
      metadata: {
        main_module: script.file.name,
        compatibility_date: "2025-06-16",
        bindings: input.bindings,
        observability: {
          enabled: false,
        },
      },
      files: [script.file],
      session: {
        workers_dev: true,
        minimal_mode: true,
      },
    }),
    import("../worker-subdomain.ts").then((m) => m.getAccountSubdomain(api)),
  ]);
  return new RemoteBindingProxy(
    `https://${input.name}.${subdomain}.workers.dev`,
    token,
    input.bindings,
  );
}

export class RemoteBindingProxy {
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
  const res = await extractCloudflareResult<{ preview_token: string }>(
    "create workers preview token",
    api.post(
      `/accounts/${api.accountId}/workers/scripts/${input.name}/edge-preview`,
      formData,
      {
        headers: {
          "cf-preview-upload-config-token": session.token,
        },
      },
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
  const { exchange_url } = await extractCloudflareResult<{
    exchange_url: string;
    token: string;
  }>(
    "create workers preview session",
    api.get(`/accounts/${api.accountId}/workers/subdomain/edge-preview`),
  );
  const res = await fetch(exchange_url);
  if (!res.ok) {
    throw new Error(
      `Failed to create workers preview session: ${res.status} ${res.statusText}`,
    );
  }
  const json: WorkersPreviewSession = await res.json();
  return json;
}

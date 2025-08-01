import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { memoize } from "../util/memoize.ts";
import { extractCloudflareResult } from "./api-response.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";

interface WorkerSubdomainProps extends CloudflareApiOptions {
  /**
   * The name of the script to create a subdomain for.
   */
  scriptName: string;
  /**
   * The version ID of the worker, if versioning is enabled and the worker is a preview.
   *
   * @default undefined
   */
  previewVersionId?: string;
  /**
   * Prevents the subdomain from being deleted when the worker is deleted.
   *
   * @default false
   */
  retain?: boolean;
}

export interface WorkerSubdomain
  extends Resource<"cloudflare::WorkerSubdomain"> {
  /**
   * The `workers.dev` URL for the worker or preview version.
   */
  url: string;
}

export const WorkerSubdomain = Resource(
  "cloudflare::WorkerSubdomain",
  async function (
    this: Context<WorkerSubdomain>,
    id: string,
    props: WorkerSubdomainProps,
  ) {
    const api = await createCloudflareApi(props);
    if (this.phase === "delete") {
      if (!props.retain) {
        await disableWorkerSubdomain(api, props.scriptName);
      }
      return this.destroy();
    }
    await enableWorkerSubdomain(api, props.scriptName);
    const subdomain = await getAccountSubdomain(api);
    const base = `${subdomain}.workers.dev`;
    let url: string;
    if (props.previewVersionId) {
      url = `https://${props.previewVersionId.substring(0, 8)}-${props.scriptName}.${base}`;
    } else {
      url = `https://${props.scriptName}.${base}`;
    }
    return this(id, {
      url,
    });
  },
);

export async function disableWorkerSubdomain(
  api: CloudflareApi,
  scriptName: string,
) {
  await extractCloudflareResult<SubdomainResponse>(
    `disable subdomain for "${scriptName}"`,
    api.post(
      `/accounts/${api.accountId}/workers/scripts/${scriptName}/subdomain`,
      { enabled: false },
    ),
  ).catch((error) => {
    if (error.status === 404) {
      return;
    }
    throw error;
  });
}

export async function enableWorkerSubdomain(
  api: CloudflareApi,
  scriptName: string,
) {
  await extractCloudflareResult<SubdomainResponse>(
    `enable subdomain for "${scriptName}"`,
    api.post(
      `/accounts/${api.accountId}/workers/scripts/${scriptName}/subdomain`,
      { enabled: true, previews_enabled: true },
    ),
  );
}

export async function getWorkerSubdomain(
  api: CloudflareApi,
  scriptName: string,
) {
  return await extractCloudflareResult<SubdomainResponse>(
    `get subdomain for "${scriptName}"`,
    api.get(
      `/accounts/${api.accountId}/workers/scripts/${scriptName}/subdomain`,
    ),
  ).catch((error): SubdomainResponse => {
    if (error.status === 404) {
      return { enabled: false, previews_enabled: false };
    }
    throw error;
  });
}

interface SubdomainResponse {
  enabled: boolean;
  previews_enabled: boolean;
}

export const getAccountSubdomain = memoize(
  async (api: CloudflareApi) => {
    const result = await extractCloudflareResult<{ subdomain: string }>(
      `get subdomain for account ${api.accountId}`,
      api.get(`/accounts/${api.accountId}/workers/subdomain`),
    );
    return result.subdomain;
  },
  (api) => api.accountId,
);

import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { createCloudflareApi, type CloudflareApiOptions } from "./api.ts";
import { getAccountSubdomain } from "./worker/shared.ts";

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
        await api.post(
          `/accounts/${api.accountId}/workers/scripts/${props.scriptName}/subdomain`,
          { enabled: false },
          {
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return this.destroy();
    }
    await api.post(
      `/accounts/${api.accountId}/workers/scripts/${props.scriptName}/subdomain`,
      { enabled: true, previews_enabled: true },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
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

import type { Context } from "../context.js";
import { Resource, ResourceKind } from "../resource.js";
import { handleApiError } from "./api-error.js";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.js";

/**
 * Properties for creating a Worker stub
 */
export interface WorkerStubProps extends CloudflareApiOptions {
  /**
   * Name for the worker
   */
  name: string;
}

/**
 * Output returned after WorkerStub creation
 */
export interface WorkerStub extends Resource<"cloudflare::WorkerStub"> {
  type: "service";
  /**
   * The name of the worker
   */
  name: string;
}

export function isWorkerStub(resource: Resource): resource is WorkerStub {
  return resource[ResourceKind] === "cloudflare::WorkerStub";
}

/**
 * Creates an empty worker if it doesn't already exist.
 *
 * This is useful for reserving a worker name without deploying any code.
 * Unlike the full Worker resource, WorkerStub only checks if the worker
 * exists and creates an empty one if needed.
 *
 * @example
 * // Reserve a worker name without deploying code
 * const workerStub = await WorkerStub("my-worker", {
 *   name: "my-reserved-worker"
 * });
 *
 * console.log(`Worker ${workerStub.name} exists: ${!workerStub.created}`);
 */
export const WorkerStub = Resource(
  "cloudflare::WorkerStub",
  async function (
    this: Context<WorkerStub>,
    _id: string,
    props: WorkerStubProps,
  ): Promise<WorkerStub> {
    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi(props);

    if (this.phase === "delete") {
      // We don't actually delete the worker, just mark the resource as destroyed
      return this.destroy();
    }

    // If worker doesn't exist and we're in create phase, create an empty one
    if (!(await exists(api, props.name)) && this.phase === "create") {
      await createEmptyWorker(api, props.name);
    }

    // Return the worker stub info
    return this({
      type: "service",
      ...props,
    });
  },
);

async function exists(
  api: CloudflareApi,
  workerName: string,
): Promise<boolean> {
  const response = await api.get(
    `/accounts/${api.accountId}/workers/scripts/${workerName}`,
  );

  if (response.ok) {
    return true;
  } else if (response.status === 404) {
    return false;
  } else {
    return await handleApiError(response, "get", "worker", workerName);
  }
}

async function createEmptyWorker(
  api: CloudflareApi,
  workerName: string,
): Promise<void> {
  // Minimal empty worker script
  const emptyScript = `export default { 
    fetch() { 
      return new Response("Worker stub", { status: 200 }) 
    } 
  }`;

  // Create FormData for the upload
  const formData = new FormData();

  // Add the empty script content
  formData.append(
    "worker.js",
    new Blob([emptyScript], {
      type: "application/javascript+module",
    }),
    "worker.js",
  );

  // Add metadata as JSON
  formData.append(
    "metadata",
    new Blob(
      [
        // Minimal metadata required for worker creation
        JSON.stringify({
          main_module: "worker.js",
          compatibility_date: "2025-04-20",
          bindings: [],
        }),
      ],
      {
        type: "application/json",
      },
    ),
  );

  // Upload worker script
  const uploadResponse = await api.put(
    `/accounts/${api.accountId}/workers/scripts/${workerName}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  // Check if the upload was successful
  if (!uploadResponse.ok) {
    throw new Error(
      `Failed to create empty worker: ${uploadResponse.status} ${uploadResponse.statusText}`,
    );
  }
}

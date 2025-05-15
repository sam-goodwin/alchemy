import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { handleApiError } from "./api-error.js";
import {
  type CloudflareApi,
  createCloudflareApi,
  type CloudflareApiOptions,
} from "./api.js";

/**
 * Properties for creating or updating a CustomDomain
 */
export interface CustomDomainProps extends CloudflareApiOptions {
  /**
   * The domain name to bind to the worker
   */
  name: string;

  /**
   * Cloudflare Zone ID for the domain
   */
  zoneId: string;

  /**
   * Name of the worker to bind to the domain
   */
  workerName: string;

  /**
   * Worker environment (defaults to production)
   * @default "production"
   */
  environment?: string;
}

/**
 * Cloudflare Domain object structure from API
 */
interface CloudflareDomain {
  id: string;
  zone_id: string;
  zone_name: string;
  hostname: string;
  service: string;
  environment: string;
}

/**
 * Output returned after CustomDomain creation/update
 */
export interface CustomDomain
  extends Resource<"cloudflare::CustomDomain">,
    CustomDomainProps {
  /**
   * The unique identifier for the Cloudflare domain binding.
   */
  id: string;

  /**
   * Time at which the domain binding was created (approximated if not returned by API)
   */
  createdAt: number;

  /**
   * Time at which the domain binding was last updated
   */
  updatedAt: number;
}

/**
 * Configure custom domain for a Cloudflare Worker using the Cloudflare Custom Domains API
 * This attaches a worker to a specific hostname within a zone.
 *
 * @example
 * // Bind a domain to a standard Cloudflare Worker
 * const apiWorker = await Worker("api", {
 *   name: "my-api-worker",
 *   entrypoint: "./src/api-worker.ts"
 * });
 *
 * const apiDomain = await CustomDomain("api-domain-binding", {
 *   name: "api.example.com",
 *   zoneId: "YOUR_ZONE_ID", // Replace with actual Zone ID
 *   workerName: apiWorker.name // Use the name from the Worker resource
 * });
 *
 * @see https://developers.cloudflare.com/api/resources/workers/subresources/domains/
 */
export const CustomDomain = Resource(
  "cloudflare::CustomDomain",
  async function (
    this: Context<CustomDomain>,
    logicalId: string, // Changed param name from id to logicalId for clarity
    props: CustomDomainProps,
  ): Promise<CustomDomain> {
    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi(props);

    // Validate required properties
    if (!props.name) {
      throw new Error("Domain name (props.name) is required");
    }
    if (!props.zoneId) {
      throw new Error("Zone ID (props.zoneId) is required");
    }
    if (!props.workerName) {
      throw new Error("Worker name (props.workerName) is required");
    }

    if (this.phase === "delete") {
      await deleteCustomDomain(this, api, logicalId, props);
      return this.destroy();
    }
    // Create or Update phase
    return await ensureCustomDomain(this, api, logicalId, props);
  },
);

// Helper function to delete the custom domain binding
async function deleteCustomDomain(
  context: Context<CustomDomain>,
  api: CloudflareApi,
  logicalId: string,
  props: CustomDomainProps,
): Promise<void> {
  const domainHostname = props.name;
  const domainIdToDelete = context.output?.id;

  if (!domainIdToDelete) {
    console.warn(
      `Cannot delete CustomDomain ${logicalId} (${domainHostname}): Missing domain ID in state. Assuming already deleted.`,
    );
    return; // Exit early if no ID
  }

  console.log(
    `Deleting CustomDomain binding ${domainIdToDelete} for ${domainHostname}`,
  );
  const response = await api.delete(
    `/accounts/${api.accountId}/workers/domains/${domainIdToDelete}`,
  );

  console.log(
    `Delete result for ${domainIdToDelete} (${domainHostname}):`,
    response.status,
    response.statusText,
  );

  // 404 is acceptable during deletion for idempotency
  if (!response.ok && response.status !== 404) {
    await handleApiError(
      response,
      "deleting",
      "custom domain binding",
      domainIdToDelete,
    );
    // Throw after handling to ensure failure is reported
    throw new Error(
      `Failed to delete custom domain binding ${domainIdToDelete}: ${response.statusText}`,
    );
  }
}

// Helper function to create or update the custom domain binding
async function ensureCustomDomain(
  context: Context<CustomDomain>,
  api: CloudflareApi,
  _logicalId: string,
  props: CustomDomainProps,
): Promise<CustomDomain> {
  const environment = props.environment || "production";
  const domainHostname = props.name;

  // Check if domain binding already exists for this account
  console.log(`Checking existing domain bindings for account ${api.accountId}`);
  const listResponse = await api.get(
    `/accounts/${api.accountId}/workers/domains`,
  );

  if (!listResponse.ok) {
    // Fix: Added the 4th argument (resource identifier/context)
    await handleApiError(
      listResponse,
      "listing",
      "worker domains",
      `Account ${api.accountId}`,
    );
    // If listing fails, we cannot proceed reliably
    throw new Error(
      `Failed to list worker domains for account ${api.accountId}: ${listResponse.statusText}`,
    );
  }

  const listData = (await listResponse.json()) as {
    result?: CloudflareDomain[];
    success: boolean;
  };

  if (!listData.success || !listData.result) {
    throw new Error(
      `Failed to parse list worker domains response: ${JSON.stringify(listData)}`,
    );
  }

  // Find the specific binding by hostname AND zoneId
  const existingBinding = listData.result.find(
    (b) => b.hostname === domainHostname && b.zone_id === props.zoneId,
  );

  let currentDomainId = existingBinding?.id;
  const bindingExists = !!existingBinding;

  console.log(
    `Domain binding status for ${domainHostname} (Zone: ${props.zoneId}):`,
    bindingExists
      ? `Found (ID: ${currentDomainId}, Worker: ${existingBinding.service}, Env: ${existingBinding.environment})`
      : "Not found",
  );

  // Determine if we need to update (binding exists but has different service or environment)
  const needsUpdate =
    bindingExists &&
    (existingBinding.service !== props.workerName ||
      existingBinding.environment !== environment);

  let operationPerformed: "create" | "update" | "none" = "none";
  let resultantBinding: CloudflareDomain | undefined = existingBinding;

  // Create or Update the binding using PUT
  // Cloudflare's PUT /accounts/{account_id}/workers/domains acts as an upsert
  if (!bindingExists || needsUpdate) {
    operationPerformed = bindingExists ? "update" : "create";
    console.log(
      `${operationPerformed === "update" ? "Updating" : "Creating"} domain binding: ${domainHostname} (Zone: ${props.zoneId}) → ${props.workerName}:${environment}`,
    );

    const putPayload = {
      zone_id: props.zoneId,
      hostname: domainHostname,
      service: props.workerName,
      environment: environment,
    };

    const putResponse = await api.put(
      `/accounts/${api.accountId}/workers/domains`,
      putPayload,
    );

    if (!putResponse.ok) {
      await handleApiError(
        putResponse,
        operationPerformed === "update" ? "updating" : "creating",
        "custom domain binding",
        domainHostname,
      );
      // Throw after handling to prevent inconsistent state
      throw new Error(
        `Failed to ${operationPerformed} custom domain binding: ${putResponse.statusText}`,
      );
    }

    const putResult = (await putResponse.json()) as {
      result?: CloudflareDomain;
      success: boolean;
    };

    if (!putResult.success || !putResult.result) {
      throw new Error(
        `Failed to parse ${operationPerformed} domain binding response: ${JSON.stringify(putResult)}`,
      );
    }

    resultantBinding = putResult.result;
    currentDomainId = resultantBinding.id; // Update ID from the PUT response
    console.log(
      `Successfully ${operationPerformed}d binding, new ID: ${currentDomainId}`,
    );
  } else {
    console.log(
      `Domain binding already exists and is up to date: ${domainHostname} (ID: ${currentDomainId}) → ${props.workerName}:${environment}`,
    );
  }

  // Ensure we have the final binding details
  if (!resultantBinding || !currentDomainId) {
    // This case should ideally not happen if API calls succeed
    console.error("Error: Could not determine final domain binding state.", {
      existingBinding,
      resultantBinding,
      currentDomainId,
    });
    throw new Error(
      `Failed to get final state for custom domain ${domainHostname}`,
    );
  }

  const now = Date.now();

  // Construct the output state
  return context({
    ...props, // Include all input props
    id: currentDomainId, // Use the definitive ID
    environment: resultantBinding.environment, // Use actual environment from CF
    createdAt: context.output?.createdAt || now, // Preserve create time or set new
    updatedAt:
      operationPerformed !== "none" ? now : context.output?.updatedAt || now, // Update time only if changed
  });
}

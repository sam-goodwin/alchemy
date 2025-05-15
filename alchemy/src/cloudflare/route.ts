import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { CloudflareApiError, handleApiError } from "./api-error.js";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.js";
import type { Worker } from "./worker.js";

/**
 * Properties for creating or updating a Route
 */
export interface RouteProps extends CloudflareApiOptions {
  /**
   * URL pattern for the route
   * @example "example.com/*"
   */
  pattern: string;

  /**
   * Worker script for the route
   * This can be a Worker resource or script name as a string
   */
  script: Worker | string;

  /**
   * Zone ID for the route
   */
  zoneId: string;
}

/**
 * Output returned after Route creation/update
 */
export interface Route extends Resource<"cloudflare::Route">, RouteProps {
  /**
   * The unique ID of the route
   */
  id: string;

  /**
   * The URL pattern for the route
   */
  pattern: string;

  /**
   * The Worker script name for the route
   */
  script: string;

  /**
   * The Zone ID for the route
   */
  zoneId: string;
}

/**
 * Creates and manages Cloudflare Worker Routes.
 *
 * Routes map URL patterns to Worker scripts, allowing you to control which
 * requests are handled by your Workers.
 *
 * @example
 * // Create a route that maps all requests on a domain to a Worker
 * const basicRoute = await Route("main-route", {
 *   pattern: "example.com/*",
 *   script: "my-worker",
 *   zoneId: "your-zone-id"
 * });
 *
 * @example
 * // Create a route using a Worker resource
 * const worker = await Worker("api-worker", {
 *   script: `
 *     export default {
 *       fetch(request, env) {
 *         return new Response("Hello from API!");
 *       }
 *     }
 *   `
 * });
 *
 * const apiRoute = await Route("api-route", {
 *   pattern: "api.example.com/*",
 *   script: worker,
 *   zoneId: "your-zone-id"
 * });
 *
 * @see https://developers.cloudflare.com/workers/configuration/routes/
 */
export const Route = Resource(
  "cloudflare::Route",
  async function (
    this: Context<Route>,
    _id: string,
    props: RouteProps,
  ): Promise<Route> {
    const api = await createCloudflareApi(props);

    // Get script name from script prop (either a string or a Worker resource)
    const scriptName =
      typeof props.script === "string" ? props.script : props.script.name;

    // Get zone ID from props
    const { zoneId } = props;

    if (this.phase === "delete") {
      console.log("Deleting Route:", props.pattern);

      // Only delete if we have an ID
      if (this.output?.id) {
        await deleteRoute(api, zoneId, this.output.id);
      }

      // Return void (a deleted route has no content)
      return this.destroy();
    }

    let routeData: CloudflareRouteResponse;

    if (this.phase === "update" && this.output?.id) {
      console.log("Updating Route:", props.pattern);

      // Update existing route
      routeData = await updateRoute(
        api,
        zoneId,
        this.output.id,
        props.pattern,
        scriptName,
      );
    } else {
      console.log("Creating Route:", props.pattern);

      // Create new route
      routeData = await createRoute(api, zoneId, props.pattern, scriptName);
    }

    // Return the route resource
    return this({
      id: routeData.result.id,
      pattern: routeData.result.pattern,
      script: routeData.result.script,
      zoneId,
    });
  },
);

interface CloudflareRouteResponse {
  result: {
    id: string;
    pattern: string;
    script: string;
  };
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

/**
 * Create a new route
 */
async function createRoute(
  api: CloudflareApi,
  zoneId: string,
  pattern: string,
  script: string,
): Promise<CloudflareRouteResponse> {
  const createResponse = await api.post(`/zones/${zoneId}/workers/routes`, {
    pattern,
    script,
  });

  if (!createResponse.ok) {
    return await handleApiError(createResponse, "creating", "Route", pattern);
  }

  return (await createResponse.json()) as CloudflareRouteResponse;
}

/**
 * Update a route
 */
async function updateRoute(
  api: CloudflareApi,
  zoneId: string,
  routeId: string,
  pattern: string,
  script: string,
): Promise<CloudflareRouteResponse> {
  const updateResponse = await api.put(
    `/zones/${zoneId}/workers/routes/${routeId}`,
    {
      pattern,
      script,
    },
  );

  if (!updateResponse.ok) {
    return await handleApiError(updateResponse, "updating", "Route", pattern);
  }

  return (await updateResponse.json()) as CloudflareRouteResponse;
}

/**
 * Delete a route
 */
async function deleteRoute(
  api: CloudflareApi,
  zoneId: string,
  routeId: string,
): Promise<void> {
  const deleteResponse = await api.delete(
    `/zones/${zoneId}/workers/routes/${routeId}`,
  );

  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    const errorData: any = await deleteResponse.json().catch(() => ({
      errors: [{ message: deleteResponse.statusText }],
    }));

    throw new CloudflareApiError(
      `Error deleting Route '${routeId}': ${errorData.errors?.[0]?.message || deleteResponse.statusText}`,
      deleteResponse,
    );
  }
}

/**
 * Get a route by ID
 */
export async function getRoute(
  api: CloudflareApi,
  zoneId: string,
  routeId: string,
): Promise<CloudflareRouteResponse> {
  const response = await api.get(`/zones/${zoneId}/workers/routes/${routeId}`);

  if (!response.ok) {
    throw new CloudflareApiError(
      `Failed to get route ${routeId}: ${response.statusText}`,
      response,
    );
  }

  return (await response.json()) as CloudflareRouteResponse;
}

/**
 * List all routes for a zone
 */
export async function listRoutes(
  api: CloudflareApi,
  zoneId: string,
): Promise<CloudflareRouteResponse> {
  const response = await api.get(`/zones/${zoneId}/workers/routes`);

  if (!response.ok) {
    throw new CloudflareApiError(
      `Failed to list routes: ${response.statusText}`,
      response,
    );
  }

  return (await response.json()) as CloudflareRouteResponse;
}

import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createFlyApi, type FlyApiOptions } from "./api.ts";

/**
 * Properties for creating or updating a Fly.io app
 */
export interface AppProps extends FlyApiOptions {
  /**
   * Name of the app (must be unique across Fly.io)
   */
  name?: string;

  /**
   * Organization slug to create the app in
   */
  orgSlug?: string;

  /**
   * Primary region for the app
   * @default "iad" (Washington D.C.)
   */
  primaryRegion?: string;

  /**
   * Environment variables for the app
   */
  env?: Record<string, string | Secret>;
}

/**
 * A Fly.io application
 */
export interface App
  extends Resource<"fly::App">,
    Omit<AppProps, "apiToken"> {
  /**
   * The ID of the app
   */
  id: string;

  /**
   * The name of the app
   */
  name: string;

  /**
   * The hostname for accessing the app
   */
  hostname: string;

  /**
   * Organization information
   */
  organization: {
    slug: string;
    name?: string;
  };

  /**
   * App status
   */
  status: string;

  /**
   * Time at which the app was created
   */
  createdAt: string;

  /**
   * Time at which the app was last updated
   */
  updatedAt?: string;

  /**
   * App configuration
   */
  config?: {
    definition?: any;
    services?: any[];
  };
}

/**
 * Creates a Fly.io application.
 *
 * @example
 * ## Create a basic Fly.io app
 *
 * Create a simple app with default settings:
 *
 * ```ts
 * const app = await App("my-app", {
 *   name: "my-web-app"
 * });
 * ```
 *
 * @example
 * ## Create an app in a specific organization and region
 *
 * Create an app with organization and region configuration:
 *
 * ```ts
 * const app = await App("production-app", {
 *   name: "prod-web-app",
 *   orgSlug: "my-org",
 *   primaryRegion: "sea"
 * });
 * ```
 *
 * @example
 * ## Create an app with environment variables
 *
 * Create an app with environment configuration:
 *
 * ```ts
 * const app = await App("env-app", {
 *   name: "api-server",
 *   env: {
 *     NODE_ENV: "production",
 *     DATABASE_URL: alchemy.secret("postgresql://...")
 *   }
 * });
 * ```
 */
export const App = Resource(
  "fly::App",
  async function (
    this: Context<App>,
    id: string,
    props: AppProps,
  ): Promise<App> {
    const api = createFlyApi(props);
    const appName = props.name || id;

    if (this.phase === "delete") {
      try {
        // Check if the app exists before attempting to delete
        const getResponse = await api.get(`/apps/${appName}`);
        if (getResponse.ok) {
          const deleteResponse = await api.delete(`/apps/${appName}`);
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "deleting", "app", appName);
          }
        }
      } catch (error) {
        console.error(`Error deleting Fly.io app ${appName}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      let appData: any;

      // Check if app already exists
      const getResponse = await api.get(`/apps/${appName}`);
      
      if (getResponse.ok) {
        // App exists, update it if needed
        appData = await getResponse.json();
        
        // Update environment variables if provided
        if (props.env) {
          const secrets = Object.entries(props.env).map(([key, value]) => ({
            key,
            value: typeof value === "string" ? value : value.unencrypted,
          }));

          if (secrets.length > 0) {
            const secretsResponse = await api.post(
              `/apps/${appName}/secrets`,
              { secrets }
            );
            if (!secretsResponse.ok) {
              await handleApiError(secretsResponse, "updating secrets for", "app", appName);
            }
          }
        }

        // Get updated app data
        const updatedResponse = await api.get(`/apps/${appName}`);
        if (updatedResponse.ok) {
          appData = await updatedResponse.json();
        }
      } else if (getResponse.status === 404) {
        // App doesn't exist, create it
        const createPayload: any = {
          app_name: appName,
          org_slug: props.orgSlug,
        };

        if (props.primaryRegion) {
          createPayload.primary_region = props.primaryRegion;
        }

        const createResponse = await api.post("/apps", createPayload);
        
        if (!createResponse.ok) {
          await handleApiError(createResponse, "creating", "app", appName);
        }

        appData = await createResponse.json();

        // Set environment variables if provided
        if (props.env) {
          const secrets = Object.entries(props.env).map(([key, value]) => ({
            key,
            value: typeof value === "string" ? value : value.unencrypted,
          }));

          if (secrets.length > 0) {
            const secretsResponse = await api.post(
              `/apps/${appName}/secrets`,
              { secrets }
            );
            if (!secretsResponse.ok) {
              await handleApiError(secretsResponse, "setting secrets for", "app", appName);
            }
          }
        }
      } else {
        // Unexpected error during GET check
        await handleApiError(getResponse, "checking", "app", appName);
      }

      return this({
        id: appData.id || appData.name,
        name: appData.name,
        hostname: appData.hostname || `${appData.name}.fly.dev`,
        organization: {
          slug: appData.organization?.slug || props.orgSlug || "personal",
          name: appData.organization?.name,
        },
        status: appData.status || "pending",
        createdAt: appData.created_at,
        updatedAt: appData.updated_at,
        config: appData.config,
        // Pass through props (excluding sensitive data)
        orgSlug: props.orgSlug,
        primaryRegion: props.primaryRegion,
        env: props.env,
        baseUrl: props.baseUrl,
      });
    } catch (error) {
      console.error(`Error ${this.phase} Fly.io app '${appName}':`, error);
      throw error;
    }
  },
);
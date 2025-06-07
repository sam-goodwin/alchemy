import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createFlyApi, type FlyApiOptions } from "./api.ts";
import type { App } from "./app.ts";

/**
 * Properties for creating or updating a Fly.io secret
 */
export interface FlySecretProps extends FlyApiOptions {
  /**
   * App this secret belongs to (app name string or App resource)
   */
  app: string | App;

  /**
   * Secret name/key
   */
  name: string;

  /**
   * Secret value
   */
  value: Secret;
}

/**
 * A Fly.io application secret (environment variable)
 */
export interface FlySecret
  extends Resource<"fly::Secret">,
    Omit<FlySecretProps, "apiToken" | "value"> {
  /**
   * Secret name/key
   */
  name: string;

  /**
   * Secret digest (hash of the value)
   */
  digest: string;

  /**
   * Time at which the secret was created
   */
  created_at?: string;

  /**
   * Time at which the secret was last updated
   */
  updated_at?: string;
}

/**
 * Creates a Fly.io application secret for storing sensitive environment variables.
 *
 * @example
 * ## Create a basic secret
 *
 * Create a simple secret for your application:
 *
 * ```ts
 * const dbUrl = await FlySecret("database-url", {
 *   app: "my-app",
 *   name: "DATABASE_URL",
 *   value: alchemy.secret("postgresql://...")
 * });
 * ```
 *
 * @example
 * ## Create multiple secrets for an app
 *
 * Create multiple secrets for configuration:
 *
 * ```ts
 * const apiKey = await FlySecret("api-key", {
 *   app: myApp,
 *   name: "API_KEY",
 *   value: alchemy.secret("sk_test_...")
 * });
 *
 * const jwtSecret = await FlySecret("jwt-secret", {
 *   app: myApp,
 *   name: "JWT_SECRET",
 *   value: alchemy.secret("super-secret-key")
 * });
 * ```
 */
export const FlySecret = Resource(
  "fly::Secret",
  async function (
    this: Context<FlySecret>,
    id: string,
    props: FlySecretProps,
  ): Promise<FlySecret> {
    const api = createFlyApi(props);
    const appName = typeof props.app === "string" ? props.app : props.app.name;

    if (this.phase === "delete") {
      try {
        // Fly.io doesn't provide a direct API to delete individual secrets
        // The recommended approach is to unset the secret by setting it to null
        const deleteResponse = await api.post(
          `/apps/${appName}/secrets`,
          {
            secrets: [{ key: props.name, value: null }]
          }
        );
        
        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          console.warn(`Failed to delete secret ${props.name}: ${deleteResponse.status}`);
        }
      } catch (error) {
        console.error(`Error deleting Fly.io secret ${props.name}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      // Set or update the secret
      const secretsResponse = await api.post(
        `/apps/${appName}/secrets`,
        {
          secrets: [{ key: props.name, value: props.value.unencrypted }]
        }
      );

      if (!secretsResponse.ok) {
        await handleApiError(secretsResponse, "setting", "secret", props.name);
      }

      const secretsData = await secretsResponse.json();
      
      // Find our secret in the response
      const secretInfo = secretsData.secrets?.find((s: any) => s.key === props.name) || {
        key: props.name,
        digest: "unknown",
        created_at: new Date().toISOString(),
      };

      return this({
        name: props.name,
        digest: secretInfo.digest,
        created_at: secretInfo.created_at,
        updated_at: secretInfo.updated_at,
        // Pass through props (excluding sensitive data)
        app: props.app,
        baseUrl: props.baseUrl,
      });
    } catch (error) {
      console.error(`Error ${this.phase} Fly.io secret '${props.name}':`, error);
      throw error;
    }
  },
);
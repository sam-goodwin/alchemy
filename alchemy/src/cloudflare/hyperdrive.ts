import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { tryGetBinding } from "../runtime/bind.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import { createCloudflareApi, type CloudflareApiOptions } from "./api.ts";
import type { Bound } from "./bound.ts";

/**
 * Origin configuration for a PostgreSQL or MySQL database connection
 */
export interface HyperdriveOrigin {
  /**
   * Database name
   */
  database: string;

  /**
   * Database host
   */
  host: string;

  /**
   * Database password
   * Use alchemy.secret() to securely store this value
   */
  password: Secret;

  /**
   * Database port
   * @default 5432 for postgres, 3306 for mysql
   */
  port?: number;

  /**
   * Connection scheme
   * @default "postgres"
   */
  scheme?: "postgres" | "mysql";

  /**
   * Database user
   */
  user: string;
}

/**
 * Origin configuration for a database connection with access tokens
 */
export interface HyperdriveOriginWithAccess {
  /**
   * Access client ID
   */
  access_client_id: string;

  /**
   * Access client secret
   * Use alchemy.secret() to securely store this value
   */
  access_client_secret: Secret;

  /**
   * Database host
   */
  host: string;

  /**
   * Database name
   */
  database: string;

  /**
   * Database port
   * @default 5432 for postgres, 3306 for mysql
   */
  port?: number;

  /**
   * Connection scheme
   * @default "postgres"
   */
  scheme?: "postgres" | "mysql";

  /**
   * Database user
   */
  user: string;
}

/**
 * Caching configuration for Hyperdrive
 */
export interface HyperdriveCaching {
  /**
   * Whether caching is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * mTLS configuration for Hyperdrive
 */
export interface HyperdriveMtls {
  /**
   * CA certificate ID
   */
  ca_certificate_id?: string;

  /**
   * mTLS certificate ID
   */
  mtls_certificate_id?: string;

  /**
   * SSL mode
   * @default "verify-full"
   */
  sslmode?: "verify-ca" | "verify-full";
}

/**
 * Properties for creating or updating a Cloudflare Hyperdrive.
 */
export interface HyperdriveProps extends CloudflareApiOptions {
  /**
   * Name of the Hyperdrive configuration
   */
  name: string;

  /**
   * Database connection origin configuration
   */
  origin: HyperdriveOrigin | HyperdriveOriginWithAccess;

  /**
   * Caching configuration
   */
  caching?: HyperdriveCaching;

  /**
   * mTLS configuration
   */
  mtls?: HyperdriveMtls;

  /**
   * UUID of the hyperdrive (only used for update/delete operations)
   * This is provided by Cloudflare and is different from the resource ID
   * @internal
   */
  hyperdriveId?: string;
}

/**
 * Output returned after Cloudflare Hyperdrive creation/update.
 * IMPORTANT: The interface name MUST match the exported resource name.
 */
export interface HyperdriveResource
  extends Resource<"cloudflare::Hyperdrive">,
    Omit<HyperdriveProps, "origin"> {
  /**
   * The ID of the resource
   */
  id: string;

  /**
   * The Cloudflare-generated UUID of the hyperdrive
   */
  hyperdriveId: string;

  /**
   * Database connection origin configuration
   */
  origin: HyperdriveOrigin | HyperdriveOriginWithAccess;

  /**
   * Resource type identifier for binding.
   * @internal
   */
  type: "hyperdrive";
}

export type Hyperdrive = HyperdriveResource & Bound<HyperdriveResource>;

/**
 * Represents a Cloudflare Hyperdrive configuration.
 *
 * @example
 * // Create a basic Hyperdrive connection to a PostgreSQL database
 * const basicHyperdrive = await Hyperdrive("my-postgres-db", {
 *   name: "my-postgres-db",
 *   origin: {
 *     database: "postgres",
 *     host: "database.example.com",
 *     password: alchemy.secret("your-password"),
 *     port: 5432,
 *     user: "postgres"
 *   }
 * });
 *
 * @example
 * // Create a basic Hyperdrive connection to a MySQL database
 * const mysqlHyperdrive = await Hyperdrive("my-mysql-db", {
 *   name: "my-mysql-db",
 *   origin: {
 *     database: "mydb",
 *     host: "mysql.example.com",
 *     password: alchemy.secret("your-password"),
 *     port: 3306,
 *     scheme: "mysql",
 *     user: "mysql_user"
 *   }
 * });
 *
 * @example
 * // Create a Hyperdrive with caching disabled
 * const noCacheHyperdrive = await Hyperdrive("no-cache-db", {
 *   name: "no-cache-db",
 *   origin: {
 *     database: "postgres",
 *     host: "database.example.com",
 *     password: alchemy.secret(process.env.DB_PASSWORD),
 *     port: 5432,
 *     user: "postgres"
 *   },
 *   caching: {
 *     disabled: true
 *   }
 * });
 *
 * @example
 * // Create a Hyperdrive with mTLS configuration
 * const mtlsHyperdrive = await Hyperdrive("secure-db", {
 *   name: "secure-db",
 *   origin: {
 *     database: "postgres",
 *     host: "database.example.com",
 *     password: alchemy.secret(process.env.DB_PASSWORD),
 *     port: 5432,
 *     user: "postgres"
 *   },
 *   mtls: {
 *     ca_certificate_id: "00000000-0000-0000-0000-0000000000",
 *     mtls_certificate_id: "00000000-0000-0000-0000-0000000000",
 *     sslmode: "verify-full"
 *   }
 * });
 *
 * @example
 * // Create a Hyperdrive with access client credentials
 * const accessHyperdrive = await Hyperdrive("access-db", {
 *   name: "access-db",
 *   origin: {
 *     database: "postgres",
 *     host: "database.example.com",
 *     access_client_id: "client-id",
 *     access_client_secret: alchemy.secret(process.env.ACCESS_CLIENT_SECRET),
 *     port: 5432,
 *     user: "postgres"
 *   }
 * });
 */
export async function Hyperdrive(
  name: string,
  props: HyperdriveProps,
): Promise<Hyperdrive> {
  const resource = await HyperdriveResource(name, props);
  return {
    ...resource,
    ...tryGetBinding(resource),
  } as Hyperdrive;
}

const HyperdriveResource = Resource(
  "cloudflare::Hyperdrive",
  async function (
    this: Context<HyperdriveResource>,
    id: string,
    props: HyperdriveProps,
  ): Promise<HyperdriveResource> {
    const api = await createCloudflareApi(props);
    const configsPath = `/accounts/${api.accountId}/hyperdrive/configs`;

    // For create operations, we don't have a hyperdriveId yet
    // For update/delete operations, we need to use the hyperdriveId from props or output
    const hyperdriveId = props.hyperdriveId || this.output?.hyperdriveId;
    const configPath = hyperdriveId
      ? `${configsPath}/${hyperdriveId}`
      : `${configsPath}`;

    if (this.phase === "delete") {
      if (!hyperdriveId) {
        logger.warn(`No hyperdriveId found for ${id}, skipping delete`);
        return this.destroy();
      }

      try {
        const deleteResponse = await api.delete(configPath);
        // Only swallow 404 Not Found errors, all other errors should be handled
        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          await handleApiError(deleteResponse, "delete", "hyperdrive", id);
        }
      } catch (error) {
        logger.error(`Error deleting Hyperdrive ${id}:`, error);
        throw error;
      }
      return this.destroy();
    }

    let response: Response | undefined;
    let apiResource: any;

    // Prepare request body with unwrapped secrets
    const requestBody = prepareRequestBody(props);

    try {
      if (this.phase === "update" && hyperdriveId) {
        // Update existing hyperdrive
        response = await api.put(configPath, requestBody);
      } else {
        // Create new hyperdrive
        if (hyperdriveId) {
          // If we have a hyperdriveId but we're in create phase, it could be because
          // the resource exists but wasn't in state. Do a GET to check.
          const getResponse = await api.get(configPath);
          if (getResponse.status === 200) {
            // Hyperdrive exists, update it
            logger.log(
              `Hyperdrive '${id}' already exists. Updating existing resource.`,
            );
            response = await api.put(configPath, requestBody);
          } else if (getResponse.status === 404) {
            // Hyperdrive doesn't exist, create new
            response = await api.post(configsPath, {
              ...requestBody,
              // Ensure name is set correctly if not already set
              name: props.name || id,
            });
          } else {
            // Unexpected error during GET check
            await handleApiError(getResponse, "get", "hyperdrive", id);
          }
        } else {
          // No hyperdriveId, create new
          response = await api.post(configsPath, {
            ...requestBody,
            // Ensure name is set correctly if not already set
            name: props.name || id,
          });
        }
      }

      if (!response?.ok) {
        const action = this.phase === "update" ? "update" : "create";
        await handleApiError(response!, action, "hyperdrive", id);
      }

      const data: { result: Record<string, any> } = await response!.json();
      apiResource = data.result;
    } catch (error) {
      logger.error(`Error ${this.phase} Hyperdrive '${id}':`, error);
      throw error;
    }

    // Construct the output object from API response and props
    return this({
      id,
      hyperdriveId: apiResource.id, // Store the Cloudflare-assigned UUID
      name: apiResource.name,
      origin: props.origin, // Keep the original origin with secrets
      caching: apiResource.caching,
      mtls: apiResource.mtls,
      type: "hyperdrive",
    });
  },
);

/**
 * Prepare the request body by unwrapping secret values
 */
function prepareRequestBody(props: HyperdriveProps): any {
  const requestBody: any = { ...props };

  // Remove internal props
  delete requestBody.hyperdriveId;

  // Deep clone and unwrap secrets in the origin object
  if ("password" in props.origin) {
    // Regular origin with password
    requestBody.origin = {
      ...props.origin,
      password: props.origin.password.unencrypted,
      scheme: props.origin.scheme ?? "postgres",
    };
  } else if ("access_client_secret" in props.origin) {
    // Origin with access client secret
    requestBody.origin = {
      ...props.origin,
      access_client_secret: props.origin.access_client_secret.unencrypted,
    };
  }

  return requestBody;
}

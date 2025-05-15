import { alchemy } from "../alchemy.js";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { UpstashApi } from "./api.js";
import { UpstashError } from "./error.js";

/**
 * Available regions for Upstash Redis databases
 */
export type UpstashRegion =
  | "us-east-1"
  | "us-west-1"
  | "us-west-2"
  | "eu-west-1"
  | "eu-central-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-northeast-1"
  | "sa-east-1";

/**
 * Properties for creating or updating an UpstashRedis database
 */
export interface UpstashRedisProps {
  /**
   * Name of the database
   */
  name: string;

  /**
   * Primary region for the database
   */
  primaryRegion: UpstashRegion;

  /**
   * Read regions for the database
   */
  readRegions?: UpstashRegion[];

  /**
   * Monthly budget for the database
   */
  budget?: number;

  /**
   * Whether to enable eviction for the database
   */
  eviction?: boolean;

  /**
   * API key to use (overrides environment variable)
   */
  apiKey?: Secret;

  /**
   * Email to use (overrides environment variable)
   */
  email?: string;
}

/**
 * Output returned after UpstashRedis creation/update
 */
export interface UpstashRedis
  extends Resource<"upstash::Redis">,
    UpstashRedisProps {
  /**
   * ID of the database
   */
  id: string;

  /**
   * Type of the database in terms of pricing model
   */
  databaseType: string;

  /**
   * Region where database is hosted
   */
  region: "global";

  /**
   * Database port for clients to connect
   */
  port: number;

  /**
   * Creation time of the database as Unix time
   */
  createdAt: number;

  /**
   * State of database (active or deleted)
   */
  state: string;

  /**
   * Password of the database
   */
  password: Secret;

  /**
   * Email or team id of the owner of the database
   */
  userEmail: string;

  /**
   * Endpoint URL of the database
   */
  endpoint: string;

  /**
   * Whether TLS is enabled
   */
  tls: boolean;

  /**
   * REST token for the database
   */
  restToken: Secret;

  /**
   * Read-only REST token for the database
   */
  readOnlyRestToken: Secret;
}

/**
 * Create and manage Upstash Redis databases
 *
 * @example
 * // Create a basic Redis database in us-east-1:
 * const redis = await UpstashRedis("my-redis", {
 *   name: "my-redis",
 *   primaryRegion: "us-east-1"
 * });
 *
 * @example
 * // Create a Redis database with read replicas:
 * const redis = await UpstashRedis("my-redis", {
 *   name: "my-redis",
 *   primaryRegion: "us-east-1",
 *   readRegions: ["us-west-1", "us-west-2"]
 * });
 *
 * @example
 * // Create a Redis database with a monthly budget:
 * const redis = await UpstashRedis("my-redis", {
 *   name: "my-redis",
 *   primaryRegion: "us-east-1",
 *   budget: 100
 * });
 */
export const UpstashRedis = Resource(
  "upstash::Redis",
  async function (
    this: Context<UpstashRedis>,
    _id: string,
    props: UpstashRedisProps,
  ): Promise<UpstashRedis> {
    const api = new UpstashApi({
      apiKey: props.apiKey,
      email: props.email,
    });

    if (this.phase === "delete") {
      await deleteRedisDatabase(api, this.output.id);
      return this.destroy();
    }

    const eviction = props.eviction ?? false;

    // @ts-ignore This is overridden during update/create
    let database: UpstashDatabaseResponse = {};

    if (this.phase === "update") {
      // Update name if changed
      if (props.name !== this.output.name) {
        await renameRedisDatabase(api, this.output.id, props.name);
      }

      // Update read regions if changed
      if (
        JSON.stringify(props.readRegions) !==
        JSON.stringify(this.output.readRegions)
      ) {
        await updateRedisReadRegions(
          api,
          this.output.id,
          props.readRegions || [],
        );
      }

      // Handle eviction setting if changed
      if (
        props.eviction !== undefined &&
        props.eviction !== this.output.eviction
      ) {
        await setRedisEviction(api, this.output.id, props.eviction);
      }

      // Get updated database info
      database = await getRedisDatabase(api, this.output.id);
    }

    if (this.phase === "create") {
      database = await createRedisDatabase(api, {
        budget: props.budget,
        name: props.name,
        primary_region: props.primaryRegion,
        read_regions: props.readRegions,
        region: "global",
        tls: true,
      });

      if (eviction) {
        await setRedisEviction(api, database.database_id, eviction);
      }
    }

    return this.create({
      id: database.database_id,
      name: database.database_name,
      databaseType: database.database_type,
      region: database.region,
      port: database.port,
      createdAt: database.creation_time,
      state: database.state,
      password: alchemy.secret(database.password),
      userEmail: database.user_email,
      endpoint: database.endpoint,
      tls: database.tls,
      restToken: alchemy.secret(database.rest_token),
      readOnlyRestToken: alchemy.secret(database.read_only_rest_token),
      primaryRegion: props.primaryRegion,
      readRegions: props.readRegions,
      budget: props.budget,
      eviction: props.eviction ?? false,
    });
  },
);

/**
 * Response from Upstash API for database operations
 */
interface UpstashDatabaseResponse {
  database_id: string;
  database_name: string;
  database_type: string;
  region: "global";
  type: string;
  port: number;
  creation_time: number;
  state: string;
  password: string;
  user_email: string;
  endpoint: string;
  tls: boolean;
  rest_token: string;
  read_only_rest_token: string;
  eviction: boolean;
  read_regions?: UpstashRegion[];
}

/**
 * Parameters for creating a Redis database
 */
export interface CreateRedisDatabaseParams {
  name: string;
  primary_region: UpstashRegion;
  read_regions?: UpstashRegion[];
  region: "global";
  tls: boolean;
  budget?: number;
}

/**
 * Delete a Redis database
 *
 * @param api Upstash API client
 * @param databaseId ID of the database to delete
 */
export async function deleteRedisDatabase(
  api: UpstashApi,
  databaseId: string,
): Promise<void> {
  const response = await api.delete(`/redis/database/${databaseId}`);

  if (!response.ok && response.status !== 404) {
    throw new UpstashError(
      `Error deleting database: ${response.statusText}`,
      response.status,
      response,
    );
  }
}

/**
 * Rename a Redis database
 *
 * @param api Upstash API client
 * @param databaseId ID of the database to rename
 * @param name New name for the database
 */
export async function renameRedisDatabase(
  api: UpstashApi,
  databaseId: string,
  name: string,
): Promise<void> {
  const response = await api.post(`/redis/rename/${databaseId}`, {
    name,
  });

  if (!response.ok) {
    throw new UpstashError(
      `API error updating name: ${response.statusText}`,
      response.status,
      response,
    );
  }
}

/**
 * Update read regions for a Redis database
 *
 * @param api Upstash API client
 * @param databaseId ID of the database to update
 * @param readRegions Array of read regions
 */
export async function updateRedisReadRegions(
  api: UpstashApi,
  databaseId: string,
  readRegions: UpstashRegion[],
): Promise<void> {
  const response = await api.post(`/redis/update-regions/${databaseId}`, {
    read_regions: readRegions,
  });

  if (!response.ok) {
    throw new UpstashError(
      `API error updating regions: ${response.statusText}`,
      response.status,
      response,
    );
  }
}

/**
 * Enable or disable eviction for a Redis database
 *
 * @param api Upstash API client
 * @param databaseId ID of the database to update
 * @param enable Whether to enable or disable eviction
 */
export async function setRedisEviction(
  api: UpstashApi,
  databaseId: string,
  enable: boolean,
): Promise<void> {
  const evictionEndpoint = enable ? "enable-eviction" : "disable-eviction";

  const response = await api.post(
    `/redis/${evictionEndpoint}/${databaseId}`,
    {},
  );

  if (!response.ok) {
    console.warn(
      `API error updating eviction (status: ${response.status}): ${response.statusText}. (Eviction may already be set)`,
    );
  }
}

/**
 * Get information about a Redis database
 *
 * @param api Upstash API client
 * @param databaseId ID of the database to get information about
 * @returns Database information
 */
export async function getRedisDatabase(
  api: UpstashApi,
  databaseId: string,
): Promise<UpstashDatabaseResponse> {
  const response = await api.get(`/redis/database/${databaseId}`);

  if (!response.ok) {
    throw new UpstashError(
      `API error: ${response.statusText}`,
      response.status,
      response,
    );
  }

  return await response.json();
}

/**
 * Create a new Redis database
 *
 * @param api Upstash API client
 * @param params Parameters for the new database
 * @returns Created database information
 */
export async function createRedisDatabase(
  api: UpstashApi,
  params: CreateRedisDatabaseParams,
): Promise<UpstashDatabaseResponse> {
  const response = await api.post("/redis/database", params);

  if (!response.ok) {
    throw new UpstashError(
      `API error creating database: ${response.statusText}`,
      response.status,
      response,
    );
  }

  return await response.json();
}

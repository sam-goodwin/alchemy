import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { sleep } from "../util/sleep.ts";
import {
  RailwayApiError,
  createRailwayApi,
  isResourceNotFoundError,
  type RailwayApiOptions,
} from "./api.ts";
import type { Environment } from "./environment.ts";
import type { Project } from "./project.ts";

/**
 * Railway plugin types
 */
export type PluginType =
  | "postgresql"
  | "mysql"
  | "redis"
  | "mongodb"
  | "minio"
  | "elasticsearch"
  | "memcached"
  | "rabbitmq";

/**
 * Plugin configuration options
 */
export interface PluginConfig {
  /**
   * PostgreSQL specific configuration
   */
  postgresql?: {
    /**
     * PostgreSQL version
     * @default "15"
     */
    version?: "13" | "14" | "15" | "16";

    /**
     * Database name
     * @default "railway"
     */
    database?: string;
  };

  /**
   * MySQL specific configuration
   */
  mysql?: {
    /**
     * MySQL version
     * @default "8.0"
     */
    version?: "5.7" | "8.0";

    /**
     * Database name
     * @default "railway"
     */
    database?: string;
  };

  /**
   * Redis specific configuration
   */
  redis?: {
    /**
     * Redis version
     * @default "7"
     */
    version?: "6" | "7";
  };

  /**
   * MongoDB specific configuration
   */
  mongodb?: {
    /**
     * MongoDB version
     * @default "6.0"
     */
    version?: "5.0" | "6.0" | "7.0";

    /**
     * Database name
     * @default "railway"
     */
    database?: string;
  };
}

/**
 * Properties for creating or updating a Railway plugin
 */
export interface PluginProps extends RailwayApiOptions {
  /**
   * Name of the plugin
   */
  name: string;

  /**
   * Type of plugin to create
   */
  type: PluginType;

  /**
   * Project this plugin belongs to
   */
  project: string | Project;

  /**
   * Environment this plugin belongs to
   */
  environment: string | Environment;

  /**
   * Plugin-specific configuration
   */
  config?: PluginConfig;

  /**
   * Environment variables for the plugin
   */
  variables?: Record<string, string>;
}

/**
 * A Railway plugin (managed database or service)
 */
export interface Plugin extends Resource<"railway::plugin"> {
  /**
   * Plugin ID
   */
  pluginId: string;

  /**
   * Plugin name
   */
  name: string;

  /**
   * Plugin type
   */
  type: PluginType;

  /**
   * Project ID this plugin belongs to
   */
  projectId: string;

  /**
   * Environment ID this plugin belongs to
   */
  environmentId: string;

  /**
   * Plugin status
   */
  status: "PROVISIONING" | "AVAILABLE" | "FAILED" | "REMOVING";

  /**
   * Connection details
   */
  connection?: {
    /**
     * Connection URL
     */
    url?: string;

    /**
     * Host
     */
    host?: string;

    /**
     * Port
     */
    port?: number;

    /**
     * Database name
     */
    database?: string;

    /**
     * Username
     */
    username?: string;

    /**
     * Password
     */
    password?: string;
  };

  /**
   * Time at which the plugin was created
   */
  createdAt: string;

  /**
   * Time at which the plugin was updated
   */
  updatedAt: string;
}

/**
 * Railway plugin from API response
 */
interface RailwayPluginResponse {
  id: string;
  name: string;
  type: string;
  projectId: string;
  environmentId: string;
  status: string;
  connection?: {
    url?: string;
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Create or update a Railway plugin
 *
 * @example
 * ## PostgreSQL Database
 *
 * Create a PostgreSQL database plugin.
 *
 * ```ts
 * const project = await Project("my-app", { name: "My App" });
 * const environment = await Environment("production", {
 *   name: "production",
 *   project: project
 * });
 *
 * const database = await Plugin("postgres", {
 *   name: "postgres",
 *   type: "postgresql",
 *   project: project,
 *   environment: environment,
 *   config: {
 *     postgresql: {
 *       version: "15",
 *       database: "myapp"
 *     }
 *   }
 * });
 * ```
 *
 * @example
 * ## Redis Cache
 *
 * Create a Redis cache plugin.
 *
 * ```ts
 * const cache = await Plugin("redis", {
 *   name: "redis-cache",
 *   type: "redis",
 *   project: "project-id",
 *   environment: "environment-id",
 *   config: {
 *     redis: {
 *       version: "7"
 *     }
 *   }
 * });
 * ```
 */
export const Plugin = Resource(
  "railway::plugin",
  async function (
    this: Context<Plugin>,
    id: string,
    props: PluginProps,
  ): Promise<Plugin> {
    const api = createRailwayApi(props);
    const projectId =
      typeof props.project === "string"
        ? props.project
        : props.project.projectId;
    const environmentId =
      typeof props.environment === "string"
        ? props.environment
        : props.environment.environmentId;

    // Handle delete phase
    if (this.phase === "delete") {
      if (this.output?.pluginId) {
        await deletePlugin(api, this.output.pluginId);
      }
      return this.destroy();
    }

    // Handle update phase
    if (this.phase === "update") {
      logger.log(`Updating existing Railway plugin: ${props.name}`);
      const plugin = await updatePlugin(api, this.output.pluginId, props);
      return waitForPluginProvisioning(api, plugin.pluginId, plugin);
    }

    // Handle create phase
    if (this.phase === "create") {
      logger.log(`Creating new Railway plugin: ${props.name}`);
      const plugin = await createPlugin(api, projectId, environmentId, props);
      return waitForPluginProvisioning(api, plugin.pluginId, plugin);
    }

    // Initial creation - check if plugin already exists
    const existingPlugin = await findExistingPlugin(
      api,
      projectId,
      environmentId,
      props.name,
    );

    if (existingPlugin) {
      logger.log(`Found existing Railway plugin: ${props.name}`);
      const plugin = await updatePlugin(api, existingPlugin.id, props);
      return waitForPluginProvisioning(api, plugin.pluginId, plugin);
    } else {
      logger.log(`Creating new Railway plugin: ${props.name}`);
      const plugin = await createPlugin(api, projectId, environmentId, props);
      return waitForPluginProvisioning(api, plugin.pluginId, plugin);
    }
  },
);

/**
 * Find an existing plugin by name within a project environment
 */
async function findExistingPlugin(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  name: string,
): Promise<RailwayPluginResponse | null> {
  try {
    const query = `
      query findPlugin($projectId: String!, $environmentId: String!) {
        project(id: $projectId) {
          environment(id: $environmentId) {
            plugins {
              edges {
                node {
                  id
                  name
                  type
                  projectId
                  environmentId
                  status
                  connection {
                    url
                    host
                    port
                    database
                    username
                    password
                  }
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
    `;

    const response = await api.query<{
      project: {
        environment: {
          plugins: {
            edges: Array<{
              node: RailwayPluginResponse;
            }>;
          };
        };
      };
    }>(query, { projectId, environmentId });

    const plugin = response.project.environment.plugins.edges.find(
      (edge) => edge.node.name === name,
    );

    return plugin?.node || null;
  } catch (error) {
    if (error instanceof RailwayApiError) {
      logger.warn(`Failed to find existing plugin: ${error.message}`);
      return null;
    }
    throw error;
  }
}

/**
 * Create a new plugin
 */
async function createPlugin(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  props: PluginProps,
): Promise<Plugin> {
  const mutation = `
    mutation createPlugin($input: PluginCreateInput!) {
      pluginCreate(input: $input) {
        id
        name
        type
        projectId
        environmentId
        status
        connection {
          url
          host
          port
          database
          username
          password
        }
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    input: {
      name: props.name,
      type: props.type.toUpperCase(),
      projectId,
      environmentId,
      config: props.config,
      variables: props.variables,
    },
  };

  const response = await api.mutate<{
    pluginCreate: RailwayPluginResponse;
  }>(mutation, variables);

  return mapToPlugin(response.pluginCreate);
}

/**
 * Update an existing plugin
 */
async function updatePlugin(
  api: ReturnType<typeof createRailwayApi>,
  pluginId: string,
  props: PluginProps,
): Promise<Plugin> {
  const mutation = `
    mutation updatePlugin($id: String!, $input: PluginUpdateInput!) {
      pluginUpdate(id: $id, input: $input) {
        id
        name
        type
        projectId
        environmentId
        status
        connection {
          url
          host
          port
          database
          username
          password
        }
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    id: pluginId,
    input: {
      name: props.name,
      config: props.config,
      variables: props.variables,
    },
  };

  const response = await api.mutate<{
    pluginUpdate: RailwayPluginResponse;
  }>(mutation, variables);

  return mapToPlugin(response.pluginUpdate);
}

/**
 * Wait for plugin provisioning to complete
 */
async function waitForPluginProvisioning(
  api: ReturnType<typeof createRailwayApi>,
  pluginId: string,
  plugin: Plugin,
  maxAttempts = 60,
): Promise<Plugin> {
  logger.log(`Waiting for plugin provisioning to complete: ${pluginId}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const currentPlugin = await getPluginStatus(api, pluginId);

    if (currentPlugin.status === "AVAILABLE") {
      logger.log(`Plugin provisioning completed successfully: ${pluginId}`);
      return { ...plugin, ...currentPlugin };
    }

    if (currentPlugin.status === "FAILED") {
      throw new Error(`Plugin provisioning failed: ${pluginId}`);
    }

    logger.log(
      `Plugin provisioning in progress (${currentPlugin.status}), waiting...`,
    );
    await sleep(5000); // Wait 5 seconds between checks
  }

  throw new Error(
    `Plugin provisioning timed out after ${maxAttempts * 5} seconds`,
  );
}

/**
 * Get current plugin status
 */
async function getPluginStatus(
  api: ReturnType<typeof createRailwayApi>,
  pluginId: string,
): Promise<Pick<Plugin, "status" | "connection">> {
  const query = `
    query getPluginStatus($pluginId: String!) {
      plugin(id: $pluginId) {
        status
        connection {
          url
          host
          port
          database
          username
          password
        }
      }
    }
  `;

  const response = await api.query<{
    plugin: {
      status: string;
      connection?: {
        url?: string;
        host?: string;
        port?: number;
        database?: string;
        username?: string;
        password?: string;
      };
    };
  }>(query, { pluginId });

  return {
    status: response.plugin.status as Plugin["status"],
    connection: response.plugin.connection,
  };
}

/**
 * Map Railway API response to Plugin resource
 */
function mapToPlugin(plugin: RailwayPluginResponse): Plugin {
  return {
    pluginId: plugin.id,
    name: plugin.name,
    type: plugin.type.toLowerCase() as PluginType,
    projectId: plugin.projectId,
    environmentId: plugin.environmentId,
    status: plugin.status as Plugin["status"],
    connection: plugin.connection,
    createdAt: plugin.createdAt,
    updatedAt: plugin.updatedAt,
  } as Plugin;
}

/**
 * Delete a Railway plugin
 */
export async function deletePlugin(
  api: ReturnType<typeof createRailwayApi>,
  pluginId: string,
): Promise<void> {
  const mutation = `
    mutation deletePlugin($id: String!) {
      pluginDelete(id: $id)
    }
  `;

  try {
    logger.log(`Attempting to delete Railway plugin: ${pluginId}`);
    const result = await api.mutate(mutation, { id: pluginId });
    logger.log("Delete mutation result:", result);
    logger.log(`Successfully deleted Railway plugin: ${pluginId}`);
  } catch (error) {
    // Check if it's a "not found" error - these are safe to ignore during deletion
    if (isResourceNotFoundError(error)) {
      logger.log(
        `Railway plugin ${pluginId} was already deleted or doesn't exist`,
      );
      return; // No-op for not found errors
    }

    // Re-throw all other errors
    logger.error(`Failed to delete Railway plugin ${pluginId}:`, error);
    throw error;
  }
}

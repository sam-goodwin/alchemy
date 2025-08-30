import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { PlanetScaleProps } from "./api/client.gen.ts";
import { PlanetScaleClient } from "./api/client.gen.ts";
import {
  ensureProductionBranchClusterSize,
  type PlanetScaleClusterSize,
  sanitizeClusterSize,
  waitForDatabaseReady,
} from "./utils.ts";

interface BaseDatabaseProps extends PlanetScaleProps {
  /**
   * The name of the database
   *
   * @default ${app}-${stage}-${id}
   */
  name?: string;

  /**
   * The organization ID where the database will be created
   */
  organizationId: string;

  /**
   * Whether to adopt the database if it already exists in Planetscale
   */
  adopt?: boolean;

  /**
   * The region where the database will be created (create only)
   */
  region?: {
    /**
     * The slug identifier of the region
     */
    slug: string;
  };

  /**
   * Whether to require approval for deployments
   */
  requireApprovalForDeploy?: boolean;

  /**
   * Whether to allow data branching
   */
  allowDataBranching?: boolean;

  /**
   * Whether to enable automatic migrations
   */
  automaticMigrations?: boolean;

  /**
   * Whether to restrict branch creation to the same region as database
   */
  restrictBranchRegion?: boolean;

  /**
   * Whether to collect full queries from the database
   */
  insightsRawQueries?: boolean;

  /**
   * Whether web console can be used on production branch
   */
  productionBranchWebConsole?: boolean;

  /**
   * The default branch of the database
   */
  defaultBranch?: string;

  /**
   * Migration framework to use on the database
   */
  migrationFramework?: string;

  /**
   * Name of table to use as migration table
   */
  migrationTableName?: string;

  /**
   * The database cluster size (required)
   */
  clusterSize: PlanetScaleClusterSize;

  /**
   * The engine kind for the database
   * @default "mysql"
   */
  kind?: "mysql" | "postgresql";

  /**
   * The CPU architecture for the database. Only available for PostgreSQL databases.
   */
  arch?: "x86" | "arm";
}

/**
 * Properties for creating or updating a PlanetScale Database
 */
export type DatabaseProps = BaseDatabaseProps &
  (
    | {
        kind?: "mysql";
        arch?: undefined;
      }
    | {
        kind: "postgresql";
        arch?: "x86" | "arm";
      }
  );

/**
 * Represents a PlanetScale Database
 */
export type Database = Resource<"planetscale::Database"> &
  DatabaseProps & {
    /**
     * The unique identifier of the database
     */
    id: string;

    /**
     * The name of the database
     */
    name: string;

    /**
     * The current state of the database
     */
    state: string;

    /**
     * The default branch name
     */
    defaultBranch: string;

    /**
     * The plan type
     */
    plan: string;

    /**
     * Time at which the database was created
     */
    createdAt: string;

    /**
     * Time at which the database was last updated
     */
    updatedAt: string;

    /**
     * HTML URL to access the database
     */
    htmlUrl: string;
  };

/**
 * Create, manage and delete PlanetScale databases
 *
 * @example
 * // Create a basic database in a specific organization
 * const db = await Database("my-app-db", {
 *   name: "my-app-db",
 *   organizationId: "my-org",
 *   clusterSize: "PS_10"
 * });
 *
 * @example
 * // Create a database with specific region and settings
 * const db = await Database("my-app-db", {
 *   name: "my-app-db",
 *   organizationId: "my-org",
 *   region: {
 *     slug: "us-east"
 *   },
 *   clusterSize: "PS_10",
 *   requireApprovalForDeploy: true,
 *   allowDataBranching: true,
 *   automaticMigrations: true
 * });
 *
 * @example
 * // Create a database with custom API key
 * const db = await Database("my-app-db", {
 *   name: "my-app-db",
 *   organizationId: "my-org",
 *   apiKey: alchemy.secret(process.env.CUSTOM_PLANETSCALE_TOKEN),
 *   clusterSize: "PS_10"
 * });
 */
export const Database = Resource(
  "planetscale::Database",
  async function (
    this: Context<Database>,
    id: string,
    props: DatabaseProps,
  ): Promise<Database> {
    const api = new PlanetScaleClient(props);

    const databaseName =
      props.name ?? this.output?.name ?? this.scope.createPhysicalName(id);
    const clusterSize = sanitizeClusterSize({
      size: props.clusterSize,
      kind: props.kind,
      arch: props.arch,
      region: props.region?.slug,
    });

    if (this.phase === "update" && this.output.name !== databaseName) {
      await api.organizations.databases.patch({
        path: {
          organization: props.organizationId,
          name: this.output.name,
        },
        body: { new_name: databaseName },
      });
    }

    if (this.phase === "delete") {
      if (this.output?.name) {
        const response = await api.organizations.databases.delete({
          path: {
            organization: props.organizationId,
            name: this.output.name,
          },
          result: "full",
        });

        if (response.error && response.error.status !== 404) {
          throw new Error(`Failed to delete database "${this.output.name}"`, {
            cause: response.error,
          });
        }
      }
      return this.destroy();
    }

    // Check if database exists
    const getResponse = await api.organizations.databases.get({
      path: {
        organization: props.organizationId,
        name: databaseName,
      },
      result: "full",
    });
    if (this.phase === "update" || (props.adopt && getResponse.data)) {
      if (!getResponse.data) {
        throw new Error(`Database "${databaseName}" not found`, {
          cause: getResponse.error,
        });
      }
      // Update database settings
      // If updating to a non-'main' default branch, create it first
      if (props.defaultBranch && props.defaultBranch !== "main") {
        const branchResponse = await api.organizations.databases.branches.get({
          path: {
            organization: props.organizationId,
            database: databaseName,
            name: props.defaultBranch,
          },
          result: "full",
        });
        if (!branchResponse.data) {
          await waitForDatabaseReady(api, props.organizationId, databaseName);
        }
        if (branchResponse.error && branchResponse.error.status === 404) {
          // Create the branch
          await api.organizations.databases.branches.post({
            path: {
              organization: props.organizationId,
              database: databaseName,
            },
            body: {
              name: props.defaultBranch,
              parent_branch: "main",
            },
          });
        }
      }

      const updateResponse = await api.organizations.databases.patch({
        path: {
          organization: props.organizationId,
          name: databaseName,
        },
        body: {
          automatic_migrations: props.automaticMigrations,
          migration_framework: props.migrationFramework,
          migration_table_name: props.migrationTableName,
          require_approval_for_deploy: props.requireApprovalForDeploy,
          restrict_branch_region: props.restrictBranchRegion,
          allow_data_branching: props.allowDataBranching,
          insights_raw_queries: props.insightsRawQueries,
          production_branch_web_console: props.productionBranchWebConsole,
          default_branch: props.defaultBranch,
        },
      });

      await ensureProductionBranchClusterSize(
        api,
        props.organizationId,
        databaseName,
        props.defaultBranch || "main",
        updateResponse.kind,
        clusterSize,
      );

      return this({
        ...props,
        id: updateResponse.id,
        name: databaseName,
        state: updateResponse.state,
        defaultBranch: updateResponse.default_branch,
        plan: updateResponse.plan,
        createdAt: updateResponse.created_at,
        updatedAt: updateResponse.updated_at,
        htmlUrl: updateResponse.html_url,
      });
    }

    if (getResponse.data) {
      throw new Error(`Database with name "${databaseName}" already exists`);
    }

    // Create new database
    let data = await api.organizations.databases.post({
      path: {
        organization: props.organizationId,
      },
      body: {
        name: databaseName,
        region: props.region?.slug,
        kind: props.kind,
        cluster_size: clusterSize,
      },
    });

    // These settings can't be set on creation, so we need to patch them after creation.
    data = await api.organizations.databases.patch({
      path: {
        organization: props.organizationId,
        name: databaseName,
      },
      body: {
        require_approval_for_deploy: props.requireApprovalForDeploy,
        allow_data_branching: props.allowDataBranching,
        automatic_migrations: props.automaticMigrations,
        restrict_branch_region: props.restrictBranchRegion,
        insights_raw_queries: props.insightsRawQueries,
        production_branch_web_console: props.productionBranchWebConsole,
        migration_framework: props.migrationFramework,
        migration_table_name: props.migrationTableName,
      },
    });

    // If a non-'main' default branch is specified, create it
    if (props.defaultBranch && props.defaultBranch !== "main") {
      await waitForDatabaseReady(api, props.organizationId, databaseName);

      // Check if branch exists
      const branchResponse = await api.organizations.databases.branches.get({
        path: {
          organization: props.organizationId,
          database: databaseName,
          name: props.defaultBranch,
        },
        result: "full",
      });

      if (branchResponse.error && branchResponse.error.status === 404) {
        // Create the branch
        await api.organizations.databases.branches.post({
          path: {
            organization: props.organizationId,
            database: databaseName,
          },
          body: {
            name: props.defaultBranch,
            parent_branch: "main",
          },
        });

        await ensureProductionBranchClusterSize(
          api,
          props.organizationId,
          databaseName,
          props.defaultBranch || "main",
          data.kind,
          clusterSize,
        );

        // Update database to use new branch as default
        const updatedData = await api.organizations.databases.patch({
          path: {
            organization: props.organizationId,
            name: databaseName,
          },
          body: {
            default_branch: props.defaultBranch,
          },
        });

        return this({
          ...props,
          id: data.id,
          name: databaseName,
          state: updatedData.state,
          defaultBranch: updatedData.default_branch,
          plan: updatedData.plan,
          createdAt: updatedData.created_at,
          updatedAt: updatedData.updated_at,
          htmlUrl: updatedData.html_url,
        });
      }
    }

    return this({
      ...props,
      id: data.id,
      name: databaseName,
      state: data.state,
      defaultBranch: data.default_branch || "main",
      plan: data.plan,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      htmlUrl: data.html_url,
    });
  },
);

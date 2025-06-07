import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { PlanetScaleApi } from "./api.ts";
import {
  type PlanetScaleClusterSize,
  waitForDatabaseReady,
  fixClusterSize,
} from "./utils.ts";

/**
 * Properties for creating or updating a PlanetScale Database
 */
export interface DatabaseProps {
  /**
   * The name of the database
   */
  name: string;

  /**
   * The organization ID where the database will be created
   */
  organizationId: string;

  /**
   * PlanetScale API token (overrides environment variable)
   */
  apiKey?: Secret;

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
}

/**
 * Represents a PlanetScale Database
 */
export interface Database
  extends Resource<"planetscale::Database">,
    DatabaseProps {
  /**
   * The unique identifier of the database
   */
  id: string;

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
}

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
    _id: string,
    props: DatabaseProps,
  ): Promise<Database> {
    const apiKey =
      props.apiKey?.unencrypted || process.env.PLANETSCALE_API_TOKEN;
    if (!apiKey) {
      throw new Error("PLANETSCALE_API_TOKEN environment variable is required");
    }

    const api = new PlanetScaleApi({ apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.name) {
          const response = await api.delete(
            `/organizations/${props.organizationId}/databases/${this.output.name}`,
          );

          if (!response.ok && response.status !== 404) {
            throw new Error(
              `Failed to delete database: ${response.statusText} ${await response.text()}`,
            );
          }
        }
      } catch (error) {
        console.error("Error deleting database:", error);
        throw error;
      }
      return this.destroy();
    }

    try {
      // Check if database exists
      const getResponse = await api.get(
        `/organizations/${props.organizationId}/databases/${props.name}`,
      );
      const getData = await getResponse.json<any>();
      if (this.phase === "update" || (props.adopt && getResponse.ok)) {
        if (!getResponse.ok) {
          throw new Error(`Database ${props.name} not found`);
        }
        // Update database settings
        // If updating to a non-'main' default branch, create it first
        if (props.defaultBranch && props.defaultBranch !== "main") {
          const branchResponse = await api.get(
            `/organizations/${props.organizationId}/databases/${props.name}/branches/${props.defaultBranch}`,
          );
          if (!getData.ready) {
            await waitForDatabaseReady(api, props.organizationId, props.name);
          }
          if (!branchResponse.ok && branchResponse.status === 404) {
            // Create the branch
            const createBranchResponse = await api.post(
              `/organizations/${props.organizationId}/databases/${props.name}/branches`,
              {
                name: props.defaultBranch,
                parent_branch: "main",
              },
            );

            if (!createBranchResponse.ok) {
              throw new Error(
                `Failed to create default branch: ${createBranchResponse.statusText} ${await createBranchResponse.text()}`,
              );
            }
          }
        }

        const updateResponse = await api.patch(
          `/organizations/${props.organizationId}/databases/${props.name}`,
          {
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
        );

        if (!updateResponse.ok) {
          throw new Error(
            `Failed to update database: ${updateResponse.statusText} ${await updateResponse.text()}`,
          );
        }

        await fixClusterSize(
          api,
          props.organizationId,
          props.name,
          props.defaultBranch || "main",
          props.clusterSize,
          getData.ready,
        );

        const data = await updateResponse.json<any>();
        return this({
          ...props,
          id: data.id,
          state: data.state,
          defaultBranch: data.default_branch,
          plan: data.plan,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          htmlUrl: data.html_url,
        });
      }

      if (getResponse.ok) {
        throw new Error(`Database with name ${props.name} already exists`);
      }

      // Create new database
      const createResponse = await api.post(
        `/organizations/${props.organizationId}/databases`,
        {
          name: props.name,
          region_slug: props.region?.slug,
          require_approval_for_deploy: props.requireApprovalForDeploy,
          allow_data_branching: props.allowDataBranching,
          automatic_migrations: props.automaticMigrations,
          restrict_branch_region: props.restrictBranchRegion,
          insights_raw_queries: props.insightsRawQueries,
          production_branch_web_console: props.productionBranchWebConsole,
          migration_framework: props.migrationFramework,
          migration_table_name: props.migrationTableName,
          cluster_size: props.clusterSize,
        },
      );

      if (!createResponse.ok) {
        throw new Error(
          `Failed to create database: ${createResponse.statusText} ${await createResponse.text()}`,
        );
      }

      const data = await createResponse.json<any>();

      // If a non-'main' default branch is specified, create it
      if (props.defaultBranch && props.defaultBranch !== "main") {
        await waitForDatabaseReady(api, props.organizationId, props.name);

        // Check if branch exists
        const branchResponse = await api.get(
          `/organizations/${props.organizationId}/databases/${props.name}/branches/${props.defaultBranch}`,
        );

        if (!branchResponse.ok && branchResponse.status === 404) {
          // Create the branch
          const createBranchResponse = await api.post(
            `/organizations/${props.organizationId}/databases/${props.name}/branches`,
            {
              name: props.defaultBranch,
              parent_branch: "main",
            },
          );

          if (!createBranchResponse.ok) {
            throw new Error(
              `Failed to create default branch: ${createBranchResponse.statusText} ${await createBranchResponse.text()}`,
            );
          }

          await fixClusterSize(
            api,
            props.organizationId,
            props.name,
            props.defaultBranch || "main",
            props.clusterSize,
            false,
          );

          // Update database to use new branch as default
          const updateResponse = await api.patch(
            `/organizations/${props.organizationId}/databases/${props.name}`,
            {
              default_branch: props.defaultBranch,
            },
          );

          if (!updateResponse.ok) {
            throw new Error(
              `Failed to set default branch: ${updateResponse.statusText} ${await updateResponse.text()}`,
            );
          }

          const updatedData = await updateResponse.json<any>();
          return this({
            ...props,
            id: data.id,
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
        state: data.state,
        defaultBranch: data.default_branch || "main",
        plan: data.plan,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        htmlUrl: data.html_url,
      });
    } catch (error) {
      console.error("Error managing database:", error);
      throw error;
    }
  },
);

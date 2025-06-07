import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { PlanetScaleApi } from "./api.ts";
import {
  fixClusterSize,
  waitForDatabaseReady,
  type PlanetScaleClusterSize,
} from "./utils.ts";

/**
 * Properties for creating or updating a PlanetScale Branch
 */
export interface BranchProps {
  /**
   * The name of the branch
   */
  name: string;

  /**
   * The organization ID
   */
  organizationId: string;

  /**
   * The database name
   */
  databaseName: string;

  /**
   * PlanetScale API token (overrides environment variable)
   */
  apiKey?: Secret;

  /**
   * Whether or not the branch should be set to a production branch or not.
   */

  isProduction: boolean;

  /**
   * Whether to adopt an existing branch if it exists.
   * If false and the branch exists, an error will be thrown.
   * If true and the branch exists, it will be updated with the provided properties.
   */
  adopt?: boolean;

  /**
   * The parent branch name or Branch object
   */
  parentBranch?: string | Branch;

  /**
   * If provided, restores the backup's schema and data to the new branch.
   * Must have restore_production_branch_backup(s) or restore_backup(s) access.
   *
   * Ignored if the branch already exists.
   */
  backupId?: string;

  /**
   * If provided, restores the last successful backup's schema and data to the new branch.
   * Must have restore_production_branch_backup(s) or restore_backup(s) access,
   * in addition to Data Branching being enabled for the branch.
   * Use 'last_successful_backup' or empty string.
   *
   * Ignored if the branch already exists.
   */
  seedData?: string;

  /**
   * The database cluster size is required if a backup_id is provided. If the branch is not a production branch, the cluster size MUST be "PS_DEV".
   */
  clusterSize?: PlanetScaleClusterSize;

  /**
   * Enable or disable safe migrations on this branch
   */
  safeMigrations?: boolean;
}

/**
 * Represents a PlanetScale Branch
 */
export interface Branch extends Resource<"planetscale::Branch">, BranchProps {
  /**
   * The name of the branch
   */
  name: string;

  /**
   * The name of the parent branch
   */
  parentBranch: string;

  /**
   * Time at which the branch was created
   */
  createdAt: string;

  /**
   * Time at which the branch was last updated
   */
  updatedAt: string;

  /**
   * HTML URL to access the branch
   */
  htmlUrl: string;
}

/**
 * Create or manage a PlanetScale database branch
 *
 * @example
 * // Create a branch from 'main'
 * const branch = await Branch("feature-123", {
 *   name: "feature-123",
 *   organizationId: "my-org",
 *   databaseName: "my-database",
 *   parentBranch: "main"
 * });
 *
 * @example
 * // Create a branch from another branch object
 * const parentBranch = await Branch("staging", {
 *   name: "staging",
 *   organizationId: "my-org",
 *   databaseName: "my-database",
 *   parentBranch: "main"
 * });
 *
 * const featureBranch = await Branch("feature-456", {
 *   name: "feature-456",
 *   organizationId: "my-org",
 *   databaseName: "my-database",
 *   parentBranch: parentBranch // Using Branch object instead of string
 * });
 *
 * @example
 * // Create a branch from a backup
 * const branch = await Branch("restored-branch", {
 *   name: "restored-branch",
 *   organizationId: "my-org",
 *   databaseName: "my-database",
 *   parentBranch: "main",
 *   backupId: "backup-123",
 *   clusterSize: "PS_10"
 * });
 */
export const Branch = Resource(
  "planetscale::Branch",
  async function (
    this: Context<Branch>,
    _id: string,
    props: BranchProps,
  ): Promise<Branch> {
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
            `/organizations/${props.organizationId}/databases/${props.databaseName}/branches/${this.output.name}`,
          );

          if (!response.ok && response.status !== 404) {
            throw new Error(
              `Failed to delete branch: ${response.statusText} ${await response.text()}`,
            );
          }
        }
      } catch (error) {
        console.error("Error deleting branch:", error);
        throw error;
      }
      return this.destroy();
    }

    try {
      const parentBranchName = !props.parentBranch
        ? "main"
        : typeof props.parentBranch === "string"
          ? props.parentBranch
          : props.parentBranch.name;

      if (typeof props.parentBranch !== "string" && props.parentBranch) {
        await waitForDatabaseReady(
          api,
          props.organizationId,
          props.databaseName,
          props.parentBranch.name,
        );
      }

      // Check if branch exists
      const getResponse = await api.get(
        `/organizations/${props.organizationId}/databases/${props.databaseName}/branches/${props.name}`,
      );

      if (!getResponse.ok && getResponse.status !== 404) {
        // Error getting branch
        throw new Error(
          `Failed to get branch: ${getResponse.statusText} ${await getResponse.text()}`,
        );
      }

      if (getResponse.ok) {
        // Branch exists
        if (!props.adopt) {
          throw new Error(
            `Branch ${props.name} already exists and adopt is false`,
          );
        }

        const data = await getResponse.json<any>();
        const currentParentBranch = data.parent_branch || "main";

        // Check immutable properties
        if (props.parentBranch && parentBranchName !== currentParentBranch) {
          throw new Error(
            `Cannot change parent branch from ${currentParentBranch} to ${parentBranchName}`,
          );
        }
        if (this.output?.backupId) {
          console.warn(
            "BackupID is set, but branch already exists, so it will be ignored",
          );
        }

        if (this.output?.seedData) {
          console.warn(
            "SeedData is set, but branch already exists, so it will be ignored",
          );
        }

        // Update mutable properties if they've changed
        if (props.safeMigrations !== undefined) {
          const safeMigrationsResponse = await api[
            props.safeMigrations ? "post" : "delete"
          ](
            `/organizations/${props.organizationId}/databases/${props.databaseName}/branches/${props.name}/safe-migrations`,
          );

          if (!safeMigrationsResponse.ok) {
            throw new Error(
              `Failed to ${props.safeMigrations ? "enable" : "disable"} safe migrations: ${safeMigrationsResponse.statusText}`,
            );
          }
        }

        if (props.clusterSize && data.cluster_size !== props.clusterSize) {
          const clusterResponse = await api.patch(
            `/organizations/${props.organizationId}/databases/${props.databaseName}/branches/${props.name}/cluster`,
            {
              cluster_size: props.clusterSize,
            },
          );

          if (!clusterResponse.ok) {
            throw new Error(
              `Failed to update cluster size: ${clusterResponse.statusText}`,
            );
          }
        }

        return this({
          ...props,
          name: props.name,
          parentBranch: currentParentBranch,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          htmlUrl: data.html_url,
        });
      }
      await waitForDatabaseReady(api, props.organizationId, props.databaseName);

      // Branch doesn't exist, create it
      const createResponse = await api.post(
        `/organizations/${props.organizationId}/databases/${props.databaseName}/branches`,
        {
          name: props.name,
          parent_branch: parentBranchName,
          backup_id: props.backupId,
          seed_data: props.seedData,
          cluster_size: props.clusterSize,
        },
      );

      if (!createResponse.ok) {
        throw new Error(
          `Failed to create branch: ${createResponse.statusText} ${await createResponse.text()}`,
        );
      }

      const data = await createResponse.json<any>();

      // Handle safe migrations if specified
      if (props.safeMigrations !== undefined) {
        // We can't change the migrations mode if the database is not ready
        await waitForDatabaseReady(
          api,
          props.organizationId,
          props.databaseName,
          props.name,
        );
        const safeMigrationsResponse = await api[
          props.safeMigrations ? "post" : "delete"
        ](
          `/organizations/${props.organizationId}/databases/${props.databaseName}/branches/${props.name}/safe-migrations`,
        );

        if (!safeMigrationsResponse.ok) {
          throw new Error(
            `Failed to ${props.safeMigrations ? "enable" : "disable"} safe migrations: ${safeMigrationsResponse.statusText} : ${await safeMigrationsResponse.text()}`,
          );
        }
      }

      // Handle cluster size update if specified
      if (props.clusterSize) {
        // Wait for database to be ready before modifying cluster size
        await fixClusterSize(
          api,
          props.organizationId,
          props.databaseName,
          props.name,
          props.clusterSize,
          true,
        );
      }

      return this({
        ...props,
        name: props.name,
        parentBranch: data.parent_branch,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        htmlUrl: data.html_url,
      });
    } catch (error) {
      console.error("Error managing branch:", error);
      throw error;
    }
  },
);

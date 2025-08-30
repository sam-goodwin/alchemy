import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { PlanetScaleProps } from "./api/client.gen.ts";
import { PlanetScaleClient } from "./api/client.gen.ts";
import {
  ensureProductionBranchClusterSize,
  sanitizeClusterSize,
  waitForBranchReady,
  type PlanetScaleClusterSize,
} from "./utils.ts";

/**
 * Properties for creating or updating a PlanetScale Branch
 */
export interface BranchProps extends PlanetScaleProps {
  /**
   * The name of the branch
   *
   * @default ${app}-${stage}-${id}
   */
  name?: string;

  /**
   * The organization ID
   */
  organizationId: string;

  /**
   * The database name
   */
  databaseName: string;

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
   * @default "main"
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
   * Use 'last_successful_backup' or undefined.
   *
   * Ignored if the branch already exists.
   */
  seedData?: "last_successful_backup";

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
    id: string,
    props: BranchProps,
  ): Promise<Branch> {
    const adopt = props.adopt ?? this.scope.adopt;

    const api = new PlanetScaleClient(props);

    const branchName =
      props.name ?? this.output?.name ?? this.scope.createPhysicalName(id);
    const parentBranchName = !props.parentBranch
      ? "main"
      : typeof props.parentBranch === "string"
        ? props.parentBranch
        : props.parentBranch.name;

    if (this.phase === "update" && this.output.name !== branchName) {
      // TODO(sam): maybe we don't need to replace? just branch again? or rename?
      this.replace();
    }

    if (this.phase === "delete") {
      if (this.output?.name) {
        const response = await api.organizations.databases.branches.delete({
          path: {
            organization: props.organizationId,
            database: props.databaseName,
            name: this.output.name,
          },
          result: "full",
        });

        if (response.error && response.error.status !== 404) {
          throw new Error(
            `Failed to delete branch: ${response.error.message}`,
            {
              cause: response.error,
            },
          );
        }
      }
      return this.destroy();
    }

    if (typeof props.parentBranch !== "string" && props.parentBranch) {
      await waitForBranchReady(
        api,
        props.organizationId,
        props.databaseName,
        props.parentBranch.name,
      );
    }

    // Check if branch exists
    const getResponse = await api.organizations.databases.branches.get({
      path: {
        organization: props.organizationId,
        database: props.databaseName,
        name: branchName,
      },
      result: "full",
    });

    if (getResponse.error && getResponse.error.status !== 404) {
      // Error getting branch
      throw new Error(`Failed to get branch: ${getResponse.error.message}`, {
        cause: getResponse.error,
      });
    }

    if (getResponse.data) {
      // Branch exists
      if (!adopt) {
        throw new Error(
          `Branch ${branchName} already exists and adopt is false`,
        );
      }

      const data = getResponse.data;
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
        await api.organizations.databases.branches.safeMigrations[
          props.safeMigrations ? "post" : "delete"
        ]({
          path: {
            organization: props.organizationId,
            database: props.databaseName,
            name: branchName,
          },
        });
      }

      const clusterSize = props.clusterSize
        ? sanitizeClusterSize({
            size: props.clusterSize,
            kind: data.kind,
            arch: data.cluster_architecture === "aarch64" ? "arm" : "x86",
            region: data.region.slug,
          })
        : undefined;
      if (clusterSize && data.cluster_name !== clusterSize) {
        if (!props.isProduction) {
          throw new Error(
            `Cannot change cluster size of non-production branch ${branchName}`,
          );
        }
        await ensureProductionBranchClusterSize(
          api,
          props.organizationId,
          props.databaseName,
          branchName,
          data.kind,
          clusterSize,
        );
      }

      return this({
        ...props,
        name: branchName,
        parentBranch: currentParentBranch,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        htmlUrl: data.html_url,
      });
    }
    let clusterSize: string | undefined;
    const parent = await waitForBranchReady(
      api,
      props.organizationId,
      props.databaseName,
      parentBranchName,
    );
    if (props.clusterSize) {
      clusterSize = sanitizeClusterSize({
        size: props.clusterSize,
        kind: parent.kind,
        arch: parent.cluster_architecture === "aarch64" ? "arm" : "x86",
        region: parent.region.slug,
      });
    }

    // Branch doesn't exist, create it
    const data = await api.organizations.databases.branches.post({
      path: {
        organization: props.organizationId,
        database: props.databaseName,
      },
      body: {
        name: branchName,
        parent_branch: parentBranchName,
        backup_id: props.backupId,
        seed_data: props.seedData,
        // This is ignored unless props.backupId is provided
        cluster_size: clusterSize,
      },
    });

    // Handle safe migrations if specified
    if (props.safeMigrations !== undefined) {
      // We can't change the migrations mode if the branch is not ready
      await waitForBranchReady(
        api,
        props.organizationId,
        props.databaseName,
        branchName,
      );
      await api.organizations.databases.branches.safeMigrations[
        props.safeMigrations ? "post" : "delete"
      ]({
        path: {
          organization: props.organizationId,
          database: props.databaseName,
          name: branchName,
        },
      });
    }

    // Handle cluster size update if specified
    if (clusterSize) {
      await ensureProductionBranchClusterSize(
        api,
        props.organizationId,
        props.databaseName,
        branchName,
        data.kind,
        clusterSize,
      );
    }

    return this({
      ...props,
      name: branchName,
      parentBranch: data.parent_branch,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      htmlUrl: data.html_url,
    });
  },
);

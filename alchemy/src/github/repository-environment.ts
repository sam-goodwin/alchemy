import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { createGitHubClient, verifyGitHubAuth } from "./client.js";

/**
 * Properties for creating or updating a GitHub Repository Environment
 */
export interface RepositoryEnvironmentProps {
  /**
   * Repository owner (user or organization)
   */
  owner: string;

  /**
   * Repository name
   */
  repository: string;

  /**
   * Environment name
   */
  name: string;

  /**
   * Wait timer before allowing deployments to proceed (in minutes)
   * Must be between 0 and 43200 (30 days)
   * @default 0
   */
  waitTimer?: number;

  /**
   * Determine whether to prevent self-reviews on pull requests
   * Note: Requires at least one reviewer when enabled
   * @default false
   */
  preventSelfReview?: boolean;

  /**
   * Determine whether administrators can bypass deployment protection rules
   * @default true
   */
  adminBypass?: boolean;

  /**
   * Required reviewers for deployments to this environment
   */
  reviewers?: {
    /**
     * GitHub usernames or user IDs that can approve deployments
     * Can be numeric IDs or string usernames (which will be resolved to IDs)
     */
    users?: Array<number | string>;

    /**
     * GitHub team names or team IDs that can approve deployments
     * Can be numeric IDs or string team names (which will be resolved to IDs)
     * Note: For team names, should be in the format "org/team-name"
     */
    teams?: Array<number | string>;
  };

  /**
   * Deployment branch policy for the environment
   */
  deploymentBranchPolicy?: {
    /**
     * Whether to restrict deployments to protected branches
     * @default false
     */
    protectedBranches?: boolean;

    /**
     * Whether to allow custom branch policies
     * When true, specific branch patterns can be specified using createDeploymentBranchPolicy
     * @default false
     */
    customBranchPolicies?: boolean;
  };

  /**
   * Branch patterns for deployment when customBranchPolicies is true
   * For example: ["main", "releases/*"]
   * @default []
   */
  branchPatterns?: string[];

  /**
   * Optional GitHub API token (overrides environment variable)
   * If not provided, will use GITHUB_TOKEN environment variable
   * @default process.env.GITHUB_TOKEN
   */
  token?: string;
}

/**
 * Output returned after Repository Environment creation/update
 */
export interface RepositoryEnvironment
  extends Resource<"github::RepositoryEnvironment">,
    RepositoryEnvironmentProps {
  /**
   * The ID of the resource
   */
  id: string;

  /**
   * The numeric ID of the environment in GitHub
   */
  environmentId: number;

  /**
   * Time at which the object was created/updated
   */
  updatedAt: string;
}

/**
 * Resource for managing GitHub repository environments
 *
 * Note: If preventSelfReview is true, at least one reviewer must be specified.
 *
 * Branch policies are efficiently managed with proper diffing:
 * - Only manages branch patterns configured through this resource
 * - Preserves any manually added branch patterns outside this resource
 * - When updating, only modifies patterns that have changed from previous state
 * - Compares against previous resource state, not current environment state
 * - Safely handles policy type changes
 *
 * @example
 * // Create a basic environment with no protection rules
 * const devEnv = await RepositoryEnvironment("dev-environment", {
 *   owner: "my-org",
 *   repository: "my-repo",
 *   name: "development"
 * });
 *
 * @example
 * // Create a production environment with approval requirements
 * const prodEnv = await RepositoryEnvironment("prod-environment", {
 *   owner: "my-org",
 *   repository: "my-repo",
 *   name: "production",
 *   waitTimer: 10, // 10 minute delay
 *   preventSelfReview: true,
 *   reviewers: {
 *     teams: ["platform-team"], // team name
 *     users: ["security-admin"] // username
 *   },
 *   deploymentBranchPolicy: {
 *     protectedBranches: true,
 *     customBranchPolicies: false
 *   }
 * });
 *
 * @example
 * // Create an environment with reviewer IDs
 * const stagingEnv = await RepositoryEnvironment("staging-environment", {
 *   owner: "my-org",
 *   repository: "my-repo",
 *   name: "staging",
 *   reviewers: {
 *     teams: [1234567], // team ID
 *     users: [7654321]  // user ID
 *   },
 *   deploymentBranchPolicy: {
 *     protectedBranches: false,
 *     customBranchPolicies: true
 *   },
 *   branchPatterns: ["main", "release/*"]
 * });
 */
export const RepositoryEnvironment = Resource(
  "github::RepositoryEnvironment",
  async function (
    this: Context<RepositoryEnvironment>,
    _id: string,
    props: RepositoryEnvironmentProps,
  ): Promise<RepositoryEnvironment> {
    // Create authenticated Octokit client
    const octokit = await createGitHubClient({
      token: props.token,
    });

    // Verify authentication and permissions
    if (!this.quiet) {
      await verifyGitHubAuth(octokit, props.owner, props.repository);
    }

    if (this.phase === "delete") {
      if (this.output?.id) {
        try {
          // Delete the environment
          await octokit.rest.repos.deleteAnEnvironment({
            owner: props.owner,
            repo: props.repository,
            environment_name: props.name,
          });
        } catch (error: any) {
          // Ignore 404 errors (environment already deleted)
          if (error.status === 404) {
            console.log("Environment doesn't exist, ignoring");
          } else {
            throw error;
          }
        }
      }

      // Return void (a deleted resource has no content)
      return this.destroy();
    }
    try {
      // Check if the environment already exists
      let environmentId: number | undefined; // Use undefined instead of 0
      try {
        const { data: environments } =
          await octokit.rest.repos.getAllEnvironments({
            owner: props.owner,
            repo: props.repository,
          });

        const existingEnv = environments.environments?.find(
          (env) => env.name.toLowerCase() === props.name.toLowerCase(),
        );

        if (existingEnv?.id) {
          environmentId = existingEnv.id;
        }
      } catch (error: any) {
        // If it's a 404, the environment doesn't exist, which is fine
        if (error.status !== 404) {
          throw error;
        }
      }

      // Convert reviewers to API format
      const reviewers: { type: "User" | "Team"; id: number }[] = [];

      // Process user reviewers
      if (props.reviewers?.users && props.reviewers.users.length > 0) {
        for (const user of props.reviewers.users) {
          if (typeof user === "number") {
            // If a numeric ID is provided, use it directly
            reviewers.push({
              type: "User" as const,
              id: user,
            });
          } else {
            // If a username string is provided, look up the ID
            const { data: userData } = await octokit.rest.users.getByUsername({
              username: user,
            });

            reviewers.push({
              type: "User" as const,
              id: userData.id,
            });
          }
        }
      }

      // Process team reviewers
      if (props.reviewers?.teams && props.reviewers.teams.length > 0) {
        for (const team of props.reviewers.teams) {
          if (typeof team === "number") {
            // If a numeric ID is provided, use it directly
            reviewers.push({
              type: "Team" as const,
              id: team,
            });
          } else {
            // If a team name string is provided, look up the ID
            // Check if team name is in the format 'org/team-name'
            const teamParts = team.includes("/")
              ? team.split("/")
              : [props.owner, team];

            if (teamParts.length !== 2) {
              throw new Error(
                `Invalid team format: ${team}. Expected format: "org/team-slug" or just "team-slug"`,
              );
            }

            const [org, teamSlug] = teamParts;

            const { data: teamData } = await octokit.rest.teams.getByName({
              org,
              team_slug: teamSlug,
            });

            reviewers.push({
              type: "Team" as const,
              id: teamData.id,
            });
          }
        }
      }

      // Create or update the environment
      if (environmentId === undefined) {
        // Create the environment
        const { data: createdEnv } =
          await octokit.rest.repos.createOrUpdateEnvironment({
            owner: props.owner,
            repo: props.repository,
            environment_name: props.name,
            wait_timer: props.waitTimer,
            prevent_self_review: props.preventSelfReview,
            reviewers: reviewers.length > 0 ? reviewers : undefined,
            deployment_branch_policy: props.deploymentBranchPolicy
              ? {
                  protected_branches:
                    props.deploymentBranchPolicy.protectedBranches ?? false,
                  custom_branch_policies:
                    props.deploymentBranchPolicy.customBranchPolicies ?? false,
                }
              : undefined,
          });

        environmentId = createdEnv.id;

        // If there are specific branch patterns, set them
        if (
          props.deploymentBranchPolicy?.customBranchPolicies === true &&
          props.branchPatterns &&
          props.branchPatterns.length > 0
        ) {
          // Add branch patterns one by one
          for (const pattern of props.branchPatterns) {
            await octokit.rest.repos.createDeploymentBranchPolicy({
              owner: props.owner,
              repo: props.repository,
              environment_name: props.name,
              name: pattern,
            });
          }
        }
      } else {
        // Update the environment
        await octokit.rest.repos.createOrUpdateEnvironment({
          owner: props.owner,
          repo: props.repository,
          environment_name: props.name,
          wait_timer: props.waitTimer,
          prevent_self_review: props.preventSelfReview,
          reviewers: reviewers.length > 0 ? reviewers : undefined,
          deployment_branch_policy: props.deploymentBranchPolicy
            ? {
                protected_branches:
                  props.deploymentBranchPolicy.protectedBranches ?? false,
                custom_branch_policies:
                  props.deploymentBranchPolicy.customBranchPolicies ?? false,
              }
            : undefined,
        });

        // If there are specific branch patterns, update them
        if (props.deploymentBranchPolicy?.customBranchPolicies === true) {
          // Get existing branch policies to understand what's currently configured
          const { data: existingPolicies } =
            await octokit.rest.repos.listDeploymentBranchPolicies({
              owner: props.owner,
              repo: props.repository,
              environment_name: props.name,
            });

          const existingPatterns = existingPolicies.branch_policies.map(
            (policy) => policy.name!,
          );

          const newPatterns: string[] = props.branchPatterns || [];

          // For updates, keep track of which branch policies we should manage
          // This set identifies patterns that were previously managed by this resource
          // If we don't have previous props, use an empty set
          const previouslyManagedPatterns: Set<string> = new Set(
            this.phase === "update" &&
              this.props?.deploymentBranchPolicy?.customBranchPolicies === true
              ? this.props.branchPatterns || []
              : [],
          );

          // Patterns to add (in new config but not in existing)
          const patternsToAdd = newPatterns.filter(
            (pattern) => !existingPatterns.includes(pattern),
          );

          // Patterns to delete (were managed by us previously but not in new config)
          const patternsToDelete = existingPatterns.filter(
            (pattern) =>
              previouslyManagedPatterns.has(pattern) &&
              !newPatterns.includes(pattern),
          );

          // Delete policies that are no longer needed
          for (const patternToDelete of patternsToDelete) {
            const policy = existingPolicies.branch_policies.find(
              (p) => p.name === patternToDelete,
            );

            if (policy?.id) {
              await octokit.rest.repos.deleteDeploymentBranchPolicy({
                owner: props.owner,
                repo: props.repository,
                environment_name: props.name,
                branch_policy_id: policy.id,
              });
            }
          }

          // Add new branch patterns
          for (const pattern of patternsToAdd) {
            await octokit.rest.repos.createDeploymentBranchPolicy({
              owner: props.owner,
              repo: props.repository,
              environment_name: props.name,
              name: pattern,
            });
          }
        }
      }

      // Get the updated environment details
      const { data: env } = await octokit.rest.repos.getEnvironment({
        owner: props.owner,
        repo: props.repository,
        environment_name: props.name,
      });

      // Return environment details
      return this({
        id: `${props.owner}/${props.repository}/${props.name}`,
        environmentId: environmentId || env.id,
        owner: props.owner,
        repository: props.repository,
        name: props.name,
        waitTimer: props.waitTimer,
        preventSelfReview: props.preventSelfReview,
        adminBypass: props.adminBypass,
        reviewers: props.reviewers,
        deploymentBranchPolicy: props.deploymentBranchPolicy,
        branchPatterns: props.branchPatterns,
        token: props.token,
        updatedAt: new Date().toISOString(),
      });
    } catch (error: any) {
      if (
        error.status === 403 &&
        error.message?.includes("Must have admin rights")
      ) {
        console.error(
          "\n⚠️ Error creating/updating GitHub environment: You must have admin rights to the repository.",
        );
        console.error(
          "Make sure your GitHub token has the required permissions (repo scope for private repos).\n",
        );
      } else {
        console.error(
          "Error creating/updating GitHub environment:",
          error.message,
        );
      }
      throw error;
    }
  },
);

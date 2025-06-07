import type { Context } from "../context.ts";
import {
  Resource,
  ResourceKind,
  ResourceID,
  ResourceFQN,
  ResourceScope,
  ResourceSeq,
} from "../resource.ts";
import { Scope } from "../scope.ts";
import {
  createSupabaseApi,
  type SupabaseApiOptions,
  type SupabaseApi,
} from "./api.ts";
import { handleApiError } from "./api-error.ts";
import type { ProjectResource } from "./project.ts";

/**
 * Properties for creating or updating a Supabase Branch (preview environment)
 */
export interface BranchProps extends SupabaseApiOptions {
  /**
   * Reference to the project (string ID or Project resource)
   */
  project: string | ProjectResource;

  /**
   * Name of the branch
   */
  branchName: string;

  /**
   * Git branch to associate with this database branch (optional)
   */
  gitBranch?: string;

  /**
   * Whether the branch should be persistent (optional)
   */
  persistent?: boolean;

  /**
   * Region for the branch (optional)
   */
  region?: string;

  /**
   * Desired instance size (optional)
   */
  desiredInstanceSize?: string;

  /**
   * Release channel (optional)
   */
  releaseChannel?: string;

  /**
   * Whether to adopt an existing branch instead of failing on conflict
   */
  adopt?: boolean;

  /**
   * Whether to delete the branch on resource destruction
   */
  delete?: boolean;
}

/**
 * Supabase Branch resource representing a preview environment
 */
export interface BranchResource extends Resource<"supabase::Branch"> {
  /**
   * Unique identifier of the branch
   */
  id: string;

  /**
   * Name of the branch
   */
  name: string;

  /**
   * Whether this is the default branch
   */
  isDefault: boolean;

  /**
   * Git branch associated with this database branch
   */
  gitBranch: string;

  /**
   * Pull request number if applicable
   */
  prNumber?: number;

  /**
   * Latest check run ID
   */
  latestCheckRunId?: number;

  /**
   * Whether the branch is persistent
   */
  persistent: boolean;

  /**
   * Current status of the branch
   */
  status: string;

  /**
   * Creation timestamp
   */
  createdAt: string;

  /**
   * Last update timestamp
   */
  updatedAt: string;
}

/**
 * Type guard to check if a resource is a Branch
 */
export function isBranch(resource: Resource): resource is BranchResource {
  return resource[ResourceKind] === "supabase::Branch";
}

/**
 * Create and manage Supabase Branches (preview environments)
 *
 * @example
 * // Create a basic branch:
 * const branch = Branch("feature-branch", {
 *   project: "proj-123",
 *   branchName: "feature-branch"
 * });
 *
 * @example
 * // Create a branch with git integration:
 * const branch = Branch("feature-branch", {
 *   project: myProject,
 *   branchName: "feature-branch",
 *   gitBranch: "feature/new-feature",
 *   persistent: true
 * });
 *
 * @example
 * // Create a branch with custom configuration:
 * const branch = Branch("staging", {
 *   project: "proj-123",
 *   branchName: "staging",
 *   region: "us-east-1",
 *   desiredInstanceSize: "micro"
 * });
 */
export const Branch = Resource(
  "supabase::Branch",
  async function (
    this: Context<BranchResource>,
    _id: string,
    props: BranchProps,
  ): Promise<BranchResource> {
    const api = await createSupabaseApi(props);
    const projectRef =
      typeof props.project === "string" ? props.project : props.project.id;

    if (this.phase === "delete") {
      const branchId = this.output?.id;
      if (branchId && props.delete !== false) {
        await deleteBranch(api, projectRef, branchId);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const branch = await getBranch(api, projectRef, this.output.id);
      return this(branch);
    }

    try {
      const branch = await createBranch(api, projectRef, {
        branch_name: props.branchName,
        git_branch: props.gitBranch,
        persistent: props.persistent,
        region: props.region,
        desired_instance_size: props.desiredInstanceSize,
        release_channel: props.releaseChannel,
      });
      return this(branch);
    } catch (error) {
      if (
        props.adopt &&
        error instanceof Error &&
        error.message.includes("already exists")
      ) {
        const existingBranch = await findBranchByName(
          api,
          projectRef,
          props.branchName,
        );
        if (!existingBranch) {
          throw new Error(
            `Failed to find existing branch '${props.branchName}' for adoption`,
          );
        }
        return this(existingBranch);
      }
      throw error;
    }
  },
);

async function createBranch(
  api: SupabaseApi,
  projectRef: string,
  params: any,
): Promise<BranchResource> {
  const response = await api.post(`/projects/${projectRef}/branches`, params);
  if (!response.ok) {
    await handleApiError(response, "creating", "branch", params.branch_name);
  }
  const data = await response.json();
  return mapBranchResponse(data);
}

async function getBranch(
  api: SupabaseApi,
  projectRef: string,
  branchId: string,
): Promise<BranchResource> {
  const response = await api.get(
    `/projects/${projectRef}/branches/${branchId}`,
  );
  if (!response.ok) {
    await handleApiError(response, "getting", "branch", branchId);
  }
  const data = await response.json();
  return mapBranchResponse(data);
}

async function deleteBranch(
  api: SupabaseApi,
  projectRef: string,
  branchId: string,
): Promise<void> {
  const response = await api.delete(
    `/projects/${projectRef}/branches/${branchId}`,
  );
  if (!response.ok && response.status !== 404) {
    await handleApiError(response, "deleting", "branch", branchId);
  }
}

async function findBranchByName(
  api: SupabaseApi,
  projectRef: string,
  branchName: string,
): Promise<BranchResource | null> {
  const response = await api.get(`/projects/${projectRef}/branches`);
  if (!response.ok) {
    await handleApiError(response, "listing", "branches");
  }
  const branches = (await response.json()) as any[];
  const match = branches.find((branch: any) => branch.name === branchName);
  return match ? mapBranchResponse(match) : null;
}

function mapBranchResponse(data: any): BranchResource {
  return {
    [ResourceKind]: "supabase::Branch",
    [ResourceID]: data.id,
    [ResourceFQN]: `supabase::Branch::${data.id}`,
    [ResourceScope]: Scope.current,
    [ResourceSeq]: 0,
    id: data.id,
    name: data.name,
    isDefault: data.is_default,
    gitBranch: data.git_branch,
    prNumber: data.pr_number,
    latestCheckRunId: data.latest_check_run_id,
    persistent: data.persistent,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

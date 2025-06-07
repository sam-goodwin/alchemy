import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { handleApiError } from "./api-error.ts";
import { createNeonApi, type NeonApiOptions, type NeonApi } from "./api.ts";
import type { Project } from "./project.ts";
import type { BranchState, NeonOperation } from "./types.ts";

/**
 * Properties for creating or updating a Neon branch
 */
export interface BranchProps extends NeonApiOptions {
  /**
   * The project containing the branch
   */
  project: string | Project;

  /**
   * Name of the branch
   */
  name: string;

  /**
   * Parent branch to create this branch from
   */
  parent?: string | Branch;

  /**
   * Log Sequence Number (LSN) of the parent branch to branch from
   */
  parentLsn?: string;

  /**
   * Timestamp of the parent branch to branch from
   */
  parentTimestamp?: string;

  /**
   * Whether to adopt an existing branch if it already exists
   * @default false
   */
  adopt?: boolean;
}


/**
 * A Neon branch for copy-on-write database clones
 */
export interface Branch
  extends Resource<"neon::Branch">,
    Omit<BranchProps, "apiKey"> {
  /**
   * The branch ID
   */
  id: string;

  /**
   * The project containing this branch
   */
  project: string | Project;

  /**
   * Parent branch this branch was created from
   */
  parent?: string | Branch;

  /**
   * Log Sequence Number (LSN) of the parent branch
   */
  parentLsn?: string;

  /**
   * Timestamp of the parent branch
   */
  parentTimestamp?: string;

  /**
   * Name of the branch
   */
  name: string;

  /**
   * Current state of the branch
   */
  currentState: BranchState;

  /**
   * Pending state of the branch during operations
   */
  pendingState?: BranchState;

  /**
   * Logical size of the branch in bytes
   */
  logicalSize?: number;

  /**
   * Physical size of the branch in bytes
   */
  physicalSize?: number;

  /**
   * Time at which the branch was created
   */
  createdAt: string;

  /**
   * Time at which the branch was last updated
   */
  updatedAt: string;

  /**
   * Whether this is the primary branch
   */
  primary: boolean;

  /**
   * Whether this is the default branch
   */
  default: boolean;

  /**
   * Whether this branch is protected from deletion
   */
  protected: boolean;

  /**
   * CPU usage in seconds
   */
  cpuUsedSec?: number;

  /**
   * Compute time in seconds
   */
  computeTimeSeconds?: number;

  /**
   * Active time in seconds
   */
  activeTimeSeconds?: number;

  /**
   * Written data in bytes
   */
  writtenDataBytes?: number;

  /**
   * Data transfer in bytes
   */
  dataTransferBytes?: number;
}


/**
 * Creates a Neon branch for copy-on-write database clones.
 *
 * @example
 * // Create a basic branch from the main branch:
 * const branch = await Branch("feature-branch", {
 *   project: "proj_123",
 *   name: "feature/new-feature"
 * });
 *
 * @example
 * // Create a branch from a specific parent branch:
 * const branch = await Branch("dev-branch", {
 *   project: project,
 *   name: "development",
 *   parentId: "br_main_456"
 * });
 *
 * @example
 * // Create a branch from a specific point in time:
 * const branch = await Branch("restore-branch", {
 *   project: project,
 *   name: "restore-point",
 *   parentTimestamp: "2023-12-01T10:00:00Z"
 * });
 *
 * @example
 * // Adopt an existing branch if it already exists:
 * const branch = await Branch("existing-branch", {
 *   project: project,
 *   name: "staging",
 *   adopt: true
 * });
 */
export const Branch = Resource(
  "neon::Branch",
  async function (
    this: Context<Branch>,
    _id: string,
    props: BranchProps,
  ): Promise<Branch> {
    const api = createNeonApi(props);
    const branchId = this.output?.id;
    const projectId =
      typeof props.project === "string" ? props.project : props.project.id;
    const parentId = props.parent
      ? typeof props.parent === "string"
        ? props.parent
        : props.parent.id
      : undefined;

    if (this.phase === "delete") {
      if (!branchId) {
        return this.destroy();
      }

      try {
        const deleteResponse = await api.delete(
          `/projects/${projectId}/branches/${branchId}`,
        );

        if (deleteResponse.status === 404) {
          return this.destroy();
        }

        if (!deleteResponse.ok) {
          await handleApiError(deleteResponse, "delete", "branch", branchId);
        }

        const deleteData: NeonBranchApiResponse = await deleteResponse.json();
        if (deleteData.operations && deleteData.operations.length > 0) {
          await waitForOperations(api, deleteData.operations);
        }
      } catch (error: unknown) {
        if ((error as { status?: number }).status === 404) {
          return this.destroy();
        }
        throw error;
      }

      return this.destroy();
    }

    let response: NeonBranchApiResponse;

    try {
      if (this.phase === "update" && branchId) {
        const updatePayload: UpdateBranchPayload = { branch: {} };
        if (props.name !== undefined) {
          updatePayload.branch.name = props.name;
        }

        if (Object.keys(updatePayload.branch).length > 0) {
          const updateResponse = await api.patch(
            `/projects/${projectId}/branches/${branchId}`,
            updatePayload,
          );

          if (!updateResponse.ok) {
            await handleApiError(updateResponse, "update", "branch", branchId);
          }

          response = await updateResponse.json();
        } else {
          const getResponse = await api.get(
            `/projects/${projectId}/branches/${branchId}`,
          );
          if (!getResponse.ok) {
            await handleApiError(getResponse, "get", "branch", branchId);
          }
          response = await getResponse.json();
        }
      } else {
        if (props.adopt) {
          const listResponse = await api.get(`/projects/${projectId}/branches`);
          if (!listResponse.ok) {
            await handleApiError(listResponse, "list", "branch");
          }

          const listData: ListBranchesResponse = await listResponse.json();
          const existingBranch = listData.branches?.find(
            (br: NeonBranchType) => br.name === props.name,
          );

          if (existingBranch) {
            response = { branch: existingBranch };
          } else {
            response = await createNewBranch(api, projectId, props, parentId);
          }
        } else {
          response = await createNewBranch(api, projectId, props, parentId);
        }
      }

      if (response.operations && response.operations.length > 0) {
        await waitForOperations(api, response.operations);
      }

      if (response.branch?.id) {
        const getResponse = await api.get(
          `/projects/${projectId}/branches/${response.branch.id}`,
        );
        if (!getResponse.ok) {
          await handleApiError(
            getResponse,
            "get",
            "branch",
            response.branch.id,
          );
        }
        response = await getResponse.json();
      }

      const branch = response.branch;
      return this({
        project: props.project,
        parent: props.parent,
        name: props.name,
        parentLsn: props.parentLsn,
        parentTimestamp: props.parentTimestamp,
        adopt: props.adopt,
        id: branch.id,
        currentState: branch.currentState,
        pendingState: branch.pendingState,
        logicalSize: branch.logicalSize,
        physicalSize: branch.physicalSize,
        createdAt: branch.createdAt,
        updatedAt: branch.updatedAt,
        primary: branch.primary,
        default: branch.default,
        protected: branch.protected,
        cpuUsedSec: branch.cpuUsedSec,
        computeTimeSeconds: branch.computeTimeSeconds,
        activeTimeSeconds: branch.activeTimeSeconds,
        writtenDataBytes: branch.writtenDataBytes,
        dataTransferBytes: branch.dataTransferBytes,
        baseUrl: props.baseUrl,
      });
    } catch (error: unknown) {
      if ((error as { status?: number }).status === 404) {
        throw new Error(`Project ${projectId} not found`);
      }
      throw error;
    }
  },
);

async function createNewBranch(
  api: NeonApi,
  projectId: string,
  props: BranchProps,
  parentId?: string,
): Promise<NeonBranchApiResponse> {
  const createPayload: CreateBranchPayload = {
    branch: {},
  };

  if (props.name !== undefined) {
    createPayload.branch.name = props.name;
  }
  if (parentId !== undefined) {
    createPayload.branch.parent_id = parentId;
  }
  if (props.parentLsn !== undefined) {
    createPayload.branch.parent_lsn = props.parentLsn;
  }
  if (props.parentTimestamp !== undefined) {
    createPayload.branch.parent_timestamp = props.parentTimestamp;
  }

  const createResponse = await api.post(
    `/projects/${projectId}/branches`,
    createPayload,
  );

  if (!createResponse.ok) {
    await handleApiError(createResponse, "create", "branch");
  }

  return await createResponse.json();
}

interface NeonBranchType {
  projectId: string;
  id: string;
  parentId?: string;
  parentLsn?: string;
  parentTimestamp?: string;
  name: string;
  currentState: BranchState;
  pendingState?: BranchState;
  logicalSize?: number;
  physicalSize?: number;
  createdAt: string;
  updatedAt: string;
  primary: boolean;
  default: boolean;
  protected: boolean;
  cpuUsedSec?: number;
  computeTimeSeconds?: number;
  activeTimeSeconds?: number;
  writtenDataBytes?: number;
  dataTransferBytes?: number;
}

interface NeonBranchApiResponse {
  branch: NeonBranchType;
  operations?: NeonOperation[];
}

interface CreateBranchPayload {
  branch: {
    name?: string;
    parent_id?: string;
    parent_lsn?: string;
    parent_timestamp?: string;
  };
}

interface UpdateBranchPayload {
  branch: {
    name?: string;
  };
}

interface ListBranchesResponse {
  branches?: NeonBranchType[];
}

async function waitForOperations(
  api: NeonApi,
  operations: NeonOperation[],
): Promise<void> {
  const maxWaitTime = 300000;
  const pollInterval = 2000;

  for (const operation of operations) {
    let totalWaitTime = 0;

    while (totalWaitTime < maxWaitTime) {
      const opResponse = await api.get(
        `/projects/${operation.projectId}/operations/${operation.id}`,
      );

      if (!opResponse.ok) {
        await handleApiError(opResponse, "get", "operation", operation.id);
      }

      const opData: { operation: NeonOperation } = await opResponse.json();
      const currentOp = opData.operation;

      if (currentOp.status === "finished") {
        break;
      }

      if (currentOp.status === "failed") {
        throw new Error(
          `Operation ${operation.id} (${operation.action}) failed: ${currentOp.error || "Unknown error"}`,
        );
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      totalWaitTime += pollInterval;
    }

    if (totalWaitTime >= maxWaitTime) {
      throw new Error(
        `Timeout waiting for operation ${operation.id} (${operation.action}) to complete`,
      );
    }
  }

  return;
}

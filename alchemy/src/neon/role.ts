import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createNeonApi, type NeonApiOptions, type NeonApi } from "./api.ts";
import type { Project } from "./project.ts";
import type { Branch } from "./branch.ts";

/**
 * Properties for creating or updating a Neon role
 */
export interface RoleProps extends NeonApiOptions {
  /**
   * The project containing the branch
   */
  project: string | Project;

  /**
   * The branch where the role will be created
   */
  branch: string | Branch;

  /**
   * Name of the role
   */
  name: string;

  /**
   * Whether to adopt an existing role if it already exists
   * @default false
   */
  adopt?: boolean;
}

/**
 * A Neon database role with permissions
 */
export interface Role
  extends Resource<"neon::Role">,
    Omit<RoleProps, "apiKey"> {
  /**
   * The project containing this role
   */
  project: string | Project;

  /**
   * The branch containing this role
   */
  branch: string | Branch;

  /**
   * Name of the role
   */
  name: string;

  /**
   * Password for the role (if available)
   */
  password?: Secret;

  /**
   * Whether this role is protected from deletion
   */
  protected: boolean;

  /**
   * Time at which the role was created
   */
  createdAt: string;

  /**
   * Time at which the role was last updated
   */
  updatedAt: string;
}

/**
 * Creates a Neon database role with permissions.
 *
 * @example
 * // Create a basic role for application access:
 * const role = await Role("app-user", {
 *   project: project,
 *   branch: branch,
 *   name: "app_user"
 * });
 *
 * @example
 * // Create a role for read-only access:
 * const role = await Role("readonly-user", {
 *   project: project,
 *   branch: branch,
 *   name: "readonly_user"
 * });
 *
 * @example
 * // Adopt an existing role if it already exists:
 * const role = await Role("existing-role", {
 *   project: project,
 *   branch: branch,
 *   name: "legacy_user",
 *   adopt: true
 * });
 */
export const Role = Resource(
  "neon::Role",
  async function (
    this: Context<Role>,
    _id: string,
    props: RoleProps,
  ): Promise<Role> {
    const api = createNeonApi(props);
    const roleName = this.output?.name;
    const projectId =
      typeof props.project === "string" ? props.project : props.project.id;
    const branchId =
      typeof props.branch === "string" ? props.branch : props.branch.id;

    if (this.phase === "delete") {
      if (!roleName) {
        return this.destroy();
      }

      try {
        const deleteResponse = await api.delete(
          `/projects/${projectId}/branches/${branchId}/roles/${props.name}`,
        );

        if (deleteResponse.status === 404) {
          return this.destroy();
        }

        if (!deleteResponse.ok) {
          await handleApiError(deleteResponse, "delete", "role", props.name);
        }

        const deleteData: NeonRoleApiResponse = await deleteResponse.json();
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

    let response: NeonRoleApiResponse;

    try {
      if (this.phase === "update" && roleName) {
        const getResponse = await api.get(
          `/projects/${projectId}/branches/${branchId}/roles/${props.name}`,
        );
        if (!getResponse.ok) {
          await handleApiError(getResponse, "get", "role", props.name);
        }
        response = await getResponse.json();
      } else {
        if (props.adopt) {
          const getResponse = await api.get(
            `/projects/${projectId}/branches/${branchId}/roles/${props.name}`,
          );
          if (getResponse.ok) {
            response = await getResponse.json();
          } else if (getResponse.status === 404) {
            response = await createNewRole(api, projectId, branchId, props);
          } else {
            await handleApiError(getResponse, "get", "role", props.name);
            throw new Error("Unreachable");
          }
        } else {
          response = await createNewRole(api, projectId, branchId, props);
        }
      }

      if (response.operations && response.operations.length > 0) {
        await waitForOperations(api, response.operations);
      }

      const role = response.role;
      return this({
        project: props.project,
        branch: props.branch,
        name: role.name,
        password: role.password,
        protected: role.protected,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
        baseUrl: props.baseUrl,
      });
    } catch (error: unknown) {
      if ((error as { status?: number }).status === 404) {
        throw new Error(`Branch ${branchId} not found in project ${projectId}`);
      }
      throw error;
    }
  },
);

async function createNewRole(
  api: NeonApi,
  projectId: string,
  branchId: string,
  props: NeonRoleProps,
): Promise<NeonRoleApiResponse> {
  const createPayload: CreateRolePayload = {
    role: {
      name: props.name,
    },
  };

  const createResponse = await api.post(
    `/projects/${projectId}/branches/${branchId}/roles`,
    createPayload,
  );

  if (!createResponse.ok) {
    await handleApiError(createResponse, "create", "role");
  }

  return await createResponse.json();
}

interface NeonOperation {
  id: string;
  projectId: string;
  branchId?: string;
  endpointId?: string;
  action: string;
  status: "running" | "finished" | "failed" | "scheduling";
  error?: string;
  failuresCount: number;
  createdAt: string;
  updatedAt: string;
}

interface NeonRoleType {
  branchId: string;
  name: string;
  password?: Secret;
  protected: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NeonRoleApiResponse {
  role: NeonRoleType;
  operations?: NeonOperation[];
}

interface CreateRolePayload {
  role: {
    name: string;
  };
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

import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { createRailwayApi, type RailwayApi } from "./api.ts";
import type { Project } from "./project.ts";

export interface EnvironmentProps {
  /**
   * The name of the environment
   */
  name: string;

  /**
   * The project this environment belongs to. Can be a Project resource or project ID string
   */
  project: string | Project;

  /**
   * Railway API token to use for authentication. Defaults to RAILWAY_TOKEN environment variable
   */
  apiKey?: Secret;
}

export interface Environment
  extends Resource<"railway::Environment">,
    Omit<EnvironmentProps, "project"> {
  /**
   * The unique identifier of the environment
   */
  id: string;

  /**
   * The ID of the project this environment belongs to
   */
  projectId: string;

  /**
   * The timestamp when the environment was created
   */
  createdAt: string;

  /**
   * The timestamp when the environment was last updated
   */
  updatedAt: string;
}

// GraphQL operations
const ENVIRONMENT_CREATE_MUTATION = `
  mutation EnvironmentCreate($input: EnvironmentCreateInput!) {
    environmentCreate(input: $input) {
      id
      name
      projectId
      createdAt
      updatedAt
    }
  }
`;

const ENVIRONMENT_UPDATE_MUTATION = `
  mutation EnvironmentUpdate($id: String!, $input: EnvironmentUpdateInput!) {
    environmentUpdate(id: $id, input: $input) {
      id
      name
      projectId
      createdAt
      updatedAt
    }
  }
`;

const ENVIRONMENT_DELETE_MUTATION = `
  mutation EnvironmentDelete($id: String!) {
    environmentDelete(id: $id)
  }
`;

/**
 * Create and manage Railway environments
 *
 * @example
 * ```typescript
 * // Create a staging environment
 * const staging = await Environment("staging-env", {
 *   name: "staging",
 *   project: project,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a production environment
 * const production = await Environment("prod-env", {
 *   name: "production",
 *   project: project,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a development environment with custom auth
 * const development = await Environment("dev-env", {
 *   name: "development",
 *   project: "project-id-string",
 *   apiKey: secret("dev-railway-token"),
 * });
 * ```
 */
export const Environment = Resource(
  "railway::Environment",
  async function (
    this: Context<Environment>,
    _id: string,
    props: EnvironmentProps,
  ): Promise<Environment> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      if (this.output?.id) {
        await deleteEnvironment(api, this.output.id);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const environment = await updateEnvironment(api, this.output.id, props);

      return this({
        id: environment.id,
        name: environment.name,
        projectId: environment.projectId,
        createdAt: environment.createdAt,
        updatedAt: environment.updatedAt,
      });
    }

    const environment = await createEnvironment(api, props);

    return this({
      id: environment.id,
      name: environment.name,
      projectId: environment.projectId,
      createdAt: environment.createdAt,
      updatedAt: environment.updatedAt,
    });
  },
);

export async function createEnvironment(api: RailwayApi, props: EnvironmentProps) {
  const projectId =
    typeof props.project === "string" ? props.project : props.project.id;

  const response = await api.mutate(ENVIRONMENT_CREATE_MUTATION, {
    input: {
      name: props.name,
      projectId: projectId,
    },
  });

  const environment = response.data?.environmentCreate;
  if (!environment) {
    throw new Error("Failed to create Railway environment");
  }

  return environment;
}

export async function updateEnvironment(
  api: RailwayApi,
  id: string,
  props: EnvironmentProps,
) {
  const response = await api.mutate(ENVIRONMENT_UPDATE_MUTATION, {
    id,
    input: {
      name: props.name,
    },
  });

  const environment = response.data?.environmentUpdate;
  if (!environment) {
    throw new Error("Failed to update Railway environment");
  }

  return environment;
}

export async function deleteEnvironment(api: RailwayApi, id: string) {
  await api.mutate(ENVIRONMENT_DELETE_MUTATION, { id });
}

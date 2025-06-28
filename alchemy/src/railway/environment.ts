import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import {
  RailwayApiError,
  createRailwayApi,
  fragments,
  isResourceNotFoundError,
  type RailwayApiOptions,
} from "./api.ts";
import type { Project } from "./project.ts";

/**
 * Properties for creating or updating a Railway environment
 */
export interface EnvironmentProps extends RailwayApiOptions {
  /**
   * Name of the environment
   */
  name: string;

  /**
   * Project this environment belongs to
   */
  project: string | Project;

  /**
   * Whether this is the production environment
   * @default false
   */
  isProduction?: boolean;
}

/**
 * A Railway environment
 */
export interface Environment extends Resource<"railway::environment"> {
  /**
   * Environment ID
   */
  environmentId: string;

  /**
   * Environment name
   */
  name: string;

  /**
   * Project ID this environment belongs to
   */
  projectId: string;

  /**
   * Whether this is the production environment
   */
  isProduction: boolean;

  /**
   * Time at which the environment was created
   */
  createdAt: string;

  /**
   * Time at which the environment was updated
   */
  updatedAt: string;
}

/**
 * Railway environment from API response
 */
interface RailwayEnvironmentResponse {
  id: string;
  name: string;
  projectId: string;
  isProduction: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create or update a Railway environment
 *
 * @example
 * ## Basic Environment
 *
 * Create a staging environment for a project.
 *
 * ```ts
 * const project = await Project("my-app", { name: "My App" });
 *
 * const environment = await Environment("staging", {
 *   name: "staging",
 *   project: project
 * });
 * ```
 *
 * @example
 * ## Production Environment
 *
 * Create a production environment.
 *
 * ```ts
 * const environment = await Environment("production", {
 *   name: "production",
 *   project: "project-id-here",
 *   isProduction: true
 * });
 * ```
 */
export const Environment = Resource(
  "railway::environment",
  async function (
    this: Context<Environment>,
    id: string,
    props: EnvironmentProps,
  ): Promise<Environment> {
    const api = createRailwayApi(props);
    const projectId =
      typeof props.project === "string"
        ? props.project
        : props.project.projectId;

    if (this.phase === "delete") {
      if (this.output?.environmentId) {
        await deleteEnvironment(api, this.output.environmentId);
      }
      return this.destroy();
    }

    if (this.phase === "create") {
      logger.log(`Creating new Railway environment: ${props.name}`);
      return createEnvironment(api, projectId, props);
    }

    if (this.phase === "update") {
      const existingEnvironment = this.output;
      logger.log(`Updating existing Railway environment: ${props.name}`);
      return updateEnvironment(api, existingEnvironment.environmentId, props);
    }

    // Fallback for initial creation (when there's no existing environment)
    const existingEnvironment = await findExistingEnvironment(
      api,
      projectId,
      props.name,
    );
    if (existingEnvironment) {
      logger.log(`Updating existing Railway environment: ${props.name}`);
      return updateEnvironment(api, existingEnvironment.id, props);
    } else {
      logger.log(`Creating new Railway environment: ${props.name}`);
      return createEnvironment(api, projectId, props);
    }
  },
);

/**
 * Find an existing environment by name within a project
 */
async function findExistingEnvironment(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  name: string,
): Promise<RailwayEnvironmentResponse | null> {
  try {
    const query = `
      ${fragments.environment}
      
      query findEnvironment($projectId: String!) {
        project(id: $projectId) {
          environments {
            edges {
              node {
                ...EnvironmentFields
              }
            }
          }
        }
      }
    `;

    const response = await api.query<{
      project: {
        environments: {
          edges: Array<{
            node: RailwayEnvironmentResponse;
          }>;
        };
      };
    }>(query, { projectId });

    const environment = response.project.environments.edges.find(
      (edge) => edge.node.name === name,
    );

    return environment?.node || null;
  } catch (error) {
    if (error instanceof RailwayApiError) {
      logger.warn(`Failed to find existing environment: ${error.message}`);
      return null;
    }
    throw error;
  }
}

/**
 * Create a new environment
 */
async function createEnvironment(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  props: EnvironmentProps,
): Promise<Environment> {
  const mutation = `
    ${fragments.environment}
    
    mutation createEnvironment($input: EnvironmentCreateInput!) {
      environmentCreate(input: $input) {
        ...EnvironmentFields
      }
    }
  `;

  const variables = {
    input: {
      name: props.name,
      projectId,
      isProduction: props.isProduction ?? false,
    },
  };

  const response = await api.mutate<{
    environmentCreate: RailwayEnvironmentResponse;
  }>(mutation, variables);

  return mapToEnvironment(response.environmentCreate);
}

/**
 * Update an existing environment
 */
async function updateEnvironment(
  api: ReturnType<typeof createRailwayApi>,
  environmentId: string,
  props: EnvironmentProps,
): Promise<Environment> {
  const mutation = `
    ${fragments.environment}
    
    mutation updateEnvironment($id: String!, $input: EnvironmentUpdateInput!) {
      environmentUpdate(id: $id, input: $input) {
        ...EnvironmentFields
      }
    }
  `;

  const variables = {
    id: environmentId,
    input: {
      name: props.name,
      isProduction: props.isProduction ?? false,
    },
  };

  const response = await api.mutate<{
    environmentUpdate: RailwayEnvironmentResponse;
  }>(mutation, variables);

  return mapToEnvironment(response.environmentUpdate);
}

/**
 * Map Railway API response to Environment resource
 */
function mapToEnvironment(
  environment: RailwayEnvironmentResponse,
): Environment {
  return {
    environmentId: environment.id,
    name: environment.name,
    projectId: environment.projectId,
    isProduction: environment.isProduction,
    createdAt: environment.createdAt,
    updatedAt: environment.updatedAt,
  } as Environment;
}

/**
 * Delete a Railway environment
 */
export async function deleteEnvironment(
  api: ReturnType<typeof createRailwayApi>,
  environmentId: string,
): Promise<void> {
  const mutation = `
    mutation deleteEnvironment($id: String!) {
      environmentDelete(id: $id)
    }
  `;

  try {
    logger.log(`Attempting to delete Railway environment: ${environmentId}`);
    const result = await api.mutate(mutation, { id: environmentId });
    logger.log("Delete mutation result:", result);
    logger.log(`Successfully deleted Railway environment: ${environmentId}`);
  } catch (error) {
    // Check if it's a "not found" error - these are safe to ignore during deletion
    if (isResourceNotFoundError(error)) {
      logger.log(
        `Railway environment ${environmentId} was already deleted or doesn't exist`,
      );
      return; // No-op for not found errors
    }

    // Re-throw all other errors
    logger.error(
      `Failed to delete Railway environment ${environmentId}:`,
      error,
    );
    throw error;
  }
}

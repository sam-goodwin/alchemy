import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import {
  RailwayApiError,
  createRailwayApi,
  fragments,
  isResourceNotFoundError,
  type RailwayApiOptions,
} from "./api.ts";
import type { Environment } from "./environment.ts";
import type { Project } from "./project.ts";

/**
 * Properties for creating or updating a Railway variable
 */
export interface VariableProps extends RailwayApiOptions {
  /**
   * Name of the variable
   */
  name: string;

  /**
   * Value of the variable
   */
  value: string | Secret;

  /**
   * Project this variable belongs to
   */
  project: string | Project;

  /**
   * Environment this variable belongs to
   */
  environment: string | Environment;

  /**
   * Service this variable is scoped to (optional)
   * If not provided, the variable will be shared across the environment
   */
  service?: string;

  /**
   * Plugin this variable is scoped to (optional)
   * If not provided, the variable will be shared across the environment
   */
  plugin?: string;
}

/**
 * A Railway environment variable
 */
export interface Variable extends Resource<"railway::variable"> {
  /**
   * Variable ID
   */
  variableId: string;

  /**
   * Variable name
   */
  name: string;

  /**
   * Variable value
   */
  value: string;

  /**
   * Project ID this variable belongs to
   */
  projectId: string;

  /**
   * Environment ID this variable belongs to
   */
  environmentId: string;

  /**
   * Service ID this variable is scoped to (if applicable)
   */
  serviceId?: string;

  /**
   * Plugin ID this variable is scoped to (if applicable)
   */
  pluginId?: string;

  /**
   * Time at which the variable was created
   */
  createdAt: string;

  /**
   * Time at which the variable was updated
   */
  updatedAt: string;
}

/**
 * Railway variable from API response
 */
interface RailwayVariableResponse {
  id: string;
  name: string;
  value: string;
  projectId: string;
  environmentId: string;
  serviceId?: string;
  pluginId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create or update a Railway variable
 *
 * @example
 * ## Environment Variable
 *
 * Create a shared environment variable accessible to all services.
 *
 * ```ts
 * const project = await Project("my-app", { name: "My App" });
 * const environment = await Environment("production", {
 *   name: "production",
 *   project: project
 * });
 *
 * const variable = await Variable("database-url", {
 *   name: "DATABASE_URL",
 *   value: "postgresql://user:pass@host:5432/db",
 *   project: project,
 *   environment: environment
 * });
 * ```
 *
 * @example
 * ## Service-Scoped Variable
 *
 * Create a variable scoped to a specific service.
 *
 * ```ts
 * const variable = await Variable("api-key", {
 *   name: "API_KEY",
 *   value: secret("my-api-key"),
 *   project: "project-id",
 *   environment: "environment-id",
 *   service: "service-id"
 * });
 * ```
 */
export const Variable = Resource(
  "railway::variable",
  async function (
    this: Context<Variable>,
    id: string,
    props: VariableProps,
  ): Promise<Variable> {
    const api = createRailwayApi(props);
    const projectId =
      typeof props.project === "string"
        ? props.project
        : props.project.projectId;
    const environmentId =
      typeof props.environment === "string"
        ? props.environment
        : props.environment.environmentId;
    const value =
      typeof props.value === "string" ? props.value : props.value.unencrypted;

    // Handle delete phase
    if (this.phase === "delete") {
      if (this.output?.variableId) {
        await deleteVariable(api, this.output.variableId);
      }
      return this.destroy();
    }

    // Handle update phase
    if (this.phase === "update") {
      logger.log(`Updating existing Railway variable: ${props.name}`);
      return updateVariable(api, this.output.variableId, value);
    }

    // Handle create phase
    if (this.phase === "create") {
      logger.log(`Creating new Railway variable: ${props.name}`);
      return createVariable(api, {
        name: props.name,
        value,
        projectId,
        environmentId,
        serviceId: props.service,
        pluginId: props.plugin,
      });
    }

    // Initial creation - check if variable already exists
    const existingVariable = await findExistingVariable(
      api,
      projectId,
      environmentId,
      props.name,
      props.service,
      props.plugin,
    );

    if (existingVariable) {
      logger.log(`Found existing Railway variable: ${props.name}`);
      return updateVariable(api, existingVariable.id, value);
    } else {
      logger.log(`Creating new Railway variable: ${props.name}`);
      return createVariable(api, {
        name: props.name,
        value,
        projectId,
        environmentId,
        serviceId: props.service,
        pluginId: props.plugin,
      });
    }
  },
);

/**
 * Find an existing variable by name and scope
 */
async function findExistingVariable(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  name: string,
  serviceId?: string,
  pluginId?: string,
): Promise<RailwayVariableResponse | null> {
  try {
    const query = `
      ${fragments.variable}
      
      query findVariable($projectId: String!, $environmentId: String!, $serviceId: String, $pluginId: String) {
        variables(
          projectId: $projectId
          environmentId: $environmentId
          serviceId: $serviceId
          pluginId: $pluginId
        ) {
          ...VariableFields
        }
      }
    `;

    const response = await api.query<{
      variables: RailwayVariableResponse[];
    }>(query, {
      projectId,
      environmentId,
      serviceId,
      pluginId,
    });

    const variable = response.variables.find((v) => v.name === name);
    return variable || null;
  } catch (error) {
    if (error instanceof RailwayApiError) {
      logger.warn(`Failed to find existing variable: ${error.message}`);
      return null;
    }
    throw error;
  }
}

/**
 * Create a new variable
 */
async function createVariable(
  api: ReturnType<typeof createRailwayApi>,
  input: {
    name: string;
    value: string;
    projectId: string;
    environmentId: string;
    serviceId?: string;
    pluginId?: string;
  },
): Promise<Variable> {
  const mutation = `
    ${fragments.variable}
    
    mutation createVariable($input: VariableUpsertInput!) {
      variableUpsert(input: $input) {
        ...VariableFields
      }
    }
  `;

  const variables = {
    input,
  };

  const response = await api.mutate<{
    variableUpsert: RailwayVariableResponse;
  }>(mutation, variables);

  return mapToVariable(response.variableUpsert);
}

/**
 * Update an existing variable
 */
async function updateVariable(
  api: ReturnType<typeof createRailwayApi>,
  variableId: string,
  value: string,
): Promise<Variable> {
  const mutation = `
    ${fragments.variable}
    
    mutation updateVariable($id: String!, $input: VariableUpdateInput!) {
      variableUpdate(id: $id, input: $input) {
        ...VariableFields
      }
    }
  `;

  const variables = {
    id: variableId,
    input: {
      value,
    },
  };

  const response = await api.mutate<{
    variableUpdate: RailwayVariableResponse;
  }>(mutation, variables);

  return mapToVariable(response.variableUpdate);
}

/**
 * Map Railway API response to Variable resource
 */
function mapToVariable(variable: RailwayVariableResponse): Variable {
  return {
    variableId: variable.id,
    name: variable.name,
    value: variable.value,
    projectId: variable.projectId,
    environmentId: variable.environmentId,
    serviceId: variable.serviceId,
    pluginId: variable.pluginId,
    createdAt: variable.createdAt,
    updatedAt: variable.updatedAt,
  } as Variable;
}

/**
 * Delete a Railway variable
 */
export async function deleteVariable(
  api: ReturnType<typeof createRailwayApi>,
  variableId: string,
): Promise<void> {
  const mutation = `
    mutation deleteVariable($id: String!) {
      variableDelete(id: $id)
    }
  `;

  try {
    logger.log(`Attempting to delete Railway variable: ${variableId}`);
    const result = await api.mutate(mutation, { id: variableId });
    logger.log("Delete mutation result:", result);
    logger.log(`Successfully deleted Railway variable: ${variableId}`);
  } catch (error) {
    // Check if it's a "not found" error - these are safe to ignore during deletion
    if (isResourceNotFoundError(error)) {
      logger.log(
        `Railway variable ${variableId} was already deleted or doesn't exist`,
      );
      return; // No-op for not found errors
    }

    // Re-throw all other errors
    logger.error(`Failed to delete Railway variable ${variableId}:`, error);
    throw error;
  }
}

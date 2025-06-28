import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { type Secret, secret } from "../secret.ts";
import { createRailwayApi, type RailwayApi } from "./api.ts";
import type { Environment } from "./environment.ts";
import type { Service } from "./service.ts";

export interface VariableProps {
  /**
   * The name of the environment variable
   */
  name: string;

  /**
   * The value of the environment variable
   */
  value: Secret | string;

  /**
   * The environment this variable belongs to. Can be an Environment resource or environment ID string
   */
  environment: string | Environment;

  /**
   * The service this variable belongs to. Can be a Service resource or service ID string
   */
  service: string | Service;

  /**
   * Railway API token to use for authentication. Defaults to RAILWAY_TOKEN environment variable
   */
  apiKey?: Secret;
}

export interface Variable
  extends Resource<"railway::Variable">,
    Omit<VariableProps, "value" | "environment" | "service"> {
  /**
   * The unique identifier of the variable
   */
  id: string;

  /**
   * The value of the environment variable
   */
  value: Secret;

  /**
   * The ID of the environment this variable belongs to
   */
  environmentId: string;

  /**
   * The ID of the service this variable belongs to
   */
  serviceId: string;

  /**
   * The timestamp when the variable was created
   */
  createdAt: string;

  /**
   * The timestamp when the variable was last updated
   */
  updatedAt: string;
}

/**
 * Create and manage Railway environment variables
 *
 * @example
 * ```typescript
 * // Create a basic environment variable
 * const dbUrl = await Variable("db-url", {
 *   name: "DATABASE_URL",
 *   value: "postgresql://user:pass@localhost:5432/db",
 *   environment: environment,
 *   service: service,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a secret environment variable
 * const apiKey = await Variable("api-key", {
 *   name: "API_KEY",
 *   value: secret("super-secret-key"),
 *   environment: "environment-id-string",
 *   service: "service-id-string",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a variable with database connection string
 * const dbConnection = await Variable("db-connection", {
 *   name: "DATABASE_URL",
 *   value: database.connectionString,
 *   environment: environment,
 *   service: service,
 * });
 * ```
 */
export const Variable = Resource(
  "railway::Variable",
  async function (
    this: Context<Variable>,
    _id: string,
    props: VariableProps,
  ): Promise<Variable> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      if (this.output?.id) {
        await deleteVariable(api, this.output.id);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const variable = await updateVariable(api, this.output.id, props);

      return this({
        id: variable.id,
        name: variable.name,
        value: secret(variable.value),
        environmentId: variable.environmentId,
        serviceId: variable.serviceId,
        createdAt: variable.createdAt,
        updatedAt: variable.updatedAt,
      });
    }

    const variable = await createVariable(api, props);

    return this({
      id: variable.id,
      name: variable.name,
      value: secret(variable.value),
      environmentId: variable.environmentId,
      serviceId: variable.serviceId,
      createdAt: variable.createdAt,
      updatedAt: variable.updatedAt,
    });
  },
);

const VARIABLE_CREATE_MUTATION = `
  mutation VariableCreate($input: VariableCreateInput!) {
    variableCreate(input: $input) {
      id
      name
      value
      environmentId
      serviceId
      createdAt
      updatedAt
    }
  }
`;

const VARIABLE_UPDATE_MUTATION = `
  mutation VariableUpdate($id: String!, $input: VariableUpdateInput!) {
    variableUpdate(id: $id, input: $input) {
      id
      name
      value
      environmentId
      serviceId
      createdAt
      updatedAt
    }
  }
`;

const VARIABLE_DELETE_MUTATION = `
  mutation VariableDelete($id: String!) {
    variableDelete(id: $id)
  }
`;

export async function createVariable(api: RailwayApi, props: VariableProps) {
  const environmentId =
    typeof props.environment === "string"
      ? props.environment
      : props.environment.id;
  const serviceId =
    typeof props.service === "string" ? props.service : props.service.id;

  const response = await api.mutate(
    VARIABLE_CREATE_MUTATION,
    {
      input: {
        name: props.name,
        value:
          typeof props.value === "string"
            ? props.value
            : props.value.unencrypted,
        environmentId: environmentId,
        serviceId: serviceId,
      },
    },
  );

  const variable = response.data?.variableCreate;
  if (!variable) {
    throw new Error("Failed to create Railway variable");
  }

  return variable;
}

export async function updateVariable(
  api: RailwayApi,
  id: string,
  props: VariableProps,
) {
  const response = await api.mutate(
    VARIABLE_UPDATE_MUTATION,
    {
      id,
      input: {
        name: props.name,
        value:
          typeof props.value === "string"
            ? props.value
            : props.value.unencrypted,
      },
    },
  );

  const variable = response.data?.variableUpdate;
  if (!variable) {
    throw new Error("Failed to update Railway variable");
  }

  return variable;
}

export async function deleteVariable(api: RailwayApi, id: string) {
  await api.mutate(
    VARIABLE_DELETE_MUTATION,
    { id },
  );
}

import type { Secret } from "../secret.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { safeFetch } from "../util/safe-fetch.ts";

/**
 * Railway API token types
 */
export type RailwayTokenType = "account" | "team" | "project";

/**
 * Options for Railway API requests
 */
export interface RailwayApiOptions {
  /**
   * Base URL for Railway GraphQL API
   * @default https://backboard.railway.com/graphql/v2
   */
  baseUrl?: string;

  /**
   * API Token to use (overrides RAILWAY_TOKEN env var)
   */
  token?: Secret;

  /**
   * Type of token being used
   * @default "account"
   */
  tokenType?: RailwayTokenType;
}

/**
 * Railway GraphQL Error
 */
export interface RailwayGraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: Array<string | number>;
  extensions?: Record<string, unknown>;
}

/**
 * Railway GraphQL Response
 */
export interface RailwayGraphQLResponse<T = unknown> {
  data?: T;
  errors?: RailwayGraphQLError[];
  extensions?: Record<string, unknown>;
}

/**
 * Railway API Error
 */
export class RailwayApiError extends Error {
  constructor(
    message: string,
    public readonly errors?: RailwayGraphQLError[],
    public readonly response?: Response,
  ) {
    super(message);
    this.name = "RailwayApiError";
  }
}

/**
 * Get authentication headers for Railway API
 */
export async function getRailwayAuthHeaders(
  options: Partial<RailwayApiOptions>,
): Promise<Record<string, string>> {
  const token = options.token?.unencrypted ?? process.env.RAILWAY_TOKEN;

  if (!token) {
    throw new Error(
      "Railway API token is required. Set RAILWAY_TOKEN environment variable or provide token option.",
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Use different auth headers based on token type
  if (options.tokenType === "project") {
    headers["Project-Access-Token"] = token;
  } else {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Railway GraphQL API client
 */
export class RailwayApi {
  private readonly baseUrl: string;
  private readonly options: RailwayApiOptions;

  constructor(options: RailwayApiOptions = {}) {
    this.baseUrl =
      options.baseUrl ?? "https://backboard.railway.com/graphql/v2";
    this.options = {
      tokenType: "account",
      ...options,
    };
  }

  /**
   * Execute a GraphQL query
   */
  async query<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    return this.request<T>(query, variables);
  }

  /**
   * Execute a GraphQL mutation
   */
  async mutate<T = unknown>(
    mutation: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    return this.request<T>(mutation, variables);
  }

  /**
   * Execute a GraphQL request with retry logic
   */
  private async request<T>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    return withExponentialBackoff(
      async () => {
        const headers = await getRailwayAuthHeaders(this.options);

        const body = JSON.stringify({
          query,
          variables,
        });

        const response = await safeFetch(this.baseUrl, {
          method: "POST",
          headers,
          body,
        });

        if (!response.ok) {
          let errorDetails = "";
          try {
            const errorBody = await response.text();
            errorDetails = errorBody ? ` - ${errorBody}` : "";
          } catch {
            // Ignore if we can't read the response body
          }
          throw new RailwayApiError(
            `Railway API request failed: ${response.status} ${response.statusText}${errorDetails}`,
            undefined,
            response,
          );
        }

        const result: RailwayGraphQLResponse<T> = await response.json();

        if (result.errors && result.errors.length > 0) {
          const errorMessage = result.errors
            .map((error) => error.message)
            .join(", ");
          throw new RailwayApiError(
            `GraphQL errors: ${errorMessage}`,
            result.errors,
            response,
          );
        }

        if (!result.data) {
          throw new RailwayApiError(
            "No data returned from GraphQL query",
            result.errors,
            response,
          );
        }

        return result.data;
      },
      (error) => {
        // Retry on network errors or server errors (5xx)
        return error instanceof RailwayApiError
          ? (error.response?.status ?? 0) >= 500
          : true;
      },
      3,
    );
  }

  /**
   * Get schema introspection query
   */
  async introspect(): Promise<unknown> {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          queryType {
            name
          }
          mutationType {
            name
          }
          subscriptionType {
            name
          }
          types {
            ...FullType
          }
          directives {
            name
            description
            locations
            args {
              ...InputValue
            }
          }
        }
      }

      fragment FullType on __Type {
        kind
        name
        description
        fields(includeDeprecated: true) {
          name
          description
          args {
            ...InputValue
          }
          type {
            ...TypeRef
          }
          isDeprecated
          deprecationReason
        }
        inputFields {
          ...InputValue
        }
        interfaces {
          ...TypeRef
        }
        enumValues(includeDeprecated: true) {
          name
          description
          isDeprecated
          deprecationReason
        }
        possibleTypes {
          ...TypeRef
        }
      }

      fragment InputValue on __InputValue {
        name
        description
        type {
          ...TypeRef
        }
        defaultValue
      }

      fragment TypeRef on __Type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    return this.query(introspectionQuery);
  }
}

/**
 * Create a Railway API instance with environment variable fallback
 */
export function createRailwayApi(
  options: Partial<RailwayApiOptions> = {},
): RailwayApi {
  return new RailwayApi(options);
}

/**
 * Check if an error indicates a resource doesn't exist or operation isn't supported
 * Used in delete operations to determine if the error can be safely ignored
 */
export function isResourceNotFoundError(error: unknown): boolean {
  if (!(error instanceof RailwayApiError)) {
    return false;
  }

  const errorMessage = error.message.toLowerCase();
  return (
    errorMessage.includes("not found") ||
    errorMessage.includes("does not exist") ||
    (errorMessage.includes("no ") && errorMessage.includes(" found")) ||
    errorMessage.includes("problem processing request")
  );
}

/**
 * Common GraphQL fragments for Railway resources
 */
export const fragments = {
  project: `
    fragment ProjectFields on Project {
      id
      name
      description
      createdAt
      updatedAt
    }
  `,
  environment: `
    fragment EnvironmentFields on Environment {
      id
      name
      projectId
      createdAt
      updatedAt
    }
  `,
  service: `
    fragment ServiceFields on Service {
      id
      name
      projectId
      environmentId
      createdAt
      updatedAt
    }
  `,
  deployment: `
    fragment DeploymentFields on Deployment {
      id
      serviceId
      status
      url
      createdAt
      updatedAt
    }
  `,
  variable: `
    fragment VariableFields on Variable {
      id
      name
      value
      projectId
      environmentId
      serviceId
      createdAt
      updatedAt
    }
  `,
};

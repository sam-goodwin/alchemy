import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { sleep } from "../util/sleep.ts";
import {
  RailwayApiError,
  createRailwayApi,
  isResourceNotFoundError,
  type RailwayApiOptions,
} from "./api.ts";
import type { Environment } from "./environment.ts";
import type { Project } from "./project.ts";

/**
 * Function runtime configuration
 */
export interface FunctionRuntime {
  /**
   * Runtime version (Bun version)
   * @default "latest"
   */
  version?: string;

  /**
   * Memory limit in MB
   * @default 128
   */
  memoryMB?: number;

  /**
   * Timeout in seconds
   * @default 30
   */
  timeoutSeconds?: number;
}

/**
 * Function trigger configuration
 */
export interface FunctionTrigger {
  /**
   * HTTP trigger configuration
   */
  http?: {
    /**
     * HTTP methods to handle
     * @default ["GET", "POST"]
     */
    methods?: string[];

    /**
     * Custom path for the function
     * @default "/"
     */
    path?: string;
  };

  /**
   * Cron trigger configuration
   */
  cron?: {
    /**
     * Cron expression for scheduling
     * @example "0 0 * * *" // Daily at midnight
     */
    schedule: string;

    /**
     * Timezone for the cron schedule
     * @default "UTC"
     */
    timezone?: string;
  };
}

/**
 * Properties for creating or updating a Railway function
 */
export interface FunctionProps extends RailwayApiOptions {
  /**
   * Name of the function
   */
  name: string;

  /**
   * TypeScript code for the function (max 96KB)
   */
  code: string;

  /**
   * Project this function belongs to
   */
  project: string | Project;

  /**
   * Environment this function belongs to
   */
  environment: string | Environment;

  /**
   * Runtime configuration
   */
  runtime?: FunctionRuntime;

  /**
   * Trigger configuration
   */
  trigger?: FunctionTrigger;

  /**
   * Environment variables for the function
   */
  variables?: Record<string, string>;

  /**
   * NPM packages to install automatically
   * Format: ["package@version", "package"]
   */
  packages?: string[];

  /**
   * Description of the function
   */
  description?: string;
}

/**
 * Function deployment information
 */
export interface FunctionDeployment {
  /**
   * Deployment ID
   */
  id: string;

  /**
   * Function ID
   */
  functionId: string;

  /**
   * Deployment status
   */
  status: "BUILDING" | "DEPLOYING" | "SUCCESS" | "FAILED";

  /**
   * Build logs
   */
  buildLogs?: string;

  /**
   * Deployment URL
   */
  url?: string;

  /**
   * Time at which the deployment was created
   */
  createdAt: string;
}

/**
 * A Railway function (serverless TypeScript execution)
 */
export interface Function extends Resource<"railway::function"> {
  /**
   * Function ID
   */
  functionId: string;

  /**
   * Function name
   */
  name: string;

  /**
   * TypeScript code
   */
  code: string;

  /**
   * Project ID this function belongs to
   */
  projectId: string;

  /**
   * Environment ID this function belongs to
   */
  environmentId: string;

  /**
   * Function URL (if HTTP trigger enabled)
   */
  url?: string;

  /**
   * Current deployment status
   */
  status: "BUILDING" | "DEPLOYING" | "SUCCESS" | "FAILED" | "SLEEPING";

  /**
   * Runtime configuration
   */
  runtime: FunctionRuntime;

  /**
   * Trigger configuration
   */
  trigger?: FunctionTrigger;

  /**
   * Installed NPM packages
   */
  packages?: string[];

  /**
   * Function description
   */
  description?: string;

  /**
   * Code size in bytes
   */
  codeSize: number;

  /**
   * Latest deployment information
   */
  latestDeployment?: FunctionDeployment;

  /**
   * Time at which the function was created
   */
  createdAt: string;

  /**
   * Time at which the function was updated
   */
  updatedAt: string;
}

/**
 * Railway function from API response
 */
interface FunctionResponse {
  id: string;
  name: string;
  code: string;
  projectId: string;
  environmentId: string;
  url?: string;
  status: string;
  runtime: FunctionRuntime;
  trigger?: FunctionTrigger;
  packages?: string[];
  description?: string;
  codeSize: number;
  latestDeployment?: FunctionDeployment;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create or update a Railway function
 *
 * @example
 * ## HTTP API Function
 *
 * Create a simple HTTP API function.
 *
 * ```ts
 * const project = await Project("my-app", { name: "My App" });
 * const environment = await Environment("production", {
 *   name: "production",
 *   project: project
 * });
 *
 * const apiFunction = await Function("api", {
 *   name: "api",
 *   project: project,
 *   environment: environment,
 *   code: `
 *     import { Hono } from "hono@4";
 *
 *     const app = new Hono();
 *
 *     app.get("/", (c) => c.json({ message: "Hello from Railway!" }));
 *     app.get("/health", (c) => c.json({ status: "ok" }));
 *
 *     export default app;
 *   `,
 *   trigger: {
 *     http: {
 *       methods: ["GET", "POST"],
 *       path: "/"
 *     }
 *   },
 *   packages: ["hono@4"]
 * });
 * ```
 *
 * @example
 * ## Scheduled Function
 *
 * Create a cron-triggered function for background tasks.
 *
 * ```ts
 * const cronFunction = await Function("daily-cleanup", {
 *   name: "daily-cleanup",
 *   project: "project-id",
 *   environment: "environment-id",
 *   code: `
 *     export default {
 *       async scheduled(event, env, ctx) {
 *         console.log("Running daily cleanup at", new Date().toISOString());
 *
 *         // Perform cleanup tasks
 *         await cleanupOldFiles();
 *         await sendDailyReport();
 *
 *         return new Response("Cleanup completed");
 *       }
 *     };
 *
 *     async function cleanupOldFiles() {
 *       // Implementation here
 *     }
 *
 *     async function sendDailyReport() {
 *       // Implementation here
 *     }
 *   `,
 *   trigger: {
 *     cron: {
 *       schedule: "0 2 * * *", // 2 AM daily
 *       timezone: "UTC"
 *     }
 *   },
 *   runtime: {
 *     memoryMB: 256,
 *     timeoutSeconds: 300
 *   }
 * });
 * ```
 */
export const Function = Resource(
  "railway::function",
  async function (
    this: Context<Function>,
    _id: string,
    props: FunctionProps,
  ): Promise<Function> {
    const api = createRailwayApi(props);
    const projectId =
      typeof props.project === "string"
        ? props.project
        : props.project.projectId;
    const environmentId =
      typeof props.environment === "string"
        ? props.environment
        : props.environment.environmentId;

    if (this.phase === "delete") {
      if (this.output?.functionId) {
        await deleteFunction(api, this.output.functionId);
      }
      return this.destroy();
    }

    // Validate code size (96KB limit)
    const codeSize = new TextEncoder().encode(props.code).length;
    if (codeSize > 96 * 1024) {
      throw new Error(
        `Function code size (${codeSize} bytes) exceeds Railway's 96KB limit`,
      );
    }

    if (this.phase === "create") {
      logger.log(`Creating new Railway function: ${props.name}`);
      const func = await createFunction(api, projectId, environmentId, props);
      return waitForFunctionDeployment(api, func.functionId, func);
    }

    if (this.phase === "update") {
      const existingFunction = this.output;
      logger.log(`Updating existing Railway function: ${props.name}`);
      const func = await updateFunction(
        api,
        existingFunction.functionId,
        props,
      );
      return waitForFunctionDeployment(api, func.functionId, func);
    }

    // Fallback for initial creation (when there's no existing function)
    const existingFunction = await findExistingFunction(
      api,
      projectId,
      environmentId,
      props.name,
    );
    if (existingFunction) {
      logger.log(`Updating existing Railway function: ${props.name}`);
      const func = await updateFunction(api, existingFunction.id, props);
      return waitForFunctionDeployment(api, func.functionId, func);
    } else {
      logger.log(`Creating new Railway function: ${props.name}`);
      const func = await createFunction(api, projectId, environmentId, props);
      return waitForFunctionDeployment(api, func.functionId, func);
    }
  },
);

/**
 * Find an existing function by name within a project environment
 */
async function findExistingFunction(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  name: string,
): Promise<FunctionResponse | null> {
  try {
    const query = `
      query findFunction($projectId: String!, $environmentId: String!) {
        project(id: $projectId) {
          environment(id: $environmentId) {
            functions {
              edges {
                node {
                  id
                  name
                  code
                  projectId
                  environmentId
                  url
                  status
                  runtime {
                    version
                    memoryMB
                    timeoutSeconds
                  }
                  trigger {
                    http {
                      methods
                      path
                    }
                    cron {
                      schedule
                      timezone
                    }
                  }
                  packages
                  description
                  codeSize
                  latestDeployment {
                    id
                    functionId
                    status
                    buildLogs
                    url
                    createdAt
                  }
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
    `;

    const response = await api.query<{
      project: {
        environment: {
          functions: {
            edges: Array<{
              node: FunctionResponse;
            }>;
          };
        };
      };
    }>(query, { projectId, environmentId });

    const func = response.project.environment.functions.edges.find(
      (edge) => edge.node.name === name,
    );

    return func?.node || null;
  } catch (error) {
    if (error instanceof RailwayApiError) {
      logger.warn(`Failed to find existing function: ${error.message}`);
      return null;
    }
    throw error;
  }
}

/**
 * Create a new function
 */
async function createFunction(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  props: FunctionProps,
): Promise<Function> {
  const mutation = `
    mutation createFunction($input: FunctionCreateInput!) {
      functionCreate(input: $input) {
        id
        name
        code
        projectId
        environmentId
        url
        status
        runtime {
          version
          memoryMB
          timeoutSeconds
        }
        trigger {
          http {
            methods
            path
          }
          cron {
            schedule
            timezone
          }
        }
        packages
        description
        codeSize
        latestDeployment {
          id
          functionId
          status
          buildLogs
          url
          createdAt
        }
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    input: {
      name: props.name,
      code: props.code,
      projectId,
      environmentId,
      runtime: {
        version: props.runtime?.version ?? "latest",
        memoryMB: props.runtime?.memoryMB ?? 128,
        timeoutSeconds: props.runtime?.timeoutSeconds ?? 30,
      },
      trigger: props.trigger,
      packages: props.packages,
      description: props.description,
      variables: props.variables,
    },
  };

  const response = await api.mutate<{
    functionCreate: FunctionResponse;
  }>(mutation, variables);

  return mapToFunction(response.functionCreate);
}

/**
 * Update an existing function
 */
async function updateFunction(
  api: ReturnType<typeof createRailwayApi>,
  functionId: string,
  props: FunctionProps,
): Promise<Function> {
  const mutation = `
    mutation updateFunction($id: String!, $input: FunctionUpdateInput!) {
      functionUpdate(id: $id, input: $input) {
        id
        name
        code
        projectId
        environmentId
        url
        status
        runtime {
          version
          memoryMB
          timeoutSeconds
        }
        trigger {
          http {
            methods
            path
          }
          cron {
            schedule
            timezone
          }
        }
        packages
        description
        codeSize
        latestDeployment {
          id
          functionId
          status
          buildLogs
          url
          createdAt
        }
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    id: functionId,
    input: {
      name: props.name,
      code: props.code,
      runtime: {
        version: props.runtime?.version ?? "latest",
        memoryMB: props.runtime?.memoryMB ?? 128,
        timeoutSeconds: props.runtime?.timeoutSeconds ?? 30,
      },
      trigger: props.trigger,
      packages: props.packages,
      description: props.description,
      variables: props.variables,
    },
  };

  const response = await api.mutate<{
    functionUpdate: FunctionResponse;
  }>(mutation, variables);

  return mapToFunction(response.functionUpdate);
}

/**
 * Wait for function deployment to complete
 */
async function waitForFunctionDeployment(
  api: ReturnType<typeof createRailwayApi>,
  functionId: string,
  func: Function,
  maxAttempts = 60,
): Promise<Function> {
  logger.log(`Waiting for function deployment to complete: ${functionId}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const currentFunction = await getFunctionStatus(api, functionId);

    if (currentFunction.status === "SUCCESS") {
      logger.log(`Function deployment completed successfully: ${functionId}`);
      return { ...func, ...currentFunction };
    }

    if (currentFunction.status === "FAILED") {
      throw new Error(`Function deployment failed: ${functionId}`);
    }

    logger.log(
      `Function deployment in progress (${currentFunction.status}), waiting...`,
    );
    await sleep(3000); // Wait 3 seconds between checks (functions deploy faster)
  }

  throw new Error(
    `Function deployment timed out after ${maxAttempts * 3} seconds`,
  );
}

/**
 * Get current function status
 */
async function getFunctionStatus(
  api: ReturnType<typeof createRailwayApi>,
  functionId: string,
): Promise<Pick<Function, "status" | "url" | "latestDeployment">> {
  const query = `
    query getFunctionStatus($functionId: String!) {
      function(id: $functionId) {
        status
        url
        latestDeployment {
          id
          functionId
          status
          buildLogs
          url
          createdAt
        }
      }
    }
  `;

  const response = await api.query<{
    function: {
      status: string;
      url?: string;
      latestDeployment?: FunctionDeployment;
    };
  }>(query, { functionId });

  return {
    status: response.function.status as Function["status"],
    url: response.function.url,
    latestDeployment: response.function.latestDeployment,
  };
}

/**
 * Map Railway API response to Function resource
 */
function mapToFunction(func: FunctionResponse): Function {
  return {
    functionId: func.id,
    name: func.name,
    code: func.code,
    projectId: func.projectId,
    environmentId: func.environmentId,
    url: func.url,
    status: func.status as Function["status"],
    runtime: func.runtime,
    trigger: func.trigger,
    packages: func.packages,
    description: func.description,
    codeSize: func.codeSize,
    latestDeployment: func.latestDeployment,
    createdAt: func.createdAt,
    updatedAt: func.updatedAt,
  } as Function;
}

/**
 * Deploy a function (trigger new deployment)
 */
export async function deployFunction(
  api: ReturnType<typeof createRailwayApi>,
  functionId: string,
): Promise<FunctionDeployment> {
  const mutation = `
    mutation deployFunction($functionId: String!) {
      functionDeploy(functionId: $functionId) {
        id
        functionId
        status
        buildLogs
        url
        createdAt
      }
    }
  `;

  const response = await api.mutate<{
    functionDeploy: FunctionDeployment;
  }>(mutation, { functionId });

  logger.log(`Triggered deployment for function: ${functionId}`);
  return response.functionDeploy;
}

/**
 * Get function metrics
 */
export async function getFunctionMetrics(
  api: ReturnType<typeof createRailwayApi>,
  functionId: string,
  timeRange: "1h" | "24h" | "7d" | "30d" = "24h",
): Promise<{
  invocations: number;
  errors: number;
  averageDuration: number;
  memoryUsage: number;
}> {
  const query = `
    query getFunctionMetrics($functionId: String!, $timeRange: String!) {
      function(id: $functionId) {
        metrics(timeRange: $timeRange) {
          invocations
          errors
          averageDuration
          memoryUsage
        }
      }
    }
  `;

  const response = await api.query<{
    function: {
      metrics: {
        invocations: number;
        errors: number;
        averageDuration: number;
        memoryUsage: number;
      };
    };
  }>(query, { functionId, timeRange });

  return response.function.metrics;
}

/**
 * Delete a Railway function
 */
export async function deleteFunction(
  api: ReturnType<typeof createRailwayApi>,
  functionId: string,
): Promise<void> {
  const mutation = `
    mutation deleteFunction($id: String!) {
      functionDelete(id: $id)
    }
  `;

  try {
    logger.log(`Attempting to delete Railway function: ${functionId}`);
    const result = await api.mutate(mutation, { id: functionId });
    logger.log("Delete mutation result:", result);
    logger.log(`Successfully deleted Railway function: ${functionId}`);
  } catch (error) {
    // Check if it's a "not found" error - these are safe to ignore during deletion
    if (isResourceNotFoundError(error)) {
      logger.log(
        `Railway function ${functionId} was already deleted or doesn't exist`,
      );
      return; // No-op for not found errors
    }

    // Re-throw all other errors
    logger.error(`Failed to delete Railway function ${functionId}:`, error);
    throw error;
  }
}

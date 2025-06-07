import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { Bundle } from "../esbuild/bundle.ts";
import { createRailwayApi, handleRailwayDeleteError, type RailwayApi } from "./api.ts";
import type { Project } from "./project.ts";
import type { Environment } from "./environment.ts";

export interface FunctionProps {
  /**
   * The name of the function
   */
  name: string;

  /**
   * The project this function belongs to. Can be a Project resource or project ID string
   */
  project: string | Project;

  /**
   * The environment this function belongs to. Can be an Environment resource or environment ID string
   */
  environment: string | Environment;

  /**
   * The runtime environment for the function
   */
  runtime: "nodejs" | "python" | "go" | "rust";

  /**
   * Path to the main function file. For Node.js functions, this will be bundled using esbuild
   */
  main: string;

  /**
   * The URL of the source repository. Use this for more complex functions
   */
  sourceRepo?: string;

  /**
   * The branch to deploy from when using a repository
   */
  sourceRepoBranch?: string;

  /**
   * The entry point for the function (e.g., "index.handler", "main.py")
   */
  entrypoint?: string;

  /**
   * Railway API token to use for authentication. Defaults to RAILWAY_TOKEN environment variable
   */
  apiKey?: Secret;
}

export interface Function
  extends Resource<"railway::Function">,
    Omit<FunctionProps, "project" | "environment"> {
  /**
   * The unique identifier of the function
   */
  id: string;

  /**
   * The ID of the project this function belongs to
   */
  projectId: string;

  /**
   * The ID of the environment this function belongs to
   */
  environmentId: string;

  /**
   * The public URL where the function can be invoked
   */
  url: string;

  /**
   * The timestamp when the function was created
   */
  createdAt: string;

  /**
   * The timestamp when the function was last updated
   */
  updatedAt: string;
}

// GraphQL operations
const FUNCTION_CREATE_MUTATION = `
  mutation FunctionCreate($input: FunctionCreateInput!) {
    functionCreate(input: $input) {
      id
      name
      projectId
      environmentId
      runtime
      sourceCode
      sourceRepo
      sourceRepoBranch
      entrypoint
      url
      createdAt
      updatedAt
    }
  }
`;

const FUNCTION_UPDATE_MUTATION = `
  mutation FunctionUpdate($id: String!, $input: FunctionUpdateInput!) {
    functionUpdate(id: $id, input: $input) {
      id
      name
      projectId
      environmentId
      runtime
      sourceCode
      sourceRepo
      sourceRepoBranch
      entrypoint
      url
      createdAt
      updatedAt
    }
  }
`;

const FUNCTION_DELETE_MUTATION = `
  mutation FunctionDelete($id: String!) {
    functionDelete(id: $id)
  }
`;

/**
 * Create and manage Railway serverless functions
 *
 * @example
 * ```typescript
 * // Create a Node.js function from local code
 * const apiFunction = await Function("api-handler", {
 *   name: "api-endpoint",
 *   project: project,
 *   environment: environment,
 *   runtime: "nodejs",
 *   main: "./src/handler.js",
 *   entrypoint: "index.handler",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a Python function from a GitHub repository
 * const pythonFunction = await Function("data-processor", {
 *   name: "data-processing-function",
 *   project: project,
 *   environment: environment,
 *   runtime: "python",
 *   main: "main.py",
 *   sourceRepo: "https://github.com/myorg/data-processor",
 *   sourceRepoBranch: "main",
 *   entrypoint: "main.handler",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a Go function with custom authentication
 * const goFunction = await Function("auth-service", {
 *   name: "authentication-handler",
 *   project: "project-id-string",
 *   environment: "environment-id-string",
 *   runtime: "go",
 *   main: "main.go",
 *   sourceRepo: "https://github.com/myorg/auth-service",
 *   sourceRepoBranch: "production",
 *   apiKey: secret("custom-railway-token"),
 * });
 * ```
 */
export const Function = Resource(
  "railway::Function",
  async function (
    this: Context<Function>,
    _id: string,
    props: FunctionProps,
  ): Promise<Function> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await deleteFunction(api, this.output.id);
        }
      } catch (error) {
        handleRailwayDeleteError(error, "Function", this.output?.id);
      }

      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const func = await updateFunction(api, this.output.id, props);

      return this({
        id: func.id,
        name: func.name,
        projectId: func.projectId,
        environmentId: func.environmentId,
        runtime: func.runtime,
        main: props.main,
        sourceRepo: func.sourceRepo,
        sourceRepoBranch: func.sourceRepoBranch,
        entrypoint: func.entrypoint,
        url: func.url,
        createdAt: func.createdAt,
        updatedAt: func.updatedAt,
      });
    }

    const func = await createFunction(api, props, _id);

    return this({
      id: func.id,
      name: func.name,
      projectId: func.projectId,
      environmentId: func.environmentId,
      runtime: func.runtime,
      main: props.main,
      sourceRepo: func.sourceRepo,
      sourceRepoBranch: func.sourceRepoBranch,
      entrypoint: func.entrypoint,
      url: func.url,
      createdAt: func.createdAt,
      updatedAt: func.updatedAt,
    });
  },
);

export async function createFunction(
  api: RailwayApi,
  props: FunctionProps,
  id: string,
) {
  const projectId =
    typeof props.project === "string" ? props.project : props.project.id;
  const environmentId =
    typeof props.environment === "string"
      ? props.environment
      : props.environment.id;

  let bundledCode: string | undefined;
  if (props.runtime === "nodejs" && !props.sourceRepo) {
    const bundle = await Bundle(`${id}-bundle`, {
      entryPoint: props.main,
      format: "cjs",
      target: "node18",
      platform: "node",
      bundle: true,
      minify: true,
    });
    bundledCode = bundle.content;
  }

  const response = await api.mutate(FUNCTION_CREATE_MUTATION, {
    input: {
      name: props.name,
      projectId: projectId,
      environmentId: environmentId,
      runtime: props.runtime,
      sourceCode: bundledCode,
      sourceRepo: props.sourceRepo,
      sourceRepoBranch: props.sourceRepoBranch,
      entrypoint: props.entrypoint,
    },
  });

  const func = response.data?.functionCreate;
  if (!func) {
    throw new Error("Failed to create Railway function");
  }

  return func;
}

export async function updateFunction(
  api: RailwayApi,
  id: string,
  props: FunctionProps,
) {
  let bundledCode: string | undefined;
  if (props.runtime === "nodejs" && !props.sourceRepo) {
    const bundle = await Bundle(`${id}-bundle`, {
      entryPoint: props.main,
      format: "cjs",
      target: "node18",
      platform: "node",
      bundle: true,
      minify: true,
    });
    bundledCode = bundle.content;
  }

  const response = await api.mutate(FUNCTION_UPDATE_MUTATION, {
    id,
    input: {
      name: props.name,
      runtime: props.runtime,
      sourceCode: bundledCode,
      sourceRepo: props.sourceRepo,
      sourceRepoBranch: props.sourceRepoBranch,
      entrypoint: props.entrypoint,
    },
  });

  const func = response.data?.functionUpdate;
  if (!func) {
    throw new Error("Failed to update Railway function");
  }

  return func;
}

export async function deleteFunction(api: RailwayApi, id: string) {
  await api.mutate(FUNCTION_DELETE_MUTATION, { id });
}

import { alchemy } from "../alchemy.ts";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import { createPrismaApi, type PrismaApiOptions } from "./api.ts";

/**
 * Properties for creating or updating a Prisma project
 */
export interface ProjectProps extends PrismaApiOptions {
  /**
   * Name of the project
   */
  name: string;

  /**
   * Description of the project
   */
  description?: string;

  /**
   * Organization ID where the project will be created
   */
  organizationId?: string;

  /**
   * Region where the project will be deployed
   */
  region?: string;

  /**
   * Whether the project is private
   */
  private?: boolean;

  /**
   * Environment variables for the project
   */
  environmentVariables?: Record<string, string>;

  /**
   * Existing project ID to update
   * Used internally during update operations
   * @internal
   */
  existing_project_id?: string;
}

/**
 * A Prisma environment within a project
 */
export interface PrismaEnvironment {
  /**
   * Environment ID
   */
  id: string;

  /**
   * Environment name
   */
  name: string;

  /**
   * Environment type (development, staging, production)
   */
  type: string;

  /**
   * Database connection string
   */
  databaseUrl?: Secret;

  /**
   * Time at which the environment was created
   */
  createdAt: string;

  /**
   * Time at which the environment was last updated
   */
  updatedAt: string;
}

/**
 * API response structure for Prisma projects
 */
interface PrismaApiResponse {
  project: {
    id: string;
    name: string;
    description?: string;
    organizationId?: string;
    region?: string;
    private?: boolean;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
  };
  environments?: Array<{
    id: string;
    name: string;
    type: string;
    databaseUrl?: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

/**
 * Output returned after Prisma project creation/update
 * IMPORTANT: The interface name MUST match the exported resource name
 */
export interface Project
  extends Resource<"prisma::Project">,
    Omit<ProjectProps, "apiKey" | "existing_project_id"> {
  /**
   * The ID of the project
   */
  id: string;

  /**
   * Time at which the project was created
   */
  createdAt: string;

  /**
   * Time at which the project was last updated
   */
  updatedAt: string;

  /**
   * Project environments
   */
  environments: PrismaEnvironment[];
}

/**
 * Creates a Prisma project for application development and deployment.
 *
 * @example
 * ## Create a basic Prisma project
 *
 * ```ts
 * const project = await Project("my-project", {
 *   name: "My App",
 *   description: "My application project"
 * });
 * ```
 *
 * @example
 * ## Create a project in a specific organization and region
 *
 * ```ts
 * const project = await Project("my-project", {
 *   name: "My App",
 *   organizationId: "org-123",
 *   region: "us-east-1",
 *   private: true,
 *   apiKey: alchemy.secret(process.env.PRISMA_API_KEY)
 * });
 * ```
 *
 * @example
 * ## Create a project with environment variables
 *
 * ```ts
 * const project = await Project("my-project", {
 *   name: "My App",
 *   environmentVariables: {
 *     "NODE_ENV": "production",
 *     "DATABASE_URL": "postgresql://..."
 *   }
 * });
 * ```
 */
export const Project = Resource(
  "prisma::Project",
  async function (
    this: Context<Project>,
    id: string,
    props: ProjectProps,
  ): Promise<Project> {
    const api = createPrismaApi(props);
    const projectId = props.existing_project_id || this.output?.id;

    if (this.phase === "delete") {
      try {
        // Check if the project exists before attempting to delete
        if (projectId) {
          await deleteProject(api, projectId, id);
        }
      } catch (error) {
        logger.error(`Error deleting Prisma project ${id}:`, error);
        throw error;
      }
      return this.destroy();
    }

    let response: PrismaApiResponse;

    try {
      if (this.phase === "update" && projectId) {
        // Update existing project
        response = await updateProject(api, projectId, props, id);
      } else {
        // Check if a project with this ID already exists
        if (projectId) {
          response = await getProjectOrCreate(api, projectId, props, id);
        } else {
          // No output ID, create new project
          response = await createNewProject(api, props);
        }
      }

      // Get the latest project state including environments
      if (response.project?.id) {
        response = await getProjectDetails(api, response.project.id);
      }

      return this({
        id: response.project.id,
        name: response.project.name,
        description: response.project.description,
        organizationId: response.project.organizationId,
        region: response.project.region,
        private: response.project.private,
        createdAt: response.project.createdAt,
        updatedAt: response.project.updatedAt,
        // Pass through the provided props except apiKey (which is sensitive)
        baseUrl: props.baseUrl,
        environmentVariables: props.environmentVariables,
        // Add environments data
        environments: (response.environments || []).map((env) => ({
          id: env.id,
          name: env.name,
          type: env.type,
          databaseUrl: env.databaseUrl
            ? alchemy.secret(env.databaseUrl)
            : undefined,
          createdAt: env.createdAt,
          updatedAt: env.updatedAt,
        })),
      });
    } catch (error) {
      logger.error(`Error ${this.phase} Prisma project '${id}':`, error);
      throw error;
    }
  },
);

/**
 * Helper function to delete a Prisma project
 */
async function deleteProject(
  api: any,
  projectId: string,
  resourceId: string,
): Promise<void> {
  const deleteResponse = await api.delete(`/projects/${projectId}`);
  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    await handleApiError(deleteResponse, "delete", "project", resourceId);
  }
}

/**
 * Helper function to update a Prisma project
 */
async function updateProject(
  api: any,
  projectId: string,
  props: ProjectProps,
  resourceId: string,
): Promise<PrismaApiResponse> {
  const projectResponse = await api.patch(`/projects/${projectId}`, {
    name: props.name,
    description: props.description,
    private: props.private,
    environmentVariables: props.environmentVariables,
  });

  if (!projectResponse.ok) {
    await handleApiError(projectResponse, "update", "project", resourceId);
  }

  const data = await projectResponse.json();
  return data as PrismaApiResponse;
}

/**
 * Helper function to get a project or create it if it doesn't exist
 */
async function getProjectOrCreate(
  api: any,
  projectId: string,
  props: ProjectProps,
  resourceId: string,
): Promise<PrismaApiResponse> {
  const getResponse = await api.get(`/projects/${projectId}`);
  if (getResponse.ok) {
    // Project exists, update it
    return await updateProject(api, projectId, props, resourceId);
  } else if (getResponse.status !== 404) {
    // Unexpected error during GET check
    await handleApiError(getResponse, "get", "project", resourceId);
    throw new Error("Failed to check if project exists");
  } else {
    // Project doesn't exist, create new
    return await createNewProject(api, props);
  }
}

/**
 * Helper function to create a new Prisma project
 */
async function createNewProject(
  api: any,
  props: ProjectProps,
): Promise<PrismaApiResponse> {
  const projectResponse = await api.post("/projects", {
    name: props.name,
    description: props.description,
    organizationId: props.organizationId,
    region: props.region,
    private: props.private,
    environmentVariables: props.environmentVariables,
  });

  if (!projectResponse.ok) {
    await handleApiError(projectResponse, "create", "project");
  }

  return (await projectResponse.json()) as PrismaApiResponse;
}

/**
 * Helper function to get complete project details
 *
 * @param api The Prisma API client
 * @param projectId The project ID
 * @returns Complete project data with environments
 */
async function getProjectDetails(
  api: any,
  projectId: string,
): Promise<PrismaApiResponse> {
  const response = await api.get(`/projects/${projectId}`);

  if (!response.ok) {
    throw new Error(`Failed to get project details: HTTP ${response.status}`);
  }

  const data = await response.json();

  // Try to get environments for the project
  try {
    const envResponse = await api.get(`/projects/${projectId}/environments`);
    if (envResponse.ok) {
      const envData = await envResponse.json();
      data.environments = envData.environments || [];
    }
  } catch (error) {
    // Environments endpoint might not exist or be accessible
    logger.warn(
      `Could not fetch environments for project ${projectId}:`,
      error,
    );
    data.environments = [];
  }

  return data as PrismaApiResponse;
}

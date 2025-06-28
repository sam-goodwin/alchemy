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

/**
 * Properties for creating or updating a Railway project
 */
export interface ProjectProps extends RailwayApiOptions {
  /**
   * Name of the project
   */
  name: string;

  /**
   * Description of the project
   */
  description?: string;

  /**
   * Whether the project is public
   * @default false
   */
  isPublic?: boolean;

  /**
   * Team ID to create the project under (for team tokens)
   */
  teamId?: string;
}

/**
 * A Railway project
 */
export interface Project extends Resource<"railway::project"> {
  /**
   * Project ID
   */
  projectId: string;

  /**
   * Project name
   */
  name: string;

  /**
   * Project description
   */
  description?: string;

  /**
   * Whether the project is public
   */
  isPublic: boolean;

  /**
   * Time at which the project was created
   */
  createdAt: string;

  /**
   * Time at which the project was updated
   */
  updatedAt: string;

  /**
   * Team ID that owns this project (if applicable)
   */
  teamId?: string;
}

/**
 * Railway project from API response
 */
interface RailwayProjectResponse {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  teamId?: string;
}

/**
 * Create or update a Railway project
 *
 * @example
 * ## Basic Project
 *
 * Create a simple project with just a name.
 *
 * ```ts
 * const project = await Project("my-app", {
 *   name: "My Application",
 *   description: "A web application deployed on Railway"
 * });
 * ```
 *
 * @example
 * ## Team Project
 *
 * Create a project under a specific team.
 *
 * ```ts
 * const project = await Project("team-project", {
 *   name: "Team Application",
 *   teamId: "team-id-here",
 *   token: secret("team-token"),
 *   tokenType: "team"
 * });
 * ```
 */
export const Project = Resource(
  "railway::project",
  async function (
    this: Context<Project>,
    id: string,
    props: ProjectProps,
  ): Promise<Project> {
    const api = createRailwayApi(props);

    if (this.phase === "delete") {
      if (this.output?.projectId) {
        await deleteProject(api, this.output.projectId);
      }
      return this.destroy();
    }

    if (this.phase === "create") {
      logger.log(`Creating new Railway project: ${props.name}`);
      return createProject(api, props);
    }

    if (this.phase === "update") {
      const existingProject = this.output;
      logger.log(`Updating existing Railway project: ${props.name}`);
      return updateProject(api, existingProject.projectId, props);
    }

    // Fallback for initial creation (when there's no existing project)
    const existingProject = await findExistingProject(api, props.name);
    if (existingProject) {
      logger.log(`Updating existing Railway project: ${props.name}`);
      return updateProject(api, existingProject.id, props);
    } else {
      logger.log(`Creating new Railway project: ${props.name}`);
      return createProject(api, props);
    }
  },
);

/**
 * Find an existing project by name
 */
async function findExistingProject(
  api: ReturnType<typeof createRailwayApi>,
  name: string,
): Promise<RailwayProjectResponse | null> {
  try {
    const query = `
      ${fragments.project}
      
      query findProject {
        me {
          projects {
            edges {
              node {
                ...ProjectFields
              }
            }
          }
        }
      }
    `;

    const response = await api.query<{
      me: {
        projects: {
          edges: Array<{
            node: RailwayProjectResponse;
          }>;
        };
      };
    }>(query);

    const project = response.me.projects.edges.find(
      (edge) => edge.node.name === name,
    );

    return project?.node || null;
  } catch (error) {
    if (error instanceof RailwayApiError) {
      logger.warn(`Failed to find existing project: ${error.message}`);
      return null;
    }
    throw error;
  }
}

/**
 * Create a new project
 */
async function createProject(
  api: ReturnType<typeof createRailwayApi>,
  props: ProjectProps,
): Promise<Project> {
  const mutation = `
    ${fragments.project}
    
    mutation createProject($input: ProjectCreateInput!) {
      projectCreate(input: $input) {
        ...ProjectFields
      }
    }
  `;

  const variables = {
    input: {
      name: props.name,
      description: props.description,
      isPublic: props.isPublic ?? false,
      teamId: props.teamId,
    },
  };

  const response = await api.mutate<{
    projectCreate: RailwayProjectResponse;
  }>(mutation, variables);

  return mapToProject(response.projectCreate);
}

/**
 * Update an existing project
 */
async function updateProject(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  props: ProjectProps,
): Promise<Project> {
  const mutation = `
    ${fragments.project}
    
    mutation updateProject($id: String!, $input: ProjectUpdateInput!) {
      projectUpdate(id: $id, input: $input) {
        ...ProjectFields
      }
    }
  `;

  const variables = {
    id: projectId,
    input: {
      name: props.name,
      description: props.description,
      isPublic: props.isPublic ?? false,
    },
  };

  const response = await api.mutate<{
    projectUpdate: RailwayProjectResponse;
  }>(mutation, variables);

  return mapToProject(response.projectUpdate);
}

/**
 * Map Railway API response to Project resource
 */
function mapToProject(project: RailwayProjectResponse): Project {
  return {
    projectId: project.id,
    name: project.name,
    description: project.description,
    isPublic: project.isPublic,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    teamId: project.teamId,
  } as Project;
}

/**
 * Delete a Railway project
 */
export async function deleteProject(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
): Promise<void> {
  const mutation = `
    mutation deleteProject($id: String!) {
      projectDelete(id: $id)
    }
  `;

  try {
    logger.log(`Attempting to delete Railway project: ${projectId}`);
    const result = await api.mutate(mutation, { id: projectId });
    logger.log("Delete mutation result:", result);
    logger.log(`Successfully deleted Railway project: ${projectId}`);
  } catch (error) {
    // Check if it's a "not found" error - these are safe to ignore during deletion
    if (isResourceNotFoundError(error)) {
      logger.log(
        `Railway project ${projectId} was already deleted or doesn't exist`,
      );
      return; // No-op for not found errors
    }

    // Re-throw all other errors
    logger.error(`Failed to delete Railway project ${projectId}:`, error);
    throw error;
  }
}

import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { createRailwayApi, handleRailwayDeleteError, type RailwayApi } from "./api.ts";

export interface ProjectProps {
  /**
   * The name of the project
   */
  name: string;

  /**
   * A description of the project
   */
  description?: string;

  /**
   * Whether the project is public
   */
  isPublic?: boolean;

  /**
   * The ID of the team this project belongs to
   */
  teamId?: string;

  /**
   * Railway API token to use for authentication. Defaults to RAILWAY_TOKEN environment variable
   */
  apiKey?: Secret;
}

export interface Project extends Resource<"railway::Project">, ProjectProps {
  /**
   * The unique identifier of the project
   */
  id: string;

  /**
   * The ID of the default environment for this project
   */
  defaultEnvironment: string;

  /**
   * The timestamp when the project was created
   */
  createdAt: string;

  /**
   * The timestamp when the project was last updated
   */
  updatedAt: string;
}

// GraphQL operations
const PROJECT_CREATE_MUTATION = `
  mutation ProjectCreate($input: ProjectCreateInput!) {
    projectCreate(input: $input) {
      id
      name
      description
      isPublic
      teamId
      defaultEnvironment {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

const PROJECT_UPDATE_MUTATION = `
  mutation ProjectUpdate($id: String!, $input: ProjectUpdateInput!) {
    projectUpdate(id: $id, input: $input) {
      id
      name
      description
      isPublic
      teamId
      defaultEnvironment {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

const PROJECT_DELETE_MUTATION = `
  mutation ProjectDelete($id: String!) {
    projectDelete(id: $id)
  }
`;

/**
 * Create and manage Railway projects
 *
 * @example
 * ```typescript
 * // Create a basic project
 * const myProject = await Project("my-project", {
 *   name: "My Web Application",
 *   description: "A full-stack web application",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a public open source project
 * const openSourceProject = await Project("oss-project", {
 *   name: "Open Source Library",
 *   description: "A public TypeScript library for developers",
 *   isPublic: true,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a team project with custom authentication
 * const teamProject = await Project("team-app", {
 *   name: "Team Dashboard",
 *   description: "Internal team management application",
 *   teamId: "team_abc123",
 *   apiKey: secret("custom-railway-token"),
 * });
 * ```
 */
export const Project = Resource(
  "railway::Project",
  async function (
    this: Context<Project>,
    _id: string,
    props: ProjectProps,
  ): Promise<Project> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await deleteProject(api, this.output.id);
        }
      } catch (error) {
        handleRailwayDeleteError(error, "Project", this.output?.id);
      }

      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const project = await updateProject(api, this.output.id, props);

      return this({
        id: project.id,
        name: project.name,
        description: project.description,
        isPublic: project.isPublic,
        teamId: project.teamId,
        defaultEnvironment: project.defaultEnvironment.id,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      });
    }

    const project = await createProject(api, props);

    return this({
      id: project.id,
      name: project.name,
      description: project.description,
      isPublic: project.isPublic,
      teamId: project.teamId,
      defaultEnvironment: project.defaultEnvironment.id,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    });
  },
);

export async function createProject(api: RailwayApi, props: ProjectProps) {
  const response = await api.mutate(PROJECT_CREATE_MUTATION, {
    input: {
      name: props.name,
      description: props.description,
      isPublic: props.isPublic,
      teamId: props.teamId,
    },
  });

  const project = response.data?.projectCreate;
  if (!project) {
    throw new Error("Failed to create Railway project");
  }

  return project;
}

export async function updateProject(api: RailwayApi, id: string, props: ProjectProps) {
  const response = await api.mutate(PROJECT_UPDATE_MUTATION, {
    id,
    input: {
      name: props.name,
      description: props.description,
      isPublic: props.isPublic,
    },
  });

  const project = response.data?.projectUpdate;
  if (!project) {
    throw new Error("Failed to update Railway project");
  }

  return project;
}

export async function deleteProject(api: RailwayApi, id: string) {
  await api.mutate(PROJECT_DELETE_MUTATION, { id });
}

import type { Context } from "../context.ts";
import {
  Resource,
  ResourceKind,
  ResourceID,
  ResourceFQN,
  ResourceScope,
  ResourceSeq,
} from "../resource.ts";
import { Scope } from "../scope.ts";
import { Secret } from "../secret.ts";
import {
  createSupabaseApi,
  type SupabaseApiOptions,
  type SupabaseApi,
} from "./api.ts";
import { handleApiError } from "./api-error.ts";
import type { Organization } from "./organization.ts";

/**
 * Properties for creating or updating a Supabase Project
 */
export interface ProjectProps extends SupabaseApiOptions {
  /**
   * Name of the project (optional, defaults to resource ID)
   */
  name?: string;

  /**
   * Organization that will own this project (string ID or Organization resource)
   */
  organization: string | Organization;

  /**
   * Region where the project will be hosted
   */
  region: string;

  /**
   * Database password for the project (sensitive value)
   */
  dbPass: Secret;

  /**
   * Desired instance size for the project
   */
  desiredInstanceSize?: string;

  /**
   * Template URL for project initialization
   */
  templateUrl?: string;

  /**
   * Whether to adopt an existing project instead of failing on conflict
   */
  adopt?: boolean;

  /**
   * Whether to delete the project on resource destruction
   */
  delete?: boolean;
}

/**
 * Supabase Project resource
 */
export interface Project extends Resource<"supabase::Project"> {
  /**
   * Unique identifier of the project
   */
  id: string;

  /**
   * ID of the organization that owns this project
   */
  organizationId: string;

  /**
   * Display name of the project
   */
  name: string;

  /**
   * Region where the project is hosted
   */
  region: string;

  /**
   * Creation timestamp
   */
  createdAt: string;

  /**
   * Current status of the project
   */
  status: string;

  /**
   * Database configuration details
   */
  database?: {
    /**
     * Database host
     */
    host: string;

    /**
     * Database version
     */
    version: string;

    /**
     * PostgreSQL engine version
     */
    postgresEngine: string;

    /**
     * Release channel
     */
    releaseChannel: string;
  };
}

export function isProject(resource: Resource): resource is Project {
  return resource[ResourceKind] === "supabase::Project";
}

/**
 * A Supabase Project provides a backend environment for your application with PostgreSQL database,
 * authentication, storage, and edge functions.
 *
 * @example
 * // Create a basic project:
 * import { Project } from "alchemy/supabase";
 * import { secret } from "alchemy";
 *
 * const project = Project("my-project", {
 *   organization: "org-123",
 *   region: "us-east-1",
 *   dbPass: secret("secure-password")
 * });
 *
 * @example
 * // Create a project with an Organization resource:
 * import { Project, Organization } from "alchemy/supabase";
 *
 * const org = Organization("my-org", {
 *   name: "My Organization"
 * });
 *
 * const project = Project("my-project", {
 *   organization: org,
 *   name: "My Custom Project",
 *   region: "us-west-2",
 *   dbPass: secret("secure-password"),
 *   desiredInstanceSize: "small"
 * });
 */
export const Project = Resource(
  "supabase::Project",
  async function (
    this: Context<Project>,
    id: string,
    props: ProjectProps,
  ): Promise<Project> {
    const api = await createSupabaseApi(props);
    const name = props.name ?? id;
    const organizationId = typeof props.organization === "string" ? props.organization : props.organization.id;

    if (this.phase === "delete") {
      const projectId = this.output?.id;
      if (projectId && props.delete !== false) {
        await deleteProject(api, projectId);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const project = await getProject(api, this.output.id);
      return this(project);
    }

    try {
      const project = await createProject(api, {
        name,
        organization_id: organizationId,
        region: props.region,
        db_pass: props.dbPass.unencrypted,
        desired_instance_size: props.desiredInstanceSize,
        template_url: props.templateUrl,
      });
      return this(project);
    } catch (error) {
      if (
        props.adopt &&
        error instanceof Error &&
        error.message.includes("already exists")
      ) {
        const existingProject = await findProjectByName(api, name);
        if (!existingProject) {
          throw new Error(
            `Failed to find existing project '${name}' for adoption`,
          );
        }
        return this(existingProject);
      }
      throw error;
    }
  },
);

async function createProject(
  api: SupabaseApi,
  params: any,
): Promise<Project> {
  const response = await api.post("/projects", params);
  if (!response.ok) {
    await handleApiError(response, "creating", "project", params.name);
  }
  const data = (await response.json()) as any;
  return {
    [ResourceKind]: "supabase::Project",
    [ResourceID]: data.id,
    [ResourceFQN]: `supabase::Project::${data.id}`,
    [ResourceScope]: Scope.current,
    [ResourceSeq]: 0,
    id: data.id,
    organizationId: data.organization_id,
    name: data.name,
    region: data.region,
    createdAt: data.created_at,
    status: data.status,
  };
}

async function getProject(
  api: SupabaseApi,
  ref: string,
): Promise<Project> {
  const response = await api.get(`/projects/${ref}`);
  if (!response.ok) {
    await handleApiError(response, "getting", "project", ref);
  }
  const data = (await response.json()) as any;
  return {
    [ResourceKind]: "supabase::Project",
    [ResourceID]: data.id,
    [ResourceFQN]: `supabase::Project::${data.id}`,
    [ResourceScope]: Scope.current,
    [ResourceSeq]: 0,
    id: data.id,
    organizationId: data.organization_id,
    name: data.name,
    region: data.region,
    createdAt: data.created_at,
    status: data.status,
    database: data.database,
  };
}

async function deleteProject(api: SupabaseApi, ref: string): Promise<void> {
  const response = await api.delete(`/projects/${ref}`);
  if (!response.ok && response.status !== 404) {
    await handleApiError(response, "deleting", "project", ref);
  }
}

async function findProjectByName(
  api: SupabaseApi,
  name: string,
): Promise<Project | null> {
  const response = await api.get("/projects");
  if (!response.ok) {
    await handleApiError(response, "listing", "projects");
  }
  const projects = (await response.json()) as any[];
  const match = projects.find((project: any) => project.name === name);
  return match ? await getProject(api, match.id) : null;
}

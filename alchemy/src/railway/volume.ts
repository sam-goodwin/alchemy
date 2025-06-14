import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { createRailwayApi, type RailwayApi } from "./api.ts";
import type { Project } from "./project.ts";
import type { Environment } from "./environment.ts";

export interface VolumeProps {
  /**
   * The name of the volume
   */
  name: string;

  /**
   * The project this volume belongs to. Can be a Project resource or project ID string
   */
  project: string | Project;

  /**
   * The environment this volume belongs to. Can be an Environment resource or environment ID string
   */
  environment: string | Environment;

  /**
   * The path where the volume will be mounted
   */
  mountPath: string;

  /**
   * The size of the volume in GB
   */
  size?: number;

  /**
   * Railway API token to use for authentication. Defaults to RAILWAY_TOKEN environment variable
   */
  apiKey?: Secret;
}

export interface Volume
  extends Resource<"railway::Volume">,
    Omit<VolumeProps, "project" | "environment"> {
  /**
   * The unique identifier of the volume
   */
  id: string;

  /**
   * The ID of the project this volume belongs to
   */
  projectId: string;

  /**
   * The ID of the environment this volume belongs to
   */
  environmentId: string;

  /**
   * The timestamp when the volume was created
   */
  createdAt: string;

  /**
   * The timestamp when the volume was last updated
   */
  updatedAt: string;
}

// GraphQL operations
const VOLUME_CREATE_MUTATION = `
  mutation VolumeCreate($input: VolumeCreateInput!) {
    volumeCreate(input: $input) {
      id
      name
      projectId
      environmentId
      mountPath
      size
      createdAt
      updatedAt
    }
  }
`;

const VOLUME_UPDATE_MUTATION = `
  mutation VolumeUpdate($id: String!, $input: VolumeUpdateInput!) {
    volumeUpdate(id: $id, input: $input) {
      id
      name
      projectId
      environmentId
      mountPath
      size
      createdAt
      updatedAt
    }
  }
`;

const VOLUME_DELETE_MUTATION = `
  mutation VolumeDelete($id: String!) {
    volumeDelete(id: $id)
  }
`;

/**
 * Create and manage Railway persistent volumes for data storage
 *
 * @example
 * ```typescript
 * // Create a basic volume for application data storage
 * const dataVolume = await Volume("app-data", {
 *   name: "application-data",
 *   project: project,
 *   environment: environment,
 *   mountPath: "/var/lib/app/data",
 *   size: 10, // 10 GB
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a large volume for database storage
 * const dbVolume = await Volume("database-storage", {
 *   name: "postgres-data",
 *   project: project,
 *   environment: environment,
 *   mountPath: "/var/lib/postgresql/data",
 *   size: 100, // 100 GB for production database
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a volume with project and environment ID strings
 * const logsVolume = await Volume("logs-storage", {
 *   name: "application-logs",
 *   project: "project-id-string",
 *   environment: "environment-id-string",
 *   mountPath: "/var/log/app",
 *   size: 20, // 20 GB for log retention
 * });
 * ```
 */
export const Volume = Resource(
  "railway::Volume",
  async function (
    this: Context<Volume>,
    _id: string,
    props: VolumeProps,
  ): Promise<Volume> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      if (this.output?.id) {
        await deleteVolume(api, this.output.id);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const volume = await updateVolume(api, this.output.id, props);

      return this({
        id: volume.id,
        name: volume.name,
        projectId: volume.projectId,
        environmentId: volume.environmentId,
        mountPath: volume.mountPath,
        size: volume.size,
        createdAt: volume.createdAt,
        updatedAt: volume.updatedAt,
      });
    }

    const volume = await createVolume(api, props);

    return this({
      id: volume.id,
      name: volume.name,
      projectId: volume.projectId,
      environmentId: volume.environmentId,
      mountPath: volume.mountPath,
      size: volume.size,
      createdAt: volume.createdAt,
      updatedAt: volume.updatedAt,
    });
  },
);

export async function createVolume(api: RailwayApi, props: VolumeProps) {
  const projectId =
    typeof props.project === "string" ? props.project : props.project.id;
  const environmentId =
    typeof props.environment === "string"
      ? props.environment
      : props.environment.id;

  const response = await api.mutate(VOLUME_CREATE_MUTATION, {
    input: {
      name: props.name,
      projectId: projectId,
      environmentId: environmentId,
      mountPath: props.mountPath,
      size: props.size,
    },
  });

  const volume = response.data?.volumeCreate;
  if (!volume) {
    throw new Error("Failed to create Railway volume");
  }

  return volume;
}

export async function updateVolume(api: RailwayApi, id: string, props: VolumeProps) {
  const response = await api.mutate(VOLUME_UPDATE_MUTATION, {
    id,
    input: {
      name: props.name,
      mountPath: props.mountPath,
      size: props.size,
    },
  });

  const volume = response.data?.volumeUpdate;
  if (!volume) {
    throw new Error("Failed to update Railway volume");
  }

  return volume;
}

export async function deleteVolume(api: RailwayApi, id: string) {
  await api.mutate(VOLUME_DELETE_MUTATION, { id });
}

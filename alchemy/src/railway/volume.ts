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
import type { Service } from "./service.ts";

/**
 * Volume backup schedule options
 */
export type BackupSchedule = "daily" | "weekly" | "monthly";

/**
 * Volume backup configuration
 */
export interface VolumeBackupConfig {
  /**
   * Backup schedule frequency
   */
  schedule?: BackupSchedule;

  /**
   * Number of backups to retain
   */
  retentionDays?: number;

  /**
   * Whether to enable automatic backups
   * @default false
   */
  enabled?: boolean;
}

/**
 * Properties for creating or updating a Railway volume
 */
export interface VolumeProps extends RailwayApiOptions {
  /**
   * Name of the volume
   */
  name: string;

  /**
   * Mount path where the volume will be mounted in the service
   * @example "/app/data"
   * @example "/var/lib/postgresql/data"
   */
  mountPath: string;

  /**
   * Project this volume belongs to
   */
  project: string | Project;

  /**
   * Environment this volume belongs to
   */
  environment: string | Environment;

  /**
   * Service to attach this volume to
   */
  service: string | Service;

  /**
   * Size of the volume in GB
   * @default 1
   */
  sizeGB?: number;

  /**
   * Backup configuration
   */
  backups?: VolumeBackupConfig;
}

/**
 * Volume backup information
 */
export interface VolumeBackup {
  /**
   * Backup ID
   */
  id: string;

  /**
   * Volume ID this backup belongs to
   */
  volumeId: string;

  /**
   * Backup name/description
   */
  name: string;

  /**
   * Size of the backup in bytes
   */
  sizeBytes: number;

  /**
   * Backup status
   */
  status: "CREATING" | "AVAILABLE" | "RESTORING" | "FAILED";

  /**
   * Time at which the backup was created
   */
  createdAt: string;
}

/**
 * A Railway volume for persistent storage
 */
export interface Volume extends Resource<"railway::volume"> {
  /**
   * Volume ID
   */
  volumeId: string;

  /**
   * Volume name
   */
  name: string;

  /**
   * Mount path in the service
   */
  mountPath: string;

  /**
   * Project ID this volume belongs to
   */
  projectId: string;

  /**
   * Environment ID this volume belongs to
   */
  environmentId: string;

  /**
   * Service ID this volume is attached to
   */
  serviceId: string;

  /**
   * Volume size in GB
   */
  sizeGB: number;

  /**
   * Current usage in bytes
   */
  usageBytes?: number;

  /**
   * Volume status
   */
  status: "CREATING" | "AVAILABLE" | "GROWING" | "FAILED";

  /**
   * Backup configuration
   */
  backups?: VolumeBackupConfig;

  /**
   * Time at which the volume was created
   */
  createdAt: string;

  /**
   * Time at which the volume was updated
   */
  updatedAt: string;
}

/**
 * Railway volume from API response
 */
interface RailwayVolumeResponse {
  id: string;
  name: string;
  mountPath: string;
  projectId: string;
  environmentId: string;
  serviceId: string;
  sizeGB: number;
  usageBytes?: number;
  status: string;
  backups?: VolumeBackupConfig;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create or update a Railway volume
 *
 * @example
 * ## Database Volume
 *
 * Create a volume for PostgreSQL data persistence.
 *
 * ```ts
 * const project = await Project("my-app", { name: "My App" });
 * const environment = await Environment("production", {
 *   name: "production",
 *   project: project
 * });
 * const database = await Service("postgres", {
 *   name: "postgres",
 *   project: project,
 *   environment: environment
 * });
 *
 * const volume = await Volume("postgres-data", {
 *   name: "postgres-data",
 *   mountPath: "/var/lib/postgresql/data",
 *   project: project,
 *   environment: environment,
 *   service: database,
 *   sizeGB: 10,
 *   backups: {
 *     schedule: "daily",
 *     retentionDays: 7,
 *     enabled: true
 *   }
 * });
 * ```
 *
 * @example
 * ## Application Data Volume
 *
 * Create a volume for application file storage.
 *
 * ```ts
 * const volume = await Volume("app-storage", {
 *   name: "app-storage",
 *   mountPath: "/app/data",
 *   project: "project-id",
 *   environment: "environment-id",
 *   service: "service-id",
 *   sizeGB: 5
 * });
 * ```
 */
export const Volume = Resource(
  "railway::volume",
  async function (
    this: Context<Volume>,
    _id: string,
    props: VolumeProps,
  ): Promise<Volume> {
    const api = createRailwayApi(props);
    const projectId =
      typeof props.project === "string"
        ? props.project
        : props.project.projectId;
    const environmentId =
      typeof props.environment === "string"
        ? props.environment
        : props.environment.environmentId;
    const serviceId =
      typeof props.service === "string"
        ? props.service
        : props.service.serviceId;

    // Handle delete phase
    if (this.phase === "delete") {
      if (this.output?.volumeId) {
        await deleteVolume(api, this.output.volumeId);
      }
      return this.destroy();
    }

    // Handle update phase
    if (this.phase === "update") {
      logger.log(`Updating existing Railway volume: ${props.name}`);
      const volume = await updateVolume(api, this.output.volumeId, props);
      return waitForVolumeProvisioning(api, volume.volumeId, volume);
    }

    // Handle create phase
    if (this.phase === "create") {
      logger.log(`Creating new Railway volume: ${props.name}`);
      const volume = await createVolume(
        api,
        projectId,
        environmentId,
        serviceId,
        props,
      );
      return waitForVolumeProvisioning(api, volume.volumeId, volume);
    }

    // Initial creation - check if volume already exists
    const existingVolume = await findExistingVolume(
      api,
      projectId,
      environmentId,
      serviceId,
      props.name,
    );

    if (existingVolume) {
      logger.log(`Found existing Railway volume: ${props.name}`);
      const volume = await updateVolume(api, existingVolume.id, props);
      return waitForVolumeProvisioning(api, volume.volumeId, volume);
    } else {
      logger.log(`Creating new Railway volume: ${props.name}`);
      const volume = await createVolume(
        api,
        projectId,
        environmentId,
        serviceId,
        props,
      );
      return waitForVolumeProvisioning(api, volume.volumeId, volume);
    }
  },
);

/**
 * Find an existing volume by name within a service
 */
async function findExistingVolume(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  serviceId: string,
  name: string,
): Promise<RailwayVolumeResponse | null> {
  try {
    const query = `
      query findVolume($projectId: String!, $environmentId: String!, $serviceId: String!) {
        project(id: $projectId) {
          environment(id: $environmentId) {
            service(id: $serviceId) {
              volumes {
                edges {
                  node {
                    id
                    name
                    mountPath
                    projectId
                    environmentId
                    serviceId
                    sizeGB
                    usageBytes
                    status
                    backups {
                      schedule
                      retentionDays
                      enabled
                    }
                    createdAt
                    updatedAt
                  }
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
          service: {
            volumes: {
              edges: Array<{
                node: RailwayVolumeResponse;
              }>;
            };
          };
        };
      };
    }>(query, { projectId, environmentId, serviceId });

    const volume = response.project.environment.service.volumes.edges.find(
      (edge) => edge.node.name === name,
    );

    return volume?.node || null;
  } catch (error) {
    if (error instanceof RailwayApiError) {
      logger.warn(`Failed to find existing volume: ${error.message}`);
      return null;
    }
    throw error;
  }
}

/**
 * Create a new volume
 */
async function createVolume(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  serviceId: string,
  props: VolumeProps,
): Promise<Volume> {
  const mutation = `
    mutation createVolume($input: VolumeCreateInput!) {
      volumeCreate(input: $input) {
        id
        name
        mountPath
        projectId
        environmentId
        serviceId
        sizeGB
        usageBytes
        status
        backups {
          schedule
          retentionDays
          enabled
        }
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    input: {
      name: props.name,
      mountPath: props.mountPath,
      projectId,
      environmentId,
      serviceId,
      sizeGB: props.sizeGB ?? 1,
      backups: props.backups,
    },
  };

  const response = await api.mutate<{
    volumeCreate: RailwayVolumeResponse;
  }>(mutation, variables);

  return mapToVolume(response.volumeCreate);
}

/**
 * Update an existing volume
 */
async function updateVolume(
  api: ReturnType<typeof createRailwayApi>,
  volumeId: string,
  props: VolumeProps,
): Promise<Volume> {
  const mutation = `
    mutation updateVolume($id: String!, $input: VolumeUpdateInput!) {
      volumeUpdate(id: $id, input: $input) {
        id
        name
        mountPath
        projectId
        environmentId
        serviceId
        sizeGB
        usageBytes
        status
        backups {
          schedule
          retentionDays
          enabled
        }
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    id: volumeId,
    input: {
      name: props.name,
      mountPath: props.mountPath,
      sizeGB: props.sizeGB ?? 1,
      backups: props.backups,
    },
  };

  const response = await api.mutate<{
    volumeUpdate: RailwayVolumeResponse;
  }>(mutation, variables);

  return mapToVolume(response.volumeUpdate);
}

/**
 * Wait for volume provisioning to complete
 */
async function waitForVolumeProvisioning(
  api: ReturnType<typeof createRailwayApi>,
  volumeId: string,
  volume: Volume,
  maxAttempts = 30,
): Promise<Volume> {
  logger.log(`Waiting for volume provisioning to complete: ${volumeId}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const currentVolume = await getVolumeStatus(api, volumeId);

    if (currentVolume.status === "AVAILABLE") {
      logger.log(`Volume provisioning completed successfully: ${volumeId}`);
      return { ...volume, ...currentVolume };
    }

    if (currentVolume.status === "FAILED") {
      throw new Error(`Volume provisioning failed: ${volumeId}`);
    }

    logger.log(
      `Volume provisioning in progress (${currentVolume.status}), waiting...`,
    );
    await sleep(5000); // Wait 5 seconds between checks
  }

  throw new Error(
    `Volume provisioning timed out after ${maxAttempts * 5} seconds`,
  );
}

/**
 * Get current volume status
 */
async function getVolumeStatus(
  api: ReturnType<typeof createRailwayApi>,
  volumeId: string,
): Promise<Pick<Volume, "status" | "usageBytes">> {
  const query = `
    query getVolumeStatus($volumeId: String!) {
      volume(id: $volumeId) {
        status
        usageBytes
      }
    }
  `;

  const response = await api.query<{
    volume: {
      status: string;
      usageBytes?: number;
    };
  }>(query, { volumeId });

  return {
    status: response.volume.status as Volume["status"],
    usageBytes: response.volume.usageBytes,
  };
}

/**
 * Map Railway API response to Volume resource
 */
function mapToVolume(volume: RailwayVolumeResponse): Volume {
  return {
    volumeId: volume.id,
    name: volume.name,
    mountPath: volume.mountPath,
    projectId: volume.projectId,
    environmentId: volume.environmentId,
    serviceId: volume.serviceId,
    sizeGB: volume.sizeGB,
    usageBytes: volume.usageBytes,
    status: volume.status as Volume["status"],
    backups: volume.backups,
    createdAt: volume.createdAt,
    updatedAt: volume.updatedAt,
  } as Volume;
}

/**
 * Grow a volume to a larger size
 */
export async function growVolume(
  api: ReturnType<typeof createRailwayApi>,
  volumeId: string,
  newSizeGB: number,
): Promise<Volume> {
  const mutation = `
    mutation growVolume($id: String!, $sizeGB: Int!) {
      volumeGrow(id: $id, sizeGB: $sizeGB) {
        id
        name
        mountPath
        projectId
        environmentId
        serviceId
        sizeGB
        usageBytes
        status
        backups {
          schedule
          retentionDays
          enabled
        }
        createdAt
        updatedAt
      }
    }
  `;

  const response = await api.mutate<{
    volumeGrow: RailwayVolumeResponse;
  }>(mutation, { id: volumeId, sizeGB: newSizeGB });

  logger.log(`Growing volume ${volumeId} to ${newSizeGB}GB`);
  return mapToVolume(response.volumeGrow);
}

/**
 * Create a backup of a volume
 */
export async function createVolumeBackup(
  api: ReturnType<typeof createRailwayApi>,
  volumeId: string,
  name?: string,
): Promise<VolumeBackup> {
  const mutation = `
    mutation createVolumeBackup($input: VolumeBackupCreateInput!) {
      volumeBackupCreate(input: $input) {
        id
        volumeId
        name
        sizeBytes
        status
        createdAt
      }
    }
  `;

  const variables = {
    input: {
      volumeId,
      name: name || `backup-${new Date().toISOString()}`,
    },
  };

  const response = await api.mutate<{
    volumeBackupCreate: VolumeBackup;
  }>(mutation, variables);

  logger.log(
    `Created backup for volume ${volumeId}: ${response.volumeBackupCreate.id}`,
  );
  return response.volumeBackupCreate;
}

/**
 * Restore a volume from a backup
 */
export async function restoreVolumeBackup(
  api: ReturnType<typeof createRailwayApi>,
  volumeId: string,
  backupId: string,
): Promise<void> {
  const mutation = `
    mutation restoreVolumeBackup($volumeId: String!, $backupId: String!) {
      volumeBackupRestore(volumeId: $volumeId, backupId: $backupId)
    }
  `;

  await api.mutate(mutation, { volumeId, backupId });
  logger.log(`Restoring volume ${volumeId} from backup ${backupId}`);
}

/**
 * List backups for a volume
 */
export async function listVolumeBackups(
  api: ReturnType<typeof createRailwayApi>,
  volumeId: string,
): Promise<VolumeBackup[]> {
  const query = `
    query listVolumeBackups($volumeId: String!) {
      volume(id: $volumeId) {
        backups {
          edges {
            node {
              id
              volumeId
              name
              sizeBytes
              status
              createdAt
            }
          }
        }
      }
    }
  `;

  const response = await api.query<{
    volume: {
      backups: {
        edges: Array<{
          node: VolumeBackup;
        }>;
      };
    };
  }>(query, { volumeId });

  return response.volume.backups.edges.map((edge) => edge.node);
}

/**
 * Delete a Railway volume
 */
export async function deleteVolume(
  api: ReturnType<typeof createRailwayApi>,
  volumeId: string,
): Promise<void> {
  const mutation = `
    mutation deleteVolume($id: String!) {
      volumeDelete(id: $id)
    }
  `;

  try {
    logger.log(`Attempting to delete Railway volume: ${volumeId}`);
    const result = await api.mutate(mutation, { id: volumeId });
    logger.log("Delete mutation result:", result);
    logger.log(`Successfully deleted Railway volume: ${volumeId}`);
  } catch (error) {
    // Check if it's a "not found" error - these are safe to ignore during deletion
    if (isResourceNotFoundError(error)) {
      logger.log(
        `Railway volume ${volumeId} was already deleted or doesn't exist`,
      );
      return; // No-op for not found errors
    }

    // Re-throw all other errors
    logger.error(`Failed to delete Railway volume ${volumeId}:`, error);
    throw error;
  }
}

import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createFlyApi, type FlyApiOptions } from "./api.ts";
import type { App } from "./app.ts";

/**
 * Properties for creating or updating a Fly.io volume
 */
export interface VolumeProps extends FlyApiOptions {
  /**
   * App this volume belongs to (app name string or App resource)
   */
  app: string | App;

  /**
   * Volume name
   */
  name?: string;

  /**
   * Region where the volume will be created
   * @default "iad" (Washington D.C.)
   */
  region?: string;

  /**
   * Size of the volume in GB
   */
  sizeGb: number;

  /**
   * Source volume ID to clone from
   */
  sourceVolumeId?: string;

  /**
   * Snapshot ID to restore from
   */
  snapshotId?: string;

  /**
   * Whether the volume should be encrypted
   * @default true
   */
  encrypted?: boolean;

  /**
   * Whether to require unique zone placement
   * @default false
   */
  requireUniqueZone?: boolean;
}

/**
 * A Fly.io persistent volume
 */
export interface Volume
  extends Resource<"fly::Volume">,
    Omit<VolumeProps, "apiToken"> {
  /**
   * The ID of the volume
   */
  id: string;

  /**
   * The name of the volume
   */
  name: string;

  /**
   * Size of the volume in GB
   */
  sizeGb: number;

  /**
   * Region where the volume is located
   */
  region: string;

  /**
   * Zone where the volume is located
   */
  zone: string;

  /**
   * Current state of the volume
   */
  state: string;

  /**
   * Whether the volume is encrypted
   */
  encrypted: boolean;

  /**
   * Attached allocation ID (if attached to a machine)
   */
  attachedAllocId?: string;

  /**
   * Attached machine ID (if attached to a machine)
   */
  attachedMachineId?: string;

  /**
   * Time at which the volume was created
   */
  createdAt: string;

  /**
   * Host dedication for the volume
   */
  hostDedication?: string;

  /**
   * Host dedication ID
   */
  hostDedicationId?: string;
}

/**
 * Creates a Fly.io persistent volume for data storage.
 *
 * @example
 * ## Create a basic volume
 *
 * Create a simple volume for persistent storage:
 *
 * ```ts
 * const volume = await Volume("app-data", {
 *   app: "my-app",
 *   size_gb: 10
 * });
 * ```
 *
 * @example
 * ## Create a volume in a specific region
 *
 * Create a volume in a specific region with custom settings:
 *
 * ```ts
 * const volume = await Volume("db-storage", {
 *   app: myApp,
 *   name: "postgres-data",
 *   region: "sea",
 *   size_gb: 50,
 *   encrypted: true
 * });
 * ```
 *
 * @example
 * ## Create a volume from a snapshot
 *
 * Create a volume from an existing snapshot:
 *
 * ```ts
 * const restoredVolume = await Volume("restored-data", {
 *   app: myApp,
 *   size_gb: 20,
 *   snapshot_id: "snap_1234567890abcdef"
 * });
 * ```
 */
export const Volume = Resource(
  "fly::Volume",
  async function (
    this: Context<Volume>,
    id: string,
    props: VolumeProps,
  ): Promise<Volume> {
    const api = createFlyApi(props);
    const appName = typeof props.app === "string" ? props.app : props.app.name;
    const volumeName = props.name || id;
    const volumeId = this.output?.id;

    if (this.phase === "delete") {
      try {
        if (volumeId) {
          const deleteResponse = await api.delete(
            `/apps/${appName}/volumes/${volumeId}`
          );
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "deleting", "volume", volumeId);
          }
        }
      } catch (error) {
        console.error(`Error deleting Fly.io volume ${volumeId}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      let volumeData: any;

      if (this.phase === "update" && volumeId) {
        // Volumes can only be extended, not shrunk
        const currentSize = this.output?.size_gb || 0;
        if (props.size_gb > currentSize) {
          const extendResponse = await api.put(
            `/apps/${appName}/volumes/${volumeId}/extend`,
            { size_gb: props.size_gb }
          );

          if (!extendResponse.ok) {
            await handleApiError(extendResponse, "extending", "volume", volumeId);
          }

          volumeData = await extendResponse.json();
        } else {
          // Get current volume data if no size change
          const getResponse = await api.get(`/apps/${appName}/volumes/${volumeId}`);
          if (!getResponse.ok) {
            await handleApiError(getResponse, "getting", "volume", volumeId);
          }
          volumeData = await getResponse.json();
        }
      } else {
        // Create new volume
        const createPayload: any = {
          name: volumeName,
          region: props.region || "iad",
          size_gb: props.sizeGb,
          encrypted: props.encrypted ?? true,
          require_unique_zone: props.requireUniqueZone || false,
        };

        if (props.sourceVolumeId) {
          createPayload.source_volume_id = props.sourceVolumeId;
        }

        if (props.snapshotId) {
          createPayload.snapshot_id = props.snapshotId;
        }

        const createResponse = await api.post(
          `/apps/${appName}/volumes`,
          createPayload
        );

        if (!createResponse.ok) {
          await handleApiError(createResponse, "creating", "volume", volumeName);
        }

        volumeData = await createResponse.json();

        // Wait for volume to be ready
        await waitForVolumeState(api, appName, volumeData.id, ["created"]);

        // Get updated volume data
        const getResponse = await api.get(
          `/apps/${appName}/volumes/${volumeData.id}`
        );
        if (getResponse.ok) {
          volumeData = await getResponse.json();
        }
      }

      return this({
        id: volumeData.id,
        name: volumeData.name,
        sizeGb: volumeData.size_gb,
        region: volumeData.region,
        zone: volumeData.zone,
        state: volumeData.state,
        encrypted: volumeData.encrypted,
        attachedAllocId: volumeData.attached_alloc_id,
        attachedMachineId: volumeData.attached_machine_id,
        createdAt: volumeData.created_at,
        hostDedication: volumeData.host_dedication,
        hostDedicationId: volumeData.host_dedication_id,
        // Pass through props (excluding sensitive data)
        app: props.app,
        baseUrl: props.baseUrl,
        sourceVolumeId: props.sourceVolumeId,
        snapshotId: props.snapshotId,
        requireUniqueZone: props.requireUniqueZone,
      });
    } catch (error) {
      console.error(`Error ${this.phase} Fly.io volume '${volumeName}':`, error);
      throw error;
    }
  },
);

/**
 * Wait for volume to reach a desired state
 */
async function waitForVolumeState(
  api: any,
  appName: string,
  volumeId: string,
  targetStates: string[],
  timeoutMs: number = 60000,
): Promise<void> {
  const startTime = Date.now();
  let currentState = "";

  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await api.get(`/apps/${appName}/volumes/${volumeId}`);
      if (response.ok) {
        const volumeData = await response.json();
        currentState = volumeData.state;
        
        if (targetStates.includes(currentState)) {
          return;
        }
      }
    } catch (error) {
      console.warn(`Error checking volume state: ${error}`);
    }

    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error(
    `Timeout waiting for volume ${volumeId} to reach state ${targetStates.join(" or ")}. Current state: ${currentState}`
  );
}
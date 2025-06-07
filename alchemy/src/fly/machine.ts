import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createFlyApi, type FlyApiOptions } from "./api.ts";
import type { App } from "./app.ts";
import type { Volume } from "./volume.ts";

/**
 * Machine service configuration
 */
export interface MachineService {
  /**
   * Protocol for the service
   */
  protocol: "tcp" | "udp";

  /**
   * Internal port the service listens on
   */
  internal_port: number;

  /**
   * Port configuration
   */
  ports: Array<{
    port: number;
    handlers?: string[];
  }>;

  /**
   * Force HTTPS redirects
   * @default false
   */
  force_https?: boolean;

  /**
   * Auto stop machines when there's no traffic
   * @default true
   */
  auto_stop_machines?: boolean;

  /**
   * Auto start machines when there's traffic
   * @default true
   */
  auto_start_machines?: boolean;

  /**
   * Minimum number of machines to keep running
   * @default 0
   */
  min_machines_running?: number;
}

/**
 * Machine guest configuration (CPU and memory)
 */
export interface MachineGuest {
  /**
   * CPU kind
   * @default "shared"
   */
  cpu_kind?: "shared" | "performance";

  /**
   * Number of CPUs
   * @default 1
   */
  cpus?: number;

  /**
   * Memory in MB
   * @default 256
   */
  memory_mb?: number;
}

/**
 * Machine mount configuration
 */
export interface MachineMount {
  /**
   * Volume to mount (either volume ID string or Volume resource)
   */
  source: string | Volume;

  /**
   * Destination path in the container
   */
  destination: string;
}

/**
 * Machine restart policy
 */
export interface MachineRestart {
  /**
   * Restart policy
   * @default "on-failure"
   */
  policy?: "no" | "always" | "on-failure";

  /**
   * Maximum number of restart attempts
   * @default 5
   */
  max_retries?: number;
}

/**
 * Machine configuration
 */
export interface MachineConfig {
  /**
   * Container image to run
   */
  image: string;

  /**
   * Environment variables
   */
  env?: Record<string, string | Secret>;

  /**
   * Services configuration
   */
  services?: MachineService[];

  /**
   * Guest configuration (CPU and memory)
   */
  guest?: MachineGuest;

  /**
   * Volume mounts
   */
  mounts?: MachineMount[];

  /**
   * Restart policy
   */
  restart?: MachineRestart;

  /**
   * Command to run
   */
  init?: {
    exec?: string[];
    entrypoint?: string[];
    cmd?: string[];
  };

  /**
   * Whether to auto-destroy the machine
   * @default false
   */
  auto_destroy?: boolean;

  /**
   * DNS configuration
   */
  dns?: {
    nameservers?: string[];
  };
}

/**
 * Properties for creating or updating a Fly.io machine
 */
export interface MachineProps extends FlyApiOptions {
  /**
   * App this machine belongs to (app name string or App resource)
   */
  app: string | App;

  /**
   * Region where the machine will be created
   * @default "iad" (Washington D.C.)
   */
  region?: string;

  /**
   * Machine configuration
   */
  config: MachineConfig;

  /**
   * Machine name
   */
  name?: string;
}

/**
 * A Fly.io virtual machine
 */
export interface Machine
  extends Resource<"fly::Machine">,
    Omit<MachineProps, "apiToken"> {
  /**
   * The ID of the machine
   */
  id: string;

  /**
   * The name of the machine
   */
  name: string;

  /**
   * Current state of the machine
   */
  state: string;

  /**
   * Region where the machine is running
   */
  region: string;

  /**
   * Instance ID
   */
  instance_id: string;

  /**
   * Private IP address
   */
  private_ip: string;

  /**
   * Machine configuration
   */
  config: MachineConfig;

  /**
   * Image reference information
   */
  image_ref: {
    registry: string;
    repository: string;
    tag: string;
    digest: string;
  };

  /**
   * Time at which the machine was created
   */
  created_at: string;

  /**
   * Time at which the machine was last updated
   */
  updated_at: string;
}

/**
 * Creates a Fly.io machine (virtual machine/container).
 *
 * @example
 * ## Create a basic web server machine
 *
 * Create a simple web server machine:
 *
 * ```ts
 * const machine = await Machine("web-server", {
 *   app: "my-app",
 *   config: {
 *     image: "nginx:alpine",
 *     services: [{
 *       protocol: "tcp",
 *       internal_port: 80,
 *       ports: [{ port: 80, handlers: ["http"] }]
 *     }]
 *   }
 * });
 * ```
 *
 * @example
 * ## Create a machine with custom resources and environment
 *
 * Create a machine with specific CPU, memory, and environment variables:
 *
 * ```ts
 * const apiMachine = await Machine("api-server", {
 *   app: myApp,
 *   region: "sea",
 *   config: {
 *     image: "node:18-alpine",
 *     env: {
 *       NODE_ENV: "production",
 *       PORT: "3000"
 *     },
 *     guest: {
 *       cpus: 2,
 *       memory_mb: 1024
 *     },
 *     services: [{
 *       protocol: "tcp",
 *       internal_port: 3000,
 *       ports: [{ port: 80, handlers: ["http"] }]
 *     }]
 *   }
 * });
 * ```
 *
 * @example
 * ## Create a machine with volume mounts
 *
 * Create a machine with persistent storage:
 *
 * ```ts
 * const dbMachine = await Machine("database", {
 *   app: myApp,
 *   config: {
 *     image: "postgres:15",
 *     env: {
 *       POSTGRES_PASSWORD: alchemy.secret("mypassword")
 *     },
 *     mounts: [{
 *       source: myVolume,
 *       destination: "/var/lib/postgresql/data"
 *     }],
 *     guest: {
 *       cpus: 1,
 *       memory_mb: 512
 *     }
 *   }
 * });
 * ```
 */
export const Machine = Resource(
  "fly::Machine",
  async function (
    this: Context<Machine>,
    id: string,
    props: MachineProps,
  ): Promise<Machine> {
    const api = createFlyApi(props);
    const appName = typeof props.app === "string" ? props.app : props.app.name;
    const machineId = this.output?.id;

    if (this.phase === "delete") {
      try {
        if (machineId) {
          // Stop the machine first
          const stopResponse = await api.post(
            `/apps/${appName}/machines/${machineId}/stop`,
            {}
          );
          // Don't fail if machine is already stopped
          if (!stopResponse.ok && stopResponse.status !== 404) {
            console.warn(`Failed to stop machine ${machineId}: ${stopResponse.status}`);
          }

          // Wait a bit for the machine to stop
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Delete the machine
          const deleteResponse = await api.delete(
            `/apps/${appName}/machines/${machineId}`
          );
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "deleting", "machine", machineId);
          }
        }
      } catch (error) {
        console.error(`Error deleting Fly.io machine ${machineId}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      // Prepare machine configuration
      const machineConfig = {
        ...props.config,
        env: props.config.env ? Object.fromEntries(
          Object.entries(props.config.env).map(([key, value]) => [
            key,
            typeof value === "string" ? value : value.unencrypted,
          ])
        ) : undefined,
        mounts: props.config.mounts?.map(mount => ({
          ...mount,
          source: typeof mount.source === "string" ? mount.source : mount.source.id,
        })),
      };

      let machineData: any;

      if (this.phase === "update" && machineId) {
        // Update existing machine
        const updateResponse = await api.post(
          `/apps/${appName}/machines/${machineId}`,
          {
            config: machineConfig,
            name: props.name || id,
          }
        );

        if (!updateResponse.ok) {
          await handleApiError(updateResponse, "updating", "machine", machineId);
        }

        machineData = await updateResponse.json();
      } else {
        // Create new machine
        const createPayload = {
          name: props.name || id,
          config: machineConfig,
          region: props.region || "iad",
        };

        const createResponse = await api.post(
          `/apps/${appName}/machines`,
          createPayload
        );

        if (!createResponse.ok) {
          await handleApiError(createResponse, "creating", "machine", id);
        }

        machineData = await createResponse.json();

        // Wait for machine to be ready
        await waitForMachineState(
          api,
          appName,
          machineData.id,
          ["started", "stopped"]
        );

        // Get updated machine data
        const getResponse = await api.get(
          `/apps/${appName}/machines/${machineData.id}`
        );
        if (getResponse.ok) {
          machineData = await getResponse.json();
        }
      }

      return this({
        id: machineData.id,
        name: machineData.name,
        state: machineData.state,
        region: machineData.region,
        instance_id: machineData.instance_id,
        private_ip: machineData.private_ip,
        config: machineData.config,
        image_ref: machineData.image_ref,
        created_at: machineData.created_at,
        updated_at: machineData.updated_at,
        // Pass through props (excluding sensitive data)
        app: props.app,
        baseUrl: props.baseUrl,
      });
    } catch (error) {
      console.error(`Error ${this.phase} Fly.io machine '${id}':`, error);
      throw error;
    }
  },
);

/**
 * Wait for machine to reach a desired state
 */
async function waitForMachineState(
  api: any,
  appName: string,
  machineId: string,
  targetStates: string[],
  timeoutMs: number = 60000,
): Promise<void> {
  const startTime = Date.now();
  let currentState = "";

  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await api.get(`/apps/${appName}/machines/${machineId}`);
      if (response.ok) {
        const machineData = await response.json();
        currentState = machineData.state;
        
        if (targetStates.includes(currentState)) {
          return;
        }
      }
    } catch (error) {
      console.warn(`Error checking machine state: ${error}`);
    }

    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error(
    `Timeout waiting for machine ${machineId} to reach state ${targetStates.join(" or ")}. Current state: ${currentState}`
  );
}
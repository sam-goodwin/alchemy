import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { DockerApi } from "./api.js";
import type { Image } from "./image.js";
import type { RemoteImage } from "./remote-image.js";

/**
 * Port mapping configuration
 */
export interface PortMapping {
  /**
   * External port on the host
   */
  external: number | string;

  /**
   * Internal port inside the container
   */
  internal: number | string;

  /**
   * Protocol (tcp or udp)
   */
  protocol?: "tcp" | "udp";
}

/**
 * Volume mapping configuration
 */
export interface VolumeMapping {
  /**
   * Host path
   */
  hostPath: string;

  /**
   * Container path
   */
  containerPath: string;

  /**
   * Read-only flag
   */
  readOnly?: boolean;
}

/**
 * Network mapping configuration
 */
export interface NetworkMapping {
  /**
   * Network name or ID
   */
  name: string;

  /**
   * Aliases for the container in the network
   */
  aliases?: string[];
}

/**
 * Properties for creating a Docker container
 */
export interface ContainerProps {
  /**
   * Image to use for the container
   * Can be an Alchemy Image or RemoteImage resource or a string image reference
   */
  image: Image | RemoteImage | string;

  /**
   * Container name
   */
  name?: string;

  /**
   * Command to run in the container
   */
  command?: string[];

  /**
   * Environment variables
   */
  environment?: Record<string, string>;

  /**
   * Port mappings
   */
  ports?: PortMapping[];

  /**
   * Volume mappings
   */
  volumes?: VolumeMapping[];

  /**
   * Restart policy
   */
  restart?: "no" | "always" | "on-failure" | "unless-stopped";

  /**
   * Networks to connect to
   */
  networks?: NetworkMapping[];

  /**
   * Whether to remove the container when it exits
   */
  removeOnExit?: boolean;

  /**
   * Start the container after creation
   */
  start?: boolean;
}

/**
 * Docker Container resource
 */
export interface Container
  extends Resource<"docker::Container">,
    ContainerProps {
  /**
   * Container ID
   */
  id: string;

  /**
   * Container state
   */
  state?: "created" | "running" | "paused" | "stopped" | "exited";

  /**
   * Time when the container was created
   */
  createdAt: number;
}

/**
 * Create and manage a Docker Container
 *
 * @example
 * // Create a simple Nginx container
 * const webContainer = await Container("web", {
 *   image: "nginx:latest",
 *   ports: [
 *     { external: 8080, internal: 80 }
 *   ],
 *   start: true
 * });
 *
 * @example
 * // Create a container with environment variables and volume mounts
 * const appContainer = await Container("app", {
 *   image: customImage, // Using an Alchemy RemoteImage resource
 *   environment: {
 *     NODE_ENV: "production",
 *     API_KEY: "secret-key"
 *   },
 *   volumes: [
 *     { hostPath: "./data", containerPath: "/app/data" }
 *   ],
 *   ports: [
 *     { external: 3000, internal: 3000 }
 *   ],
 *   restart: "always",
 *   start: true
 * });
 */
export const Container = Resource(
  "docker::Container",
  async function (
    this: Context<Container>,
    id: string,
    props: ContainerProps,
  ): Promise<Container> {
    // Initialize Docker API client
    const api = new DockerApi();

    // Get image reference
    const imageRef =
      typeof props.image === "string" ? props.image : props.image.imageRef;

    // Use provided name or generate one based on resource ID
    const containerName =
      props.name || `alchemy-${id.replace(/[^a-zA-Z0-9_.-]/g, "-")}`;

    // Handle delete phase
    if (this.phase === "delete") {
      if (this.output?.id) {
        // Stop container if running
        await api.stopContainer(this.output.id);

        // Remove container
        await api.removeContainer(this.output.id, true);
      }

      // Return destroyed state
      return this.destroy();
    } else {
      let containerState: NonNullable<Container["state"]> = "created";

      if (this.phase === "update") {
        // Check if container already exists (for update)
        const containerExists = await api.containerExists(containerName);

        if (containerExists) {
          // Remove existing container for update
          await api.removeContainer(containerName, true);
        }
      }

      // Prepare port mappings
      const portMappings: Record<string, string> = {};
      if (props.ports) {
        for (const port of props.ports) {
          const protocol = port.protocol || "tcp";
          portMappings[`${port.external}`] = `${port.internal}/${protocol}`;
        }
      }

      // Prepare volume mappings
      const volumeMappings: Record<string, string> = {};
      if (props.volumes) {
        for (const volume of props.volumes) {
          const readOnlyFlag = volume.readOnly ? ":ro" : "";
          volumeMappings[volume.hostPath] =
            `${volume.containerPath}${readOnlyFlag}`;
        }
      }

      // Create new container
      const containerId = await api.createContainer(imageRef, containerName, {
        ports: portMappings,
        env: props.environment,
        volumes: volumeMappings,
        cmd: props.command,
      });

      // Connect to networks if specified
      if (props.networks) {
        for (const network of props.networks) {
          const networkId =
            typeof network === "string" ? network : network.name;
          await api.connectNetwork(containerId, networkId, {
            aliases: network.aliases,
          });
        }
      }

      // Start container if requested
      if (props.start) {
        await api.startContainer(containerId);
        containerState = "running";
      }

      // Return the resource using this() to construct output
      return this({
        ...props,
        id: containerId,
        state: containerState,
        createdAt: Date.now(),
      });
    }
  },
);

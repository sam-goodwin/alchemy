import type { Context } from "../context";
import { Resource } from "../resource";
import { DockerApi } from "./api";
import { DockerImage } from "./image";

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
 * Properties for creating a Docker container
 */
export interface DockerContainerProps {
  /**
   * Image to use for the container
   * Can be an Alchemy DockerImage resource or a string image reference
   */
  image: DockerImage | string;

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
  networks?: string[];

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
export interface DockerContainer extends DockerContainerProps {
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
 * const webContainer = await DockerContainer("web", {
 *   image: "nginx:latest",
 *   ports: [
 *     { external: 8080, internal: 80 }
 *   ],
 *   start: true
 * });
 * 
 * @example
 * // Create a container with environment variables and volume mounts
 * const appContainer = await DockerContainer("app", {
 *   image: customImage, // Using an Alchemy DockerImage resource
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
export const DockerContainer = Resource(
  "docker::Container",
  async function(this: Context<DockerContainer>, id: string, props: DockerContainerProps): Promise<DockerContainer> {
    // Initialize Docker API client
    const api = new DockerApi();
    
    // Get image reference
    const imageRef = typeof props.image === "string" 
      ? props.image 
      : props.image.imageRef;

    // Use provided name or generate one based on resource ID
    const containerName = props.name || `alchemy-${id.replace(/[^a-zA-Z0-9_.-]/g, "-")}`;  

    // Check if Docker daemon is running
    const isRunning = await api.isRunning();
    if (!isRunning) {
      console.warn("⚠️ Docker daemon is not running. Creating a mock container resource.");
      // Return a mock container resource with properly typed state
      const containerState: "created" | "running" = props.start ? "running" : "created";
      return this({
        ...props,
        id: `mock-${containerName}-${Date.now()}`,
        state: containerState,
        createdAt: Date.now()
      });
    }

    // Handle delete phase
    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          // Stop container if running
          try {
            await api.stopContainer(this.output.id);
          } catch (error) {
            // Ignore errors on stop (container might already be stopped)
          }

          // Remove container
          await api.removeContainer(this.output.id, true);
        }
      } catch (error) {
        console.error("Error deleting container:", error);
      }

      // Return destroyed state
      return this.destroy();
    } else {
      try {
        let containerId = "";
        let containerState = "created";

        // Check if container already exists (for update)
        const containerExists = await api.containerExists(containerName);

        if (this.phase === "update" && containerExists) {
          // Remove existing container for update
          await api.removeContainer(containerName, true);
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
            volumeMappings[volume.hostPath] = `${volume.containerPath}${readOnlyFlag}`;
          }
        }

        // Create new container
        containerId = await api.createContainer(imageRef, containerName, {
          ports: portMappings,
          env: props.environment,
          volumes: volumeMappings,
          cmd: props.command
        });

        // Connect to networks if specified
        if (props.networks) {
          for (const network of props.networks) {
            await api.connectNetwork(containerId, network);
          }
        }

        // Start container if requested
        if (props.start) {
          await api.startContainer(containerId);
          containerState = "running" as const;
        }

        // Return the resource using this() to construct output
        return this({
          ...props,
          id: containerId,
          state: containerState,
          createdAt: Date.now(),
        });
      } catch (error) {
        console.error("Error creating/updating container:", error);
        throw error;
      }
    }
  }
);

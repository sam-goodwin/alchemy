import type { Context } from "../context";
import { Resource } from "../resource";
import { DockerApi } from "./api";

/**
 * Properties for creating a Docker network
 */
export interface DockerNetworkProps {
  /**
   * Network name
   */
  name: string;

  /**
   * Network driver to use
   * @default "bridge"
   */
  driver?: "bridge" | "host" | "none" | "overlay" | "macvlan" | string;

  /**
   * Enable IPv6 on the network
   * @default false
   */
  enableIPv6?: boolean;

  /**
   * Network-scoped alias for containers
   */
  labels?: Record<string, string>;
}

/**
 * Docker Network resource
 */
export interface DockerNetwork extends DockerNetworkProps {
  /**
   * Network ID
   */
  id: string;

  /**
   * Time when the network was created
   */
  createdAt: number;
}

/**
 * Create and manage a Docker Network
 * 
 * @example
 * // Create a simple bridge network
 * const appNetwork = await DockerNetwork("app-network", {
 *   name: "app-network"
 * });
 * 
 * @example
 * // Create a custom network with driver
 * const overlayNetwork = await DockerNetwork("overlay-network", {
 *   name: "overlay-network",
 *   driver: "overlay",
 *   enableIPv6: true,
 *   labels: {
 *     "com.example.description": "Network for application services"
 *   }
 * });
 */
export const DockerNetwork = Resource(
  "docker::Network",
  async function(this: Context<DockerNetwork>, id: string, props: DockerNetworkProps): Promise<DockerNetwork> {
    // Initialize Docker API client
    const api = new DockerApi();

    // Check if Docker daemon is running
    const isRunning = await api.isRunning();
    if (!isRunning) {
      console.warn("⚠️ Docker daemon is not running. Creating a mock network resource.");
      // Return a mock network resource
      return this({
        ...props,
        id: `mock-${props.name}-${Date.now()}`,
        createdAt: Date.now()
      });
    }

    // Handle delete phase
    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          // Remove network
          await api.removeNetwork(this.output.id);
        }
      } catch (error) {
        console.error("Error deleting network:", error);
      }

      // Return destroyed state
      return this.destroy();
    } else {
      try {
        // Create the network
        const driver = props.driver || "bridge";
        const networkId = await api.createNetwork(props.name, driver);

        // Return the resource using this() to construct output
        return this({
          ...props,
          id: networkId,
          createdAt: Date.now()
        });
      } catch (error) {
        console.error("Error creating network:", error);
        throw error;
      }
    }
  }
);

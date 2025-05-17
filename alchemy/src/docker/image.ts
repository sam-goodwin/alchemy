import type { Context } from "../context";
import { Resource } from "../resource";
import { DockerApi } from "./api";

/**
 * Properties for creating a Docker image
 */
export interface DockerImageProps {
  /**
   * Docker image name (e.g., "nginx")
   */
  name: string;

  /**
   * Tag for the image (e.g., "latest" or "1.19-alpine")
   */
  tag?: string;

  /**
   * Path to build context (directory containing Dockerfile)
   * If provided, image will be built rather than pulled
   */
  build?: {
    /**
     * Path to build context
     */
    context: string;
    
    /**
     * Path to Dockerfile (relative to context)
     * Defaults to "Dockerfile" in context directory
     */
    dockerfile?: string;

    /**
     * Build arguments
     */
    args?: Record<string, string>;
  };

  /**
   * Always attempt to pull or build the image, even if it exists locally
   */
  alwaysPull?: boolean;
}

/**
 * Docker Image resource
 */
export interface DockerImage extends DockerImageProps {
  /**
   * Full image reference (name:tag)
   */
  imageRef: string;

  /**
   * Time when the image was created or pulled
   */
  createdAt: number;
}

/**
 * Create or reference a Docker Image
 * 
 * @example
 * // Pull the nginx image
 * const nginxImage = await DockerImage("nginx", {
 *   name: "nginx",
 *   tag: "latest"
 * });
 * 
 * @example
 * // Build a custom image from a Dockerfile
 * const customImage = await DockerImage("my-app", {
 *   name: "my-app",
 *   tag: "v1",
 *   build: {
 *     context: "./app",
 *     args: {
 *       NODE_ENV: "production"
 *     }
 *   }
 * });
 */
export const DockerImage = Resource(
  "docker::Image",
  async function(this: Context<DockerImage>, id: string, props: DockerImageProps): Promise<DockerImage> {
    // Initialize Docker API client
    const api = new DockerApi();
    
    // Normalize properties
    const tag = props.tag || "latest";
    const imageRef = `${props.name}:${tag}`;

    // Check if Docker daemon is running
    const isRunning = await api.isRunning();
    if (!isRunning) {
      console.warn("⚠️ Docker daemon is not running. Creating a mock image resource.");
      // Return a mock image resource
      return this({
        ...props,
        imageRef,
        createdAt: Date.now()
      });
    }

    if (this.phase === "delete") {
      // No action needed for delete as Docker images aren't automatically removed
      // This is intentional as other resources might depend on the same image
      return this.destroy();
    } else {
      try {
        if (props.build) {
          // Build image from Dockerfile
          const { context, dockerfile = "Dockerfile", args = {} } = props.build;
          
          // Build the image
          await api.buildImage(context, imageRef, args);
        } else {
          // Pull image
          await api.pullImage(imageRef);
        }

        // Return the resource using this() to construct output
        return this({
          ...props,
          imageRef,
          createdAt: Date.now(),
        });
      } catch (error) {
        console.error("Error creating Docker image:", error);
        throw error;
      }
    }
  }
);

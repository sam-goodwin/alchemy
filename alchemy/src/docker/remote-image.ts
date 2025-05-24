import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { DockerApi } from "./api.js";

/**
 * Properties for creating a Docker image
 */
export interface RemoteImageProps {
  /**
   * Docker image name (e.g., "nginx")
   */
  name: string;

  /**
   * Tag for the image (e.g., "latest" or "1.19-alpine")
   */
  tag?: string;

  /**
   * Always attempt to pull the image, even if it exists locally
   */
  alwaysPull?: boolean;
}

/**
 * Docker Remote Image resource
 */
export interface RemoteImage
  extends Resource<"docker::RemoteImage">,
    RemoteImageProps {
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
 * Create or reference a Docker Remote Image
 *
 * @example
 * // Pull the nginx image
 * const nginxImage = await RemoteImage("nginx", {
 *   name: "nginx",
 *   tag: "latest"
 * });
 *
 */
export const RemoteImage = Resource(
  "docker::RemoteImage",
  async function (
    this: Context<RemoteImage>,
    id: string,
    props: RemoteImageProps,
  ): Promise<RemoteImage> {
    // Initialize Docker API client
    const api = new DockerApi();

    if (this.phase === "delete") {
      // No action needed for delete as Docker images aren't automatically removed
      // This is intentional as other resources might depend on the same image
      return this.destroy();
    } else {
      // Normalize properties
      const tag = props.tag || "latest";
      const imageRef = `${props.name}:${tag}`;

      // Pull image
      await api.pullImage(imageRef);

      // Return the resource using this() to construct output
      return this({
        ...props,
        imageRef,
        createdAt: Date.now(),
      });
    }
  },
);

import type { Context } from "../context.ts";
import { Resource, ResourceKind } from "../resource.ts";
import { handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";

/**
 * Transform options for image variants
 */
export interface ImageVariantOptions {
  /**
   * Resizing mode
   */
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";

  /**
   * Metadata handling
   */
  metadata?: "keep" | "copyright" | "none";

  /**
   * Image width in pixels
   */
  width?: number;

  /**
   * Image height in pixels
   */
  height?: number;

  /**
   * Quality (1-100)
   */
  quality?: number;

  /**
   * Output format
   */
  format?: "auto" | "avif" | "webp" | "json" | "jpeg" | "png" | "gif";

  /**
   * Device pixel ratio
   */
  dpr?: number;

  /**
   * Gravity for cropping
   */
  gravity?: "auto" | "side" | string;

  /**
   * Background color (hex)
   */
  background?: string;

  /**
   * Border configuration
   */
  border?: {
    width: number;
    color: string;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  /**
   * Brightness adjustment (-100 to 100)
   */
  brightness?: number;

  /**
   * Contrast adjustment (-100 to 100)
   */
  contrast?: number;

  /**
   * Gamma adjustment (0.1 to 10)
   */
  gamma?: number;

  /**
   * Blur radius (0 to 250)
   */
  blur?: number;

  /**
   * Sharpen amount (0 to 100)
   */
  sharpen?: number;

  /**
   * Trim configuration
   */
  trim?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  /**
   * Rotation angle (0, 90, 180, 270)
   */
  rotate?: number;
}

/**
 * Properties for creating or updating an Images Variant
 */
export interface ImagesVariantProps extends CloudflareApiOptions {
  /**
   * Unique identifier for the variant
   */
  variantId?: string;

  /**
   * Transform options for the variant
   */
  options: ImageVariantOptions;

  /**
   * Whether URLs for this variant can be signed
   */
  neverRequireSignedURLs?: boolean;

  /**
   * Whether to adopt an existing variant with the same ID if it exists
   */
  adopt?: boolean;

  /**
   * Whether to delete the variant when removed from Alchemy
   */
  delete?: boolean;
}

/**
 * Output returned after Images Variant creation/update
 */
export interface ImagesVariantResource
  extends Resource<"cloudflare::ImagesVariant"> {
  /**
   * The unique identifier for the variant
   */
  variantId: string;

  /**
   * Transform options for the variant
   */
  options: ImageVariantOptions;

  /**
   * Whether URLs for this variant can be signed
   */
  neverRequireSignedURLs: boolean;

  /**
   * When the variant was created
   */
  createdAt: string;

  /**
   * When the variant was last modified
   */
  modifiedAt: string;
}

export function isImagesVariant(
  resource: Resource,
): resource is ImagesVariantResource {
  return resource[ResourceKind] === "cloudflare::ImagesVariant";
}

/**
 * A Cloudflare Images Variant defines a set of transformations that can be applied to images.
 *
 * @see https://developers.cloudflare.com/images/transform-images/create-variants/
 *
 * @example
 * // Create a thumbnail variant
 * const thumbnail = await ImagesVariant("thumbnail", {
 *   variantId: "thumbnail",
 *   options: {
 *     fit: "cover",
 *     width: 200,
 *     height: 200,
 *     quality: 80
 *   }
 * });
 *
 * @example
 * // Create a high-quality variant with multiple transforms
 * const highQuality = await ImagesVariant("high-quality", {
 *   variantId: "high-quality",
 *   options: {
 *     fit: "contain",
 *     width: 1920,
 *     height: 1080,
 *     quality: 95,
 *     format: "webp",
 *     sharpen: 10
 *   },
 *   neverRequireSignedURLs: true
 * });
 *
 * @example
 * // Create a variant with effects and borders
 * const styled = await ImagesVariant("styled", {
 *   variantId: "styled",
 *   options: {
 *     fit: "crop",
 *     width: 400,
 *     height: 300,
 *     brightness: 10,
 *     contrast: 5,
 *     border: {
 *       width: 5,
 *       color: "#000000"
 *     }
 *   }
 * });
 */
export const ImagesVariant = Resource(
  "cloudflare::ImagesVariant",
  async function (
    this: Context<ImagesVariantResource>,
    id: string,
    props: ImagesVariantProps,
  ): Promise<ImagesVariantResource> {
    const api = await createCloudflareApi(props);

    const variantId = props.variantId ?? id;

    if (this.phase === "delete") {
      const existingVariantId = this.output?.variantId;
      if (existingVariantId && props.delete !== false) {
        await deleteImagesVariant(api, existingVariantId);
      }
      return this.destroy();
    }

    let variant: ImagesVariantResource;

    if (this.phase === "update") {
      // Update existing variant
      variant = await updateImagesVariant(api, variantId, props);
    } else {
      // Create new variant
      try {
        variant = await createImagesVariant(api, variantId, props);
      } catch (error) {
        if (
          props.adopt &&
          error instanceof Error &&
          error.message.includes("already exists")
        ) {
          // Adopt existing variant
          variant = await getImagesVariant(api, variantId);
        } else {
          throw error;
        }
      }
    }

    return this(variant);
  },
);

async function createImagesVariant(
  api: CloudflareApi,
  variantId: string,
  props: ImagesVariantProps,
): Promise<ImagesVariantResource> {
  const payload = {
    id: variantId,
    options: props.options,
    neverRequireSignedURLs: props.neverRequireSignedURLs ?? false,
  };

  const response = await api.post(
    `/accounts/${api.accountId}/images/v1/variants`,
    payload,
  );

  if (!response.ok) {
    await handleApiError(response, "create", "images_variant", variantId);
  }

  const data = await response.json();
  return transformApiResponse(data.result);
}

async function updateImagesVariant(
  api: CloudflareApi,
  variantId: string,
  props: ImagesVariantProps,
): Promise<ImagesVariantResource> {
  const payload = {
    options: props.options,
    neverRequireSignedURLs: props.neverRequireSignedURLs ?? false,
  };

  const response = await api.patch(
    `/accounts/${api.accountId}/images/v1/variants/${variantId}`,
    payload,
  );

  if (!response.ok) {
    await handleApiError(response, "update", "images_variant", variantId);
  }

  const data = await response.json();
  return transformApiResponse(data.result);
}

async function getImagesVariant(
  api: CloudflareApi,
  variantId: string,
): Promise<ImagesVariantResource> {
  const response = await api.get(
    `/accounts/${api.accountId}/images/v1/variants/${variantId}`,
  );

  if (!response.ok) {
    await handleApiError(response, "get", "images_variant", variantId);
  }

  const data = await response.json();
  return transformApiResponse(data.result);
}

async function deleteImagesVariant(
  api: CloudflareApi,
  variantId: string,
): Promise<void> {
  const response = await api.delete(
    `/accounts/${api.accountId}/images/v1/variants/${variantId}`,
  );

  if (!response.ok && response.status !== 404) {
    await handleApiError(response, "delete", "images_variant", variantId);
  }
}

function transformApiResponse(result: any): ImagesVariantResource {
  return {
    [ResourceKind]: "cloudflare::ImagesVariant",
    variantId: result.id,
    options: result.options,
    neverRequireSignedURLs: result.neverRequireSignedURLs,
    createdAt: result.createdAt,
    modifiedAt: result.modifiedAt,
  };
}

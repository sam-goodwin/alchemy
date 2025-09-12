import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { ImagesVariant } from "../../src/cloudflare/images-variant.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Cloudflare Images Variant", () => {
  test("create, update, and delete variant", async (scope) => {
    const variantId = `${BRANCH_PREFIX}-test-variant`;
    let variant: Awaited<ReturnType<typeof ImagesVariant>>;

    try {
      // Create variant
      variant = await ImagesVariant("test-variant", {
        variantId,
        options: {
          fit: "cover",
          width: 400,
          height: 300,
          quality: 80,
        },
        neverRequireSignedURLs: true,
      });

      expect(variant).toMatchObject({
        variantId,
        options: {
          fit: "cover",
          width: 400,
          height: 300,
          quality: 80,
        },
        neverRequireSignedURLs: true,
      });
      expect(variant.createdAt).toBeDefined();
      expect(variant.modifiedAt).toBeDefined();

      // Update variant
      variant = await ImagesVariant("test-variant", {
        variantId,
        options: {
          fit: "contain",
          width: 500,
          height: 400,
          quality: 90,
          format: "webp",
        },
        neverRequireSignedURLs: false,
      });

      expect(variant).toMatchObject({
        variantId,
        options: {
          fit: "contain",
          width: 500,
          height: 400,
          quality: 90,
          format: "webp",
        },
        neverRequireSignedURLs: false,
      });
    } finally {
      await destroy(scope);
      await assertImagesVariantDoesNotExist(variantId);
    }
  });

  test("create variant with complex options", async (scope) => {
    const variantId = `${BRANCH_PREFIX}-complex-variant`;
    let variant: Awaited<ReturnType<typeof ImagesVariant>>;

    try {
      // Create variant with complex transformation options
      variant = await ImagesVariant("complex-variant", {
        variantId,
        options: {
          fit: "crop",
          width: 800,
          height: 600,
          quality: 95,
          format: "avif",
          brightness: 5,
          contrast: 10,
          sharpen: 15,
          border: {
            width: 2,
            color: "#ff0000",
          },
          trim: {
            top: 10,
            left: 10,
          },
          rotate: 90,
        },
        neverRequireSignedURLs: true,
      });

      expect(variant).toMatchObject({
        variantId,
        options: {
          fit: "crop",
          width: 800,
          height: 600,
          quality: 95,
          format: "avif",
          brightness: 5,
          contrast: 10,
          sharpen: 15,
          border: {
            width: 2,
            color: "#ff0000",
          },
          trim: {
            top: 10,
            left: 10,
          },
          rotate: 90,
        },
        neverRequireSignedURLs: true,
      });
    } finally {
      await destroy(scope);
      await assertImagesVariantDoesNotExist(variantId);
    }
  });

  test("adopt existing variant", async (scope) => {
    const variantId = `${BRANCH_PREFIX}-adopt-variant`;
    let variant1: Awaited<ReturnType<typeof ImagesVariant>>;
    let variant2: Awaited<ReturnType<typeof ImagesVariant>>;

    try {
      // Create the first variant
      variant1 = await ImagesVariant("adopt-variant-1", {
        variantId,
        options: {
          fit: "scale-down",
          width: 200,
          height: 200,
        },
      });

      // Try to adopt the same variant ID (should succeed with adopt: true)
      variant2 = await ImagesVariant("adopt-variant-2", {
        variantId,
        options: {
          fit: "contain",
          width: 300,
          height: 300,
        },
        adopt: true,
      });

      expect(variant1.variantId).toBe(variant2.variantId);
      expect(variant1.createdAt).toBe(variant2.createdAt);
    } finally {
      await destroy(scope);
      await assertImagesVariantDoesNotExist(variantId);
    }
  });
});

async function assertImagesVariantDoesNotExist(variantId: string) {
  try {
    // Try to get the variant to ensure it doesn't exist
    const { createCloudflareApi } = await import("../../src/cloudflare/api.ts");
    const api = await createCloudflareApi();

    const response = await api.get(
      `/accounts/${api.accountId}/images/v1/variants/${variantId}`,
    );

    if (response.ok) {
      throw new Error(`Images variant ${variantId} should not exist`);
    }

    // Expect 404 or similar error
    expect(response.status).toBe(404);
  } catch (error) {
    if (error instanceof Error && error.message.includes("should not exist")) {
      throw error;
    }
    // Expected - variant should not exist
  }
}

import type Stripe from "stripe";
import { beforeAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import {
  EntitlementsFeature,
  Product,
  ProductFeature,
} from "../../src/stripe/index.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe ProductFeature Resource", () => {
  beforeAll(async () => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = await createStripeClient({ apiKey });
  });

  test("create and delete product feature", async (scope) => {
    const productId = `${BRANCH_PREFIX}-product-1`;
    const featureId = `${BRANCH_PREFIX}-feature-1`;
    const productFeatureId = `${BRANCH_PREFIX}-product-feature-1`;
    try {
      const product = await Product(productId, {
        name: "Test Product",
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
        },
      });
      console.log(product);

      const feature = await EntitlementsFeature(featureId, {
        name: "Test Feature",
        lookupKey: `test_feature_${BRANCH_PREFIX}_product_feature_${Date.now()}`,
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
        },
      });

      const productFeature = await ProductFeature(productFeatureId, {
        product: product.id,
        entitlementFeature: feature.id,
      });

      expect(productFeature).toMatchObject({
        product: product.id,
        entitlementFeature: feature.id,
      });

      const stripeProductFeatures = await stripeClient.products.listFeatures(
        product.id,
      );
      const foundFeature = stripeProductFeatures.data.find(
        (f) => f.id === productFeature.id,
      );
      expect(foundFeature).toBeDefined();
    } finally {
      await destroy(scope);
    }
  });
});

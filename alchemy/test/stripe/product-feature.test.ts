import { beforeAll, describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { ProductFeature } from "../../src/stripe/product-feature.ts";
import { EntitlementsFeature } from "../../src/stripe/entitlements-feature.ts";
import { Product } from "../../src/stripe/product.ts";
import "../../src/test/bun.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe ProductFeature Resource", () => {
  beforeAll(() => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = new Stripe(apiKey);
  });

  test("create and delete product feature", async (scope) => {
    const productId = `${BRANCH_PREFIX}-product-1`;
    const featureId = `${BRANCH_PREFIX}-feature-1`;
    const productFeatureId = `${BRANCH_PREFIX}-product-feature-1`;

    const product = await Product(productId, {
      name: "Test Product",
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
      },
    });

    const feature = await EntitlementsFeature(featureId, {
      name: "Test Feature",
      lookupKey: "test_feature_v1",
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

    await destroy(scope);
  });
});

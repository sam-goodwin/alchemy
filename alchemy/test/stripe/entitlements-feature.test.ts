import type Stripe from "stripe";
import { beforeAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import { EntitlementsFeature } from "../../src/stripe/entitlements-feature.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe EntitlementsFeature Resource", () => {
  beforeAll(async () => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = await createStripeClient({ apiKey });
  });

  test("create, update, and delete entitlements feature", async (scope) => {
    const featureId = `${BRANCH_PREFIX}-feature-1`;

    try {
      const feature = await EntitlementsFeature(featureId, {
        name: "Test Feature",
        lookupKey: `test_feature_${BRANCH_PREFIX}_entitlements_${Date.now()}`,
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
        },
      });

      expect(feature).toMatchObject({
        name: "Test Feature",
        lookupKey: expect.stringMatching(/^test_feature_/),
      });

      const stripeFeature = await stripeClient.entitlements.features.retrieve(
        feature.id,
      );
      expect(stripeFeature.id).toBe(feature.id);
      expect(stripeFeature.name).toBe("Test Feature");

      const updatedFeature = await EntitlementsFeature(featureId, {
        name: "Updated Test Feature",
        lookupKey: feature.lookupKey,
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
          updated: "true",
        },
      });

      expect(updatedFeature).toMatchObject({
        name: "Updated Test Feature",
      });
    } finally {
      await destroy(scope);
    }
  });
});

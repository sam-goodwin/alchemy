import type Stripe from "stripe";
import { beforeAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import { PortalConfiguration } from "../../src/stripe/portal-configuration.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe PortalConfiguration Resource", () => {
  beforeAll(async () => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = await createStripeClient({ apiKey });
  });

  test("create, update, and deactivate portal configuration", async (scope) => {
    const configId = `${BRANCH_PREFIX}-portal-config-1`;
    let config: PortalConfiguration | undefined;
    try {
      config = await PortalConfiguration(configId, {
        businessProfile: {
          headline: "Test Business",
          privacyPolicyUrl: "https://example.com/privacy",
          termsOfServiceUrl: "https://example.com/terms",
        },
        defaultReturnUrl: "https://example.com/return",
        features: {
          customerUpdate: {
            enabled: true,
            allowedUpdates: ["email", "name"],
          },
          invoiceHistory: {
            enabled: true,
          },
        },
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
        },
      });

      expect(config.businessProfile?.headline).toBe("Test Business");
      expect(config.defaultReturnUrl).toBe("https://example.com/return");
      expect(config.features?.customerUpdate?.enabled).toBe(true);

      const stripeConfig =
        await stripeClient.billingPortal.configurations.retrieve(config.id);
      expect(stripeConfig.id).toBe(config.id);
      expect(stripeConfig.business_profile?.headline).toBe("Test Business");

      config = await PortalConfiguration(configId, {
        businessProfile: {
          headline: "Updated Test Business",
          privacyPolicyUrl: "https://example.com/privacy",
          termsOfServiceUrl: "https://example.com/terms",
        },
        defaultReturnUrl: "https://example.com/return",
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
          updated: "true",
        },
      });

      expect(config.businessProfile?.headline).toBe("Updated Test Business");
    } finally {
      await destroy(scope);

      if (config) {
        const finalConfig =
          await stripeClient.billingPortal.configurations.retrieve(config.id);
        expect(finalConfig.id).toBe(config.id);
      }
    }
  });
});

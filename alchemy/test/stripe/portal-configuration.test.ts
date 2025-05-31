import { beforeAll, describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { PortalConfiguration } from "../../src/stripe/portal-configuration.ts";
import "../../src/test/bun.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe PortalConfiguration Resource", () => {
  beforeAll(() => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = new Stripe(apiKey);
  });

  test("create, update, and deactivate portal configuration", async (scope) => {
    const configId = `${BRANCH_PREFIX}-portal-config-1`;

    const config = await PortalConfiguration(configId, {
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

    const updatedConfig = await PortalConfiguration(configId, {
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

    expect(updatedConfig.businessProfile?.headline).toBe(
      "Updated Test Business",
    );

    await destroy(scope);

    const deactivatedConfig =
      await stripeClient.billingPortal.configurations.retrieve(config.id);
    expect(deactivatedConfig.active).toBe(false);
  });
});

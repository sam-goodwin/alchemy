import type Stripe from "stripe";
import { beforeAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import { TaxRate } from "../../src/stripe/tax-rate.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe TaxRate Resource", () => {
  beforeAll(async () => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = await createStripeClient({ apiKey });
  });

  test("create, update, and deactivate tax rate", async (scope) => {
    const taxRateId = `${BRANCH_PREFIX}-tax-rate-1`;
    let taxRate: TaxRate | undefined;
    try {
      taxRate = await TaxRate(taxRateId, {
        displayName: "Test Tax Rate",
        percentage: 8.5,
        inclusive: false,
        active: true,
        country: "US",
        state: "CA",
        description: "California sales tax",
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
        },
      });

      expect(taxRate).toMatchObject({
        displayName: "Test Tax Rate",
        percentage: 8.5,
        inclusive: false,
        active: true,
      });

      const stripeTaxRate = await stripeClient.taxRates.retrieve(taxRate.id);
      expect(stripeTaxRate.id).toBe(taxRate.id);
      expect(stripeTaxRate.percentage).toBe(8.5);

      taxRate = await TaxRate(taxRateId, {
        displayName: "Updated Test Tax Rate",
        percentage: 8.5,
        inclusive: false,
        active: false,
        country: "US",
        state: "CA",
        description: "Updated California sales tax",
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
          updated: "true",
        },
      });

      expect(taxRate).toMatchObject({
        displayName: "Updated Test Tax Rate",
        active: false,
      });
    } finally {
      await destroy(scope);

      if (taxRate) {
        const deactivatedTaxRate = await stripeClient.taxRates.retrieve(
          taxRate.id,
        );
        expect(deactivatedTaxRate.active).toBe(false);
      }
    }
  });
});

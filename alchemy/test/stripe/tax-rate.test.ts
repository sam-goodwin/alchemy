import { beforeAll, describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { TaxRate } from "../../src/stripe/tax-rate.ts";
import "../../src/test/bun.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe TaxRate Resource", () => {
  beforeAll(() => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = new Stripe(apiKey);
  });

  test("create, update, and deactivate tax rate", async (scope) => {
    const taxRateId = `${BRANCH_PREFIX}-tax-rate-1`;

    const taxRate = await TaxRate(taxRateId, {
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

    const updatedTaxRate = await TaxRate(taxRateId, {
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

    expect(updatedTaxRate).toMatchObject({
      displayName: "Updated Test Tax Rate",
      active: false,
    });

    await destroy(scope);

    const deactivatedTaxRate = await stripeClient.taxRates.retrieve(taxRate.id);
    expect(deactivatedTaxRate.active).toBe(false);
  });
});

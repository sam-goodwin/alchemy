import { beforeAll, describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { ShippingRate } from "../../src/stripe/shipping-rate.ts";
import "../../src/test/bun.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe ShippingRate Resource", () => {
  beforeAll(() => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = new Stripe(apiKey);
  });

  test("create, update, and deactivate shipping rate", async (scope) => {
    const shippingRateId = `${BRANCH_PREFIX}-shipping-rate-1`;

    const shippingRate = await ShippingRate(shippingRateId, {
      displayName: "Test Shipping Rate",
      type: "fixed_amount",
      fixedAmount: {
        amount: 500,
        currency: "usd",
      },
      deliveryEstimate: {
        minimum: {
          unit: "business_day",
          value: 1,
        },
        maximum: {
          unit: "business_day",
          value: 3,
        },
      },
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
      },
    });

    expect(shippingRate.displayName).toBe("Test Shipping Rate");
    expect(shippingRate.fixedAmount?.amount).toBe(500);
    expect(shippingRate.fixedAmount?.currency).toBe("usd");

    const stripeShippingRate = await stripeClient.shippingRates.retrieve(
      shippingRate.id,
    );
    expect(stripeShippingRate.id).toBe(shippingRate.id);
    expect(stripeShippingRate.fixed_amount?.amount).toBe(500);

    const updatedShippingRate = await ShippingRate(shippingRateId, {
      displayName: "Test Shipping Rate",
      type: "fixed_amount",
      fixedAmount: {
        amount: 500,
        currency: "usd",
      },
      active: false,
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
        updated: "true",
      },
    });

    expect(updatedShippingRate.active).toBe(false);

    await destroy(scope);

    const deactivatedShippingRate = await stripeClient.shippingRates.retrieve(
      shippingRate.id,
    );
    expect(deactivatedShippingRate.active).toBe(false);
  });
});

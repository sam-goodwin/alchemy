import type Stripe from "stripe";
import { beforeAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import { ShippingRate } from "../../src/stripe/shipping-rate.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe ShippingRate Resource", () => {
  beforeAll(async () => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = await createStripeClient({ apiKey });
  });

  test("create, update, and deactivate shipping rate", async (scope) => {
    const shippingRateId = `${BRANCH_PREFIX}-shipping-rate-1`;
    let shippingRate: ShippingRate | undefined;
    try {
      shippingRate = await ShippingRate(shippingRateId, {
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

      shippingRate = await ShippingRate(shippingRateId, {
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

      expect(shippingRate.active).toBe(false);
    } finally {
      await destroy(scope);

      if (shippingRate) {
        const deactivatedShippingRate =
          await stripeClient.shippingRates.retrieve(shippingRate.id);
        expect(deactivatedShippingRate.active).toBe(false);
      }
    }
  });
});

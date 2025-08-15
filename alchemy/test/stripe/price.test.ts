import Stripe from "stripe";
import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import { Price } from "../../src/stripe/price.ts";
import { Product } from "../../src/stripe/product.ts";
import { Meter } from "../../src/stripe/meter.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const stripeApiKey = import.meta.env.STRIPE_API_KEY;
if (!stripeApiKey) {
  throw new Error("STRIPE_API_KEY environment variable is required");
}

// Initialize a Stripe client for verification
const stripe = await createStripeClient({ apiKey: stripeApiKey });

describe("Price Resource", () => {
  const testPriceId = `${BRANCH_PREFIX}-price`;
  const testProductId = `${BRANCH_PREFIX}-price-product`;

  test("create, update, and delete price", async (scope) => {
    let product: Product | undefined;
    let price: Price | undefined;

    try {
      // Create a test product first (needed for price)
      const productName = `${BRANCH_PREFIX} Alchemy Price Test Product`;
      product = await Product(testProductId, {
        name: productName,
        description: "A product created for price testing",
      });

      expect(product.id).toBeTruthy();

      // Create a test price
      price = await Price(testPriceId, {
        product: product.id,
        currency: "usd",
        unitAmount: 1500, // $15.00
        nickname: "Original price",
        recurring: {
          interval: "month",
        },
        metadata: {
          test: "initial",
        },
      });

      expect(price.id).toBeTruthy();
      expect(price).toMatchObject({
        product: product.id,
        currency: "usd",
        unitAmount: 1500,
        nickname: "Original price",
        recurring: { interval: "month" },
        metadata: { test: "initial" },
      });

      // Verify with Stripe API
      const stripePrice = await stripe.prices.retrieve(price.id);
      expect(stripePrice).toMatchObject({
        unit_amount: 1500,
        currency: "usd",
        recurring: { interval: "month" },
        product: product.id,
        nickname: "Original price",
      });

      // Update the price (only mutable properties like nickname, metadata, active)
      // Note: unitAmount, currency, product, recurring are immutable in Stripe
      price = await Price(testPriceId, {
        product: product.id,
        currency: "usd",
        unitAmount: 1500, // Keep same amount - immutable
        nickname: "Updated price",
        recurring: {
          interval: "month",
        },
        metadata: {
          test: "updated",
          version: "2",
        },
        active: true,
      });

      expect(price.id).toBeTruthy();
      expect(price).toMatchObject({
        unitAmount: 1500, // Should remain the same
        nickname: "Updated price",
        metadata: { test: "updated", version: "2" },
        currency: "usd",
        recurring: { interval: "month" },
      });

      // Verify update with Stripe API
      const updatedStripePrice = await stripe.prices.retrieve(price.id);
      expect(updatedStripePrice).toMatchObject({
        unit_amount: 1500, // Should remain the same
        nickname: "Updated price",
        metadata: { test: "updated", version: "2" },
      });
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify price was deactivated
      if (price?.id) {
        await assertPriceDeactivated(price.id);
      }

      // Verify product was deactivated
      if (product?.id) {
        await assertProductDeactivated(product.id);
      }
    }
  });

  test("create one-time price", async (scope) => {
    let product: Product | undefined;
    let price: Price | undefined;

    try {
      // Create a test product
      const productName = `${BRANCH_PREFIX} One-time Price Test Product`;
      product = await Product(`${testProductId}-onetime`, {
        name: productName,
        description: "A product for one-time price testing",
      });

      // Create a one-time price (no recurring)
      price = await Price(`${testPriceId}-onetime`, {
        product: product.id,
        currency: "usd",
        unitAmount: 2999, // $29.99
      });

      expect(price.id).toBeTruthy();
      expect(price).toMatchObject({
        product: product.id,
        currency: "usd",
        unitAmount: 2999,
      });

      // Verify with Stripe API
      const stripePrice = await stripe.prices.retrieve(price.id);
      expect(stripePrice).toMatchObject({
        unit_amount: 2999,
        currency: "usd",
        recurring: null,
        product: product.id,
      });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      if (price?.id) {
        await assertPriceDeactivated(price.id);
      }

      if (product?.id) {
        await assertProductDeactivated(product.id);
      }
    }
  });

  test("adopt existing price with different ID", async (scope) => {
    const lookupKey = `${BRANCH_PREFIX}-adopt-price-key`;
    const firstId = `${testPriceId}-adopt-first`;
    const secondId = `${testPriceId}-adopt-second`;
    const productId = `${testProductId}-adopt`;

    let product: Product | undefined;
    let firstPrice: Price | undefined;
    let secondPrice: Price | undefined;

    try {
      // Create a test product first
      product = await Product(productId, {
        name: `${BRANCH_PREFIX} Adoption Price Test Product`,
        description: "A product for price adoption testing",
      });

      // Create first price with lookup key
      firstPrice = await Price(firstId, {
        product: product.id,
        currency: "usd",
        unitAmount: 1000,
        lookupKey: lookupKey,
        nickname: "First price",
      });

      expect(firstPrice.id).toBeTruthy();
      expect(firstPrice.lookupKey).toEqual(lookupKey);

      // Verify first price was created
      const stripeFirstPrice = await stripe.prices.retrieve(firstPrice.id);
      expect(stripeFirstPrice.lookup_key).toEqual(lookupKey);

      secondPrice = await Price(secondId, {
        product: product.id,
        currency: "usd",
        unitAmount: 1000, // Same amount (immutable)
        lookupKey: lookupKey, // Same lookup key
        nickname: "Second price - adopted",
        adopt: true, // Enable adoption
      });

      expect(secondPrice.id).toBeTruthy();
      expect(secondPrice.id).toEqual(firstPrice.id); // Should have same underlying resource ID
      expect(secondPrice.lookupKey).toEqual(lookupKey);

      // Verify the price was updated with new configuration
      const stripeSecondPrice = await stripe.prices.retrieve(secondPrice.id);
      expect(stripeSecondPrice.lookup_key).toEqual(lookupKey);
      expect(stripeSecondPrice.nickname).toEqual("Second price - adopted");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      if (firstPrice?.id) {
        await assertPriceDeactivated(firstPrice.id);
      }
      if (product?.id) {
        await assertProductDeactivated(product.id);
      }
    }
  });

  test("create graduated tiered price", async (scope) => {
    let product: Product | undefined;
    let price: Price | undefined;

    try {
      // Create a test product
      product = await Product(`${testProductId}-tiered-graduated`, {
        name: `${BRANCH_PREFIX} Graduated Tiered Price Test Product`,
        description: "A product for graduated tiered price testing",
      });

      // Create a graduated tiered price
      price = await Price(`${testPriceId}-tiered-graduated`, {
        product: product.id,
        currency: "usd",
        billingScheme: "tiered",
        tiersMode: "graduated",
        recurring: {
          interval: "month",
          usageType: "metered",
        },
        tiers: [
          {
            upTo: 10000,
            unitAmount: 0, // First 10k free
          },
          {
            upTo: 50000,
            unitAmount: 2, // $0.02 per unit
          },
          {
            upTo: "inf",
            unitAmount: 1, // $0.01 per unit
          },
        ],
      });

      expect(price.id).toBeTruthy();
      expect(price).toMatchObject({
        product: product.id,
        currency: "usd",
        billingScheme: "tiered",
        tiersMode: "graduated",
      });

      // Verify tiers are present and correct
      expect(price.tiers).toHaveLength(3);
      expect(price.tiers![0]).toMatchObject({
        upTo: 10000,
        unitAmountDecimal: "0",
      });
      expect(price.tiers![1]).toMatchObject({
        upTo: 50000,
        unitAmount: 2,
      });
      expect(price.tiers![2]).toMatchObject({
        upTo: "inf",
        unitAmount: 1,
      });

      // Verify with Stripe API (need to expand tiers)
      const stripePrice = await stripe.prices.retrieve(price.id, {
        expand: ["tiers"],
      });
      expect(stripePrice.billing_scheme).toEqual("tiered");
      expect(stripePrice.tiers_mode).toEqual("graduated");
      expect(stripePrice.tiers).toHaveLength(3);
      expect(stripePrice.tiers![0]).toMatchObject({
        up_to: 10000,
        unit_amount_decimal: "0",
      });
      expect(stripePrice.tiers![1]).toMatchObject({
        up_to: 50000,
        unit_amount: 2,
      });
      expect(stripePrice.tiers![2]).toMatchObject({
        up_to: null, // Stripe represents "inf" as null
        unit_amount: 1,
      });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      if (price?.id) {
        await assertPriceDeactivated(price.id);
      }
      if (product?.id) {
        await assertProductDeactivated(product.id);
      }
    }
  });

  test("create volume tiered price with flat amount", async (scope) => {
    let product: Product | undefined;
    let price: Price | undefined;

    try {
      // Create a test product
      product = await Product(`${testProductId}-tiered-volume`, {
        name: `${BRANCH_PREFIX} Volume Tiered Price Test Product`,
        description: "A product for volume tiered price testing",
      });

      // Create a volume tiered price with overage cap
      price = await Price(`${testPriceId}-tiered-volume`, {
        product: product.id,
        currency: "usd",
        billingScheme: "tiered",
        tiersMode: "volume",
        recurring: {
          interval: "month",
        },
        tiers: [
          {
            upTo: 100,
            unitAmount: 500, // $5 per unit
          },
          {
            upTo: 1000,
            unitAmount: 400, // $4 per unit
          },
          {
            upTo: "inf",
            flatAmount: 300000, // Cap at $3000
          },
        ],
      });

      expect(price.id).toBeTruthy();
      expect(price).toMatchObject({
        product: product.id,
        currency: "usd",
        billingScheme: "tiered",
        tiersMode: "volume",
        tiers: [
          { upTo: 100, unitAmount: 500 },
          { upTo: 1000, unitAmount: 400 },
          { upTo: "inf", flatAmount: 300000 },
        ],
      });

      // Verify with Stripe API (need to expand tiers)
      const stripePrice = await stripe.prices.retrieve(price.id, {
        expand: ["tiers"],
      } as any);
      expect(stripePrice.billing_scheme).toEqual("tiered");
      expect(stripePrice.tiers_mode).toEqual("volume");
      expect(stripePrice.tiers).toHaveLength(3);
      expect(stripePrice.tiers![2]).toMatchObject({
        up_to: null,
        flat_amount: 300000,
      });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      if (price?.id) {
        await assertPriceDeactivated(price.id);
      }
      if (product?.id) {
        await assertProductDeactivated(product.id);
      }
    }
  });

  test("tiered price validation", async (scope) => {
    const product = await Product(`${testProductId}-tiered-validation`, {
      name: `${BRANCH_PREFIX} Tiered Validation Test Product`,
      description: "A product for tiered price validation testing",
    });

    try {
      // Test: tiers requires billingScheme to be "tiered"
      await expect(
        Price(`${testPriceId}-tiered-invalid-scheme`, {
          product: product.id,
          currency: "usd",
          billingScheme: "per_unit",
          tiers: [
            {
              upTo: 100,
              unitAmount: 500,
            },
          ],
        }),
      ).rejects.toThrow("Tiers can only be used with billingScheme: 'tiered'");

      // Test: cannot set both tiers and unitAmount
      await expect(
        Price(`${testPriceId}-tiered-invalid-unit`, {
          product: product.id,
          currency: "usd",
          billingScheme: "tiered",
          unitAmount: 1000,
          tiers: [
            {
              upTo: 100,
              unitAmount: 500,
            },
          ],
        }),
      ).rejects.toThrow(
        "Cannot set both tiers and unitAmount/unitAmountDecimal",
      );

      // Test: tiersMode requires tiers
      await expect(
        Price(`${testPriceId}-tiered-invalid-mode`, {
          product: product.id,
          currency: "usd",
          billingScheme: "tiered",
          tiersMode: "graduated",
        }),
      ).rejects.toThrow("tiersMode requires tiers to be defined");
    } finally {
      await destroy(scope);
      await assertProductDeactivated(product.id);
    }
  });

  test("create metered price with billing meter", async (scope) => {
    let product: Product | undefined;
    let meter: Meter | undefined;
    let price: Price | undefined;

    try {
      // Create a test product
      product = await Product(`${testProductId}-meter`, {
        name: `${BRANCH_PREFIX} Meter Price Test Product`,
        description: "A product for meter price testing",
      });

      // Create a real meter
      meter = await Meter(`${testProductId}-meter-meter`, {
        displayName: "API Usage Meter",
        eventName: `${BRANCH_PREFIX}_api_usage`,
        defaultAggregation: {
          formula: "sum",
        },
        customerMapping: {
          type: "by_id",
          eventPayloadKey: "stripe_customer_id",
        },
        valueSettings: {
          eventPayloadKey: "value",
        },
      });

      expect(meter.id).toBeTruthy();

      // Create a metered price with meter
      price = await Price(`${testPriceId}-meter`, {
        product: product.id,
        currency: "usd",
        billingScheme: "tiered",
        tiersMode: "graduated",
        recurring: {
          interval: "month",
          usageType: "metered",
          meter: meter.id,
        },
        tiers: [
          {
            upTo: 1000,
            unitAmount: 0,
          },
          {
            upTo: "inf",
            unitAmount: 10,
          },
        ],
      });

      expect(price.id).toBeTruthy();
      expect(price).toMatchObject({
        product: product.id,
        currency: "usd",
        billingScheme: "tiered",
        tiersMode: "graduated",
        recurring: {
          interval: "month",
          usageType: "metered",
          meter: meter.id,
        },
      });

      // Verify the meter is correctly set
      expect(price.recurring?.meter).toEqual(meter.id);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      if (price?.id) {
        await assertPriceDeactivated(price.id);
      }
      if (product?.id) {
        await assertProductDeactivated(product.id);
      }
      // Note: Meter cleanup is handled by destroy(scope)
    }
  });

  test("meter validation", async (scope) => {
    const product = await Product(`${testProductId}-meter-validation`, {
      name: `${BRANCH_PREFIX} Meter Validation Test Product`,
      description: "A product for meter validation testing",
    });

    try {
      // Test: meter requires metered usage type
      await expect(
        Price(`${testPriceId}-meter-invalid-usage`, {
          product: product.id,
          currency: "usd",
          recurring: {
            interval: "month",
            usageType: "licensed", // Not metered
            meter: "meter_test_invalid",
          },
        }),
      ).rejects.toThrow(
        "Meter can only be set for prices with recurring.usageType = 'metered'",
      );
    } finally {
      await destroy(scope);
      await assertProductDeactivated(product.id);
    }
  });

  test("price adoption fails without lookup key", async (scope) => {
    const firstId = `${testPriceId}-no-key-first`;
    const secondId = `${testPriceId}-no-key-second`;
    const productId = `${testProductId}-no-key`;

    let product: Product | undefined;
    let firstPrice: Price | undefined;

    try {
      // Create a test product first
      product = await Product(productId, {
        name: `${BRANCH_PREFIX} No Key Price Test Product`,
        description: "A product for price no-key testing",
      });

      // Create first price without lookup key
      firstPrice = await Price(firstId, {
        product: product.id,
        currency: "usd",
        unitAmount: 1000,
        nickname: "First price without key",
      });

      expect(firstPrice.id).toBeTruthy();

      const secondPrice = await Price(secondId, {
        product: product.id,
        currency: "usd",
        unitAmount: 1000,
        nickname: "Second price - should create separate price",
        adopt: true, // Enable adoption but no lookup key
      });

      expect(secondPrice.id).toBeTruthy();
      expect(secondPrice.id).not.toEqual(firstPrice.id); // Should have different IDs
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      if (firstPrice?.id) {
        await assertPriceDeactivated(firstPrice.id);
      }
      if (product?.id) {
        await assertProductDeactivated(product.id);
      }
    }
  });
});

// Helper functions for verification
async function assertPriceDeactivated(priceId: string) {
  try {
    const price = await stripe.prices.retrieve(priceId);
    // Prices are deactivated, not deleted
    expect(price.active).toBe(false);
  } catch (error) {
    // If price is not found, that's also acceptable
    if (
      error instanceof Stripe.errors.StripeError &&
      error.code === "resource_missing"
    ) {
      return;
    }
    throw error;
  }
}

async function assertProductDeactivated(productId: string) {
  try {
    const product = await stripe.products.retrieve(productId);
    // Products are deactivated, not deleted
    expect(product.active).toBe(false);
  } catch (error) {
    // If product is not found, that's also acceptable
    if (
      error instanceof Stripe.errors.StripeError &&
      error.code === "resource_missing"
    ) {
      return;
    }
    throw error;
  }
}

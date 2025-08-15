import Stripe from "stripe";
import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import { Product } from "../../src/stripe/product.ts";
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

describe("Product Resource", () => {
  const testProductId = `${BRANCH_PREFIX}-product`;

  test("create, update, and delete product", async (scope) => {
    let product: Product | undefined;

    try {
      // Create a test product
      const productName = `${BRANCH_PREFIX} Alchemy Test Product`;
      product = await Product(testProductId, {
        name: productName,
        description: "A product created by Alchemy tests",
      });

      expect(product.id).toBeTruthy();
      expect(product).toMatchObject({
        name: productName,
        description: "A product created by Alchemy tests",
      });

      // Verify with Stripe API
      const stripeProduct = await stripe.products.retrieve(product.id);
      expect(stripeProduct).toMatchObject({
        name: productName,
        description: "A product created by Alchemy tests",
      });

      // Update the product
      const updatedName = `${BRANCH_PREFIX} Updated Alchemy Test Product`;
      product = await Product(testProductId, {
        name: updatedName,
        description: "An updated product created by Alchemy tests",
      });

      expect(product.id).toBeTruthy();
      expect(product).toMatchObject({
        name: updatedName,
        description: "An updated product created by Alchemy tests",
      });

      // Verify update with Stripe API
      const updatedStripeProduct = await stripe.products.retrieve(product.id);
      expect(updatedStripeProduct).toMatchObject({
        name: updatedName,
        description: "An updated product created by Alchemy tests",
      });
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify product was deactivated
      if (product?.id) {
        await assertProductDeactivated(product.id);
      }
    }
  });

  test("adopt existing product with different ID", async (scope) => {
    const productName = `${BRANCH_PREFIX} Adoption Test Product`;
    const firstId = `${testProductId}-adopt-first`;
    const secondId = `${testProductId}-adopt-second`;

    let firstProduct: Product | undefined;
    let secondProduct: Product | undefined;

    try {
      // Create first product
      firstProduct = await Product(firstId, {
        name: productName,
        description: "First product for adoption test",
      });

      expect(firstProduct.id).toBeTruthy();
      expect(firstProduct.name).toEqual(productName);

      // Verify first product was created
      const stripeFirstProduct = await stripe.products.retrieve(
        firstProduct.id,
      );
      expect(stripeFirstProduct.name).toEqual(productName);

      secondProduct = await Product(secondId, {
        name: productName, // Same product name
        description: "Second product for adoption test - should adopt first",
        adopt: true, // Enable adoption
      });

      expect(secondProduct.id).toBeTruthy();
      expect(secondProduct.id).toEqual(firstProduct.id); // Should have same underlying resource ID
      expect(secondProduct.name).toEqual(productName);

      // Verify the product was updated with new configuration
      const stripeSecondProduct = await stripe.products.retrieve(
        secondProduct.id,
      );
      expect(stripeSecondProduct.name).toEqual(productName);
      expect(stripeSecondProduct.description).toEqual(
        "Second product for adoption test - should adopt first",
      );
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      // Verify product was deactivated
      if (firstProduct?.id) {
        await assertProductDeactivated(firstProduct.id);
      }
    }
  });

  test("creates separate products without adopt flag", async (scope) => {
    const productName = `${BRANCH_PREFIX} No Adoption Test Product`;
    const firstId = `${testProductId}-no-adopt-first`;
    const secondId = `${testProductId}-no-adopt-second`;

    let firstProduct: Product | undefined;
    let secondProduct: Product | undefined;

    try {
      // Create first product
      firstProduct = await Product(firstId, {
        name: productName,
        description: "First product for no adoption test",
      });

      expect(firstProduct.id).toBeTruthy();

      // Create second product with same name but without adopt flag - should create separate product
      secondProduct = await Product(secondId, {
        name: productName, // Same product name
        description: "Second product - should create separate product",
      });

      expect(secondProduct.id).toBeTruthy();
      expect(secondProduct.id).not.toEqual(firstProduct.id); // Should have different IDs
      expect(secondProduct.name).toEqual(productName);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      if (firstProduct?.id) {
        await assertProductDeactivated(firstProduct.id);
      }
      if (secondProduct?.id) {
        await assertProductDeactivated(secondProduct.id);
      }
    }
  });
});

// Helper function for verification
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

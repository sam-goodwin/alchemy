import { describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy";
import { destroy } from "../../src/destroy";
import { PaymentLink } from "../../src/stripe/payment-link";
import { Price } from "../../src/stripe/price";
import { Product } from "../../src/stripe/product";
import { BRANCH_PREFIX } from "../util";

// Import test helper
import "../../src/test/bun";

const test = alchemy.test(import.meta);

const stripeApiKey = process.env.STRIPE_API_KEY;
if (!stripeApiKey) {
  throw new Error("STRIPE_API_KEY environment variable is required");
}

// Initialize a Stripe client for verification
const stripe = new Stripe(stripeApiKey);

describe("PaymentLink Resource", () => {
  test("create, update, and delete payment link", async (scope) => {
    // Resources that we'll need to clean up
    let product;
    let price;
    let paymentLink;

    try {
      // First create a product
      const productName = `${BRANCH_PREFIX} Test Product`;
      product = await Product(`${BRANCH_PREFIX}-test-product`, {
        name: productName,
        description: "A product created for PaymentLink tests",
      });
      expect(product.id).toBeTruthy();

      // Then create a price for the product
      price = await Price(`${BRANCH_PREFIX}-test-price`, {
        product: product.id,
        currency: "usd",
        unitAmount: 1000, // $10.00
      });
      expect(price.id).toBeTruthy();

      // Now create a payment link for the product
      paymentLink = await PaymentLink(`${BRANCH_PREFIX}-test-link`, {
        lineItems: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        metadata: {
          source: "alchemy-test",
        },
      });

      // Verify payment link was created
      expect(paymentLink.id).toBeTruthy();
      expect(paymentLink.url).toBeTruthy();
      expect(paymentLink.active).toBe(true);
      expect(paymentLink.metadata?.source).toBe("alchemy-test");

      // Verify with Stripe API
      const retrievedLink = await stripe.paymentLinks.retrieve(paymentLink.id);
      expect(retrievedLink.id).toBe(paymentLink.id);
      expect(retrievedLink.active).toBe(true);
      expect(retrievedLink.metadata?.source).toBe("alchemy-test");

      // Update the payment link
      paymentLink = await PaymentLink(`${BRANCH_PREFIX}-test-link`, {
        lineItems: [
          {
            price: price.id,
            quantity: 2, // Change quantity
          },
        ],
        metadata: {
          source: "alchemy-test",
          updated: "true",
        },
      });

      // Verify update
      expect(paymentLink.id).toBeTruthy();
      expect(paymentLink.metadata?.updated).toBe("true");

      // Verify with Stripe API
      const updatedLink = await stripe.paymentLinks.retrieve(paymentLink.id);
      expect(updatedLink.metadata?.updated).toBe("true");
    } finally {
      // Clean up all resources
      await destroy(scope);

      // Verify payment link was deactivated
      if (paymentLink?.id) {
        const deactivatedLink = await stripe.paymentLinks.retrieve(
          paymentLink.id
        );
        expect(deactivatedLink.active).toBe(false);
      }

      // Verify price was deactivated
      if (price?.id) {
        const deactivatedPrice = await stripe.prices.retrieve(price.id);
        expect(deactivatedPrice.active).toBe(false);
      }

      // Verify product was deactivated
      if (product?.id) {
        const deactivatedProduct = await stripe.products.retrieve(product.id);
        expect(deactivatedProduct.active).toBe(false);
      }
    }
  });
});

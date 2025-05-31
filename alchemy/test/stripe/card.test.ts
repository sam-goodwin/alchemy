import { beforeAll, describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { Card } from "../../src/stripe/card.ts";
import { Customer } from "../../src/stripe/customer.ts";
import "../../src/test/bun.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe Card Resource", () => {
  beforeAll(() => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = new Stripe(apiKey);
  });

  test("create, update, and delete card", async (scope) => {
    const customerId = `${BRANCH_PREFIX}-customer-1`;
    const cardId = `${BRANCH_PREFIX}-card-1`;

    const customer = await Customer(customerId, {
      email: "test@example.com",
      name: "Test Customer for Card",
    });

    const card = await Card(cardId, {
      customer: customer.id,
      number: "4242424242424242",
      expMonth: 12,
      expYear: 2025,
      cvc: "123",
      name: "Test Cardholder",
      addressLine1: "123 Test St",
      addressCity: "Test City",
      addressState: "CA",
      addressZip: "12345",
      addressCountry: "US",
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
      },
    });

    expect(card.customer).toBe(customer.id);
    expect(card.brand).toBe("visa");
    expect(card.last4).toBe("4242");
    expect(card.expMonth).toBe(12);
    expect(card.expYear).toBe(2025);

    const stripeCard = (await stripeClient.customers.retrieveSource(
      customer.id,
      card.id,
    )) as Stripe.Card;
    expect(stripeCard.id).toBe(card.id);
    expect(stripeCard.last4).toBe("4242");

    const updatedCard = await Card(cardId, {
      customer: customer.id,
      name: "Updated Test Cardholder",
      expMonth: 12,
      expYear: 2026,
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
        updated: "true",
      },
    });

    expect(updatedCard.name).toBe("Updated Test Cardholder");
    expect(updatedCard.expYear).toBe(2026);

    await destroy(scope);

    try {
      await stripeClient.customers.retrieveSource(customer.id, card.id);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error.code).toBe("resource_missing");
    }
  });
});

import { beforeAll, describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { Customer } from "../../src/stripe/customer.ts";
import "../../src/test/bun.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe Customer Resource", () => {
  beforeAll(() => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = new Stripe(apiKey);
  });

  test("create, update, and delete customer", async (scope) => {
    const customerId = `${BRANCH_PREFIX}-customer-1`;

    const customer = await Customer(customerId, {
      email: "test@example.com",
      name: "Test Customer",
      description: "A test customer",
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
      },
      address: {
        line1: "123 Test St",
        city: "Test City",
        state: "CA",
        postalCode: "12345",
        country: "US",
      },
    });

    expect(customer).toMatchObject({
      email: "test@example.com",
      name: "Test Customer",
      description: "A test customer",
      address: expect.objectContaining({
        line1: "123 Test St",
      }),
    });

    const stripeCustomer = (await stripeClient.customers.retrieve(
      customer.id,
    )) as Stripe.Customer;
    expect(stripeCustomer.id).toBe(customer.id);
    expect(stripeCustomer.email).toBe("test@example.com");

    const updatedCustomer = await Customer(customerId, {
      email: "updated@example.com",
      name: "Updated Test Customer",
      description: "An updated test customer",
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
        updated: "true",
      },
    });

    expect(updatedCustomer).toMatchObject({
      email: "updated@example.com",
      name: "Updated Test Customer",
    });

    await destroy(scope);

    try {
      await stripeClient.customers.retrieve(customer.id);
      throw new Error("Expected customer to be deleted");
    } catch (error: any) {
      expect(error.code).toBe("resource_missing");
    }
  });
});

import type Stripe from "stripe";
import { beforeAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import { Customer } from "../../src/stripe/customer.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe Customer Resource", () => {
  beforeAll(async () => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = await createStripeClient({ apiKey });
  });

  test("create, update, and delete customer", async (scope) => {
    const customerId = `${BRANCH_PREFIX}-customer-1`;

    let customer: Customer | undefined;
    try {
      customer = await Customer(customerId, {
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

      customer = await Customer(customerId, {
        email: "updated@example.com",
        name: "Updated Test Customer",
        description: "An updated test customer",
        metadata: {
          test: "true",
          branch: BRANCH_PREFIX,
          updated: "true",
        },
      });

      expect(customer).toMatchObject({
        email: "updated@example.com",
        name: "Updated Test Customer",
      });
    } finally {
      await destroy(scope);

      if (customer) {
        try {
          const deletedCustomer = await stripeClient.customers.retrieve(
            customer.id,
          );
          expect(deletedCustomer.deleted).toBe(true);
        } catch (error: any) {
          if (error.code === "resource_missing") {
            expect(error.code).toBe("resource_missing");
          } else {
            throw error;
          }
        }
      }
    }
  });

  test("adopt existing customer with different ID", async (scope) => {
    const customerEmail = `${BRANCH_PREFIX}-adopt@example.com`;
    const firstId = `${BRANCH_PREFIX}-customer-adopt-first`;
    const secondId = `${BRANCH_PREFIX}-customer-adopt-second`;

    let firstCustomer: Customer | undefined;
    let secondCustomer: Customer | undefined;

    try {
      firstCustomer = await Customer(firstId, {
        email: customerEmail,
        name: "First Customer",
        description: "First customer for adoption test",
      });

      expect(firstCustomer.id).toBeTruthy();
      expect(firstCustomer.email).toEqual(customerEmail);

      secondCustomer = await Customer(secondId, {
        email: customerEmail, // Same email
        name: "Second Customer",
        description: "Second customer for adoption test - should adopt first",
        adopt: true, // Enable adoption
      });

      expect(secondCustomer.id).toBeTruthy();
      expect(secondCustomer.id).toEqual(firstCustomer.id); // Should have same underlying resource ID
      expect(secondCustomer.email).toEqual(customerEmail);

      const stripeSecondCustomer = (await stripeClient.customers.retrieve(
        secondCustomer.id,
      )) as Stripe.Customer;
      expect(stripeSecondCustomer.email).toEqual(customerEmail);
      expect(stripeSecondCustomer.name).toEqual("Second Customer");
      expect(stripeSecondCustomer.description).toEqual(
        "Second customer for adoption test - should adopt first",
      );
    } finally {
      await destroy(scope);
    }
  });

  test("creates separate customers without adopt flag", async (scope) => {
    const customerEmail = `${BRANCH_PREFIX}-no-adopt@example.com`;
    const firstId = `${BRANCH_PREFIX}-customer-no-adopt-first`;
    const secondId = `${BRANCH_PREFIX}-customer-no-adopt-second`;

    let firstCustomer: Customer | undefined;
    let secondCustomer: Customer | undefined;

    try {
      firstCustomer = await Customer(firstId, {
        email: customerEmail,
        name: "First Customer",
        description: "First customer for no adoption test",
      });

      expect(firstCustomer.id).toBeTruthy();

      secondCustomer = await Customer(secondId, {
        email: customerEmail, // Same email
        name: "Second Customer",
        description: "Second customer - should create separate customer",
      });

      expect(secondCustomer.id).toBeTruthy();
      expect(secondCustomer.id).not.toEqual(firstCustomer.id); // Should have different IDs
      expect(secondCustomer.email).toEqual(customerEmail);
    } finally {
      await destroy(scope);
    }
  });
});

import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createPolarClient } from "../../src/polar/client.ts";
import {
  Customer,
  type Customer as CustomerOutput,
  type CustomerProps,
} from "../../src/polar/customer.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "local";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Polar Customer Resource", () => {
  const testRunSuffix = "test1";
  const baseLogicalId = `${BRANCH_PREFIX}-test-polar-customer`;

  function generateCustomerEmail(suffix: string | number) {
    return `alchemy-test-${suffix}@example.com`;
  }

  test.skipIf(!!process.env.CI)(
    "create, update, and delete customer",
    async (scope) => {
      const apiKey = process.env.POLAR_API_KEY;
      if (!apiKey) {
        throw new Error(
          "POLAR_API_KEY environment variable is required for Polar integration tests.",
        );
      }
      const polarClient = createPolarClient({ apiKey });
      const logicalId = `${baseLogicalId}-${testRunSuffix}`;
      const initialEmail = generateCustomerEmail(testRunSuffix);
      let customerOutput: CustomerOutput | undefined;

      try {
        const createProps: CustomerProps = {
          email: initialEmail,
          name: "Test Customer",
          metadata: { test: "true" },
        };
        customerOutput = await Customer(logicalId, createProps);

        expect(customerOutput.id).toBeTruthy();
        expect(customerOutput.email).toEqual(initialEmail);
        expect(customerOutput.name).toEqual("Test Customer");
        expect(customerOutput.metadata?.test).toEqual("true");

        const fetchedCustomerCreate = await polarClient.get(
          `/customers/${customerOutput.id}`,
        );
        expect(fetchedCustomerCreate.id).toEqual(customerOutput.id);
        expect(fetchedCustomerCreate.email).toEqual(initialEmail);

        const updateProps: CustomerProps = {
          ...createProps,
          name: "Updated Test Customer",
          metadata: { test: "true", updated: "yes" },
        };
        customerOutput = await Customer(logicalId, updateProps);

        expect(customerOutput.id).toEqual(fetchedCustomerCreate.id);
        expect(customerOutput.name).toEqual("Updated Test Customer");
        expect(customerOutput.metadata?.updated).toEqual("yes");

        const fetchedCustomerUpdated = await polarClient.get(
          `/customers/${customerOutput.id}`,
        );
        expect(fetchedCustomerUpdated.name).toEqual("Updated Test Customer");
      } finally {
        await destroy(scope);
        if (customerOutput?.id) {
          try {
            await polarClient.get(`/customers/${customerOutput.id}`);
            throw new Error(
              `Customer ${customerOutput.id} was not deleted after destroy.`,
            );
          } catch (error: any) {
            if (error.status === 404) {
              console.log("Customer successfully deleted");
            } else {
              throw error;
            }
          }
        }
      }
    },
  );

  test.skipIf(!!process.env.CI)(
    "create customer with minimal props",
    async (scope) => {
      const apiKey = process.env.POLAR_API_KEY;
      if (!apiKey) {
        throw new Error(
          "POLAR_API_KEY environment variable is required for Polar integration tests.",
        );
      }
      const polarClient = createPolarClient({ apiKey });
      const minimalSuffix = `minimal-${testRunSuffix}`;
      const logicalId = `${baseLogicalId}-${minimalSuffix}`;
      const email = generateCustomerEmail(minimalSuffix);
      let customerOutput: CustomerOutput | undefined;

      try {
        const createProps: CustomerProps = {
          email: email,
        };
        customerOutput = await Customer(logicalId, createProps);

        expect(customerOutput.id).toBeTruthy();
        expect(customerOutput.email).toEqual(email);
        expect(customerOutput.name).toBeUndefined();

        const fetchedCustomer = await polarClient.get(
          `/customers/${customerOutput.id}`,
        );
        expect(fetchedCustomer.email).toEqual(email);
      } finally {
        await destroy(scope);
        if (customerOutput?.id) {
          try {
            await polarClient.get(`/customers/${customerOutput.id}`);
            throw new Error(
              `Customer ${customerOutput.id} was not deleted after destroy.`,
            );
          } catch (error: any) {
            if (error.status === 404) {
              console.log("Customer successfully deleted");
            } else {
              throw error;
            }
          }
        }
      }
    },
  );
});

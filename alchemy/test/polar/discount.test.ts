import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createPolarClient } from "../../src/polar/client.ts";
import {
  Discount,
  type Discount as DiscountOutput,
  type DiscountProps,
} from "../../src/polar/discount.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "local";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Polar Discount Resource", () => {
  const testRunSuffix = "test1";
  const baseLogicalId = `${BRANCH_PREFIX}-test-polar-discount`;

  test.skipIf(!!process.env.CI)(
    "create, update, and delete percentage discount",
    async (scope) => {
      const apiKey = process.env.POLAR_API_KEY;
      if (!apiKey) {
        throw new Error(
          "POLAR_API_KEY environment variable is required for Polar integration tests.",
        );
      }
      const polarClient = createPolarClient({ apiKey });
      const logicalId = `${baseLogicalId}-${testRunSuffix}`;
      let discountOutput: DiscountOutput | undefined;

      try {
        const createProps: DiscountProps = {
          type: "percentage",
          amount: 25,
          name: "Test Discount",
          code: `TEST25_${Date.now()}`,
          maxRedemptions: 100,
          metadata: { test: "true" },
        };
        discountOutput = await Discount(logicalId, createProps);

        expect(discountOutput.id).toBeTruthy();
        expect(discountOutput.type).toEqual("percentage");
        expect(discountOutput.amount).toEqual(25);
        expect(discountOutput.name).toEqual("Test Discount");
        expect(discountOutput.metadata?.test).toEqual("true");

        const fetchedDiscountCreate = await polarClient.get(
          `/discounts/${discountOutput.id}`,
        );
        expect(fetchedDiscountCreate.id).toEqual(discountOutput.id);
        expect(fetchedDiscountCreate.amount).toEqual(25);

        const updateProps: DiscountProps = {
          ...createProps,
          name: "Updated Test Discount",
          amount: 30,
          metadata: { test: "true", updated: "yes" },
        };
        discountOutput = await Discount(logicalId, updateProps);

        expect(discountOutput.id).toEqual(fetchedDiscountCreate.id);
        expect(discountOutput.name).toEqual("Updated Test Discount");
        expect(discountOutput.amount).toEqual(30);
        expect(discountOutput.metadata?.updated).toEqual("yes");

        const fetchedDiscountUpdated = await polarClient.get(
          `/discounts/${discountOutput.id}`,
        );
        expect(fetchedDiscountUpdated.name).toEqual("Updated Test Discount");
      } finally {
        await destroy(scope);
        if (discountOutput?.id) {
          try {
            await polarClient.get(`/discounts/${discountOutput.id}`);
            throw new Error(
              `Discount ${discountOutput.id} was not deleted after destroy.`,
            );
          } catch (error: any) {
            if (error.status === 404) {
              console.log("Discount successfully deleted");
            } else {
              throw error;
            }
          }
        }
      }
    },
  );

  test.skipIf(!!process.env.CI)(
    "create fixed amount discount",
    async (scope) => {
      const apiKey = process.env.POLAR_API_KEY;
      if (!apiKey) {
        throw new Error(
          "POLAR_API_KEY environment variable is required for Polar integration tests.",
        );
      }
      const polarClient = createPolarClient({ apiKey });
      const fixedSuffix = `fixed-${testRunSuffix}`;
      const logicalId = `${baseLogicalId}-${fixedSuffix}`;
      let discountOutput: DiscountOutput | undefined;

      try {
        const createProps: DiscountProps = {
          type: "fixed",
          amount: 500,
          currency: "USD",
          name: "Fixed Discount",
          code: `FIXED5_${Date.now()}`,
        };
        discountOutput = await Discount(logicalId, createProps);

        expect(discountOutput.id).toBeTruthy();
        expect(discountOutput.type).toEqual("fixed");
        expect(discountOutput.amount).toEqual(500);
        expect(discountOutput.currency).toEqual("USD");

        const fetchedDiscount = await polarClient.get(
          `/discounts/${discountOutput.id}`,
        );
        expect(fetchedDiscount.type).toEqual("fixed");
        expect(fetchedDiscount.currency).toEqual("USD");
      } finally {
        await destroy(scope);
        if (discountOutput?.id) {
          try {
            await polarClient.get(`/discounts/${discountOutput.id}`);
            throw new Error(
              `Discount ${discountOutput.id} was not deleted after destroy.`,
            );
          } catch (error: any) {
            if (error.status === 404) {
              console.log("Discount successfully deleted");
            } else {
              throw error;
            }
          }
        }
      }
    },
  );
});

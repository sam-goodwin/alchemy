import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createPolarClient } from "../../src/polar/client.ts";
import {
  Product,
  type Product as ProductOutput,
  type ProductProps,
} from "../../src/polar/product.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "local";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Polar Product Resource", () => {
  const testRunSuffix = "test1";
  const baseLogicalId = `${BRANCH_PREFIX}-test-polar-product`;

  function generateProductName(suffix: string | number) {
    return `Alchemy Test Product ${suffix}`;
  }

  test.skipIf(!!process.env.CI)(
    "create, update, and delete product",
    async (scope) => {
      const apiKey = process.env.POLAR_API_KEY;
      if (!apiKey) {
        throw new Error(
          "POLAR_API_KEY environment variable is required for Polar integration tests.",
        );
      }
      const polarClient = createPolarClient({ apiKey });
      const logicalId = `${baseLogicalId}-${testRunSuffix}`;
      const initialName = generateProductName(testRunSuffix);
      let productOutput: ProductOutput | undefined;

      try {
        const createProps: ProductProps = {
          name: initialName,
          description: "Test product description",
          isRecurring: false,
          metadata: { test: "true" },
        };
        productOutput = await Product(logicalId, createProps);

        expect(productOutput.id).toBeTruthy();
        expect(productOutput.name).toEqual(initialName);
        expect(productOutput.description).toEqual("Test product description");
        expect(productOutput.isRecurring).toEqual(false);
        expect(productOutput.metadata?.test).toEqual("true");

        const fetchedProductCreate = await polarClient.get(
          `/products/${productOutput.id}`,
        );
        expect(fetchedProductCreate.id).toEqual(productOutput.id);
        expect(fetchedProductCreate.name).toEqual(initialName);

        const updateProps: ProductProps = {
          ...createProps,
          name: "Updated Test Product",
          description: "Updated description",
          metadata: { test: "true", updated: "yes" },
        };
        productOutput = await Product(logicalId, updateProps);

        expect(productOutput.id).toEqual(fetchedProductCreate.id);
        expect(productOutput.name).toEqual("Updated Test Product");
        expect(productOutput.description).toEqual("Updated description");
        expect(productOutput.metadata?.updated).toEqual("yes");

        const fetchedProductUpdated = await polarClient.get(
          `/products/${productOutput.id}`,
        );
        expect(fetchedProductUpdated.name).toEqual("Updated Test Product");
      } finally {
        await destroy(scope);
        if (productOutput?.id) {
          try {
            const finalState = await polarClient.get(
              `/products/${productOutput.id}`,
            );
            expect(finalState.is_archived).toEqual(true);
          } catch (error: any) {
            if (error.status === 404) {
              console.log("Product successfully deleted");
            } else {
              throw error;
            }
          }
        }
      }
    },
  );

  test.skipIf(!!process.env.CI)(
    "create product with minimal props",
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
      const name = generateProductName(minimalSuffix);
      let productOutput: ProductOutput | undefined;

      try {
        const createProps: ProductProps = {
          name: name,
        };
        productOutput = await Product(logicalId, createProps);

        expect(productOutput.id).toBeTruthy();
        expect(productOutput.name).toEqual(name);

        const fetchedProduct = await polarClient.get(
          `/products/${productOutput.id}`,
        );
        expect(fetchedProduct.name).toEqual(name);
      } finally {
        await destroy(scope);
        if (productOutput?.id) {
          try {
            const finalState = await polarClient.get(
              `/products/${productOutput.id}`,
            );
            expect(finalState.is_archived).toEqual(true);
          } catch (error: any) {
            if (error.status === 404) {
              console.log("Product successfully deleted");
            } else {
              throw error;
            }
          }
        }
      }
    },
  );
});

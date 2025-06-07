import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createPolarClient } from "../../src/polar/client.ts";
import {
  Meter,
  type Meter as MeterOutput,
  type MeterProps,
} from "../../src/polar/meter.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "local";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Polar Meter Resource", () => {
  const testRunSuffix = "test1";
  const baseLogicalId = `${BRANCH_PREFIX}-test-polar-meter`;

  function generateMeterName(suffix: string | number) {
    return `Alchemy Test Meter ${suffix}`;
  }

  test.skipIf(!!process.env.CI)(
    "create, update, and delete meter",
    async (scope) => {
      const apiKey = process.env.POLAR_API_KEY;
      if (!apiKey) {
        throw new Error(
          "POLAR_API_KEY environment variable is required for Polar integration tests.",
        );
      }
      const polarClient = createPolarClient({ apiKey });
      const logicalId = `${baseLogicalId}-${testRunSuffix}`;
      const initialName = generateMeterName(testRunSuffix);
      let meterOutput: MeterOutput | undefined;

      try {
        const createProps: MeterProps = {
          name: initialName,
          filter: {
            conjunction: "and",
            clauses: [
              {
                property: "event_type",
                operator: "eq",
                value: "api_call",
              },
            ],
          },
          aggregation: {
            type: "count",
          },
          metadata: { test: "true" },
        };
        meterOutput = await Meter(logicalId, createProps);

        expect(meterOutput.id).toBeTruthy();
        expect(meterOutput.name).toEqual(initialName);
        expect(meterOutput.filter?.conjunction).toEqual("and");
        expect(meterOutput.aggregation?.type).toEqual("count");
        expect(meterOutput.metadata?.test).toEqual("true");

        const fetchedMeterCreate = await polarClient.get(
          `/meters/${meterOutput.id}`,
        );
        expect(fetchedMeterCreate.id).toEqual(meterOutput.id);
        expect(fetchedMeterCreate.name).toEqual(initialName);

        const updateProps: MeterProps = {
          ...createProps,
          name: "Updated Test Meter",
          metadata: { test: "true", updated: "yes" },
        };
        meterOutput = await Meter(logicalId, updateProps);

        expect(meterOutput.id).toEqual(fetchedMeterCreate.id);
        expect(meterOutput.name).toEqual("Updated Test Meter");
        expect(meterOutput.metadata?.updated).toEqual("yes");

        const fetchedMeterUpdated = await polarClient.get(
          `/meters/${meterOutput.id}`,
        );
        expect(fetchedMeterUpdated.name).toEqual("Updated Test Meter");
      } finally {
        await destroy(scope);
        if (meterOutput?.id) {
          try {
            await polarClient.get(`/meters/${meterOutput.id}`);
            throw new Error(
              `Meter ${meterOutput.id} was not deleted after destroy.`,
            );
          } catch (error: any) {
            if (error.status === 404) {
              console.log("Meter successfully deleted");
            } else {
              throw error;
            }
          }
        }
      }
    },
  );

  test.skipIf(!!process.env.CI)(
    "create meter with minimal props",
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
      const name = generateMeterName(minimalSuffix);
      let meterOutput: MeterOutput | undefined;

      try {
        const createProps: MeterProps = {
          name: name,
        };
        meterOutput = await Meter(logicalId, createProps);

        expect(meterOutput.id).toBeTruthy();
        expect(meterOutput.name).toEqual(name);

        const fetchedMeter = await polarClient.get(`/meters/${meterOutput.id}`);
        expect(fetchedMeter.name).toEqual(name);
      } finally {
        await destroy(scope);
        if (meterOutput?.id) {
          try {
            await polarClient.get(`/meters/${meterOutput.id}`);
            throw new Error(
              `Meter ${meterOutput.id} was not deleted after destroy.`,
            );
          } catch (error: any) {
            if (error.status === 404) {
              console.log("Meter successfully deleted");
            } else {
              throw error;
            }
          }
        }
      }
    },
  );
});

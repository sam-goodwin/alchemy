import type Stripe from "stripe";
import { beforeAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import {
  Meter,
  type Meter as MeterOutput,
  type MeterProps,
} from "../../src/stripe/meter.ts";
import "../../src/test/vitest.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "local";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe Meter Resource", () => {
  const testRunSuffix = "test1";
  const baseLogicalId = `${BRANCH_PREFIX}-test-stripe-meter`;

  const generateMeterDisplayName = (suffix: string | number) =>
    `Alchemy Test Meter ${suffix}`;

  beforeAll(async () => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error(
        "STRIPE_API_KEY environment variable is required for Stripe integration tests.",
      );
    }
    stripeClient = await createStripeClient({ apiKey });
  });

  test("create, update status, and delete meter", async (scope) => {
    const logicalId = `${baseLogicalId}-${testRunSuffix}`;
    const initialDisplayName = generateMeterDisplayName(testRunSuffix);
    let meterOutput: MeterOutput | undefined;

    const baseTestProps: Omit<MeterProps, "displayName" | "status"> = {
      eventName: `alchemy.test.event.${testRunSuffix}`,
      defaultAggregation: { formula: "sum" },
      customerMapping: { eventPayloadKey: "stripe_user_id", type: "by_id" },
      valueSettings: { eventPayloadKey: "units" },
    };

    try {
      // --- CREATE ---
      const createProps: MeterProps = {
        ...baseTestProps,
        displayName: initialDisplayName,
      };
      meterOutput = await Meter(logicalId, createProps);

      expect(meterOutput.id).toBeTruthy();
      expect(meterOutput.displayName).toEqual(initialDisplayName);
      expect(meterOutput.eventName).toEqual(createProps.eventName);
      expect(meterOutput.status).toEqual("active"); // Default creation status

      // Verify creation directly via Stripe API
      const fetchedMeterCreate = await stripeClient.billing.meters.retrieve(
        meterOutput.id,
      );
      expect(fetchedMeterCreate.id).toEqual(meterOutput.id);
      expect(fetchedMeterCreate.display_name).toEqual(initialDisplayName);
      expect(fetchedMeterCreate.status).toEqual("active");

      // --- UPDATE (Deactivate) ---
      const deactivateProps: MeterProps = {
        ...createProps, // Includes all original immutable props
        status: "inactive",
      };
      meterOutput = await Meter(logicalId, deactivateProps);

      expect(meterOutput.id).toEqual(fetchedMeterCreate.id);
      expect(meterOutput.status).toEqual("inactive");

      // Verify deactivation via Stripe API
      const fetchedMeterDeactivated =
        await stripeClient.billing.meters.retrieve(meterOutput.id);
      expect(fetchedMeterDeactivated.status).toEqual("inactive");

      // --- UPDATE (Reactivate) ---
      const reactivateProps: MeterProps = {
        ...createProps, // Includes all original immutable props
        status: "active",
      };
      meterOutput = await Meter(logicalId, reactivateProps);

      expect(meterOutput.id).toEqual(fetchedMeterCreate.id);
      expect(meterOutput.status).toEqual("active");

      // Verify reactivation via Stripe API
      const fetchedMeterReactivated =
        await stripeClient.billing.meters.retrieve(meterOutput.id);
      expect(fetchedMeterReactivated.status).toEqual("active");
    } finally {
      await destroy(scope);
      if (meterOutput?.id) {
        // Verify meter is inactive after destroy (as Meter resource deactivates)
        try {
          const finalState = await stripeClient.billing.meters.retrieve(
            meterOutput.id,
          );
          expect(finalState.status).toEqual("inactive");
        } catch (error: any) {
          // If it's resource_missing, it's unexpected for Stripe meters (they deactivate)
          if (error.code === "resource_missing")
            throw new Error(
              `Meter ${meterOutput.id} was unexpectedly missing after destroy.`,
            );
          throw error; // rethrow other errors
        }
      }
    }
  });

  test("create meter with inactive status", async (scope) => {
    const inactiveSuffix = `create-inactive-${testRunSuffix}`;
    const logicalId = `${baseLogicalId}-${inactiveSuffix}`;
    const displayName = generateMeterDisplayName(inactiveSuffix);
    let meterOutput: MeterOutput | undefined;

    const createInactiveProps: MeterProps = {
      displayName: displayName,
      eventName: `alchemy.test.inactive.${inactiveSuffix}`,
      defaultAggregation: { formula: "count" },
      customerMapping: {
        eventPayloadKey: "customer_id_inactive",
        type: "by_id",
      },
      valueSettings: { eventPayloadKey: "count_val_inactive" },
      status: "inactive",
    };

    try {
      meterOutput = await Meter(logicalId, createInactiveProps);

      expect(meterOutput.id).toBeTruthy();
      expect(meterOutput.displayName).toEqual(displayName);
      expect(meterOutput.status).toEqual("inactive");

      // Verify via Stripe API
      const fetchedMeter = await stripeClient.billing.meters.retrieve(
        meterOutput.id,
      );
      expect(fetchedMeter.status).toEqual("inactive");
    } finally {
      await destroy(scope);
      if (meterOutput?.id) {
        try {
          const finalState = await stripeClient.billing.meters.retrieve(
            meterOutput.id,
          );
          expect(finalState.status).toEqual("inactive"); // Should remain inactive
        } catch (error: any) {
          if (error.code === "resource_missing")
            throw new Error(
              `Meter ${meterOutput.id} was unexpectedly missing after destroy (create inactive).`,
            );
          throw error;
        }
      }
    }
  });

  test("should fail to update immutable properties", async (scope) => {
    const immutableSuffix = `immutable-${testRunSuffix}`;
    const logicalId = `${baseLogicalId}-${immutableSuffix}`;
    const initialDisplayName = generateMeterDisplayName(immutableSuffix);
    let meterOutput: MeterOutput | undefined;

    const initialCreateProps: MeterProps = {
      displayName: initialDisplayName,
      eventName: `alchemy.test.immutable.${immutableSuffix}`,
      defaultAggregation: { formula: "sum" },
      customerMapping: { eventPayloadKey: "cust_immutable", type: "by_id" },
      valueSettings: { eventPayloadKey: "val_immutable" },
    };

    try {
      // Create the meter first
      meterOutput = await Meter(logicalId, initialCreateProps);
      expect(meterOutput.id).toBeTruthy();
      expect(meterOutput.displayName).toEqual(initialDisplayName);

      // Attempt to update an immutable property (e.g., displayName)
      const attemptUpdateProps: MeterProps = {
        ...initialCreateProps, // Keep other props the same as original
        displayName: "New Attempted Immutable Display Name",
        status: "active", // Keep status or specify to avoid unrelated changes
      };

      await expect(Meter(logicalId, attemptUpdateProps)).rejects.toThrow(
        /Attempted to update immutable properties/,
      );
    } finally {
      await destroy(scope);
      // Cleanup verification (meter should be inactive if created)
      if (meterOutput?.id) {
        try {
          const finalState = await stripeClient.billing.meters.retrieve(
            meterOutput.id,
          );
          expect(finalState.status).toEqual("inactive");
        } catch (error: any) {
          if (error.code === "resource_missing")
            throw new Error(
              `Meter ${meterOutput.id} was unexpectedly missing after destroy (immutable test).`,
            );
          throw error;
        }
      }
    }
  });
});

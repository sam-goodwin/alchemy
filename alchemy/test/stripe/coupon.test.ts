import { beforeAll, describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { Coupon } from "../../src/stripe/coupon.ts";
import "../../src/test/bun.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe Coupon Resource", () => {
  beforeAll(() => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = new Stripe(apiKey);
  });

  test("create, update, and delete coupon", async (scope) => {
    const couponId = `${BRANCH_PREFIX}-coupon-test`;

    const coupon = await Coupon(couponId, {
      id: couponId,
      duration: "once",
      percentOff: 25,
      name: "Test Coupon",
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
      },
    });

    expect(coupon).toMatchObject({
      id: couponId,
      duration: "once",
      percentOff: 25,
      name: "Test Coupon",
    });

    const stripeCoupon = await stripeClient.coupons.retrieve(coupon.id);
    expect(stripeCoupon.id).toBe(coupon.id);
    expect(stripeCoupon.percent_off).toBe(25);

    const updatedCoupon = await Coupon(couponId, {
      id: couponId,
      duration: "once",
      percentOff: 25,
      name: "Updated Test Coupon",
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
        updated: "true",
      },
    });

    expect(updatedCoupon).toMatchObject({
      name: "Updated Test Coupon",
      metadata: expect.objectContaining({
        updated: "true",
      }),
    });

    await destroy(scope);

    try {
      await stripeClient.coupons.retrieve(coupon.id);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error.code).toBe("resource_missing");
    }
  });
});

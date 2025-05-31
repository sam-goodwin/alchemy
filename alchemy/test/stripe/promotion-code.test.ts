import { beforeAll, describe, expect } from "bun:test";
import Stripe from "stripe";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { PromotionCode } from "../../src/stripe/promotion-code.ts";
import { Coupon } from "../../src/stripe/coupon.ts";
import "../../src/test/bun.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX || "test";

let stripeClient: Stripe;

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Stripe PromotionCode Resource", () => {
  beforeAll(() => {
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }
    stripeClient = new Stripe(apiKey);
  });

  test("create, update, and deactivate promotion code", async (scope) => {
    const couponId = `${BRANCH_PREFIX}-coupon-1`;
    const promotionCodeId = `${BRANCH_PREFIX}-promo-1`;

    const coupon = await Coupon(couponId, {
      id: couponId,
      duration: "once",
      percentOff: 20,
      name: "Test Coupon for Promo",
    });

    const promotionCode = await PromotionCode(promotionCodeId, {
      coupon: coupon.id,
      code: "TESTCODE123",
      active: true,
      maxRedemptions: 100,
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
      },
    });

    expect(promotionCode.coupon).toBe(coupon.id);
    expect(promotionCode.active).toBe(true);
    expect(promotionCode.maxRedemptions).toBe(100);

    const stripePromotionCode = await stripeClient.promotionCodes.retrieve(
      promotionCode.id,
    );
    expect(stripePromotionCode.id).toBe(promotionCode.id);
    expect(stripePromotionCode.active).toBe(true);

    const updatedPromotionCode = await PromotionCode(promotionCodeId, {
      coupon: coupon.id,
      code: promotionCode.code,
      active: false,
      maxRedemptions: 100,
      metadata: {
        test: "true",
        branch: BRANCH_PREFIX,
        updated: "true",
      },
    });

    expect(updatedPromotionCode.active).toBe(false);

    await destroy(scope);

    const deactivatedPromotionCode = await stripeClient.promotionCodes.retrieve(
      promotionCode.id,
    );
    expect(deactivatedPromotionCode.active).toBe(false);
  });
});

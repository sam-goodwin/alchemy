import type Stripe from "stripe";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import {
  createStripeClient,
  handleStripeDeleteError,
  isStripeConflictError,
} from "./client.ts";

/**
 * Restrictions for promotion code usage
 */
export interface PromotionCodeRestrictions {
  /**
   * Promotion codes defined with this restriction will only work for Checkout Sessions in payment mode
   */
  firstTimeTransaction?: boolean;
  /**
   * Minimum amount required to redeem this promotion code into a coupon
   */
  minimumAmount?: number;
  /**
   * Three-letter ISO code for minimum_amount
   */
  minimumAmountCurrency?: string;
}

/**
 * Properties for creating a Stripe promotion code
 */
export interface PromotionCodeProps {
  /**
   * The coupon for this promotion code
   */
  coupon: string;
  /**
   * The customer-facing code. Regardless of case, this code must be unique across all active promotion codes for a specific customer
   */
  code?: string;
  /**
   * Whether the promotion code is currently active
   */
  active?: boolean;
  /**
   * The customer that this promotion code can be used by
   */
  customer?: string;
  /**
   * The timestamp at which this promotion code will expire
   */
  expiresAt?: number;
  /**
   * The maximum number of times this promotion code can be redeemed
   */
  maxRedemptions?: number;
  /**
   * Set of key-value pairs that you can attach to an object
   */
  metadata?: Record<string, string>;
  /**
   * Settings that restrict the redemption of the promotion code
   */
  restrictions?: PromotionCodeRestrictions;

  /**
   * API key to use (overrides environment variable)
   */
  apiKey?: Secret;

  /**
   * If true, adopt existing resource if creation fails due to conflict
   */
  adopt?: boolean;
}

/**
 * Output from the Stripe promotion code
 */
export interface PromotionCode
  extends Resource<"stripe::PromotionCode">,
    PromotionCodeProps {
  /**
   * The ID of the promotion code
   */
  id: string;
  /**
   * String representing the object's type
   */
  object: "promotion_code";
  /**
   * Time at which the object was created
   */
  created: number;
  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;
  /**
   * Number of times this promotion code has been used
   */
  timesRedeemed: number;
}

/**
 * Create and manage Stripe promotion codes for coupons
 *
 * @example
 * // Create a basic promotion code
 * const basicPromoCode = await PromotionCode("summer-promo", {
 *   coupon: "SUMMER25",
 *   code: "SAVE25NOW",
 *   active: true,
 *   metadata: {
 *     campaign: "summer_sale",
 *     channel: "email"
 *   }
 * });
 *
 * @example
 * // Create a customer-specific promotion code
 * const customerPromoCode = await PromotionCode("vip-discount", {
 *   coupon: "VIP15",
 *   code: "VIP15OFF",
 *   customer: "cus_xyz123",
 *   maxRedemptions: 1,
 *   expiresAt: Math.floor(Date.now() / 1000) + 86400 * 30,
 *   metadata: {
 *     type: "vip_exclusive",
 *     tier: "gold"
 *   }
 * });
 *
 * @example
 * // Create a promotion code with restrictions
 * const restrictedPromoCode = await PromotionCode("first-time-buyer", {
 *   coupon: "WELCOME10",
 *   code: "FIRSTTIME10",
 *   restrictions: {
 *     firstTimeTransaction: true,
 *     minimumAmount: 5000,
 *     minimumAmountCurrency: "usd"
 *   },
 *   maxRedemptions: 1000,
 *   metadata: {
 *     campaign: "new_customer_acquisition",
 *     minimum_order: "50_usd"
 *   }
 * });
 */
export const PromotionCode = Resource(
  "stripe::PromotionCode",
  async function (
    this: Context<PromotionCode>,
    _id: string,
    props: PromotionCodeProps,
  ): Promise<PromotionCode> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await stripe.promotionCodes.update(this.output.id, { active: false });
        }
      } catch (error) {
        handleStripeDeleteError(error, "PromotionCode", this.output?.id);
      }
      return this.destroy();
    }

    try {
      let promotionCode: Stripe.PromotionCode;

      if (this.phase === "update" && this.output?.id) {
        const updateParams: Stripe.PromotionCodeUpdateParams = {
          active: props.active,
          metadata: props.metadata,
        };
        promotionCode = await stripe.promotionCodes.update(
          this.output.id,
          updateParams,
        );
      } else {
        const createParams: Stripe.PromotionCodeCreateParams = {
          coupon: props.coupon,
          code: props.code,
          active: props.active,
          customer: props.customer,
          expires_at: props.expiresAt,
          max_redemptions: props.maxRedemptions,
          metadata: props.metadata,
        };

        if (props.restrictions) {
          createParams.restrictions = {
            first_time_transaction: props.restrictions.firstTimeTransaction,
            minimum_amount: props.restrictions.minimumAmount,
            minimum_amount_currency: props.restrictions.minimumAmountCurrency,
          };
        }

        try {
          promotionCode = await stripe.promotionCodes.create(createParams);
        } catch (error) {
          if (isStripeConflictError(error) && props.adopt) {
            if (props.code) {
              const existingPromotionCodes = await stripe.promotionCodes.list({
                code: props.code,
                limit: 1,
              });
              if (existingPromotionCodes.data.length > 0) {
                const existingPromotionCode = existingPromotionCodes.data[0];
                const updateParams: Stripe.PromotionCodeUpdateParams = {
                  active: props.active,
                  metadata: props.metadata,
                };
                promotionCode = await stripe.promotionCodes.update(
                  existingPromotionCode.id,
                  updateParams,
                );
              } else {
                throw error;
              }
            } else {
              throw error;
            }
          } else {
            throw error;
          }
        }
      }

      return this({
        id: promotionCode.id,
        object: promotionCode.object,
        coupon:
          typeof promotionCode.coupon === "string"
            ? promotionCode.coupon
            : promotionCode.coupon.id,
        code: promotionCode.code,
        active: promotionCode.active,
        customer:
          typeof promotionCode.customer === "string"
            ? promotionCode.customer
            : promotionCode.customer?.id,
        expiresAt: promotionCode.expires_at || undefined,
        maxRedemptions: promotionCode.max_redemptions || undefined,
        metadata: promotionCode.metadata || undefined,
        restrictions: promotionCode.restrictions
          ? {
              firstTimeTransaction:
                promotionCode.restrictions.first_time_transaction || undefined,
              minimumAmount:
                promotionCode.restrictions.minimum_amount || undefined,
              minimumAmountCurrency:
                promotionCode.restrictions.minimum_amount_currency || undefined,
            }
          : undefined,
        created: promotionCode.created,
        livemode: promotionCode.livemode,
        timesRedeemed: promotionCode.times_redeemed,
      });
    } catch (error) {
      logger.error("Error creating/updating promotion code:", error);
      throw error;
    }
  },
);

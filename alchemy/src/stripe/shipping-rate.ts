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
 * Delivery estimate for shipping rate
 */
export interface ShippingRateDeliveryEstimate {
  /**
   * The lower bound of the estimated range
   */
  minimum?: {
    /**
     * A unit of time
     */
    unit: Stripe.ShippingRateCreateParams.DeliveryEstimate.Minimum.Unit;
    /**
     * Must be greater than 0
     */
    value: number;
  };
  /**
   * The upper bound of the estimated range
   */
  maximum?: {
    /**
     * A unit of time
     */
    unit: Stripe.ShippingRateCreateParams.DeliveryEstimate.Maximum.Unit;
    /**
     * Must be greater than 0
     */
    value: number;
  };
}

/**
 * Fixed amount configuration for shipping rate
 */
export interface ShippingRateFixedAmount {
  /**
   * A non-negative integer in cents representing how much to charge
   */
  amount: number;
  /**
   * Three-letter ISO currency code, in lowercase
   */
  currency: string;
  /**
   * Shipping rates defined in each available currency option
   */
  currencyOptions?: Record<
    string,
    {
      /**
       * A non-negative integer in cents representing how much to charge
       */
      amount: number;
      /**
       * Specifies whether the rate is considered inclusive or exclusive of taxes
       */
      taxBehavior?: Stripe.ShippingRateCreateParams.FixedAmount.CurrencyOptions.TaxBehavior;
    }
  >;
}

/**
 * Properties for creating a Stripe shipping rate
 */
export interface ShippingRateProps {
  /**
   * The name of the shipping rate, meant to be displayable to the customer
   */
  displayName: string;
  /**
   * Describes a fixed amount to charge for shipping
   */
  fixedAmount?: ShippingRateFixedAmount;
  /**
   * The estimated range for how long shipping will take
   */
  deliveryEstimate?: ShippingRateDeliveryEstimate;
  /**
   * Set of key-value pairs that you can attach to an object
   */
  metadata?: Record<string, string>;
  /**
   * Whether the shipping rate can be used for new purchases
   */
  active?: boolean;
  /**
   * Specifies whether the rate is considered inclusive or exclusive of taxes
   */
  taxBehavior?: Stripe.ShippingRateCreateParams.TaxBehavior;
  /**
   * A tax code ID
   */
  taxCode?: string;
  /**
   * The type of calculation to use on the shipping rate
   */
  type?: "fixed_amount";

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
 * Output from the Stripe shipping rate
 */
export interface ShippingRate
  extends Resource<"stripe::ShippingRate">,
    ShippingRateProps {
  /**
   * The ID of the shipping rate
   */
  id: string;
  /**
   * String representing the object's type
   */
  object: "shipping_rate";
  /**
   * Time at which the object was created
   */
  created: number;
  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;
}

/**
 * Create and manage Stripe shipping rates
 *
 * @example
 * // Create a standard shipping rate
 * const standardShipping = await ShippingRate("standard-shipping", {
 *   displayName: "Standard Shipping",
 *   type: "fixed_amount",
 *   fixedAmount: {
 *     amount: 500,
 *     currency: "usd"
 *   },
 *   deliveryEstimate: {
 *     minimum: { unit: "business_day", value: 5 },
 *     maximum: { unit: "business_day", value: 7 }
 *   },
 *   taxBehavior: "exclusive"
 * });
 *
 * @example
 * // Create an express shipping rate
 * const expressShipping = await ShippingRate("express-shipping", {
 *   displayName: "Express Shipping",
 *   type: "fixed_amount",
 *   fixedAmount: {
 *     amount: 1500,
 *     currency: "usd"
 *   },
 *   deliveryEstimate: {
 *     minimum: { unit: "business_day", value: 1 },
 *     maximum: { unit: "business_day", value: 2 }
 *   },
 *   taxBehavior: "exclusive",
 *   metadata: {
 *     priority: "high",
 *     service_level: "express"
 *   }
 * });
 *
 * @example
 * // Create a free shipping rate
 * const freeShipping = await ShippingRate("free-shipping", {
 *   displayName: "Free Shipping",
 *   type: "fixed_amount",
 *   fixedAmount: {
 *     amount: 0,
 *     currency: "usd"
 *   },
 *   deliveryEstimate: {
 *     minimum: { unit: "business_day", value: 7 },
 *     maximum: { unit: "business_day", value: 10 }
 *   },
 *   taxBehavior: "unspecified",
 *   metadata: {
 *     promotion: "free_shipping_over_50",
 *     cost_center: "marketing"
 *   }
 * });
 */
export const ShippingRate = Resource(
  "stripe::ShippingRate",
  async function (
    this: Context<ShippingRate>,
    _id: string,
    props: ShippingRateProps,
  ): Promise<ShippingRate> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await stripe.shippingRates.update(this.output.id, { active: false });
        }
      } catch (error) {
        handleStripeDeleteError(error, "ShippingRate", this.output?.id);
      }
      return this.destroy();
    }

    try {
      let shippingRate: Stripe.ShippingRate;

      if (this.phase === "update" && this.output?.id) {
        const updateParams: any = {
          metadata: props.metadata,
          tax_behavior: props.taxBehavior,
        };
        if (props.active !== undefined) updateParams.active = props.active;
        shippingRate = await stripe.shippingRates.update(
          this.output.id,
          updateParams,
        );
      } else {
        const createParams: Stripe.ShippingRateCreateParams = {
          display_name: props.displayName,
          metadata: props.metadata,

          tax_behavior: props.taxBehavior,
          tax_code: props.taxCode,
          type: props.type,
        };

        if (props.fixedAmount) {
          createParams.fixed_amount = {
            amount: props.fixedAmount.amount,
            currency: props.fixedAmount.currency,
            currency_options: props.fixedAmount.currencyOptions
              ? Object.fromEntries(
                  Object.entries(props.fixedAmount.currencyOptions).map(
                    ([key, value]) => [
                      key,
                      {
                        amount: value.amount,
                        tax_behavior: value.taxBehavior,
                      },
                    ],
                  ),
                )
              : undefined,
          };
        }

        if (props.deliveryEstimate) {
          createParams.delivery_estimate = {
            minimum: props.deliveryEstimate.minimum
              ? {
                  unit: props.deliveryEstimate.minimum.unit,
                  value: props.deliveryEstimate.minimum.value,
                }
              : undefined,
            maximum: props.deliveryEstimate.maximum
              ? {
                  unit: props.deliveryEstimate.maximum.unit,
                  value: props.deliveryEstimate.maximum.value,
                }
              : undefined,
          };
        }

        try {
          try {
            shippingRate = await stripe.shippingRates.create(createParams);
          } catch (error) {
            if (isStripeConflictError(error) && props.adopt) {
              throw new Error(
                "ShippingRate adoption is not supported - shipping rates cannot be uniquely identified for adoption",
              );
            } else {
              throw error;
            }
          }
        } catch (error) {
          if (isStripeConflictError(error) && props.adopt) {
            throw new Error(
              "ShippingRate adoption is not supported - shipping rates cannot be uniquely identified for adoption",
            );
          } else {
            throw error;
          }
        }
      }

      return this({
        id: shippingRate.id,
        object: shippingRate.object,
        displayName: shippingRate.display_name || "",
        fixedAmount: shippingRate.fixed_amount
          ? {
              amount: shippingRate.fixed_amount.amount,
              currency: shippingRate.fixed_amount.currency,
              currencyOptions: shippingRate.fixed_amount.currency_options
                ? Object.fromEntries(
                    Object.entries(
                      shippingRate.fixed_amount.currency_options,
                    ).map(([key, value]) => [
                      key,
                      {
                        amount: value.amount,
                        taxBehavior: value.tax_behavior,
                      },
                    ]),
                  )
                : undefined,
            }
          : undefined,
        deliveryEstimate: shippingRate.delivery_estimate
          ? {
              minimum: shippingRate.delivery_estimate.minimum
                ? {
                    unit: shippingRate.delivery_estimate.minimum.unit,
                    value: shippingRate.delivery_estimate.minimum.value,
                  }
                : undefined,
              maximum: shippingRate.delivery_estimate.maximum
                ? {
                    unit: shippingRate.delivery_estimate.maximum.unit,
                    value: shippingRate.delivery_estimate.maximum.value,
                  }
                : undefined,
            }
          : undefined,
        metadata: shippingRate.metadata || undefined,
        active: shippingRate.active,
        taxBehavior: shippingRate.tax_behavior || undefined,
        taxCode:
          typeof shippingRate.tax_code === "string"
            ? shippingRate.tax_code
            : undefined,
        type: shippingRate.type || undefined,
        created: shippingRate.created,
        livemode: shippingRate.livemode,
      });
    } catch (error) {
      logger.error("Error creating/updating shipping rate:", error);
      throw error;
    }
  },
);

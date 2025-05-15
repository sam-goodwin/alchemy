import Stripe from "stripe";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";

/**
 * Properties for price recurring configuration
 */
export interface PriceRecurring {
  /**
   * Specifies billing frequency. Either 'day', 'week', 'month' or 'year'.
   */
  interval: Stripe.PriceCreateParams.Recurring.Interval;

  /**
   * The number of intervals between subscription billings. For example, interval=month and interval_count=3 bills every 3 months.
   */
  intervalCount?: number;

  /**
   * Configures how the quantity per period should be determined, can be either 'metered' or 'licensed'.
   * 'licensed' will automatically bill the quantity set for a plan when adding it to a subscription,
   * 'metered' will aggregate the total usage based on usage records.
   */
  usageType?: Stripe.PriceCreateParams.Recurring.UsageType;

  /**
   * Specifies a usage aggregation strategy for prices of `usage_type=metered`. Allowed values are `sum` for summing up all usage during a period,
   * `last_during_period` for picking the last usage record reported within a period,
   * `last_ever` for picking the last usage record ever (across period bounds) or `max` which picks the usage record with the maximum reported usage during a period.
   */
  aggregateUsage?: Stripe.PriceCreateParams.Recurring.AggregateUsage;
}

type TaxBehavior = Stripe.PriceCreateParams.TaxBehavior;
type BillingScheme = Stripe.PriceCreateParams.BillingScheme;

/**
 * Properties for creating a Stripe price
 */
export interface PriceProps {
  /**
   * The ID of the product that this price will belong to
   */
  product: string;

  /**
   * Three-letter ISO currency code, in lowercase. Must be a supported currency.
   */
  currency: string;

  /**
   * A positive integer in cents (or local equivalent) representing how much to charge (e.g., 999 for $9.99).
   * Alternatively, use unit_amount_decimal to specify a precise amount.
   */
  unitAmount?: number;

  /**
   * Same as unit_amount, but accepts a decimal string (e.g., '9.99') with at most 12 decimal places.
   * Only one of unit_amount and unit_amount_decimal can be set.
   */
  unitAmountDecimal?: string;

  /**
   * Whether the price can be used for new purchases
   */
  active?: boolean;

  /**
   * Describes how to compute the price per period. Either `per_unit` or `tiered`.
   * `per_unit` indicates that the fixed amount (specified in `unit_amount` or `unit_amount_decimal`)
   * will be charged per unit in `quantity`.
   * `tiered` indicates that the unit pricing will be computed using a tiering strategy.
   */
  billingScheme?: BillingScheme;

  /**
   * A brief description of the price, hidden from customers.
   */
  nickname?: string;

  /**
   * The recurring components of a price such as `interval` and `interval_count`.
   */
  recurring?: PriceRecurring;

  /**
   * Set of key-value pairs that you can attach to an object.
   */
  metadata?: Record<string, string>;

  /**
   * Specifies whether the price is considered inclusive of taxes or exclusive of taxes.
   * One of inclusive, exclusive, or unspecified.
   */
  taxBehavior?: TaxBehavior;

  /**
   * A lookup key to uniquely identify this price.
   * This key can be used to retrieve the price object without needing its ID.
   * It must be unique across all prices in your Stripe account, otherwise creation will fail.
   * If you want to transfer the lookup key from another price, set `transferLookupKey` to true
   */
  lookupKey?: string;

  /**
   * If set to true, will atomically transfer the lookup key from an existing price to this price.
   */
  transferLookupKey?: boolean;
}

/**
 * Output from the Stripe price
 */
export interface Price extends Resource<"stripe::Price">, PriceProps {
  /**
   * The ID of the price
   */
  id: string;

  /**
   * Time at which the object was created
   */
  createdAt: number;

  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;

  /**
   * The type of the price - either 'one_time' or 'recurring'
   */
  type: Stripe.Price.Type;

  /**
   * The lookup key (if any) used by the customer to identify this price object
   */
  lookupKey?: string;
}

/**
 * Create and manage Stripe prices for products
 *
 * @example
 * // Create a one-time fixed price for a product
 * const oneTimePrice = await Price("basic-license", {
 *   currency: "usd",
 *   unitAmount: 2999, // $29.99
 *   product: "prod_xyz"
 * });
 *
 * @example
 * // Create a recurring subscription price with fixed monthly billing
 * const subscriptionPrice = await Price("pro-monthly", {
 *   currency: "usd",
 *   unitAmount: 1499, // $14.99/month
 *   product: "prod_xyz",
 *   recurring: {
 *     interval: "month",
 *     usageType: "licensed"
 *   }
 * });
 *
 * @example
 * // Create a metered price for usage-based billing
 * const meteredPrice = await Price("storage", {
 *   currency: "usd",
 *   unitAmount: 25, // $0.25 per GB
 *   product: "prod_xyz",
 *   recurring: {
 *     interval: "month",
 *     usageType: "metered",
 *     aggregateUsage: "sum"
 *   }
 * });
 *
 * @example
 * // Create a tiered price with tax behavior
 * const tieredPrice = await Price("enterprise", {
 *   currency: "usd",
 *   unitAmount: 10000, // $100.00
 *   product: "prod_xyz",
 *   billingScheme: "tiered",
 *   taxBehavior: "exclusive",
 *   metadata: {
 *     tier: "enterprise",
 *     features: "all"
 *   }
 * });
 */
export const Price = Resource(
  "stripe::Price",
  async function (
    this: Context<Price>,
    _id: string,
    props: PriceProps,
  ): Promise<Price> {
    // Get Stripe API key from context or environment
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }

    // Initialize Stripe client
    const stripe = new Stripe(apiKey);

    if (this.phase === "delete") {
      try {
        if (this.phase === "delete" && this.output?.id) {
          // Prices can't be deleted, only deactivated
          await stripe.prices.update(this.output.id, { active: false });
        }
      } catch (error) {
        // Ignore if the price doesn't exist
        console.error("Error deactivating price:", error);
      }

      return this.destroy();
    }
    try {
      let price: Stripe.Price;

      if (this.phase === "update" && this.output?.id) {
        // Update existing price (limited properties can be updated)
        price = await stripe.prices.update(this.output.id, {
          active: props.active,
          metadata: props.metadata,
          nickname: props.nickname,
          lookup_key: props.lookupKey,
          transfer_lookup_key: props.transferLookupKey,
        });
      } else {
        // Create new price
        const createParams: Stripe.PriceCreateParams = {
          currency: props.currency,
          product: props.product,
          active: props.active,
          billing_scheme: props.billingScheme,
          nickname: props.nickname,
          metadata: props.metadata,
          tax_behavior: props.taxBehavior,
          lookup_key: props.lookupKey,
          transfer_lookup_key: props.transferLookupKey,
        };

        // Add unit amount fields
        if (props.unitAmount !== undefined) {
          createParams.unit_amount = props.unitAmount;
        } else if (props.unitAmountDecimal !== undefined) {
          createParams.unit_amount_decimal = props.unitAmountDecimal;
        }

        // Add recurring parameters if present
        if (props.recurring) {
          createParams.recurring = {
            interval: props.recurring.interval,
            interval_count: props.recurring.intervalCount,
            usage_type: props.recurring.usageType,
            aggregate_usage: props.recurring.aggregateUsage,
          };
        }

        price = await stripe.prices.create(createParams);
      }

      // Transform Stripe recurring object to our format
      const recurring = price.recurring
        ? {
            interval: price.recurring
              .interval as Stripe.PriceCreateParams.Recurring.Interval,
            intervalCount: price.recurring.interval_count,
            usageType: price.recurring
              .usage_type as Stripe.PriceCreateParams.Recurring.UsageType,
            aggregateUsage: price.recurring
              .aggregate_usage as Stripe.PriceCreateParams.Recurring.AggregateUsage,
          }
        : undefined;

      // Map Stripe API response to our output format
      return this({
        id: price.id,
        product:
          typeof price.product === "string" ? price.product : price.product.id,
        currency: price.currency,
        unitAmount: price.unit_amount || undefined,
        unitAmountDecimal: price.unit_amount_decimal || undefined,
        active: price.active,
        billingScheme: price.billing_scheme as BillingScheme,
        nickname: price.nickname || undefined,
        recurring: recurring,
        metadata: price.metadata || undefined,
        taxBehavior: price.tax_behavior as TaxBehavior,
        createdAt: price.created,
        livemode: price.livemode,
        type: price.type as Stripe.Price.Type,
        lookupKey: price.lookup_key || undefined,
      });
    } catch (error) {
      console.error("Error creating/updating price:", error);
      throw error;
    }
  },
);

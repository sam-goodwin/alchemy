import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import {
  createPolarClient,
  handlePolarDeleteError,
  isPolarConflictError,
} from "./client.ts";
import type { Organization } from "./organization.ts";

/**
 * Discount type enum for supported discount types in Polar
 */
export type DiscountType = "percentage" | "fixed";

/**
 * Properties for creating or updating a Polar Discount
 */
export interface DiscountProps {
  /** 
   * Type of discount - either percentage off or fixed amount off
   */
  type: DiscountType;
  /** 
   * Discount amount. For percentage discounts, this is the percentage (e.g., 25 for 25% off).
   * For fixed discounts, this is the amount in cents.
   */
  amount: number;
  /** 
   * Currency for fixed amount discounts (e.g., 'usd', 'eur'). Required when type is 'fixed'.
   */
  currency?: string;
  /** 
   * Display name for the discount shown to customers
   */
  name?: string;
  /** 
   * Discount code that customers can enter during checkout
   */
  code?: string;
  /** 
   * When the discount becomes active (ISO 8601 date string)
   */
  startsAt?: string;
  /** 
   * When the discount expires (ISO 8601 date string)
   */
  endsAt?: string;
  /** 
   * Maximum number of times this discount can be used across all customers
   */
  maxRedemptions?: number;
  /** 
   * Current number of times this discount has been redeemed (read-only in create/update)
   */
  redemptionsCount?: number;
  /** 
   * Organization that owns this discount. Can be an organization ID string or Organization resource.
   */
  organization?: string | Organization;
  /** 
   * Key-value pairs for storing additional information about the discount
   */
  metadata?: Record<string, string>;
  /** 
   * Polar API key (overrides environment variable)
   */
  apiKey?: Secret;
  /** 
   * If true, adopt existing resource if creation fails due to conflict
   */
  adopt?: boolean;
}

/**
 * Output from the Polar Discount resource
 */
export interface Discount extends Resource<"polar::Discount">, DiscountProps {
  /**
   * The ID of the discount
   */
  id: string;
  /**
   * Time at which the discount was created
   */
  createdAt: string;
  /**
   * Time at which the discount was last modified
   */
  modifiedAt: string;
  /**
   * Type of discount
   */
  type: DiscountType;
  /**
   * Discount amount
   */
  amount: number;
  /**
   * Currency for fixed amount discounts
   */
  currency?: string;
  /**
   * Display name for the discount
   */
  name?: string;
  /**
   * Discount code customers can use
   */
  code?: string;
  /**
   * When the discount becomes active
   */
  startsAt?: string;
  /**
   * When the discount expires
   */
  endsAt?: string;
  /**
   * Maximum number of times this discount can be used
   */
  maxRedemptions?: number;
  /**
   * Current number of times this discount has been redeemed
   */
  redemptionsCount: number;
  /**
   * ID of the organization that owns this discount
   */
  organization: string;
}

/**
 * Create and manage Polar Discounts for promotional pricing
 *
 * Discounts allow you to create promotional codes that customers can use
 * to receive percentage or fixed-amount reductions on their purchases.
 * Discounts can be time-limited and have usage restrictions.
 *
 * @example
 * // Create a percentage discount for a seasonal sale
 * const percentageDiscount = await Discount("summer-sale", {
 *   type: "percentage",
 *   amount: 25,
 *   name: "Summer Sale",
 *   code: "SUMMER25",
 *   maxRedemptions: 100,
 *   startsAt: "2024-06-01T00:00:00Z",
 *   endsAt: "2024-08-31T23:59:59Z",
 *   metadata: {
 *     campaign: "seasonal_promotion",
 *     source: "email_marketing"
 *   }
 * });
 *
 * @example
 * // Create a fixed amount discount for new customers
 * const fixedDiscount = await Discount("new-customer-welcome", {
 *   type: "fixed",
 *   amount: 500, // $5.00 off
 *   currency: "usd",
 *   name: "New Customer Welcome",
 *   code: "WELCOME5",
 *   maxRedemptions: 1000,
 *   metadata: {
 *     campaign: "new_customer_acquisition",
 *     source: "landing_page"
 *   }
 * });
 *
 * @example
 * // Create a limited-time flash sale discount
 * const flashSale = await Discount("flash-sale-48h", {
 *   type: "percentage",
 *   amount: 40,
 *   name: "48-Hour Flash Sale",
 *   code: "FLASH40",
 *   maxRedemptions: 50,
 *   startsAt: "2024-07-15T00:00:00Z",
 *   endsAt: "2024-07-17T00:00:00Z",
 *   metadata: {
 *     campaign: "flash_sale",
 *     urgency: "high",
 *     duration: "48_hours"
 *   }
 * });
 *
 * @example
 * // Create an early bird discount with no expiration
 * const earlyBird = await Discount("early-bird-special", {
 *   type: "fixed",
 *   amount: 2000, // $20.00 off
 *   currency: "usd",
 *   name: "Early Bird Special",
 *   code: "EARLYBIRD",
 *   maxRedemptions: 200,
 *   startsAt: "2024-01-01T00:00:00Z",
 *   // No endsAt - discount runs indefinitely until maxRedemptions reached
 *   metadata: {
 *     type: "early_bird",
 *     priority: "high"
 *   }
 * });
 *
 * @see https://docs.polar.sh/api-reference/discounts
 */
export const Discount = Resource(
  "polar::Discount",
  async function (
    this: Context<Discount>,
    _logicalId: string,
    props: DiscountProps,
  ): Promise<Discount> {
    const client = createPolarClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await client.delete(`/discounts/${this.output.id}`);
        }
      } catch (error) {
        handlePolarDeleteError(error, "Discount", this.output?.id);
      }
      return this.destroy();
    }

    let discount: any;

    if (this.phase === "update" && this.output?.id) {
      const updateData: any = {};
      if (props.amount !== undefined) updateData.amount = props.amount;
      if (props.currency !== undefined) updateData.currency = props.currency;
      if (props.name !== undefined) updateData.name = props.name;
      if (props.code !== undefined) updateData.code = props.code;
      if (props.startsAt !== undefined) updateData.starts_at = props.startsAt;
      if (props.endsAt !== undefined) updateData.ends_at = props.endsAt;
      if (props.maxRedemptions !== undefined)
        updateData.max_redemptions = props.maxRedemptions;
      if (props.metadata !== undefined) updateData.metadata = props.metadata;

      discount = await client.patch(`/discounts/${this.output.id}`, updateData);
    } else {
      const createData: any = {
        type: props.type,
        amount: props.amount,
      };
      if (props.currency !== undefined) createData.currency = props.currency;
      if (props.name !== undefined) createData.name = props.name;
      if (props.code !== undefined) createData.code = props.code;
      if (props.startsAt !== undefined) createData.starts_at = props.startsAt;
      if (props.endsAt !== undefined) createData.ends_at = props.endsAt;
      if (props.maxRedemptions !== undefined)
        createData.max_redemptions = props.maxRedemptions;
      if (props.organization !== undefined) {
        createData.organization_id =
          typeof props.organization === "string"
            ? props.organization
            : props.organization.id;
      }
      if (props.metadata !== undefined) createData.metadata = props.metadata;

      try {
        discount = await client.post("/discounts", createData);
      } catch (error) {
        if (isPolarConflictError(error) && props.adopt) {
          throw new Error(
            "Discount adoption is not supported - discounts cannot be uniquely identified for adoption",
          );
        } else {
          throw error;
        }
      }
    }

    return this({
      id: discount.id,
      type: discount.type,
      amount: discount.amount,
      currency: discount.currency,
      name: discount.name,
      code: discount.code,
      startsAt: discount.starts_at,
      endsAt: discount.ends_at,
      maxRedemptions: discount.max_redemptions,
      redemptionsCount: discount.redemptions_count,
      organization: discount.organization_id,
      metadata: discount.metadata || {},
      createdAt: discount.created_at,
      modifiedAt: discount.modified_at,
    });
  },
);

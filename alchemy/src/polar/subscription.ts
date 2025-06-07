import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import {
  createPolarClient,
  handlePolarDeleteError,
  isPolarConflictError,
} from "./client.ts";
import type { Customer } from "./customer.ts";
import type { Product } from "./product.ts";

/**
 * Subscription status enum for Polar subscriptions
 */
export type SubscriptionStatus =
  | "incomplete"
  | "incomplete_expired"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid";

/**
 * Billing interval enum for recurring subscriptions
 */
export type RecurringInterval = "month" | "year";

/**
 * Properties for creating or updating a Polar Subscription
 */
export interface SubscriptionProps {
  /** 
   * Customer associated with this subscription. Can be a customer ID string or Customer resource.
   */
  customer?: string | Customer;
  /** 
   * Product being subscribed to. Can be a product ID string or Product resource.
   */
  product?: string | Product;
  /** 
   * Subscription amount in cents
   */
  amount?: number;
  /** 
   * Currency code (e.g., 'usd', 'eur')
   */
  currency?: string;
  /** 
   * Billing interval for recurring subscriptions
   */
  recurringInterval?: RecurringInterval;
  /** 
   * Current subscription status
   */
  status?: SubscriptionStatus;
  /** 
   * Start of current billing period (ISO 8601 date string)
   */
  currentPeriodStart?: string;
  /** 
   * End of current billing period (ISO 8601 date string)
   */
  currentPeriodEnd?: string;
  /** 
   * Whether to cancel the subscription at the end of the current billing period
   */
  cancelAtPeriodEnd?: boolean;
  /** 
   * When the subscription started (ISO 8601 date string)
   */
  startedAt?: string;
  /** 
   * When the subscription ended (ISO 8601 date string)
   */
  endedAt?: string;
  /** 
   * Key-value pairs for storing additional information about the subscription
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
 * Output from the Polar Subscription resource
 */
export interface Subscription
  extends Resource<"polar::Subscription">,
    SubscriptionProps {
  /**
   * The ID of the subscription
   */
  id: string;
  /**
   * Time at which the subscription was created
   */
  createdAt: string;
  /**
   * Time at which the subscription was last modified
   */
  modifiedAt: string;
  /**
   * ID of the customer this subscription belongs to
   */
  customer: string;
  /**
   * ID of the product being subscribed to
   */
  product: string;
  /**
   * Subscription amount in cents
   */
  amount: number;
  /**
   * Currency code
   */
  currency: string;
  /**
   * Billing interval for the subscription
   */
  recurringInterval: RecurringInterval;
  /**
   * Current status of the subscription
   */
  status: SubscriptionStatus;
  /**
   * Start of the current billing period
   */
  currentPeriodStart: string;
  /**
   * End of the current billing period
   */
  currentPeriodEnd: string;
  /**
   * Whether the subscription will be canceled at the end of the current period
   */
  cancelAtPeriodEnd: boolean;
  /**
   * When the subscription started
   */
  startedAt?: string;
  /**
   * When the subscription ended
   */
  endedAt?: string;
}

/**
 * Create and manage Polar Subscriptions for recurring billing
 *
 * Subscriptions represent ongoing billing relationships between customers
 * and recurring products. They handle automatic billing cycles, status
 * management, and lifecycle events.
 *
 * @example
 * // Create a monthly subscription
 * const monthlySubscription = await Subscription("monthly-premium", {
 *   customer: "cust_123",
 *   product: "prod_premium",
 *   amount: 2999,
 *   currency: "usd",
 *   recurringInterval: "month",
 *   metadata: {
 *     plan: "premium",
 *     billing_cycle: "monthly"
 *   }
 * });
 *
 * @example
 * // Create a yearly subscription with trial period
 * const yearlySubscription = await Subscription("yearly-pro", {
 *   customer: customerResource,
 *   product: productResource,
 *   amount: 29999,
 *   currency: "usd",
 *   recurringInterval: "year",
 *   status: "trialing",
 *   metadata: {
 *     trial_days: "14",
 *     source: "website",
 *     discount: "early_bird"
 *   }
 * });
 *
 * @example
 * // Create a subscription with specific billing periods
 * const customSubscription = await Subscription("custom-billing", {
 *   customer: "cust_456",
 *   product: "prod_enterprise",
 *   amount: 9999,
 *   currency: "usd",
 *   recurringInterval: "month",
 *   currentPeriodStart: "2024-01-01T00:00:00Z",
 *   currentPeriodEnd: "2024-02-01T00:00:00Z",
 *   metadata: {
 *     tier: "enterprise",
 *     seats: "25",
 *     contract_length: "12_months"
 *   }
 * });
 *
 * @example
 * // Create a subscription with cancellation scheduled
 * const cancelingSubscription = await Subscription("canceling-sub", {
 *   customer: customerResource,
 *   product: productResource,
 *   amount: 1999,
 *   currency: "usd",
 *   recurringInterval: "month",
 *   cancelAtPeriodEnd: true,
 *   metadata: {
 *     cancellation_reason: "downgrade",
 *     cancel_date: "2024-02-01"
 *   }
 * });
 *
 * @see https://docs.polar.sh/api-reference/subscriptions
 */
export const Subscription = Resource(
  "polar::Subscription",
  async function (
    this: Context<Subscription>,
    _logicalId: string,
    props: SubscriptionProps,
  ): Promise<Subscription> {
    const client = createPolarClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await client.delete(`/subscriptions/${this.output.id}`);
        }
      } catch (error) {
        handlePolarDeleteError(error, "Subscription", this.output?.id);
      }
      return this.destroy();
    }

    let subscription: any;

    if (this.phase === "update" && this.output?.id) {
      const updateData: any = {};
      if (props.amount !== undefined) updateData.amount = props.amount;
      if (props.currency !== undefined) updateData.currency = props.currency;
      if (props.recurringInterval !== undefined)
        updateData.recurring_interval = props.recurringInterval;
      if (props.cancelAtPeriodEnd !== undefined)
        updateData.cancel_at_period_end = props.cancelAtPeriodEnd;
      if (props.metadata !== undefined) updateData.metadata = props.metadata;

      subscription = await client.patch(
        `/subscriptions/${this.output.id}`,
        updateData,
      );
    } else {
      if (!props.customer || !props.product) {
        throw new Error(
          "customer and product are required for creating a subscription",
        );
      }

      const customerId =
        typeof props.customer === "string" ? props.customer : props.customer.id;
      const productId =
        typeof props.product === "string" ? props.product : props.product.id;

      const createData: any = {
        customer_id: customerId,
        product_id: productId,
      };
      if (props.amount !== undefined) createData.amount = props.amount;
      if (props.currency !== undefined) createData.currency = props.currency;
      if (props.recurringInterval !== undefined)
        createData.recurring_interval = props.recurringInterval;
      if (props.metadata !== undefined) createData.metadata = props.metadata;

      try {
        subscription = await client.post("/subscriptions", createData);
      } catch (error) {
        if (isPolarConflictError(error) && props.adopt) {
          throw new Error(
            "Subscription adoption is not supported - subscriptions cannot be uniquely identified for adoption",
          );
        } else {
          throw error;
        }
      }
    }

    return this({
      id: subscription.id,
      customer: subscription.customer_id,
      product: subscription.product_id,
      amount: subscription.amount,
      currency: subscription.currency,
      recurringInterval: subscription.recurring_interval,
      status: subscription.status,
      currentPeriodStart: subscription.current_period_start,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      startedAt: subscription.started_at,
      endedAt: subscription.ended_at,
      metadata: subscription.metadata || {},
      createdAt: subscription.created_at,
      modifiedAt: subscription.modified_at,
    });
  },
);

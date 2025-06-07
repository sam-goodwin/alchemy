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
 * Properties for creating or updating a Polar Order.
 */
export interface OrderProps {
  /** Customer ID or Customer resource */
  customer?: string | Customer;
  /** Product ID or Product resource */
  product?: string | Product;
  /** Order amount in cents */
  amount?: number;
  /** Currency code (e.g., 'usd', 'eur') */
  currency?: string;
  /** Key-value pairs for storing additional information */
  metadata?: Record<string, string>;
  /** Polar API key (overrides environment variable) */
  apiKey?: Secret;
  /** If true, adopt existing resource if creation fails due to conflict */
  adopt?: boolean;
}

/**
 * Manages Polar Orders for one-time purchases.
 *
 * Orders represent completed or pending purchases of products by customers.
 * Unlike subscriptions, orders are typically one-time transactions that
 * provide immediate access to products or benefits.
 *
 * @example
 * // Create a simple order
 * const ebookOrder = await Order("ebook-purchase", {
 *   customer: "cust_123",
 *   product: "prod_ebook",
 *   amount: 1999,
 *   currency: "usd"
 * });
 *
 * @example
 * // Create an order with metadata
 * const courseOrder = await Order("course-purchase", {
 *   customer: customerResource,
 *   product: productResource,
 *   amount: 9999,
 *   currency: "usd",
 *   metadata: {
 *     source: "landing_page",
 *     discount_code: "EARLY_BIRD"
 *   }
 * });
 *
 * @see https://docs.polar.sh/api-reference/orders
 */
export interface Order extends Resource<"polar::Order">, OrderProps {
  id: string;
  createdAt: string;
  modifiedAt: string;
  customer: string;
  product: string;
  amount: number;
  currency: string;
}

export const Order = Resource(
  "polar::Order",
  async function (
    this: Context<Order>,
    _logicalId: string,
    props: OrderProps,
  ): Promise<Order> {
    const client = createPolarClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await client.delete(`/orders/${this.output.id}`);
        }
      } catch (error) {
        handlePolarDeleteError(error, "Order", this.output?.id);
      }
      return this.destroy();
    }

    let order: any;

    if (this.phase === "update" && this.output?.id) {
      const updateData: any = {};
      if (props.amount !== undefined) updateData.amount = props.amount;
      if (props.currency !== undefined) updateData.currency = props.currency;
      if (props.metadata !== undefined) updateData.metadata = props.metadata;

      order = await client.patch(`/orders/${this.output.id}`, updateData);
    } else {
      if (!props.customer || !props.product) {
        throw new Error(
          "customer and product are required for creating an order",
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
      if (props.metadata !== undefined) createData.metadata = props.metadata;

      try {
        order = await client.post("/orders", createData);
      } catch (error) {
        if (isPolarConflictError(error) && props.adopt) {
          throw new Error(
            "Order adoption is not supported - orders cannot be uniquely identified for adoption",
          );
        } else {
          throw error;
        }
      }
    }

    return this({
      id: order.id,
      customer: order.customer_id,
      product: order.product_id,
      amount: order.amount,
      currency: order.currency,
      metadata: order.metadata || {},
      createdAt: order.created_at,
      modifiedAt: order.modified_at,
    });
  },
);

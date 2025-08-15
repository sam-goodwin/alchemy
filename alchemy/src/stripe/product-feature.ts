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
 * Properties for creating a Stripe product feature
 */
export interface ProductFeatureProps {
  /**
   * The ID of the product that this feature will be attached to
   */
  product: string;

  /**
   * The ID of the entitlements feature to attach to the product
   */
  entitlementFeature: string;

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
 * Output from the Stripe product feature
 */
export interface ProductFeature
  extends Resource<"stripe::ProductFeature">,
    ProductFeatureProps {
  /**
   * The ID of the product feature
   */
  id: string;

  /**
   * String representing the object's type
   */
  object: "product_feature";

  /**
   * The entitlement feature object attached to this product
   */
  entitlementFeatureObject?: {
    id: string;
    name: string;
    lookupKey?: string;
    metadata?: Record<string, string>;
  };

  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;
}

/**
 * Create and manage Stripe product features
 *
 * @example
 * // Attach an API access feature to a product
 * const productApiFeature = await ProductFeature("product-api-access", {
 *   product: "prod_xyz123",
 *   entitlementFeature: "feat_abc456"
 * });
 *
 * @example
 * // Attach analytics feature to a premium product
 * const productAnalytics = await ProductFeature("premium-analytics", {
 *   product: "prod_premium789",
 *   entitlementFeature: "feat_analytics123"
 * });
 *
 * @example
 * // Attach custom integrations to enterprise product
 * const enterpriseIntegrations = await ProductFeature("enterprise-integrations", {
 *   product: "prod_enterprise456",
 *   entitlementFeature: "feat_integrations789"
 * });
 */
export const ProductFeature = Resource(
  "stripe::ProductFeature",
  async function (
    this: Context<ProductFeature>,
    _id: string,
    props: ProductFeatureProps,
  ): Promise<ProductFeature> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id && this.output?.product) {
          await stripe.products.deleteFeature(
            this.output.product,
            this.output.id,
          );
        }
      } catch (error) {
        handleStripeDeleteError(error, "ProductFeature", this.output?.id);
      }
      return this.destroy();
    }

    try {
      let productFeature: Stripe.ProductFeature;

      if (this.phase === "update" && this.output?.id) {
        throw new Error("Product features cannot be updated after creation");
      } else {
        try {
          productFeature = await stripe.products.createFeature(props.product, {
            entitlement_feature: props.entitlementFeature,
          });
        } catch (error) {
          if (isStripeConflictError(error) && props.adopt) {
            throw new Error(
              "ProductFeature adoption is not supported - product features cannot be uniquely identified for adoption",
            );
          } else {
            throw error;
          }
        }
      }

      return this({
        id: productFeature.id,
        object: productFeature.object,
        product: props.product,
        entitlementFeature: props.entitlementFeature,
        entitlementFeatureObject:
          productFeature.entitlement_feature || undefined,
        livemode: productFeature.livemode,
      });
    } catch (error) {
      logger.error("Error creating product feature:", error);
      throw error;
    }
  },
);

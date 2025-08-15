import type Stripe from "stripe";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { createStripeClient, isStripeConflictError } from "./client.ts";

/**
 * Properties for creating a Stripe entitlements feature
 */
export interface EntitlementsFeatureProps {
  /**
   * The feature's name, for your own purpose, not meant to be displayable to the customer
   */
  name: string;

  /**
   * A unique key you provide as your own system identifier. This may be up to 80 characters
   */
  lookupKey?: string;

  /**
   * Set of key-value pairs that you can attach to an object
   */
  metadata?: Record<string, string>;

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
 * Output from the Stripe entitlements feature
 */
export interface EntitlementsFeature
  extends Resource<"stripe::EntitlementsFeature">,
    EntitlementsFeatureProps {
  /**
   * The ID of the feature
   */
  id: string;

  /**
   * String representing the object's type
   */
  object: "entitlements.feature";

  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;
}

/**
 * Create and manage Stripe entitlements features
 *
 * @example
 * // Create a basic feature for API access
 * const apiFeature = await EntitlementsFeature("api-access", {
 *   name: "API Access",
 *   lookupKey: "api_access_v1",
 *   metadata: {
 *     tier: "premium",
 *     category: "api"
 *   }
 * });
 *
 * @example
 * // Create a feature for advanced analytics
 * const analyticsFeature = await EntitlementsFeature("advanced-analytics", {
 *   name: "Advanced Analytics",
 *   lookupKey: "analytics_advanced",
 *   metadata: {
 *     tier: "enterprise",
 *     category: "analytics"
 *   }
 * });
 *
 * @example
 * // Create a feature for custom integrations
 * const integrationsFeature = await EntitlementsFeature("custom-integrations", {
 *   name: "Custom Integrations",
 *   lookupKey: "integrations_custom",
 *   metadata: {
 *     tier: "enterprise",
 *     category: "integrations",
 *     limit: "unlimited"
 *   }
 * });
 */
export const EntitlementsFeature = Resource(
  "stripe::EntitlementsFeature",
  async function (
    this: Context<EntitlementsFeature>,
    _id: string,
    props: EntitlementsFeatureProps,
  ): Promise<EntitlementsFeature> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      return this.destroy();
    }

    try {
      let feature: Stripe.Entitlements.Feature;

      if (this.phase === "update" && this.output?.id) {
        const updateParams: any = {
          name: props.name,
          metadata: props.metadata,
        };
        feature = await stripe.entitlements.features.update(
          this.output.id,
          updateParams,
        );
      } else {
        const createParams: any = {
          name: props.name,
          metadata: props.metadata,
        };
        if (props.lookupKey) {
          createParams.lookup_key = props.lookupKey;
        }
        try {
          feature = await stripe.entitlements.features.create(createParams);
        } catch (error) {
          if (isStripeConflictError(error) && props.adopt) {
            const existingFeatures = await stripe.entitlements.features.list({
              lookup_key: props.lookupKey,
              limit: 1,
            });
            if (existingFeatures.data.length > 0) {
              const existingFeature = existingFeatures.data[0];
              const updateParams: Stripe.Entitlements.FeatureUpdateParams = {
                name: props.name,
                metadata: props.metadata,
              };
              feature = await stripe.entitlements.features.update(
                existingFeature.id,
                updateParams,
              );
            } else {
              throw error;
            }
          } else {
            throw error;
          }
        }
      }

      return this({
        id: feature.id,
        object: feature.object,
        name: feature.name,
        lookupKey: feature.lookup_key || undefined,
        metadata: feature.metadata || undefined,
        livemode: feature.livemode,
      });
    } catch (error) {
      logger.error("Error creating/updating entitlements feature:", error);
      throw error;
    }
  },
);

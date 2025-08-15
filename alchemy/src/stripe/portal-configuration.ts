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
 * Business profile information for the portal
 */
export interface PortalConfigurationBusinessProfile {
  /**
   * The messaging shown to customers in the portal
   */
  headline?: string;
  /**
   * A link to the business's publicly available privacy policy
   */
  privacyPolicyUrl?: string;
  /**
   * A link to the business's publicly available terms of service
   */
  termsOfServiceUrl?: string;
}

/**
 * Customer update feature configuration
 */
export interface PortalCustomerUpdateFeature {
  /**
   * The types of customer update that are supported
   */
  allowedUpdates?: Array<Stripe.BillingPortal.ConfigurationCreateParams.Features.CustomerUpdate.AllowedUpdate>;
  /**
   * Whether the feature is enabled
   */
  enabled?: boolean;
}

/**
 * Invoice history feature configuration
 */
export interface PortalInvoiceHistoryFeature {
  /**
   * Whether the feature is enabled
   */
  enabled?: boolean;
}

/**
 * Payment method update feature configuration
 */
export interface PortalPaymentMethodUpdateFeature {
  /**
   * Whether the feature is enabled
   */
  enabled?: boolean;
}

/**
 * Subscription cancellation reason configuration
 */
export interface PortalSubscriptionCancellationReason {
  /**
   * Whether the feature is enabled
   */
  enabled?: boolean;
  /**
   * Which cancellation reasons will be given as options to the customer
   */
  options?: Array<Stripe.BillingPortal.ConfigurationCreateParams.Features.SubscriptionCancel.CancellationReason.Option>;
}

/**
 * Subscription cancel feature configuration
 */
export interface PortalSubscriptionCancelFeature {
  /**
   * Cancellation reason configuration
   */
  cancellationReason?: PortalSubscriptionCancellationReason;
  /**
   * Whether the feature is enabled
   */
  enabled?: boolean;
  /**
   * Whether to cancel subscriptions immediately or at the end of the billing period
   */
  mode?: Stripe.BillingPortal.ConfigurationCreateParams.Features.SubscriptionCancel.Mode;
  /**
   * Whether to create prorations when canceling subscriptions
   */
  prorationBehavior?: Stripe.BillingPortal.ConfigurationCreateParams.Features.SubscriptionCancel.ProrationBehavior;
}

/**
 * Subscription pause feature configuration
 */
export interface PortalSubscriptionPauseFeature {
  /**
   * Whether the feature is enabled
   */
  enabled?: boolean;
}

/**
 * Subscription update product configuration
 */
export interface PortalSubscriptionUpdateProduct {
  product: string;
  prices?: string[];
}

/**
 * Subscription update feature configuration
 */
export interface PortalSubscriptionUpdateFeature {
  /**
   * The types of subscription updates that are supported for items
   */
  defaultAllowedUpdates?: Array<Stripe.BillingPortal.ConfigurationCreateParams.Features.SubscriptionUpdate.DefaultAllowedUpdate>;
  /**
   * Whether the feature is enabled
   */
  enabled?: boolean;
  /**
   * The list of products that support subscription updates
   */
  products?: Array<PortalSubscriptionUpdateProduct>;
  /**
   * Determines how to handle prorations resulting from subscription updates
   */
  prorationBehavior?: Stripe.BillingPortal.ConfigurationCreateParams.Features.SubscriptionUpdate.ProrationBehavior;
}

/**
 * Features available in the customer portal
 */
export interface PortalConfigurationFeatures {
  /**
   * Information about updating the customer details in the portal
   */
  customerUpdate?: PortalCustomerUpdateFeature;
  /**
   * Information about showing the billing history in the portal
   */
  invoiceHistory?: PortalInvoiceHistoryFeature;
  /**
   * Information about updating payment methods in the portal
   */
  paymentMethodUpdate?: PortalPaymentMethodUpdateFeature;
  /**
   * Information about canceling subscriptions in the portal
   */
  subscriptionCancel?: PortalSubscriptionCancelFeature;
  /**
   * Information about pausing subscriptions in the portal
   */
  subscriptionPause?: PortalSubscriptionPauseFeature;
  /**
   * Information about updating subscriptions in the portal
   */
  subscriptionUpdate?: PortalSubscriptionUpdateFeature;
}

/**
 * Properties for creating a Stripe portal configuration
 */
export interface PortalConfigurationProps {
  /**
   * The business information shown to customers in the portal
   */
  businessProfile?: PortalConfigurationBusinessProfile;
  /**
   * The default URL to redirect customers to when they click on the portal's link to return to your website
   */
  defaultReturnUrl?: string;
  /**
   * Information about the features available in the portal
   */
  features?: PortalConfigurationFeatures;
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
 * Output from the Stripe portal configuration
 */
export interface PortalConfiguration
  extends Resource<"stripe::PortalConfiguration">,
    PortalConfigurationProps {
  /**
   * The ID of the configuration
   */
  id: string;
  /**
   * String representing the object's type
   */
  object: "billing_portal.configuration";
  /**
   * Whether the configuration is active and can be used to create portal sessions
   */
  active: boolean;
  /**
   * ID of the Connect Application that created the configuration
   */
  application?: string;
  /**
   * Time at which the object was created
   */
  created: number;
  /**
   * Whether the configuration is the default
   */
  isDefault: boolean;
  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;
  /**
   * Time at which the object was last updated
   */
  updated: number;
}

/**
 * Create and manage Stripe customer portal configurations
 *
 * @example
 * // Create a basic portal configuration
 * const basicPortal = await PortalConfiguration("basic-portal", {
 *   businessProfile: {
 *     headline: "Manage your subscription",
 *     privacyPolicyUrl: "https://example.com/privacy",
 *     termsOfServiceUrl: "https://example.com/terms"
 *   },
 *   features: {
 *     invoiceHistory: { enabled: true },
 *     paymentMethodUpdate: { enabled: true }
 *   }
 * });
 *
 * @example
 * // Create a portal with subscription management
 * const subscriptionPortal = await PortalConfiguration("subscription-portal", {
 *   defaultReturnUrl: "https://example.com/account",
 *   features: {
 *     subscriptionCancel: {
 *       enabled: true,
 *       mode: "at_period_end",
 *       prorationBehavior: "none"
 *     },
 *     subscriptionUpdate: {
 *       enabled: true,
 *       defaultAllowedUpdates: ["price", "quantity"],
 *       prorationBehavior: "create_prorations"
 *     }
 *   }
 * });
 *
 * @example
 * // Create a comprehensive portal configuration
 * const fullPortal = await PortalConfiguration("full-portal", {
 *   businessProfile: {
 *     headline: "Manage your Acme Corp subscription",
 *     privacyPolicyUrl: "https://acme.com/privacy",
 *     termsOfServiceUrl: "https://acme.com/terms"
 *   },
 *   defaultReturnUrl: "https://acme.com/dashboard",
 *   features: {
 *     customerUpdate: {
 *       enabled: true,
 *       allowedUpdates: ["email", "address", "shipping", "phone", "tax_id"]
 *     },
 *     invoiceHistory: { enabled: true },
 *     paymentMethodUpdate: { enabled: true },
 *     subscriptionCancel: {
 *       enabled: true,
 *       mode: "immediately",
 *       cancellationReason: {
 *         enabled: true,
 *         options: ["too_expensive", "missing_features", "switched_service"]
 *       }
 *     }
 *   },
 *   metadata: {
 *     environment: "production",
 *     version: "v2"
 *   }
 * });
 */
export const PortalConfiguration = Resource(
  "stripe::PortalConfiguration",
  async function (
    this: Context<PortalConfiguration>,
    _id: string,
    props: PortalConfigurationProps,
  ): Promise<PortalConfiguration> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          const existingConfig =
            await stripe.billingPortal.configurations.retrieve(this.output.id);
          if (!existingConfig.is_default) {
            await stripe.billingPortal.configurations.update(this.output.id, {
              active: false,
            });
          }
        }
      } catch (error) {
        handleStripeDeleteError(error, "PortalConfiguration", this.output?.id);
      }
      return this.destroy();
    }

    try {
      let configuration: Stripe.BillingPortal.Configuration;

      if (this.phase === "update" && this.output?.id) {
        const updateParams: Stripe.BillingPortal.ConfigurationUpdateParams = {
          business_profile: props.businessProfile
            ? {
                headline: props.businessProfile.headline,
                privacy_policy_url: props.businessProfile.privacyPolicyUrl,
                terms_of_service_url: props.businessProfile.termsOfServiceUrl,
              }
            : undefined,
          default_return_url: props.defaultReturnUrl,
          metadata: props.metadata,
        };

        if (props.features) {
          updateParams.features = {
            customer_update: props.features.customerUpdate
              ? {
                  allowed_updates:
                    props.features.customerUpdate.allowedUpdates || [],
                  enabled: props.features.customerUpdate.enabled || false,
                }
              : { enabled: false },
            invoice_history: props.features.invoiceHistory
              ? {
                  enabled: props.features.invoiceHistory.enabled || false,
                }
              : undefined,
            payment_method_update: props.features.paymentMethodUpdate
              ? {
                  enabled: props.features.paymentMethodUpdate.enabled || false,
                }
              : undefined,
            subscription_cancel: props.features.subscriptionCancel
              ? {
                  cancellation_reason: props.features.subscriptionCancel
                    .cancellationReason
                    ? {
                        enabled:
                          props.features.subscriptionCancel.cancellationReason
                            .enabled || false,
                        options:
                          props.features.subscriptionCancel.cancellationReason
                            .options || [],
                      }
                    : undefined,
                  enabled: props.features.subscriptionCancel.enabled || false,
                  mode: props.features.subscriptionCancel.mode || "immediately",
                  proration_behavior:
                    props.features.subscriptionCancel.prorationBehavior ||
                    "none",
                }
              : undefined,

            subscription_update: props.features.subscriptionUpdate
              ? {
                  default_allowed_updates:
                    props.features.subscriptionUpdate.defaultAllowedUpdates ||
                    [],
                  enabled: props.features.subscriptionUpdate.enabled || false,
                  products:
                    props.features.subscriptionUpdate.products?.map((p) => ({
                      product: p.product,
                      prices: p.prices || [],
                    })) || [],
                  proration_behavior:
                    props.features.subscriptionUpdate.prorationBehavior ||
                    "none",
                }
              : undefined,
          };
        }

        configuration = await stripe.billingPortal.configurations.update(
          this.output.id,
          updateParams,
        );
      } else {
        const createParams: Stripe.BillingPortal.ConfigurationCreateParams = {
          business_profile: props.businessProfile
            ? {
                headline: props.businessProfile.headline,
                privacy_policy_url: props.businessProfile.privacyPolicyUrl,
                terms_of_service_url: props.businessProfile.termsOfServiceUrl,
              }
            : undefined,
          default_return_url: props.defaultReturnUrl,
          metadata: props.metadata,
          features: {
            customer_update: { enabled: false },
            invoice_history: { enabled: true },
            payment_method_update: { enabled: true },
            subscription_cancel: { enabled: true },

            subscription_update: {
              enabled: false,
              default_allowed_updates: [],
              products: [],
              proration_behavior: "none",
            },
          },
        };

        if (props.features) {
          createParams.features = {
            customer_update: props.features.customerUpdate
              ? {
                  allowed_updates:
                    props.features.customerUpdate.allowedUpdates || [],
                  enabled: props.features.customerUpdate.enabled || false,
                }
              : { enabled: false },
            invoice_history: props.features.invoiceHistory
              ? {
                  enabled: props.features.invoiceHistory.enabled || false,
                }
              : undefined,
            payment_method_update: props.features.paymentMethodUpdate
              ? {
                  enabled: props.features.paymentMethodUpdate.enabled || false,
                }
              : undefined,
            subscription_cancel: props.features.subscriptionCancel
              ? {
                  cancellation_reason: props.features.subscriptionCancel
                    .cancellationReason
                    ? {
                        enabled:
                          props.features.subscriptionCancel.cancellationReason
                            .enabled || false,
                        options:
                          props.features.subscriptionCancel.cancellationReason
                            .options || [],
                      }
                    : undefined,
                  enabled: props.features.subscriptionCancel.enabled || false,
                  mode: props.features.subscriptionCancel.mode || "immediately",
                  proration_behavior:
                    props.features.subscriptionCancel.prorationBehavior ||
                    "none",
                }
              : undefined,

            subscription_update: props.features.subscriptionUpdate
              ? {
                  default_allowed_updates:
                    props.features.subscriptionUpdate.defaultAllowedUpdates ||
                    [],
                  enabled: props.features.subscriptionUpdate.enabled || false,
                  products:
                    props.features.subscriptionUpdate.products?.map((p) => ({
                      product: p.product,
                      prices: p.prices || [],
                    })) || [],
                  proration_behavior:
                    props.features.subscriptionUpdate.prorationBehavior ||
                    "none",
                }
              : undefined,
          };
        }

        try {
          configuration =
            await stripe.billingPortal.configurations.create(createParams);
        } catch (error) {
          if (isStripeConflictError(error) && props.adopt) {
            throw new Error(
              "PortalConfiguration adoption is not supported - portal configurations cannot be uniquely identified for adoption",
            );
          } else {
            throw error;
          }
        }
      }

      return this({
        id: configuration.id,
        object: configuration.object,
        active: configuration.active,
        application:
          typeof configuration.application === "string"
            ? configuration.application
            : undefined,
        businessProfile: configuration.business_profile
          ? {
              headline: configuration.business_profile.headline || undefined,
              privacyPolicyUrl:
                configuration.business_profile.privacy_policy_url || undefined,
              termsOfServiceUrl:
                configuration.business_profile.terms_of_service_url ||
                undefined,
            }
          : undefined,
        created: configuration.created,
        defaultReturnUrl: configuration.default_return_url || undefined,
        features: {
          customerUpdate: configuration.features.customer_update
            ? {
                allowedUpdates:
                  configuration.features.customer_update.allowed_updates ||
                  undefined,
                enabled:
                  configuration.features.customer_update.enabled || undefined,
              }
            : undefined,
          invoiceHistory: configuration.features.invoice_history
            ? {
                enabled:
                  configuration.features.invoice_history.enabled || undefined,
              }
            : undefined,
          paymentMethodUpdate: configuration.features.payment_method_update
            ? {
                enabled:
                  configuration.features.payment_method_update.enabled ||
                  undefined,
              }
            : undefined,
          subscriptionCancel: configuration.features.subscription_cancel
            ? {
                cancellationReason: configuration.features.subscription_cancel
                  .cancellation_reason
                  ? {
                      enabled:
                        configuration.features.subscription_cancel
                          .cancellation_reason.enabled || undefined,
                      options:
                        configuration.features.subscription_cancel
                          .cancellation_reason.options || undefined,
                    }
                  : undefined,
                enabled:
                  configuration.features.subscription_cancel.enabled ||
                  undefined,
                mode:
                  configuration.features.subscription_cancel.mode || undefined,
                prorationBehavior:
                  configuration.features.subscription_cancel
                    .proration_behavior || undefined,
              }
            : undefined,

          subscriptionUpdate: configuration.features.subscription_update
            ? {
                defaultAllowedUpdates:
                  configuration.features.subscription_update
                    .default_allowed_updates || undefined,
                enabled:
                  configuration.features.subscription_update.enabled ||
                  undefined,
                products:
                  configuration.features.subscription_update.products?.map(
                    (p) => ({
                      product: p.product,
                      prices: p.prices || undefined,
                    }),
                  ) || undefined,
                prorationBehavior:
                  configuration.features.subscription_update
                    .proration_behavior || undefined,
              }
            : undefined,
        },
        isDefault: configuration.is_default,
        livemode: configuration.livemode,
        metadata: configuration.metadata || undefined,
        updated: configuration.updated,
      });
    } catch (error) {
      logger.error("Error creating/updating portal configuration:", error);
      throw error;
    }
  },
);

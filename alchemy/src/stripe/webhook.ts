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

export type EnabledEvent = Stripe.WebhookEndpointUpdateParams.EnabledEvent;

/**
 * Properties for creating a Stripe webhook endpoint
 */
export interface WebhookEndpointProps {
  /**
   * The URL of the webhook endpoint
   */
  url: string;

  /**
   * The list of events to enable for this endpoint
   */
  enabledEvents: EnabledEvent[];

  /**
   * Description of the webhook
   */
  description?: string;

  /**
   * Whether the webhook is active
   */
  active?: boolean;

  /**
   * The API version events are rendered as for this webhook
   */
  apiVersion?: string;

  /**
   * Whether to include mounted endpoint events automatically
   */
  connect?: boolean;

  /**
   * Webhook endpoint metadata
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
 * Output from the Stripe webhook endpoint
 */
export interface WebhookEndpoint
  extends Resource<"stripe::WebhookEndpoint">,
    WebhookEndpointProps {
  /**
   * The ID of the webhook
   */
  id: string;

  /**
   * The webhook endpoint's secret key, used to verify signatures on received events
   */
  secret: string;

  /**
   * The webhook endpoint's application
   */
  application?: string;

  /**
   * Time at which the object was created
   */
  createdAt: number;

  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;

  /**
   * Time at which the object was last updated
   */
  updatedAt: number;

  /**
   * The status of the webhook
   */
  status: string;
}

/**
 * Create and manage Stripe webhook endpoints
 *
 * @example
 * // Create a basic webhook for payment events
 * const paymentWebhook = await WebhookEndpoint("payment-webhook", {
 *   url: "https://api.example.com/stripe/payments",
 *   enabledEvents: [
 *     "payment_intent.succeeded",
 *     "payment_intent.payment_failed"
 *   ],
 *   description: "Webhook for payment notifications"
 * });
 *
 * @example
 * // Create a webhook for subscription management
 * const subscriptionWebhook = await WebhookEndpoint("subscription-webhook", {
 *   url: "https://api.example.com/stripe/subscriptions",
 *   enabledEvents: [
 *     "customer.subscription.created",
 *     "customer.subscription.updated",
 *     "customer.subscription.deleted",
 *     "invoice.payment_succeeded",
 *     "invoice.payment_failed"
 *   ],
 *   description: "Webhook for subscription lifecycle events"
 * });
 *
 * @example
 * // Create a webhook for Connect platform events
 * const connectWebhook = await WebhookEndpoint("connect-webhook", {
 *   url: "https://api.example.com/stripe/connect",
 *   enabledEvents: [
 *     "account.updated",
 *     "account.application.deauthorized",
 *     "payout.created",
 *     "payout.failed"
 *   ],
 *   connect: true,
 *   metadata: {
 *     platform: "connect",
 *     environment: "production"
 *   }
 * });
 */
export const WebhookEndpoint = Resource(
  "stripe::WebhookEndpoint",
  async function (
    this: Context<WebhookEndpoint>,
    _id: string,
    props: WebhookEndpointProps,
  ) {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        // Get the webhook ID from the stored output
        if (this.phase === "delete" && this.output?.id) {
          await stripe.webhookEndpoints.del(this.output.id);
        }
      } catch (error) {
        handleStripeDeleteError(error, "WebhookEndpoint", this.output?.id);
      }

      return this.destroy();
    }
    try {
      let webhook: Stripe.WebhookEndpoint;

      if (this.phase === "update" && this.output?.id) {
        // Update existing webhook
        const updateParams = {
          url: props.url,
          enabled_events: props.enabledEvents,
          description: props.description,
          disabled: props.active === false,
          metadata: props.metadata,
        };
        webhook = await stripe.webhookEndpoints.update(
          this.output.id,
          updateParams,
        );
      } else {
        // Create new webhook
        const createParams = {
          url: props.url,
          enabled_events: props.enabledEvents,
          description: props.description,
          metadata: props.metadata,
        };
        try {
          try {
            webhook = await stripe.webhookEndpoints.create(createParams);
          } catch (error) {
            if (isStripeConflictError(error) && props.adopt) {
              const existingWebhooks = await stripe.webhookEndpoints.list({
                limit: 100,
              });
              const existingWebhook = existingWebhooks.data.find(
                (w) => w.url === props.url,
              );
              if (existingWebhook) {
                const updateParams: Stripe.WebhookEndpointUpdateParams = {
                  url: props.url,
                  enabled_events: props.enabledEvents as any,
                  description: props.description,
                  metadata: props.metadata,
                };
                webhook = await stripe.webhookEndpoints.update(
                  existingWebhook.id,
                  updateParams,
                );
              } else {
                throw error;
              }
            } else {
              throw error;
            }
          }
        } catch (error) {
          if (isStripeConflictError(error) && props.adopt) {
            const existingWebhooks = await stripe.webhookEndpoints.list({
              limit: 100,
            });
            const existingWebhook = existingWebhooks.data.find(
              (w) => w.url === props.url,
            );
            if (existingWebhook) {
              const updateParams: Stripe.WebhookEndpointUpdateParams = {
                url: props.url,
                enabled_events: props.enabledEvents as any,
                description: props.description,
                metadata: props.metadata,
              };
              webhook = await stripe.webhookEndpoints.update(
                existingWebhook.id,
                updateParams,
              );
            } else {
              throw error;
            }
          } else {
            throw error;
          }
        }

        // For connect parameter, need to handle it separately if it exists
        if (props.connect !== undefined) {
          // Note: connect is specified at creation time and cannot be updated
          logger.log(
            "Note: 'connect' parameter will be applied at creation time only",
          );
        }
      }

      // Store the secret if available
      let secret = "";
      if (webhook.secret) {
        secret = webhook.secret;
      } else if (this.phase === "update" && this.output?.secret) {
        secret = this.output.secret;
      }

      return this({
        id: webhook.id,
        url: webhook.url,
        enabledEvents: webhook.enabled_events as EnabledEvent[],
        description: webhook.description || undefined,
        active: webhook.status === "enabled",
        apiVersion: webhook.api_version || undefined,
        // connect: !!webhook.connect,
        metadata: webhook.metadata || undefined,
        secret: secret,
        application: webhook.application || undefined,
        createdAt: webhook.created,
        livemode: webhook.livemode,
        updatedAt: webhook.created, // Using created timestamp as updated
        status: webhook.status,
      });
    } catch (error) {
      logger.error("Error creating/updating webhook:", error);
      throw error;
    }
  },
);

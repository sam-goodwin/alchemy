import Stripe from "stripe";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";

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
    // Get Stripe API key from context or environment
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }

    // Initialize Stripe client
    const stripe = new Stripe(apiKey);

    if (this.phase === "delete") {
      try {
        // Get the webhook ID from the stored output
        if (this.phase === "delete" && this.output?.id) {
          await stripe.webhookEndpoints.del(this.output.id);
        }
      } catch (error) {
        // Ignore if the webhook doesn't exist
        console.error("Error deleting webhook:", error);
      }

      return this.destroy();
    }
    try {
      let webhook: Stripe.WebhookEndpoint;

      if (this.phase === "update" && this.output?.id) {
        // Update existing webhook
        webhook = await stripe.webhookEndpoints.update(this.output.id, {
          url: props.url,
          enabled_events: props.enabledEvents,
          description: props.description,
          disabled: props.active === false,
          metadata: props.metadata,
        });
      } else {
        // Create new webhook
        webhook = await stripe.webhookEndpoints.create({
          url: props.url,
          enabled_events: props.enabledEvents,
          description: props.description,
          metadata: props.metadata,
        });

        // For connect parameter, need to handle it separately if it exists
        if (props.connect !== undefined) {
          // Note: connect is specified at creation time and cannot be updated
          console.log(
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
      console.error("Error creating/updating webhook:", error);
      throw error;
    }
  },
);

import Stripe from "stripe";
import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createStripeClient } from "../../src/stripe/client.ts";
import { WebhookEndpoint } from "../../src/stripe/webhook.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const stripeApiKey = import.meta.env.STRIPE_API_KEY;
if (!stripeApiKey) {
  throw new Error("STRIPE_API_KEY environment variable is required");
}

// Initialize a Stripe client for verification
const stripe = await createStripeClient({ apiKey: stripeApiKey });

describe("WebhookEndpoint Resource", () => {
  const testWebhookId = `${BRANCH_PREFIX}-webhook`;

  test("create, update, and delete webhook endpoint", async (scope) => {
    let webhook: WebhookEndpoint | undefined;

    try {
      // Create a test webhook endpoint
      webhook = await WebhookEndpoint(testWebhookId, {
        url: "https://example.com/alchemy-webhook",
        enabledEvents: [
          "checkout.session.completed",
          "customer.subscription.created",
        ],
        description: "Webhook for Alchemy tests",
      });

      expect(webhook.id).toBeTruthy();
      expect(webhook.secret).toBeTruthy();
      expect(webhook).toMatchObject({
        url: "https://example.com/alchemy-webhook",
        enabledEvents: [
          "checkout.session.completed",
          "customer.subscription.created",
        ],
        description: "Webhook for Alchemy tests",
      });

      // Verify with Stripe API
      const stripeWebhook = await stripe.webhookEndpoints.retrieve(webhook.id);
      expect(stripeWebhook).toMatchObject({
        url: "https://example.com/alchemy-webhook",
        enabled_events: [
          "checkout.session.completed",
          "customer.subscription.created",
        ],
        description: "Webhook for Alchemy tests",
      });

      // Update the webhook endpoint
      webhook = await WebhookEndpoint(testWebhookId, {
        url: "https://example.com/updated-alchemy-webhook",
        enabledEvents: [
          "checkout.session.completed",
          "customer.subscription.created",
          "invoice.payment_succeeded",
        ],
        description: "Updated webhook for Alchemy tests",
      });

      expect(webhook.id).toBeTruthy();
      expect(webhook).toMatchObject({
        url: "https://example.com/updated-alchemy-webhook",
        enabledEvents: [
          "checkout.session.completed",
          "customer.subscription.created",
          "invoice.payment_succeeded",
        ],
        description: "Updated webhook for Alchemy tests",
      });

      // Verify update with Stripe API
      const updatedStripeWebhook = await stripe.webhookEndpoints.retrieve(
        webhook.id,
      );
      expect(updatedStripeWebhook).toMatchObject({
        url: "https://example.com/updated-alchemy-webhook",
        enabled_events: [
          "checkout.session.completed",
          "customer.subscription.created",
          "invoice.payment_succeeded",
        ],
        description: "Updated webhook for Alchemy tests",
      });
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify webhook was deleted
      if (webhook?.id) {
        await assertWebhookDeleted(webhook.id);
      }
    }
  });

  test("create webhook with minimal events", async (scope) => {
    let webhook: WebhookEndpoint | undefined;

    try {
      // Create a webhook with minimal configuration
      webhook = await WebhookEndpoint(`${testWebhookId}-minimal`, {
        url: "https://example.com/minimal-webhook",
        enabledEvents: ["payment_intent.succeeded"],
      });

      expect(webhook.id).toBeTruthy();
      expect(webhook.secret).toBeTruthy();
      expect(webhook).toMatchObject({
        url: "https://example.com/minimal-webhook",
        enabledEvents: ["payment_intent.succeeded"],
      });

      // Verify with Stripe API
      const stripeWebhook = await stripe.webhookEndpoints.retrieve(webhook.id);
      expect(stripeWebhook).toMatchObject({
        url: "https://example.com/minimal-webhook",
        enabled_events: ["payment_intent.succeeded"],
      });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      if (webhook?.id) {
        await assertWebhookDeleted(webhook.id);
      }
    }
  });
});

// Helper function for verification
async function assertWebhookDeleted(webhookId: string) {
  try {
    await stripe.webhookEndpoints.retrieve(webhookId);
    throw new Error("Webhook still exists");
  } catch (error) {
    // Webhook should be deleted, so we expect a resource_missing error
    if (error instanceof Stripe.errors.StripeError) {
      expect(error.code).toBe("resource_missing");
    } else {
      throw error;
    }
  }
}

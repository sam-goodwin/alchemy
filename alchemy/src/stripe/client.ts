import Stripe from "stripe";
import type { Secret } from "../secret.ts";

export interface StripeClientOptions {
  apiKey?: Secret;
}

export function createStripeClient(options: StripeClientOptions = {}): Stripe {
  let apiKey: string;

  if (options.apiKey) {
    apiKey = options.apiKey.unencrypted;
  } else {
    const envApiKey = process.env.STRIPE_API_KEY;
    if (!envApiKey) {
      throw new Error(
        "Stripe API key is required. Provide it via the apiKey parameter or set the STRIPE_API_KEY environment variable.",
      );
    }
    apiKey = envApiKey;
  }

  return new Stripe(apiKey);
}

export function handleStripeDeleteError(
  error: any,
  resourceType: string,
  resourceId?: string,
): void {
  if (error?.code === "resource_missing" || error?.status === 404) {
    console.log(
      `${resourceType} ${resourceId || "unknown"} not found during deletion (already deleted)`,
    );
    return;
  }

  console.error(
    `Error deleting ${resourceType} ${resourceId || "unknown"}:`,
    error,
  );
  throw error;
}

import type Stripe from "stripe";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { importPeer } from "../util/peer.ts";
import { withExponentialBackoff } from "../util/retry.ts";

export interface StripeClientOptions {
  apiKey?: Secret | string;
}

export async function createStripeClient(
  options: StripeClientOptions = {},
): Promise<Stripe> {
  const { default: Stripe } = await importPeer(
    "stripe",
    import("stripe"),
    "Stripe resources",
  );
  let apiKey: string;

  if (options.apiKey) {
    apiKey =
      typeof options.apiKey === "string"
        ? options.apiKey
        : options.apiKey.unencrypted;
  } else {
    const envApiKey = process.env.STRIPE_API_KEY;
    if (!envApiKey) {
      throw new Error(
        "Stripe API key is required. Provide it via the apiKey parameter or set the STRIPE_API_KEY environment variable.",
      );
    }
    apiKey = envApiKey;
  }

  const stripe = new Stripe(apiKey);
  return createStripeProxy(stripe);
}

export function handleStripeDeleteError(
  error: any,
  resourceType: string,
  resourceId?: string,
): void {
  if (error?.code === "resource_missing" || error?.status === 404) {
    logger.log(
      `${resourceType} ${resourceId || "unknown"} not found during deletion (already deleted)`,
    );
    return;
  }

  logger.error(
    `Error deleting ${resourceType} ${resourceId || "unknown"}:`,
    error,
  );
  throw error;
}

export function isStripeConflictError(error: any): boolean {
  return error?.status === 409 || error?.statusCode === 409;
}

/**
 * Creates a proxy that wraps Stripe API calls with retry logic
 */
function createStripeProxy(stripe: Stripe): Stripe {
  // Cache for proxied resources to avoid creating new proxies for the same resource
  const resourceProxyCache = new Map<string, any>();

  return new Proxy(stripe, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      // If it's not a property we want to proxy, return as-is
      if (
        typeof prop !== "string" ||
        typeof value !== "object" ||
        value === null
      ) {
        return value;
      }

      // Check if this looks like a Stripe resource (has methods like create, retrieve, etc.)
      const hasStripeResourceMethods =
        value &&
        typeof value === "object" &&
        (typeof value.create === "function" ||
          typeof value.retrieve === "function" ||
          typeof value.list === "function" ||
          typeof value.update === "function" ||
          typeof value.del === "function");

      if (!hasStripeResourceMethods) {
        return value;
      }

      // Return cached proxy if it exists
      if (resourceProxyCache.has(prop)) {
        return resourceProxyCache.get(prop);
      }

      // Create a new proxy for this resource
      const resourceProxy = new Proxy(value, {
        get(resourceTarget, methodName, resourceReceiver) {
          const method = Reflect.get(
            resourceTarget,
            methodName,
            resourceReceiver,
          );

          // If it's not a function, return as-is
          if (typeof method !== "function") {
            return method;
          }

          // Wrap the method with retry logic
          return (...args: any[]) =>
            withStripeRetry(() => method.apply(resourceTarget, args));
        },
      });

      // Cache the proxy
      resourceProxyCache.set(prop, resourceProxy);
      return resourceProxy;
    },
  });
}

/**
 * Determines if a Stripe error should trigger a retry
 */
function isStripeRetryableError(error: any): boolean {
  return (
    error?.raw?.statusCode === 429 ||
    error?.code === "rate_limit" ||
    error?.type === "rate_limit_error"
  );
}

/**
 * Wraps a Stripe API operation with retry logic for rate limiting
 */
async function withStripeRetry<T>(
  operation: () => Promise<T>,
  maxAttempts = 5,
  initialDelayMs = 1000,
): Promise<T> {
  return withExponentialBackoff(
    operation,
    isStripeRetryableError,
    maxAttempts,
    initialDelayMs,
  );
}

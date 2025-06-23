import Cloudflare from "cloudflare";
import { alchemy } from "../alchemy.ts";
import type { Secret } from "../secret.ts";
import { getCloudflareAccounts, getUserEmailFromApiKey } from "./user.ts";

/**
 * Options for Cloudflare SDK client
 */
export interface CloudflareSdkOptions {
  /**
   * API Token to use (overrides CLOUDFLARE_API_TOKEN env var)
   */
  apiToken?: Secret;

  /**
   * API Key to use (overrides CLOUDFLARE_API_KEY env var)
   */
  apiKey?: Secret;

  /**
   * Email to use with API Key authentication
   * If not provided, will attempt to discover from Cloudflare API
   */
  email?: string;

  /**
   * Account ID to use (overrides CLOUDFLARE_ACCOUNT_ID env var)
   * If not provided, will be automatically retrieved from the Cloudflare API
   */
  accountId?: string;
}

/**
 * Creates a Cloudflare SDK client with automatic account ID discovery if not provided
 *
 * @param options SDK options
 * @returns Promise resolving to a configured Cloudflare SDK client and account ID
 */
export async function createCloudflareSDK(
  options: Partial<CloudflareSdkOptions> = {},
): Promise<{ client: Cloudflare; accountId: string }> {
  const apiKey =
    options.apiKey ??
    (process.env.CLOUDFLARE_API_KEY
      ? alchemy.secret(process.env.CLOUDFLARE_API_KEY)
      : undefined);
  const apiToken =
    options.apiToken ??
    (process.env.CLOUDFLARE_API_TOKEN
      ? alchemy.secret(process.env.CLOUDFLARE_API_TOKEN)
      : undefined);
  let email = options.email ?? process.env.CLOUDFLARE_EMAIL;
  if (apiKey && !email) {
    email = await getUserEmailFromApiKey(apiKey.unencrypted);
  }
  const accountId =
    options.accountId ??
    process.env.CLOUDFLARE_ACCOUNT_ID ??
    process.env.CF_ACCOUNT_ID ??
    (
      await getCloudflareAccounts({
        apiKey,
        apiToken,
        email,
      })
    )[0]?.id;
  if (accountId === undefined) {
    throw new Error(
      "Either accountId or CLOUDFLARE_ACCOUNT_ID must be provided",
    );
  }

  if (apiKey && apiToken) {
    throw new Error("'apiKey' and 'apiToken' cannot both be provided");
  } else if (apiKey && !email) {
    throw new Error("'email' must be provided if 'apiKey' is provided");
  }

  const client = new Cloudflare({
    apiToken: apiToken?.unencrypted,
    apiKey: apiKey?.unencrypted,
    email: email,
  });

  return { client, accountId };
}
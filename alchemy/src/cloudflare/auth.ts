import type { Secret } from "../secret.ts";
import { getRefreshedWranglerConfig } from "./auth-wrangler.ts";
/**
 * Authentication options for Cloudflare API
 */
export type CloudflareAuthOptions =
  | CloudflareApiKeyAuthOptions
  | CloudflareApiTokenAuthOptions;

export type CloudflareApiKeyAuthOptions = {
  /**
   * API Key to use with API Key
   */
  apiKey: Secret;
  /**
   * Email to use with API Key
   * If not provided, will attempt to discover from Cloudflare API
   */
  email: string;

  /**
   * API Token to use with API Key
   */
  apiToken?: undefined;
};

export function isCloudflareApiKeyAuthOptions(
  options: CloudflareAuthOptions | undefined,
): options is CloudflareApiKeyAuthOptions {
  return options !== undefined && options.apiKey !== undefined;
}

export type CloudflareApiTokenAuthOptions = {
  /**
   * API Token to use with API Key
   */
  apiToken?: Secret;

  /**
   * API Key to use with API Token
   */
  apiKey?: undefined;

  /**
   * Email to use with API Token
   */
  email?: undefined;
};

export function isCloudflareApiTokenAuthOptions(
  options: CloudflareAuthOptions | undefined,
): options is CloudflareApiTokenAuthOptions {
  return options !== undefined && options.apiToken !== undefined;
}

export async function getCloudflareAuthHeaders(
  options: CloudflareAuthOptions | undefined,
): Promise<Record<string, string>> {
  if (isCloudflareApiKeyAuthOptions(options)) {
    // Global API Key
    return {
      "X-Auth-Key": options.apiKey.unencrypted,
      "X-Auth-Email": options.email,
    };
  } else if (isCloudflareApiTokenAuthOptions(options)) {
    // API Token
    return {
      Authorization: `Bearer ${options.apiToken?.unencrypted}`,
    };
  }
  // Wrangler OAuth Token
  const wranglerConfig = await getRefreshedWranglerConfig();
  if (wranglerConfig.isOk() && wranglerConfig.value) {
    return {
      Authorization: `Bearer ${wranglerConfig.value.oauth_token}`,
    };
  } else if (wranglerConfig.isErr()) {
    throw new Error(
      `Cloudflare authentication failed: ${wranglerConfig.error.message}`,
    );
  }
  throw new Error(
    "Cloudflare authentication required. Did you forget to login with `wrangler login` or set CLOUDFLARE_API_TOKEN, CLOUDFLARE_API_KEY?",
  );
}

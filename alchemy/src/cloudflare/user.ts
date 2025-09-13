import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { memoize } from "../util/memoize.ts";
import { extractCloudflareResult } from "./api-response.ts";

export interface CloudflareAccount {
  name: string;
  id: string;
  type: "standard" | "zero_rating" | "full_control";
  settings: {
    enforce_twofactor: boolean;
    api_access_enabled: null;
    access_approval_expiry: null;
    abuse_contact_email: null;
  };
  legacy_flags: {
    enterprise_zone_quota: {
      maximum: number;
      current: number;
      available: number;
    };
  };
}

export interface CloudflareUserInfo {
  apiToken?: Secret;
  apiKey?: Secret;
  email: string;
  username: string;
  accounts: CloudflareAccount[];
  organizations: CloudflareOrganization[];
  tokenPermissions: string[] | undefined;
  first_name: string | null;
  last_name: string | null;
  telephone: string | null;
  country: string | null;
  zipcode: string | null;
  two_factor_authentication_enabled: boolean;
  two_factor_authentication_locked: boolean;
  has_pro_zones: boolean;
  has_business_zones: boolean;
  has_enterprise_zones: boolean;
  suspended: boolean;
  betas: string[];
}

export interface CloudflareOrganization {
  id: string;
  name: string;
  status: string;
  permissions: string[];
  roles: string[];
}

export const listCloudflareAccounts = memoize(
  async (headers: Record<string, string>): Promise<CloudflareAccount[]> => {
    return await extractCloudflareResult<CloudflareAccount[]>(
      "get accounts for authorized user",
      fetch("https://api.cloudflare.com/client/v4/accounts", {
        headers,
      }),
    );
  },
);

export const getCloudflareAccountId = memoize(
  async (headers: Record<string, string>): Promise<string> => {
    const accounts = await listCloudflareAccounts(headers);
    if (!accounts[0]) {
      throw new Error(
        "No accounts found for authorized user. Please make sure you're authenticated (see: https://alchemy.run/guides/cloudflare/) or explicitly set the Cloudflare Account ID (see: https://alchemy.run/guides/cloudflare/#account-id)",
      );
    }
    if (accounts.length > 1) {
      logger.warnOnce(
        [
          "Multiple Cloudflare accounts found for authorized user:",
          accounts.map((a, i) => `${i + 1}: ${a.name} (${a.id})`).join("\n"),
          "The first account will be used by default. To use a different account, explicitly set the Cloudflare Account ID (see: https://alchemy.run/guides/cloudflare/#account-id)",
        ].join("\n"),
      );
    }
    return accounts[0].id;
  },
);

export const getUserEmailFromApiKey = memoize(
  async (apiKey: string): Promise<string> => {
    const result = await extractCloudflareResult<{
      id: string;
      name: string;
      email: string;
    }>(
      "automatically discover email for API Key authentication",
      fetch("https://api.cloudflare.com/client/v4/user", {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Key": apiKey,
        },
      }),
    );
    return result.email;
  },
);

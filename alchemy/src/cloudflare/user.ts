import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { memoize } from "../util/memoize.ts";
import { CloudflareApiError } from "./api-error.ts";
import {
  getCloudflareAuthHeaders,
  type CloudflareAuthOptions,
} from "./auth.ts";

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

export const getCloudflareAccounts = memoize(
  async (options: CloudflareAuthOptions): Promise<CloudflareAccount[]> => {
    const headers = await getCloudflareAuthHeaders(options);
    const accounts = await fetch(
      "https://api.cloudflare.com/client/v4/accounts",
      {
        headers,
      },
    );
    if (accounts.ok) {
      return ((await accounts.json()) as any).result;
    } else {
      throw new CloudflareApiError(
        `Failed to get accounts for authorized user, please make sure you're authenticated (see: https://alchemy.run/guides/cloudflare/) or explicitly set the Cloudflare Account ID (see: https://alchemy.run/guides/cloudflare/#account-id)`,
        accounts,
      );
    }
  },
);

export const getUserEmailFromApiKey = memoize(
  async (apiKey: string): Promise<string> => {
    try {
      // Call the /user endpoint to get user information
      const response = await fetch(
        "https://api.cloudflare.com/client/v4/user",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Key": apiKey,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to get user information: ${response.status} ${response.statusText}`,
        );
      }

      const data = (await response.json()) as {
        success: boolean;
        result: {
          id: string;
          email: string;
          name: string;
          [key: string]: any;
        };
      };

      if (!data.success || !data.result || !data.result.email) {
        throw new Error("Cloudflare API did not return valid user information");
      }

      return data.result.email;
    } catch (error) {
      logger.error("Error retrieving email from Cloudflare API:", error);
      throw new Error(
        "Failed to automatically discover email for API Key authentication",
      );
    }
  },
);

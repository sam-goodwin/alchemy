import assert from "node:assert";
import { Credentials, Profile } from "../auth.ts";
import { singleFlight } from "../util/memoize.ts";
import { OAuthClient } from "../util/oauth-client.ts";

export namespace CloudflareAuth {
  export const client = new OAuthClient({
    clientId: "6d8c2255-0773-45f6-b376-2914632e6f91",
    redirectUri: "http://localhost:9976/auth/callback",
    endpoints: {
      authorize: "https://dash.cloudflare.com/oauth2/authorize",
      token: "https://dash.cloudflare.com/oauth2/token",
      revoke: "https://dash.cloudflare.com/oauth2/revoke",
    },
  });
  export const ALL_SCOPES = [
    "access:read",
    "access:write",
    "account:read",
    "agw:read",
    "agw:run",
    "ai:read",
    "ai:write",
    "aiaudit:read",
    "aiaudit:write",
    "aig:read",
    "aig:write",
    "auditlogs:read",
    "browser:read",
    "browser:write",
    "cfone:read",
    "cfone:write",
    "cloudchamber:write",
    "constellation:write",
    "containers:write",
    "d1:write",
    "dex:read",
    "dex:write",
    "dns_analytics:read",
    "dns_records:edit",
    "dns_records:read",
    "dns_settings:read",
    "firstpartytags:write",
    "lb:edit",
    "lb:read",
    "logpush:read",
    "logpush:write",
    "notification:read",
    "notification:write",
    "pages:read",
    "pages:write",
    "pipelines:read",
    "pipelines:setup",
    "pipelines:write",
    "query_cache:write",
    "queues:write",
    "r2_catalog:write",
    "radar:read",
    "rag:read",
    "rag:write",
    "secrets_store:read",
    "secrets_store:write",
    "sso-connector:read",
    "sso-connector:write",
    "ssl_certs:write",
    "teams:pii",
    "teams:read",
    "teams:secure_location",
    "teams:write",
    "url_scanner:read",
    "url_scanner:write",
    "user:read",
    "vectorize:write",
    "workers:write",
    "workers_builds:read",
    "workers_builds:write",
    "workers_kv:write",
    "workers_observability:read",
    "workers_observability:write",
    "workers_observability_telemetry:write",
    "workers_routes:write",
    "workers_scripts:write",
    "workers_tail:read",
    "zone:read",
    "offline_access",
  ];

  /**
   * Format Cloudflare credentials as headers, refreshing OAuth credentials if expired.
   * Uses `singleFlight` to avoid making multiple concurrent requests to refresh credentials.
   * If the credentials are OAuth, the `profile` is required so we can read and write the updated credentials.
   */
  export const formatHeadersWithRefresh = singleFlight(
    async (input: {
      profile: string | undefined;
      credentials: Credentials;
    }) => {
      // if the credentials are not expired, return them as is
      if (!Credentials.isOAuthExpired(input.credentials)) {
        return formatHeaders(input.credentials);
      }
      assert(input.profile, "Profile is required");
      // reload profile in case credentials have already been refreshed
      const profile = await Profile.get({
        provider: "cloudflare",
        profile: input.profile,
      });
      assert(profile, `Cloudflare profile "${input.profile}" not found`);
      if (Credentials.isOAuthExpired(profile.credentials)) {
        // refresh credentials and save
        profile.credentials = await client.refresh(profile.credentials);
        await Profile.set(
          { provider: "cloudflare", profile: input.profile },
          profile,
        );
      }
      return formatHeaders(profile.credentials);
    },
  );

  /**
   * Format Cloudflare credentials as headers.
   */
  export const formatHeaders = (
    credentials: Credentials,
  ): Record<string, string> => {
    switch (credentials.type) {
      case "api-key":
        return {
          "X-Auth-Key": credentials.apiKey,
          "X-Auth-Email": credentials.apiEmail,
        };
      case "api-token":
        return { Authorization: `Bearer ${credentials.apiToken}` };
      case "oauth":
        return { Authorization: `Bearer ${credentials.access}` };
    }
  };
}

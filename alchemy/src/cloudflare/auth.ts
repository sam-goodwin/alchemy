import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import open from "open";
import type { Secret } from "../secret.ts";
import { HTTPServer } from "../util/http-server.ts";
import { logger } from "../util/logger.ts";
import { memoize } from "../util/memoize.ts";
import { createXdgAppPaths } from "../util/xdg-paths.ts";

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
  const authConfig = await getRefreshedAuthConfig().catch(() => null);
  if (authConfig?.oauth_token) {
    return {
      Authorization: `Bearer ${authConfig.oauth_token}`,
    };
  } else {
    throw new Error(
      "Cloudflare authentication required. Did you forget to login with `wrangler login` or set CLOUDFLARE_API_TOKEN, CLOUDFLARE_API_KEY?",
    );
  }
}

const isInteractive = () => {
  return process.stdin.isTTY && process.stdout.isTTY && !process.env.CI;
};

const getRefreshedAuthConfig = memoize(
  async () => {
    const filePath = await resolveWranglerConfigFile();
    const { config, write } = await readWranglerConfig(filePath)
      .then(async (config) => {
        if (config.expiration_time.getTime() > Date.now() + 1000 * 10) {
          return { write: false, config };
        }
        const refreshed = await oauth.refresh(config.refresh_token);
        return { write: true, config: refreshed };
      })
      .catch(async (error) => {
        if (isInteractive()) {
          const authConfig = await oauth.authorize();
          return { write: true, config: authConfig };
        } else {
          throw error;
        }
      });
    if (write) {
      await writeWranglerConfig(filePath, config).catch(() => null);
    }
    return config;
  },
  () => "cloudflare:wrangler-oauth",
);

interface WranglerConfig {
  oauth_token: string;
  refresh_token: string;
  expiration_time: Date;
  scopes: string[];
}

async function resolveWranglerConfigFile() {
  const configDir = createXdgAppPaths(".wrangler").config();
  const legacyConfigDir = path.join(os.homedir(), ".wrangler");
  const filePath = path.join("config", "default.toml");
  const isDirectory = await fs
    .stat(legacyConfigDir)
    .then((stat) => stat.isDirectory())
    .catch(() => false);
  return path.join(isDirectory ? legacyConfigDir : configDir, filePath);
}

async function readWranglerConfig(path: string): Promise<WranglerConfig> {
  const toml = await import("@iarna/toml");
  const text = await fs.readFile(path, "utf-8");
  const data = toml.parse(text.replace(/\r\n/g, "\n"));
  if (
    typeof data.oauth_token !== "string" ||
    typeof data.refresh_token !== "string" ||
    !Array.isArray(data.scopes)
  ) {
    throw new Error("Invalid wrangler config");
  }
  return {
    oauth_token: data.oauth_token,
    refresh_token: data.refresh_token,
    expiration_time: new Date(data.expiration_time as any),
    scopes: data.scopes as string[],
  };
}

async function writeWranglerConfig(filePath: string, config: WranglerConfig) {
  const toml = await import("@iarna/toml");
  await fs.mkdir(path.dirname(filePath), { recursive: true }).catch(() => null);
  await fs.writeFile(
    filePath,
    toml.stringify({ ...config, scopes: config.scopes }),
  );
}

const DefaultScopes = {
  "account:read":
    "See your account info such as account details, analytics, and memberships.",
  "user:read":
    "See your user info such as name, email address, and account memberships.",
  "workers:write":
    "See and change Cloudflare Workers data such as zones, KV storage, namespaces, scripts, and routes.",
  "workers_kv:write":
    "See and change Cloudflare Workers KV Storage data such as keys and namespaces.",
  "workers_routes:write":
    "See and change Cloudflare Workers data such as filters and routes.",
  "workers_scripts:write":
    "See and change Cloudflare Workers scripts, durable objects, subdomains, triggers, and tail data.",
  "workers_tail:read": "See Cloudflare Workers tail and script data.",
  "d1:write": "See and change D1 Databases.",
  "pages:write":
    "See and change Cloudflare Pages projects, settings and deployments.",
  "zone:read": "Grants read level access to account zone.",
  "ssl_certs:write": "See and manage mTLS certificates for your account",
  "ai:write": "See and change Workers AI catalog and assets",
  "queues:write": "See and change Cloudflare Queues settings and data",
  "pipelines:write":
    "See and change Cloudflare Pipelines configurations and data",
  "secrets_store:write":
    "See and change secrets + stores within the Secrets Store",
  "containers:write": "Manage Workers Containers",
  "cloudchamber:write": "Manage Cloudchamber",
} as const;

const oauth = {
  CLIENT_ID: "54d11594-84e4-41aa-b438-e81b8fa78ee7",
  REDIRECT_URI: "http://localhost:8976/oauth/callback",
  SUCCESS_URI:
    "https://welcome.developers.workers.dev/wrangler-oauth-consent-granted",
  DENIED_URI:
    "https://welcome.developers.workers.dev/wrangler-oauth-consent-denied",

  async authorize() {
    const { promise, resolve, reject } =
      Promise.withResolvers<WranglerConfig>();
    const authorization = this.generateAuthorizationURL();
    const callback = new HTTPServer({
      port: 8976,
      fetch: async (req) => {
        const url = new URL(req.url);
        const error = url.searchParams.get("error");
        const error_description = url.searchParams.get("error_description");
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        if (error || error_description) {
          reject(
            new Error(
              `OAuth authorization failed: ${error} ${error_description}`,
            ),
          );
          return Response.redirect(this.DENIED_URI, 307);
        }
        if (!code) {
          reject(new Error("Missing code from OAuth callback"));
          return Response.redirect(this.DENIED_URI, 307);
        }
        if (!state || state !== authorization.state) {
          reject(new Error("Invalid state from OAuth callback"));
          return Response.redirect(this.DENIED_URI, 307);
        }
        try {
          const res = await oauth.exchange(code, authorization.verifier);
          resolve(res);
          return Response.redirect(this.SUCCESS_URI, 307);
        } catch (error) {
          reject(
            new Error("Failed to exchange code for token", { cause: error }),
          );
          return Response.redirect(this.DENIED_URI, 307);
        }
      },
    });
    logger.log(
      [
        "Opening browser to authorize with Cloudflare...",
        "If you are not automatically redirected, please open the following URL in your browser:",
        authorization.url,
      ].join("\n"),
    );
    open(authorization.url);
    const timeout = setTimeout(
      () => reject(new Error("OAuth authorization timed out")),
      1000 * 60 * 5,
    );
    return promise.finally(() => {
      clearTimeout(timeout);
      callback.stop();
    });
  },

  generateAuthorizationURL() {
    const state = crypto.randomBytes(32).toString("base64url");
    const verifier = crypto.randomBytes(96).toString("base64url");
    const challenge = crypto
      .createHash("sha256")
      .update(verifier)
      .digest("base64url");
    const scopes = [...Object.keys(DefaultScopes), "offline_access"];
    const url = new URL("https://dash.cloudflare.com/oauth2/auth");
    url.search = new URLSearchParams({
      response_type: "code",
      client_id: oauth.CLIENT_ID,
      redirect_uri: oauth.REDIRECT_URI,
      scope: scopes.join(" "),
      state,
      code_challenge: challenge,
      code_challenge_method: "S256",
    }).toString();
    return { url: url.toString(), state, verifier };
  },

  async exchange(code: string, verifier: string) {
    const body = new URLSearchParams({
      code,
      grant_type: "authorization_code",
      code_verifier: verifier,
      client_id: oauth.CLIENT_ID,
      redirect_uri: oauth.REDIRECT_URI,
    });
    const res = await fetch("https://dash.cloudflare.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });
    if (!res.ok) {
      throw new Error(
        `Failed to exchange code for token: ${res.status} ${res.statusText} - ${await res.text()}`,
      );
    }
    const tokens = (await res.json()) as OAuthTokens;
    return toWranglerConfig(tokens);
  },

  async refresh(refreshToken: string) {
    const res = await fetch("https://dash.cloudflare.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: oauth.CLIENT_ID,
      }).toString(),
    });
    if (!res.ok) {
      throw new Error(
        `Failed to refresh access token: ${res.status} ${res.statusText} - ${await res.text()}`,
      );
    }
    const tokens = (await res.json()) as OAuthTokens;
    return toWranglerConfig(tokens);
  },
};

function toWranglerConfig(tokens: OAuthTokens): WranglerConfig {
  return {
    oauth_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expiration_time: new Date(Date.now() + tokens.expires_in * 1000),
    scopes: tokens.scope.split(" "),
  };
}

// interface OAuthError {
//   error: string;
//   error_verbose: string;
//   error_description: string;
//   error_hint: string;
//   status_code: number;
// }

interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

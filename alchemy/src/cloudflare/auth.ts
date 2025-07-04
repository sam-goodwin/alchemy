import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Secret } from "../secret.ts";
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
  const authConfig = await getRefreshedAuthConfig();
  if (authConfig.oauth_token) {
    return {
      Authorization: `Bearer ${authConfig.oauth_token}`,
    };
  }
  throw new Error(
    "Cloudflare authentication required. Did you forget to login with `wrangler login` or set CLOUDFLARE_API_TOKEN, CLOUDFLARE_API_KEY?",
  );
}

async function refreshAuthToken(
  options: WranglerConfig,
): Promise<WranglerConfig> {
  const response = await fetch("https://dash.cloudflare.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: options.refresh_token!,
      client_id: "54d11594-84e4-41aa-b438-e81b8fa78ee7",
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to refresh auth token: ${response.status} ${response.statusText} ${await response.text()}`,
    );
  }

  const data: any = await response.json();
  if (!data.access_token) {
    throw new Error("Failed to refresh auth token - no access token returned");
  }

  options.oauth_token = data.access_token;
  options.refresh_token = data.refresh_token;
  options.expiration_time = new Date(
    Date.now() + data.expires_in * 1000,
  ).toISOString();
  options.scopes = data.scope?.split(" ") || [];

  return options;
}

interface WranglerConfig {
  path: string;
  oauth_token?: string;
  refresh_token?: string;
  expiration_time?: string;
  scopes?: string[];
  /** exists is `false` if the config file doesn't exist, like in CI */
  exists?: boolean;
  /** @deprecated - this field was only provided by the deprecated v1 `wrangler config` command. */
  api_token?: string;
}

async function getRefreshedAuthConfig(): Promise<WranglerConfig> {
  let authConfig = await readWranglerConfig();
  if (authConfig.expiration_time) {
    const expiry = new Date(authConfig.expiration_time);
    // if expiring in 10s
    if (expiry.getTime() < Date.now() + 10 * 1000) {
      authConfig = await refreshAuthToken(authConfig);
      authConfigCache[authConfig.path] = authConfig;
      await writeWranglerConfig(authConfig);
    }
  }
  return authConfig;
}

async function writeWranglerConfig(config: WranglerConfig) {
  if (config.exists === false) return;

  const TOML = await import("@iarna/toml");
  const configPath = await findWranglerConfig();
  config = {
    ...config,
  };
  // @ts-ignore - i put this here
  delete config.path;
  const toml = TOML.stringify(config as any);
  await fs.writeFile(configPath, toml);
}

// cache the file once per process
const authConfigCache: Record<string, WranglerConfig> = {};

async function readWranglerConfig(): Promise<WranglerConfig> {
  const configPath = await findWranglerConfig();
  try {
    const config = (authConfigCache[configPath] ??= await parseTOML(
      await fs.readFile(configPath, "utf-8"),
    ));
    config.path = configPath;

    return config;
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // The config doesn't exist
      return {
        path: configPath,
        exists: false,
      };
    }

    throw e;
  }
}

let wranglerConfigPath: string | undefined;

async function findWranglerConfig(): Promise<string> {
  if (wranglerConfigPath) {
    return wranglerConfigPath;
  }
  const environment = process.env.WRANGLER_API_ENVIRONMENT ?? "production";
  const filePath = path.join(
    "config",
    `${environment === "production" ? "default.toml" : `${environment}.toml`}`,
  );

  const xdgAppPaths = createXdgAppPaths(".wrangler");
  //TODO: We should implement a custom path --global-config and/or the WRANGLER_HOME type environment variable
  const configDir = xdgAppPaths.config(); // New XDG compliant config path
  const legacyConfigDir = path.join(os.homedir(), ".wrangler"); // Legacy config in user's home directory

  // Check for the .wrangler directory in root if it is not there then use the XDG compliant path.
  wranglerConfigPath = path.join(
    (await isDirectory(legacyConfigDir)) ? legacyConfigDir : configDir,
    filePath,
  );
  return wranglerConfigPath;
}

async function parseTOML(input: string): Promise<any> {
  const TOML = await import("@iarna/toml");
  try {
    // Normalize CRLF to LF to avoid hitting https://github.com/iarna/iarna-toml/issues/33.
    const normalizedInput = input.replace(/\r\n/g, "\n");
    return TOML.parse(normalizedInput);
  } catch (err: any) {
    const { name } = err;
    if (name !== "TomlError") {
      throw err;
    }
    throw new Error("TOML parse error");
  }
}

async function isDirectory(dir: string) {
  try {
    return (await fs.stat(dir)).isDirectory();
  } catch (_err) {
    return false;
  }
}

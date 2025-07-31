import kleur from "kleur";
import { err, ok, okAsync, ResultAsync } from "neverthrow";
import assert from "node:assert";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import open from "open";
import envPaths from "env-paths";
import { HTTPServer } from "../util/http.ts";
import { memoize } from "../util/memoize.ts";
import {
  detached,
  ensure,
  fetchJSON,
  HTTPError,
  singleFlight,
} from "../util/neverthrow.ts";

const CLIENT_ID = "54d11594-84e4-41aa-b438-e81b8fa78ee7";
const REDIRECT_URI = "http://localhost:8976/oauth/callback";
export const DEFAULT_SCOPES = [
  "account:read",
  "user:read",
  "workers:write",
  "workers_kv:write",
  "workers_routes:write",
  "workers_scripts:write",
  "workers_tail:read",
  "d1:write",
  "pages:write",
  "zone:read",
  "ssl_certs:write",
  "ai:write",
  "queues:write",
  "pipelines:write",
  "secrets_store:write",
  "containers:write",
  "cloudchamber:write",
];
const ALCHEMY_BASE_URL = "https://alchemy.run";

interface WranglerConfig {
  oauth_token: string;
  refresh_token: string;
  expiration_time: Date;
  scopes: string[];
}

let cached: WranglerConfig | undefined;

export const getRefreshedWranglerConfig = singleFlight(() =>
  readWranglerConfig()
    .andThen((config) => {
      if (config.expiration_time.getTime() > Date.now() + 10 * 1000) {
        return ok(config);
      }
      return fetchToken({
        grant_type: "refresh_token",
        refresh_token: config.refresh_token,
        client_id: CLIENT_ID,
      });
    })
    .orElse((error) => {
      if (isInteractive()) {
        return wranglerLogin();
      }
      return err(error);
    }),
);

const getWranglerConfigPath = memoize(async () => {
  const xdgConfigDir = envPaths("wrangler", { suffix: "" }).config;
  const legacyConfigDir = path.join(os.homedir(), ".wrangler");
  const configDir = (await fs
    .stat(legacyConfigDir)
    .then((stat) => stat.isDirectory())
    .catch(() => false))
    ? legacyConfigDir
    : xdgConfigDir;
  return path.join(configDir, "config", "default.toml");
});

const readWranglerConfig = () => {
  if (cached) {
    return okAsync(cached);
  }
  return ResultAsync.fromPromise(
    getWranglerConfigPath().then(async (path): Promise<WranglerConfig> => {
      const text = await fs.readFile(path, "utf-8");
      const toml = await import("@iarna/toml");
      const config = toml.parse(text.replace(/\r\n/g, "\n"));
      assert(typeof config.oauth_token === "string");
      assert(typeof config.refresh_token === "string");
      assert(!!config.expiration_time);
      assert(Array.isArray(config.scopes));
      return {
        oauth_token: config.oauth_token,
        refresh_token: config.refresh_token,
        expiration_time: new Date(config.expiration_time as any),
        scopes: config.scopes as string[],
      };
    }),
    () => new Error("Cloudflare credentials are missing or invalid."),
  );
};

const writeWranglerConfig = (config: WranglerConfig) => {
  cached = config;
  return ResultAsync.fromSafePromise(getWranglerConfigPath()).map(
    async (configPath) => {
      const toml = await import("@iarna/toml");
      await fs.mkdir(path.dirname(configPath), { recursive: true });
      await fs.writeFile(
        configPath,
        toml.stringify({
          oauth_token: config.oauth_token,
          refresh_token: config.refresh_token,
          expiration_time: config.expiration_time,
          scopes: config.scopes,
        }),
      );
    },
  );
};

export const wranglerLogin = (
  scopes: string[] = DEFAULT_SCOPES,
  log: (message: string) => void = console.log, // using console.log instead of logger.log to avoid bundling hell with CLI
) => {
  const challenge = generateAuthorizationURL(scopes);
  log(
    [
      "Opening browser to authorize with Cloudflare...",
      "",
      kleur.gray(
        "If you are not automatically redirected, please open the following URL in your browser:",
      ),
      challenge.url,
    ].join("\n"),
  );
  open(challenge.url);
  const { result, ok, err } = detached<WranglerConfig, OAuthError>();
  const renderResponse = async (type: "success" | "error") => {
    return Response.redirect(`${ALCHEMY_BASE_URL}/auth/${type}`);
  };
  const server = new HTTPServer({
    fetch: async (request) => {
      const url = new URL(request.url);
      if (url.pathname !== "/oauth/callback") {
        return new Response("Not found", { status: 404 });
      }
      const error = url.searchParams.get("error");
      const error_description = url.searchParams.get("error_description");
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      if (error) {
        err(
          new OAuthError({
            error,
            error_description: error_description ?? "Unknown error",
            status_code: 400,
          }),
        );
        return renderResponse("error");
      }
      if (!code || !state || state !== challenge.state) {
        err(
          new OAuthError({
            error: "invalid_request",
            error_description: "Invalid request",
            status_code: 400,
          }),
        );
        return renderResponse("error");
      }
      const tokens = await fetchToken({
        grant_type: "authorization_code",
        code,
        code_verifier: challenge.verifier,
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
      });
      if (tokens.isErr()) {
        err(tokens.error);
        return renderResponse("error");
      }
      ok(tokens.value);
      return renderResponse("success");
    },
  });
  server.listen(8976);
  const timeout = setTimeout(
    () => {
      err(
        new OAuthError({
          error: "timeout",
          error_description: "Authorization timed out after 5 minutes",
          status_code: 408,
        }),
      );
    },
    1000 * 60 * 5,
  );
  return ensure(result, () => {
    clearTimeout(timeout);
    void server.close();
  });
};

const generateAuthorizationURL = (scopes: string[]) => {
  const state = crypto.randomBytes(32).toString("base64url");
  const verifier = crypto.randomBytes(96).toString("base64url");
  const challenge = crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
  const url = new URL("https://dash.cloudflare.com/oauth2/auth");
  url.search = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: "http://localhost:8976/oauth/callback",
    scope: [...scopes, "offline_access"].join(" "),
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  }).toString();
  return { url: url.toString(), state, verifier };
};

interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

interface OAuthErrorParams {
  error: string;
  error_description: string;
  error_verbose?: string;
  error_hint?: string;
  status_code: number;
}

class OAuthError extends Error {
  constructor(params: OAuthErrorParams) {
    super(
      `Cloudflare authentication failed with error ${params.error} (${params.status_code}): ${params.error_description}`,
    );
  }
}

const fetchToken = (
  body:
    | {
        grant_type: "refresh_token";
        refresh_token: string;
        client_id: string;
      }
    | {
        grant_type: "authorization_code";
        code: string;
        code_verifier: string;
        client_id: string;
        redirect_uri: string;
      },
) => {
  return fetchJSON<OAuthTokens, OAuthErrorParams>(
    "https://dash.cloudflare.com/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(body),
    },
  )
    .map(
      (tokens): WranglerConfig => ({
        oauth_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiration_time: new Date(Date.now() + tokens.expires_in * 1000),
        scopes: tokens.scope.split(" "),
      }),
    )
    .mapErr((error) =>
      error instanceof HTTPError
        ? new OAuthError({
            error: "http_error",
            error_description: error.message,
            status_code: error.status,
          })
        : new OAuthError(error),
    )
    .andTee((config) => writeWranglerConfig(config));
};

const isInteractive = () => {
  return process.stdin.isTTY && process.stdout.isTTY && !process.env.CI;
};

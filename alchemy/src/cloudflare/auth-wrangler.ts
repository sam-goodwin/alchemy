import kleur from "kleur";
import { err, ok, ResultAsync } from "neverthrow";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import open from "open";
import { HTTPServer } from "../util/http-server.ts";
import { memoize, memoizeSync } from "../util/memoize.ts";
import { detached, ensure, singleFlight } from "../util/neverthrow.ts";
import { createXdgAppPaths } from "../util/xdg-paths.ts";

const CLIENT_ID = "54d11594-84e4-41aa-b438-e81b8fa78ee7";
const REDIRECT_URI = "http://localhost:8976/oauth/callback";
const ALCHEMY_BASE_URL =
  "https://3fbec61a-alchemy-website.alchemy-run.workers.dev"; // TODO: change to https://alchemy.run
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

interface WranglerConfig {
  oauth_token: string;
  refresh_token: string;
  expiration_time: Date;
  scopes: string[];
}

const getWranglerConfigPath = memoize(async () => {
  const xdgConfigDir = createXdgAppPaths(".wrangler").config();
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
  return ResultAsync.fromSafePromise(getWranglerConfigPath())
    .andThen((path) =>
      ResultAsync.fromPromise(
        fs.readFile(path, "utf-8").then(async (text) => {
          const toml = await import("@iarna/toml");
          return toml.parse(text.replace(/\r\n/g, "\n"));
        }),
        () => new Error("Failed to read Wrangler config."),
      ),
    )
    .andThen((config) => {
      if (
        typeof config.oauth_token !== "string" ||
        typeof config.refresh_token !== "string" ||
        !config.expiration_time ||
        !Array.isArray(config.scopes)
      ) {
        return err(new Error("Invalid Wrangler config."));
      }
      return ok({
        oauth_token: config.oauth_token,
        refresh_token: config.refresh_token,
        expiration_time: new Date(config.expiration_time as any),
        scopes: Array.from(config.scopes as string[]),
      } as WranglerConfig);
    });
};

const writeWranglerConfig = (config: WranglerConfig) => {
  return ResultAsync.fromSafePromise(getWranglerConfigPath()).map(
    async (configPath) => {
      const toml = await import("@iarna/toml");
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
  return ResultAsync.fromPromise(
    fetch("https://dash.cloudflare.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(body),
    }),
    () =>
      new OAuthError({
        error: "fetch_error",
        error_description: "Failed to fetch OAuth token.",
        status_code: 0,
      }),
  )
    .andThen((res) =>
      ResultAsync.fromPromise(
        res.json(),
        () =>
          new OAuthError({
            error: "invalid_response",
            error_description: "The server returned an invalid response.",
            status_code: res.status,
          }),
      ).andThen((json) =>
        res.ok ? ok(json as OAuthTokens) : err(new OAuthError(json as any)),
      ),
    )
    .map(
      (tokens): WranglerConfig => ({
        oauth_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiration_time: new Date(Date.now() + tokens.expires_in * 1000),
        scopes: tokens.scope.split(" "),
      }),
    )
    .andTee((config) => writeWranglerConfig(config));
};

interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

export const getRefreshedWranglerConfig = singleFlight(
  memoizeSync(
    () => {
      return readWranglerConfig()
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
          if (error instanceof OAuthError) {
            return err(error);
          }
          return ok(null);
        });
    },
    () => Math.floor(Date.now() / 5000).toString(),
  ),
);

const isInteractive = () => {
  return process.stdin.isTTY && process.stdout.isTTY && !process.env.CI;
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
    redirect_uri: REDIRECT_URI,
    scope: [...scopes, "offline_access"].join(" "),
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  }).toString();
  return { url: url.toString(), state, verifier };
};

class OAuthError extends Error {
  readonly error: string;
  readonly error_verbose?: string;
  readonly error_hint?: string;
  readonly status_code: number;
  constructor(params: {
    error: string;
    error_verbose?: string;
    error_description: string;
    error_hint?: string;
    status_code: number;
  }) {
    console.dir(params, { depth: null });
    super(params.error_description);
    this.error = params.error;
    this.error_verbose = params.error_verbose;
    this.error_hint = params.error_hint;
    this.status_code = params.status_code;
  }
}

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
  const server = new HTTPServer({
    port: 8976,
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
        return Response.redirect(`${ALCHEMY_BASE_URL}/auth/error`);
      }
      if (!code || !state || state !== challenge.state) {
        err(
          new OAuthError({
            error: "invalid_request",
            error_description: "Invalid request",
            status_code: 400,
          }),
        );
        return Response.redirect(`${ALCHEMY_BASE_URL}/auth/error`);
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
        return Response.redirect(`${ALCHEMY_BASE_URL}/auth/error`);
      }
      ok(tokens.value);
      return Response.redirect(`${ALCHEMY_BASE_URL}/auth/success`);
    },
  });
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
  return ensure(result, async () => {
    clearTimeout(timeout);
    await server.stop();
  });
};

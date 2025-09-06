import { err, ok, ResultAsync } from "neverthrow";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import open from "open";
import pc from "picocolors";
import { HTTPServer } from "../util/http.ts";
import {
  detached,
  ensure,
  fetchJSON,
  HTTPError,
  singleFlight,
} from "../util/neverthrow.ts";

const CLIENT_ID = "6d8c2255-0773-45f6-b376-2914632e6f91";
const REDIRECT_URI = new URL("http://localhost:9976/auth/callback");
const CREDENTIALS_PATH = path.join(
  os.homedir(),
  ".alchemy",
  "credentials",
  "cloudflare",
  "default.json", // TODO: allow multiple profiles
);
export const ALLOWED_SCOPES = new Set([
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
  // "images:read",
  // "images:write",
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
  "workers:read",
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
]);
export const DEFAULT_SCOPES = [...ALLOWED_SCOPES]; // requesting all scopes for testing

interface Credentials {
  access: string;
  refresh: string;
  expires: number;
  scopes: string[];
}

let cached: Credentials | undefined;

export const getRefreshedOAuthToken = singleFlight(() =>
  ResultAsync.fromPromise(
    readCredentials(),
    (cause) =>
      new Error("Cloudflare credentials are missing or invalid.", { cause }),
  )
    .andThen((credentials) => {
      if (credentials.expires > Date.now() + 10 * 1000) {
        return ok(credentials);
      }
      return fetchToken({
        grant_type: "refresh_token",
        refresh_token: credentials.refresh,
        client_id: CLIENT_ID,
      });
    })
    .orElse((error) => {
      if (isInteractive()) {
        return cloudflareLogin();
      }
      return err(error);
    }),
);

const readCredentials = async () => {
  if (cached) {
    return cached;
  }
  const text = await fs.readFile(CREDENTIALS_PATH, "utf-8");
  const credentials = JSON.parse(text) as Credentials;
  return credentials;
};

const writeCredentials = async (credentials: Credentials) => {
  cached = credentials;
  await fs.mkdir(path.dirname(CREDENTIALS_PATH), { recursive: true });
  await fs.writeFile(CREDENTIALS_PATH, JSON.stringify(credentials, null, 2));
  await fs.chmod(CREDENTIALS_PATH, 0o600);
};

export const cloudflareLogin = (
  scopes: string[] = DEFAULT_SCOPES,
  log: (message: string) => void = console.log, // using console.log instead of logger.log to avoid bundling hell with CLI
) => {
  const challenge = generateAuthorizationURL(scopes);
  log(
    [
      "Opening browser to authorize with Cloudflare...",
      "",
      pc.gray(
        "If you are not automatically redirected, please open the following URL in your browser:",
      ),
      challenge.url,
    ].join("\n"),
  );
  open(challenge.url);
  const { result, ok, err } = detached<Credentials, OAuthError>();
  const renderResponse = async (type: "success" | "error") => {
    return Response.redirect(`http://alchemy.run/auth/${type}`);
  };
  const server = new HTTPServer({
    fetch: async (request) => {
      const url = new URL(request.url);
      if (url.pathname !== REDIRECT_URI.pathname) {
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
        redirect_uri: REDIRECT_URI.toString(),
      });
      if (tokens.isErr()) {
        err(tokens.error);
        return renderResponse("error");
      }
      ok(tokens.value);
      return renderResponse("success");
    },
  });
  server.listen(Number(REDIRECT_URI.port));
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
    redirect_uri: REDIRECT_URI.toString(),
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
      (tokens): Credentials => ({
        access: tokens.access_token,
        refresh: tokens.refresh_token,
        expires: Date.now() + tokens.expires_in * 1000,
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
    .andTee((credentials) => writeCredentials(credentials));
};

const isInteractive = () => {
  return process.stdin.isTTY && process.stdout.isTTY && !process.env.CI;
};

import crypto from "node:crypto";
import type { Credentials } from "../auth.ts";
import { DeferredPromise } from "./deferred-promise.ts";
import { HTTPServer } from "./http.ts";

export class OAuthError extends Error {
  readonly error: string;
  constructor({
    error,
    error_description,
    ...rest
  }: OAuthClient.ErrorResponse) {
    super(error_description);
    this.error = error;
    this.name = "OAuthError";
    Object.assign(this, rest);
  }
}

/**
 * Generic OAuth 2.0 client.
 *
 * Currently only handles the subset required for Cloudflare, but can be modified easily:
 * - authorization and refresh code flow
 * - S256 code challenge
 * - no client secret
 */
export class OAuthClient {
  constructor(
    private readonly options: {
      clientId: string;
      redirectUri: string;
      endpoints: {
        authorize: string;
        token: string;
        revoke: string;
      };
    },
  ) {}

  /**
   * Generate an authorization URL, state, and verifier for the given scopes.
   */
  authorize(scopes: string[]): OAuthClient.Authorization {
    const state = generateState();
    const pkce = generatePKCE();
    const url = new URL(this.options.endpoints.authorize);
    url.searchParams.set("client_id", this.options.clientId);
    url.searchParams.set("redirect_uri", this.options.redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", scopes.join(" "));
    url.searchParams.set("state", state);
    url.searchParams.set("code_challenge", pkce.challenge);
    url.searchParams.set("code_challenge_method", "S256");
    return { url: url.toString(), state, verifier: pkce.verifier };
  }

  /**
   * Exchange an authorization code for credentials.
   */
  async exchange(code: string, verifier: string): Promise<Credentials.OAuth> {
    const res = await this.request(this.options.endpoints.token, {
      grant_type: "authorization_code",
      code,
      code_verifier: verifier,
      client_id: this.options.clientId,
      redirect_uri: this.options.redirectUri,
    });
    return await extractCredentialsFromResponse(res);
  }

  /**
   * Refresh OAuth 2.0 credentials.
   */
  async refresh(credentials: Credentials.OAuth): Promise<Credentials.OAuth> {
    const res = await this.request(this.options.endpoints.token, {
      grant_type: "refresh_token",
      refresh_token: credentials.refresh,
      client_id: this.options.clientId,
      redirect_uri: this.options.redirectUri,
    });
    return await extractCredentialsFromResponse(res);
  }

  /**
   * Revoke OAuth 2.0 credentials.
   */
  async revoke(credentials: Credentials.OAuth): Promise<void> {
    await this.request(this.options.endpoints.revoke, {
      refresh_token: credentials.refresh,
      client_id: this.options.clientId,
      redirect_uri: this.options.redirectUri,
    });
  }

  /**
   * Make a POST request to the OAuth provider with the given urlencoded body.
   */
  private async request(url: string, body: Record<string, string>) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(body).toString(),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new OAuthError(json as OAuthClient.ErrorResponse);
    }
    return res;
  }

  /**
   * Listens for the callback from the provider by starting a local HTTP server and exchanges the authorization code for credentials.
   * Should be called with the authorization object returned by {@link authorize}.
   * Listens for the callback on the client's redirect URI.
   * Throws if the request is invalid, the code exchange fails, or if no callback is received within 5 minutes.
   */
  async callback(
    authorization: OAuthClient.Authorization,
  ): Promise<Credentials.OAuth> {
    const { pathname, port } = new URL(this.options.redirectUri);
    const promise = new DeferredPromise<Credentials.OAuth>();
    const handle = async (request: Request) => {
      const url = new URL(request.url);
      if (url.pathname !== pathname) {
        throw new OAuthError({
          error: "invalid_request",
          error_description: "Invalid redirect URI",
        });
      }
      const error = url.searchParams.get("error");
      const errorDescription = url.searchParams.get("error_description");
      if (error) {
        throw new OAuthError({
          error,
          error_description: errorDescription ?? "An unknown error occurred.",
        });
      }
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      if (!code || !state) {
        throw new OAuthError({
          error: "invalid_request",
          error_description: "Missing code or state",
        });
      }
      if (state !== authorization.state) {
        throw new OAuthError({
          error: "invalid_request",
          error_description: "Invalid state",
        });
      }
      return await this.exchange(code, authorization.verifier);
    };
    const server = new HTTPServer({
      fetch: async (req) => {
        try {
          const credentials = await handle(req);
          promise.resolve(credentials);
          return Response.redirect("http://alchemy.run/auth/success");
        } catch (error) {
          promise.reject(error);
          return Response.redirect("http://alchemy.run/auth/error");
        }
      },
    });
    await server.listen(Number(port));
    const timeout = setTimeout(
      () => {
        promise.reject(
          new OAuthError({
            error: "timeout",
            error_description: "The authorization process timed out.",
          }),
        );
      },
      1000 * 60 * 5,
    );
    try {
      const credentials = await promise.value;
      clearTimeout(timeout);
      return credentials;
    } finally {
      // Not awaited because the server can take a few seconds to close, don't want to block the login process from completing
      void server.close();
    }
  }
}

export declare namespace OAuthClient {
  export interface ErrorResponse {
    error: string;
    error_description: string;
  }

  export interface SuccessResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
  }

  export interface Authorization {
    url: string;
    state: string;
    verifier: string;
  }
}

async function extractCredentialsFromResponse(
  response: Response,
): Promise<Credentials.OAuth> {
  const json = (await response.json()) as OAuthClient.SuccessResponse;
  return {
    type: "oauth",
    access: json.access_token,
    refresh: json.refresh_token,
    expires: Date.now() + json.expires_in * 1000,
    scopes: json.scope.split(" "),
  };
}

function generateState(length = 32) {
  return crypto.randomBytes(length).toString("base64url");
}

function generatePKCE(length = 96) {
  const verifier = crypto.randomBytes(length).toString("base64url");
  const challenge = crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
  return { verifier, challenge };
}

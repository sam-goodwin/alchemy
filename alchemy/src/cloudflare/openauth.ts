import { type Resource, ResourceKind } from "../resource.ts";
import type { Secret } from "../secret.ts";
import type { Bindings } from "./bindings.ts";
import type { KVNamespaceResource } from "./kv-namespace.ts";
import { KVNamespace } from "./kv-namespace.ts";
import {
  Worker,
  type FetchWorkerProps,
  type BaseWorkerProps,
} from "./worker.ts";
import type { BaseSchema } from "valibot";
import { Hono } from "hono";
import { issuer } from "@openauthjs/openauth";
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare";

/**
 * Configuration for an OAuth provider
 */
export interface OAuthProviderConfig {
  /**
   * OAuth client ID
   */
  clientId: Secret;

  /**
   * OAuth client secret
   */
  clientSecret: Secret;

  /**
   * OAuth scopes to request
   */
  scopes?: string[];
}

/**
 * Supported OAuth providers configuration
 */
export type SupportedProviders = {
  github?: OAuthProviderConfig;
  google?: OAuthProviderConfig;
  discord?: OAuthProviderConfig;
  facebook?: OAuthProviderConfig;
  apple?: OAuthProviderConfig;
  microsoft?: OAuthProviderConfig;
  spotify?: OAuthProviderConfig;
  twitter?: OAuthProviderConfig;
  tiktok?: OAuthProviderConfig;
  linkedin?: OAuthProviderConfig;
  twitch?: OAuthProviderConfig;
  code?: {
    sendCode: (email: string, code: string) => Promise<void> | void;
  };
} & {
  [key: string]:
    | OAuthProviderConfig
    | { sendCode: (email: string, code: string) => Promise<void> | void }
    | undefined;
};

/**
 * Properties for creating an OpenAuth Worker
 */
export interface OpenAuthProps<
  B extends Bindings = Bindings,
  S extends Record<string, any> = Record<string, any>,
> extends Omit<
    BaseWorkerProps<B>,
    | "name"
    | "bindings"
    | "env"
    | "url"
    | "adopt"
    | "compatibilityDate"
    | "compatibilityFlags"
  > {
  /**
   * Name for the worker
   * @default id
   */
  name?: string;

  /**
   * OAuth provider configurations
   * Supports all OpenAuth providers: github, google, discord, facebook, apple, microsoft, spotify, twitter, tiktok, etc.
   */
  providers: SupportedProviders;

  /**
   * KV Namespace for session storage
   * If not provided, one will be automatically created
   */
  storage?: string | KVNamespaceResource;

  /**
   * Additional bindings to attach to the worker
   */
  bindings?: B;

  /**
   * Environment variables to attach to the worker
   */
  env?: {
    [key: string]: string;
  };

  /**
   * Whether to enable a workers.dev URL for this worker
   * @default true
   */
  url?: boolean;

  /**
   * TTL configuration for tokens and sessions
   */
  ttl?: {
    /**
     * Token reuse time in seconds
     * @default 60
     */
    reuse?: number;
  };

  /**
   * Custom success handler function for post-authentication logic
   * This function will be called after successful OAuth authentication
   *
   * @param ctx - Authentication context
   * @param value - Provider response data
   * @returns User subject data
   */
  onSuccess?: (ctx: any, value: any) => Promise<any> | any;

  /**
   * User schema definition for type safety
   * Should be a Valibot schema object
   */
  subjects?: BaseSchema<S, S, any>;

  /**
   * Whether to adopt the Worker if it already exists when creating
   * @default false
   */
  adopt?: boolean;

  /**
   * The compatibility date for the worker
   * @default "2025-04-26"
   */
  compatibilityDate?: string;

  /**
   * The compatibility flags for the worker
   */
  compatibilityFlags?: string[];
}

export function isOpenAuth(resource: Resource): resource is OpenAuth<any, any> {
  return resource[ResourceKind] === "cloudflare::OpenAuth";
}

/**
 * Output returned after OpenAuth Worker creation/update
 */
export interface OpenAuth<
  B extends Bindings = Bindings,
  _S extends Record<string, any> = Record<string, any>,
> extends Resource<"cloudflare::OpenAuth"> {
  /**
   * The ID of the worker
   */
  id: string;

  /**
   * The name of the worker
   */
  name: string;

  /**
   * The worker's URL if enabled
   */
  url?: string;

  /**
   * The bindings that were created (including auto-bindings)
   */
  bindings: B & {
    AUTH_STORE: KVNamespaceResource;
  };

  /**
   * The KV Namespace used for session storage
   */
  store: KVNamespaceResource;

  /**
   * The Hono app instance for adding custom routes
   */
  app: Hono;

  /**
   * OAuth provider configurations
   */
  providers: SupportedProviders;

  /**
   * TTL configuration
   */
  ttl: {
    reuse: number;
  };

  /**
   * Time at which the worker was created
   */
  createdAt: number;

  /**
   * Time at which the worker was last updated
   */
  updatedAt: number;

  /**
   * Fetch function to make requests to the OpenAuth API
   */
  fetch: (request: Request | string, init?: RequestInit) => Promise<Response>;
}

/**
 * Creates a Cloudflare Worker that serves an OpenAuth Hono application.
 *
 * This resource automatically sets up OAuth authentication with support for multiple providers,
 * session management via KV storage, and a complete authentication flow with customizable
 * success handling. A KV Namespace for session storage is automatically created if not provided.
 *
 * @example
 * ## Basic GitHub Authentication
 *
 * Set up OpenAuth with GitHub provider for user authentication:
 *
 * ```ts
 * const auth = await OpenAuth("auth", import.meta, {
 *   providers: {
 *     github: {
 *       clientId: alchemy.secret(process.env.GITHUB_CLIENT_ID),
 *       clientSecret: alchemy.secret(process.env.GITHUB_CLIENT_SECRET),
 *       scopes: ["user:email", "read:user"]
 *     }
 *   }
 * });
 *
 * // Add custom routes to the Hono app
 * auth.app.get("/api/me", async (c) => {
 *   return c.json({ user: c.get("user"), authenticated: true });
 * });
 *
 * // Access the auto-created auth store
 * console.log("Auth store:", auth.store.title);
 * ```
 */
export function OpenAuth<
  const B extends Bindings,
  const S extends Record<string, any> = Record<string, any>,
>(
  id: string,
  meta: ImportMeta,
  props: OpenAuthProps<B, S>,
): Promise<OpenAuth<B, S>> & globalThis.Service {
  // Create storage if not provided
  const authStore =
    props.storage ||
    KVNamespace(`${id}-auth-store`, { title: `${id}-auth-store` });

  // Create the Hono app that will be returned
  const app = new Hono();

  // Store references to be used later
  const honoAppRef = { current: app };
  const storeRef = { current: authStore };

  // Use the Worker function with 3 parameters pattern from cloudflare-worker-bootstrap
  const worker = Worker(id, meta, {
    name: props.name ?? id,
    bindings: {
      ...props.bindings,
      AUTH_STORE: authStore,
      ...generateProviderBindings(props.providers),
    } as B & { AUTH_STORE: KVNamespaceResource },
    env: props.env,
    url: props.url ?? true,
    adopt: props.adopt ?? false,
    compatibilityDate: props.compatibilityDate ?? "2025-04-26",
    compatibilityFlags: ["nodejs_compat", ...(props.compatibilityFlags ?? [])],
    accountId: props.accountId,
    apiKey: props.apiKey,
    apiToken: props.apiToken,
    baseUrl: props.baseUrl,
    email: props.email,
    fetch: async (request: Request, env: any, ctx: ExecutionContext) => {
      return generateOpenAuthHandler(
        props,
        honoAppRef.current,
        request,
        env,
        ctx,
      );
    },
  } as FetchWorkerProps<any>);

  // Transform the worker promise to include app and store properties
  const result = worker.then(async (workerResult) => {
    const resolvedStore = await (typeof storeRef.current === "string"
      ? storeRef.current
      : storeRef.current instanceof Promise
        ? await storeRef.current
        : storeRef.current);
    return {
      ...workerResult,
      [ResourceKind]: "cloudflare::OpenAuth" as const,
      app: honoAppRef.current,
      store: resolvedStore,
      providers: props.providers,
      ttl: {
        reuse: props.ttl?.reuse ?? 60,
      },
    } as OpenAuth<B, S>;
  }) as Promise<OpenAuth<B, S>> & globalThis.Service;

  // Copy over service properties from original worker
  Object.setPrototypeOf(result, Object.getPrototypeOf(worker));
  Object.getOwnPropertyNames(worker).forEach((name) => {
    if (name !== "then" && name !== "catch" && name !== "finally") {
      // @ts-ignore
      result[name] = worker[name];
    }
  });

  return result;
}

function generateProviderBindings(
  providers: SupportedProviders,
): Record<string, Secret> {
  const bindings: Record<string, Secret> = {};

  for (const [providerName, config] of Object.entries(providers)) {
    if (config && "clientId" in config && "clientSecret" in config) {
      const upperProvider = providerName.toUpperCase();
      bindings[`${upperProvider}_CLIENT_ID`] = config.clientId;
      bindings[`${upperProvider}_CLIENT_SECRET`] = config.clientSecret;
    }
  }

  return bindings;
}

async function generateOpenAuthHandler<
  B extends Bindings,
  S extends Record<string, any>,
>(
  props: OpenAuthProps<B, S>,
  app: Hono,
  request: Request,
  env: any,
  ctx: ExecutionContext,
): Promise<Response> {
  // Validate required properties
  if (!props.providers || Object.keys(props.providers).length === 0) {
    return new Response("At least one OAuth provider must be configured", {
      status: 500,
    });
  }

  // Create OpenAuth issuer with the configured providers
  const authProviders = buildOpenAuthProviders(props.providers, env);
  const storage = CloudflareStorage({
    namespace: env.AUTH_STORE,
  });

  // Create the OpenAuth issuer
  const auth = issuer({
    subjects: (props.subjects as any) || {
      user: (claims: any) => ({
        id: claims.sub || claims.email || `user:${Date.now()}`,
        email: claims.email,
        name: claims.name,
      }),
    },
    storage,
    providers: authProviders,
    success:
      props.onSuccess ||
      (async (ctx: any, value: any) => {
        // Default success handler - create a generic user subject
        return ctx.subject("user", {
          id:
            value.claims?.sub ||
            value.claims?.email ||
            `${value.provider}:${Date.now()}`,
          email: value.claims?.email,
          name: value.claims?.name,
          provider: value.provider,
        });
      }),
  });

  // Add health check endpoint
  app.get("/", (c) => {
    return c.json({
      message: "OpenAuth Worker",
      providers: Object.keys(props.providers),
      status: "healthy",
    });
  });

  // Mount the OpenAuth issuer on the app
  app.mount("/auth", auth.fetch);

  // Handle the request through the Hono app
  return app.fetch(request, env, ctx);
}

function buildOpenAuthProviders(
  providers: SupportedProviders,
  env: any,
): Record<string, any> {
  const openAuthProviders: Record<string, any> = {};

  for (const [providerName, config] of Object.entries(providers)) {
    if (!config) continue;

    if (providerName === "code" && "sendCode" in config) {
      // Code provider configuration - this needs to be implemented based on actual OpenAuth API
      console.warn(
        "Code provider not yet fully implemented - needs proper OpenAuth integration",
      );
    } else if ("clientId" in config && "clientSecret" in config) {
      const upperProvider = providerName.toUpperCase();
      const clientId = env[`${upperProvider}_CLIENT_ID`];
      const clientSecret = env[`${upperProvider}_CLIENT_SECRET`];

      // For now, create basic provider configuration objects
      // TODO: Replace with actual OpenAuth provider instances when available
      openAuthProviders[providerName] = {
        type: providerName,
        clientId,
        clientSecret,
        scope: config.scopes?.join(" ") || getDefaultScope(providerName),
      };
    }
  }

  return openAuthProviders;
}

function getDefaultScope(providerName: string): string {
  const defaultScopes: Record<string, string> = {
    github: "user:email read:user",
    google: "openid profile email",
    discord: "identify email",
    facebook: "email",
    apple: "email name",
    microsoft: "openid profile email",
    spotify: "user-read-email user-read-private",
    twitter: "tweet.read users.read",
    tiktok: "user.info.basic",
    linkedin: "r_liteprofile r_emailaddress",
    twitch: "user:read:email",
  };

  return defaultScopes[providerName] || "openid profile email";
}

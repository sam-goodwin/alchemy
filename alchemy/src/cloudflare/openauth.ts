import { type Resource, ResourceKind } from "../resource.ts";
import type { Secret } from "../secret.ts";
import type { Bindings } from "./bindings.ts";
import { KVNamespace, type KVNamespaceResource } from "./kv-namespace.ts";
import {
  Worker,
  type FetchWorkerProps,
  type BaseWorkerProps,
} from "./worker.ts";
import type { BaseSchema } from "valibot";
import { issuer } from "@openauthjs/openauth";
import type { Hono } from "hono";

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
 * Properties for creating an OpenAuth Worker
 */
export interface OpenAuthProps<B extends Bindings = Bindings>
  extends Omit<
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
   */
  providers: {
    /**
     * GitHub OAuth provider configuration
     */
    github?: OAuthProviderConfig;

    /**
     * Google OAuth provider configuration
     */
    google?: OAuthProviderConfig;

    /**
     * Discord OAuth provider configuration
     */
    discord?: OAuthProviderConfig;

    /**
     * Facebook OAuth provider configuration
     */
    facebook?: OAuthProviderConfig;

    /**
     * Twitter/X OAuth provider configuration
     */
    twitter?: OAuthProviderConfig;

    /**
     * Microsoft/Azure OAuth provider configuration
     */
    microsoft?: OAuthProviderConfig;

    /**
     * Apple OAuth provider configuration
     */
    apple?: OAuthProviderConfig;

    /**
     * LinkedIn OAuth provider configuration
     */
    linkedin?: OAuthProviderConfig;

    /**
     * Spotify OAuth provider configuration
     */
    spotify?: OAuthProviderConfig;

    /**
     * Twitch OAuth provider configuration
     */
    twitch?: OAuthProviderConfig;

    /**
     * Slack OAuth provider configuration
     */
    slack?: OAuthProviderConfig;

    /**
     * Auth0 OAuth provider configuration
     */
    auth0?: OAuthProviderConfig;

    /**
     * Amazon OAuth provider configuration
     */
    amazon?: OAuthProviderConfig;
  };

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
  subjects?: BaseSchema<any, any, any>;

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

export function isOpenAuth(resource: Resource): resource is OpenAuth<any> {
  return resource[ResourceKind] === "cloudflare::OpenAuth";
}

/**
 * Output returned after OpenAuth Worker creation/update
 */
export interface OpenAuth<B extends Bindings = Bindings>
  extends Resource<"cloudflare::OpenAuth"> {
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
  providers: OpenAuthProps<B>["providers"];

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
export function OpenAuth<const B extends Bindings>(
  id: string,
  meta: ImportMeta,
  props: OpenAuthProps<B>,
): Promise<OpenAuth<B>> & globalThis.Service {
  return (async () => {
    // Auto-create AUTH_STORE if not provided
    const authStore = props.storage
      ? typeof props.storage === "string"
        ? ({ id: props.storage } as KVNamespaceResource)
        : props.storage
      : await KVNamespace(`${id}-auth-store`, {
          title: `${props.name ?? id} Auth Store`,
        });

    // Use the Worker function with 3 parameters pattern from cloudflare-worker-bootstrap
    const worker = await Worker(id, meta, {
      name: props.name ?? id,
      bindings: {
        ...props.bindings,
        AUTH_STORE: authStore,
      } as B & { AUTH_STORE: KVNamespaceResource },
      env: {
        ...props.env,
        ...generateProviderEnvVars(props.providers),
      },
      url: props.url ?? true,
      adopt: props.adopt ?? false,
      compatibilityDate: props.compatibilityDate ?? "2025-04-26",
      compatibilityFlags: [
        "nodejs_compat",
        ...(props.compatibilityFlags ?? []),
      ],
      accountId: props.accountId,
      apiKey: props.apiKey,
      apiToken: props.apiToken,
      baseUrl: props.baseUrl,
      email: props.email,
      fetch: async (request: Request, env: any, ctx: ExecutionContext) => {
        return generateOpenAuthHandler(props, authStore, request, env, ctx);
      },
    } as FetchWorkerProps<any>);

    return {
      ...worker,
      store: authStore,
      app: {} as Hono, // TODO: Return the actual Hono app instance
      providers: props.providers,
      ttl: {
        reuse: props.ttl?.reuse ?? 60,
      },
    } as OpenAuth<B>;
  })() as Promise<OpenAuth<B>> & globalThis.Service;
}

function generateProviderEnvVars(
  providers: OpenAuthProps["providers"],
): Record<string, string> {
  const env: Record<string, string> = {};

  // Map provider names to their expected environment variable names
  const providerEnvMap: Record<string, string> = {
    github: "GITHUB",
    google: "GOOGLE",
    discord: "DISCORD",
    facebook: "FACEBOOK",
    twitter: "TWITTER",
    microsoft: "MICROSOFT",
    apple: "APPLE",
    linkedin: "LINKEDIN",
    spotify: "SPOTIFY",
    twitch: "TWITCH",
    slack: "SLACK",
    auth0: "AUTH0",
    amazon: "AMAZON",
  };

  for (const [providerName, config] of Object.entries(providers)) {
    if (config) {
      const envName =
        providerEnvMap[providerName] || providerName.toUpperCase();
      env[`${envName}_CLIENT_ID`] = config.clientId.unencrypted;
      env[`${envName}_CLIENT_SECRET`] = config.clientSecret.unencrypted;
    }
  }

  return env;
}

async function generateOpenAuthHandler<B extends Bindings>(
  props: OpenAuthProps<B>,
  _authStore: KVNamespaceResource,
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

  // Build providers configuration for OpenAuth.js
  const openAuthProviders: Record<string, any> = {};

  // Map our provider configs to OpenAuth.js provider configs
  for (const [providerName, config] of Object.entries(props.providers)) {
    if (config) {
      // For now, create a generic OAuth provider config
      // TODO: Use specific OpenAuth.js provider implementations
      openAuthProviders[providerName] = {
        clientId: config.clientId.unencrypted,
        clientSecret: config.clientSecret.unencrypted,
        scopes: config.scopes || [],
      };
    }
  }

  // Create KV storage adapter for OpenAuth.js
  const storage = {
    async get(key: string) {
      // Use the AUTH_STORE binding from env
      const kvStore = env.AUTH_STORE;
      return await kvStore.get(key);
    },
    async set(key: string, value: string, ttl?: number) {
      const kvStore = env.AUTH_STORE;
      const options = ttl ? { expirationTtl: ttl } : {};
      await kvStore.put(key, value, options);
    },
    async delete(key: string) {
      const kvStore = env.AUTH_STORE;
      await kvStore.delete(key);
    },
  };

  // Use OpenAuth.js issuer pattern
  const auth = issuer({
    subjects: props.subjects,
    storage,
    providers: openAuthProviders,
    success:
      props.onSuccess ||
      (async (ctx: any, value: any) => {
        // Default success handler
        return ctx.subject("user", {
          id: value.claims?.sub || value.claims?.email || "unknown",
          email: value.claims?.email,
          name: value.claims?.name,
          provider: value.provider,
        });
      }),
  });

  // Handle the request using OpenAuth.js
  try {
    return await auth(request, { env, ctx });
  } catch (error) {
    console.error("OpenAuth error:", error);
    return new Response("Authentication error", { status: 500 });
  }
}

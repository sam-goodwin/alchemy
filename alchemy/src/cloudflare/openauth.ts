import {
  Resource,
  type Resource as ResourceType,
  ResourceKind,
} from "../resource.ts";
import type { Secret } from "../secret.ts";
import type { Bindings } from "./bindings.ts";
import { KVNamespace, type KVNamespaceResource } from "./kv-namespace.ts";
import {
  Worker,
  type FetchWorkerProps,
  type BaseWorkerProps,
} from "./worker.ts";
import type { BaseSchema } from "valibot";
import type { Context } from "../context.ts";
import { Hono } from "hono";
import {
  issuer,
  CloudflareKVStorage,
  GitHubProvider,
  GoogleProvider,
  DiscordProvider,
  FacebookProvider,
} from "@openauthjs/openauth";

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
    | "script"
    | "fetch"
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

export function isOpenAuth(resource: ResourceType): resource is OpenAuth<any> {
  return resource[ResourceKind] === "cloudflare::OpenAuth";
}

/**
 * Output returned after OpenAuth Worker creation/update
 */
export interface OpenAuth<B extends Bindings = Bindings>
  extends ResourceType<"cloudflare::OpenAuth"> {
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
  app: any; // Hono app type

  /**
   * OAuth provider configurations
   */
  providers: OpenAuthProps<B>["providers"];

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
  return Resource(
    "cloudflare::OpenAuth",
    async function (
      this: Context,
      id: string,
      props: OpenAuthProps<B>,
    ): Promise<OpenAuth<B>> {
      // Create AUTH_STORE if not provided
      const authStore = props.storage
        ? typeof props.storage === "string"
          ? ({ title: props.storage } as KVNamespaceResource)
          : props.storage
        : await KVNamespace(`${id}-auth-store`, {
            title: `${props.name ?? id}-auth-store`,
          });

      // Create the Hono app that will be returned
      const app = new Hono();

      // Build the providers configuration for OpenAuth.js
      const openAuthProviders: Record<string, any> = {};

      if (props.providers.github) {
        openAuthProviders.github = GitHubProvider({
          clientId: props.providers.github.clientId.unencrypted,
          clientSecret: props.providers.github.clientSecret.unencrypted,
          scopes: props.providers.github.scopes,
        });
      }

      if (props.providers.google) {
        openAuthProviders.google = GoogleProvider({
          clientId: props.providers.google.clientId.unencrypted,
          clientSecret: props.providers.google.clientSecret.unencrypted,
          scopes: props.providers.google.scopes,
        });
      }

      if (props.providers.discord) {
        openAuthProviders.discord = DiscordProvider({
          clientId: props.providers.discord.clientId.unencrypted,
          clientSecret: props.providers.discord.clientSecret.unencrypted,
          scopes: props.providers.discord.scopes,
        });
      }

      if (props.providers.facebook) {
        openAuthProviders.facebook = FacebookProvider({
          clientId: props.providers.facebook.clientId.unencrypted,
          clientSecret: props.providers.facebook.clientSecret.unencrypted,
          scopes: props.providers.facebook.scopes,
        });
      }

      // Create the OpenAuth issuer configuration
      const openAuthHandler = issuer({
        subjects: props.subjects,
        storage: CloudflareKVStorage(),
        providers: openAuthProviders,
        success:
          props.onSuccess ||
          (async (ctx, value) => {
            return ctx.subject("user", {
              id: value.tokenset?.access_token || "unknown",
              ...value.claims,
            });
          }),
      });

      // Mount OpenAuth on the Hono app
      app.mount("/auth", openAuthHandler);

      // Health check endpoint
      app.get("/", (c) => {
        return c.json({
          message: "OpenAuth Worker",
          providers: Object.keys(props.providers),
          status: "healthy",
        });
      });

      // Create the underlying Worker with the Hono app
      const worker = await Worker(id, meta, {
        name: props.name ?? id,
        bindings: {
          ...props.bindings,
          AUTH_STORE: authStore,
        } as B & { AUTH_STORE: KVNamespaceResource },
        env: props.env,
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
          return app.fetch(request, env, ctx);
        },
      } as FetchWorkerProps<any>);

      return {
        ...worker,
        [ResourceKind]: "cloudflare::OpenAuth",
        store: authStore,
        app: app,
        providers: props.providers,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      } as OpenAuth<B>;
    },
  )(id, props);
}

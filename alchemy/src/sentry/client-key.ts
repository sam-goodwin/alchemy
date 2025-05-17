import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { SentryApi } from "./api.js";

/**
 * Properties for creating or updating a ClientKey
 */
export interface ClientKeyProps {
  /**
   * The name of the key
   */
  name?: string;

  /**
   * Rate limit configuration
   */
  rateLimit?: {
    /**
     * Time window in seconds
     */
    window: number;

    /**
     * Maximum number of events allowed in the window
     */
    count: number;
  };

  /**
   * The use case for the key
   */
  useCase?: "user" | "profiling" | "escalating_issues" | "tempest" | "demo";

  /**
   * The project slug that owns the key
   */
  project: string;

  /**
   * The organization ID or slug that owns the key
   */
  organization: string;

  /**
   * Whether to adopt an existing key with the same name if it exists
   * If true and a key with the same name exists, it will be adopted rather than creating a new one
   *
   * @default false
   */
  adopt?: boolean;
}

/**
 * Output returned after ClientKey creation/update
 */
export interface ClientKey
  extends Resource<"sentry::ClientKey">,
    ClientKeyProps {
  /**
   * The ID of the key
   */
  id: string;

  /**
   * The label of the key
   */
  label: string;

  /**
   * The public key
   */
  public: string;

  /**
   * The secret key
   */
  secret: string;

  /**
   * The project ID
   */
  projectId: number;

  /**
   * Whether the key is active
   */
  isActive: boolean;

  /**
   * DSN configuration
   */
  dsn: {
    secret: string;
    public: string;
    csp: string;
    security: string;
    minidump: string;
    nel: string;
    unreal: string;
    cdn: string;
    crons: string;
  };

  /**
   * Browser SDK version
   */
  browserSdkVersion: string;

  /**
   * Browser SDK choices
   */
  browserSdk: {
    choices: Array<[string, string]>;
  };

  /**
   * Time at which the key was created
   */
  dateCreated: string;

  /**
   * Dynamic SDK loader options
   */
  dynamicSdkLoaderOptions: {
    hasReplay: boolean;
    hasPerformance: boolean;
    hasDebug: boolean;
  };
}

/**
 * Create and manage Sentry client keys
 *
 * @example
 * // Create a new client key:
 * const key = await ClientKey("my-key", {
 *   name: "My Key",
 *   rateLimit: {
 *     window: 3600,
 *     count: 1000
 *   }
 * });
 */
export const ClientKey = Resource(
  "sentry::ClientKey",
  async function (
    this: Context<ClientKey>,
    id: string,
    props: ClientKeyProps,
  ): Promise<ClientKey> {
    const api = new SentryApi();

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          const response = await api.delete(
            `/projects/${props.organization}/${props.project}/keys/${this.output.id}/`,
          );
          if (!response.ok && response.status !== 404) {
            console.error("Error deleting client key:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error deleting client key:", error);
      }
      return this.destroy();
    } else {
      try {
        let response;

        if (this.phase === "update" && this.output?.id) {
          response = await api.put(
            `/projects/${props.organization}/${props.project}/keys/${this.output.id}/`,
            props,
          );
        } else {
          try {
            response = await api.post(
              `/projects/${props.organization}/${props.project}/keys/`,
              props,
            );
          } catch (error) {
            // Check if this is a "key already exists" error and adopt is enabled
            if (
              props.adopt &&
              error instanceof Error &&
              error.message.includes("already exists") &&
              props.name
            ) {
              console.log(
                `Client key '${props.name}' already exists, adopting it`,
              );
              // Find the existing key by name
              const existingKey = await findClientKeyByName(
                api,
                props.organization,
                props.project,
                props.name,
              );
              if (!existingKey) {
                throw new Error(
                  `Failed to find existing client key '${props.name}' for adoption`,
                );
              }
              response = await api.get(
                `/projects/${props.organization}/${props.project}/keys/${existingKey.id}/`,
              );
            } else {
              throw error;
            }
          }
        }

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = (await response.json()) as Omit<
          ClientKey,
          keyof ClientKeyProps
        >;
        return this({
          ...props,
          id: data.id,
          label: data.label,
          public: data.public,
          secret: data.secret,
          projectId: data.projectId,
          isActive: data.isActive,
          dsn: data.dsn,
          browserSdkVersion: data.browserSdkVersion,
          browserSdk: data.browserSdk,
          dateCreated: data.dateCreated,
          dynamicSdkLoaderOptions: data.dynamicSdkLoaderOptions,
        });
      } catch (error) {
        console.error("Error creating/updating client key:", error);
        throw error;
      }
    }
  },
);

/**
 * Find a client key by name
 */
async function findClientKeyByName(
  api: SentryApi,
  organization: string,
  project: string,
  name: string,
): Promise<{ id: string } | null> {
  const response = await api.get(`/projects/${organization}/${project}/keys/`);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const keys = (await response.json()) as Array<{ id: string; name: string }>;
  const key = keys.find((k) => k.name === name);
  return key ? { id: key.id } : null;
}

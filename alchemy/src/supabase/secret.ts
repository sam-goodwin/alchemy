import type { Context } from "../context.ts";
import {
  Resource,
  ResourceKind,
  ResourceID,
  ResourceFQN,
  ResourceScope,
  ResourceSeq,
} from "../resource.ts";
import { Scope } from "../scope.ts";
import {
  createSupabaseApi,
  type SupabaseApiOptions,
  type SupabaseApi,
} from "./api.ts";
import { handleApiError } from "./api-error.ts";
import type { Project } from "./project.ts";
import { Secret as AlchemySecret } from "../secret.ts";

/**
 * Properties for creating or updating Supabase Secrets
 */
export interface SecretProps extends SupabaseApiOptions {
  /**
   * Reference to the project (string ID or Project resource)
   */
  project: string | Project;

  /**
   * Key-value pairs of secrets to create/update (values must be Secret type for security)
   */
  secrets: Record<string, AlchemySecret>;

  /**
   * Whether to adopt existing secrets instead of failing on conflict
   */
  adopt?: boolean;
}

/**
 * Supabase Secrets resource
 */
export interface Secret extends Resource<"supabase::Secret"> {
  /**
   * Reference to the project
   */
  project: string;

  /**
   * Array of secret name-value pairs
   */
  secrets: Array<{
    /**
     * Name of the secret
     */
    name: string;

    /**
     * Value of the secret
     */
    value: string;
  }>;
}

export function isSecret(resource: Resource): resource is Secret {
  return resource[ResourceKind] === "supabase::Secret";
}

/**
 * Create and manage Supabase Secrets (environment variables) for your project.
 *
 * @example
 * // Create basic secrets:
 * import { Secret, Project } from "alchemy/supabase";
 * import { secret } from "alchemy";
 *
 * const project = Project("my-project", {
 *   organization: "org-123",
 *   region: "us-east-1",
 *   dbPass: secret("secure-password")
 * });
 *
 * const secrets = Secret("api-keys", {
 *   project,
 *   secrets: {
 *     "API_KEY": secret("secret-value"),
 *     "DATABASE_URL": secret("postgres://...")
 *   }
 * });
 *
 * @example
 * // Create secrets with string project ID:
 * const secrets = Secret("config", {
 *   project: "proj-123",
 *   secrets: {
 *     "STRIPE_SECRET": secret("sk_test_..."),
 *     "JWT_SECRET": secret("super-secret-key")
 *   }
 * });
 */
export const Secret = Resource(
  "supabase::Secret",
  async function (
    this: Context<Secret>,
    _id: string,
    props: SecretProps,
  ): Promise<Secret> {
    const api = await createSupabaseApi(props);
    const projectRef =
      typeof props.project === "string" ? props.project : props.project.id;

    if (this.phase === "delete") {
      const secretNames = this.output?.secrets.map((s: any) => s.name) || [];
      if (secretNames.length > 0) {
        await deleteSecrets(api, projectRef, secretNames);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output) {
      await createSecrets(api, projectRef, props.secrets);
      const secrets = await getSecrets(api, projectRef);
      const filteredSecrets = secrets.filter((s) =>
        Object.keys(props.secrets).includes(s.name),
      );
      return this({
        [ResourceKind]: "supabase::Secret",
        [ResourceID]: `${projectRef}-secrets`,
        [ResourceFQN]: `supabase::Secret::${projectRef}-secrets`,
        [ResourceScope]: Scope.current,
        [ResourceSeq]: 0,
        project: projectRef,
        secrets: filteredSecrets,
      } as Secret);
    }

    try {
      await createSecrets(api, projectRef, props.secrets);
      const secrets = await getSecrets(api, projectRef);
      const filteredSecrets = secrets.filter((s) =>
        Object.keys(props.secrets).includes(s.name),
      );
      return this({
        [ResourceKind]: "supabase::Secret",
        [ResourceID]: `${projectRef}-secrets`,
        [ResourceFQN]: `supabase::Secret::${projectRef}-secrets`,
        [ResourceScope]: Scope.current,
        [ResourceSeq]: 0,
        project: projectRef,
        secrets: filteredSecrets,
      } as Secret);
    } catch (error) {
      if (
        props.adopt &&
        error instanceof Error &&
        error.message.includes("already exists")
      ) {
        const existingSecrets = await getSecrets(api, projectRef);
        const matchingSecrets = existingSecrets.filter((s) =>
          Object.keys(props.secrets).includes(s.name),
        );
        return this({
          [ResourceKind]: "supabase::Secret",
          [ResourceID]: `${projectRef}-secrets`,
          [ResourceFQN]: `supabase::Secret::${projectRef}-secrets`,
          [ResourceScope]: Scope.current,
          [ResourceSeq]: 0,
          project: projectRef,
          secrets: matchingSecrets,
        } as Secret);
      }
      throw error;
    }
  },
);

async function createSecrets(
  api: SupabaseApi,
  projectRef: string,
  secrets: Record<string, AlchemySecret>,
): Promise<void> {
  const secretsArray = Object.entries(secrets).map(([name, secret]) => ({
    name,
    value: secret.unencrypted,
  }));

  const response = await api.post(
    `/projects/${projectRef}/secrets`,
    secretsArray,
  );
  if (!response.ok) {
    await handleApiError(response, "creating", "secrets");
  }
}

async function getSecrets(
  api: SupabaseApi,
  projectRef: string,
): Promise<Array<{ name: string; value: string }>> {
  const response = await api.get(`/projects/${projectRef}/secrets`);
  if (!response.ok) {
    await handleApiError(response, "getting", "secrets");
  }
  return await response.json();
}

async function deleteSecrets(
  api: SupabaseApi,
  projectRef: string,
  secretNames: string[],
): Promise<void> {
  const response = await api.delete(`/projects/${projectRef}/secrets`, {
    body: JSON.stringify(secretNames),
  });
  if (!response.ok && response.status !== 404) {
    await handleApiError(response, "deleting", "secrets");
  }
}

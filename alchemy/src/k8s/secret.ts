import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { createKubernetesClient, handleKubernetesError, type KubernetesClientOptions } from "./client.ts";

/**
 * Properties for creating or updating a Kubernetes Secret
 */
export interface SecretProps extends KubernetesClientOptions {
  /**
   * Name of the Secret. If not provided, the resource ID will be used.
   */
  name?: string;

  /**
   * Namespace where the Secret should be created. Defaults to 'default'.
   */
  namespace?: string;

  /**
   * Labels are key-value pairs used for organizing and selecting Secrets
   */
  labels?: Record<string, string>;

  /**
   * Annotations are arbitrary metadata that can be attached to the Secret
   */
  annotations?: Record<string, string>;

  /**
   * Type of secret. Different types may be handled differently by various controllers.
   */
  type?: 
    | "Opaque"
    | "kubernetes.io/service-account-token"
    | "kubernetes.io/dockercfg"
    | "kubernetes.io/dockerconfigjson"
    | "kubernetes.io/basic-auth"
    | "kubernetes.io/ssh-auth"
    | "kubernetes.io/tls"
    | "bootstrap.kubernetes.io/token"
    | string;

  /**
   * Data contains the secret data. Each key must consist of alphanumeric characters,
   * '-', '_' or '.'. The serialized form of the secret data is a base64 encoded string,
   * representing the arbitrary (possibly non-string) data value here.
   */
  data?: Record<string, string>;

  /**
   * StringData allows specifying non-binary secret data in string form.
   * It is provided as a convenience for creating secrets from string values.
   * The values will be base64 encoded automatically when the secret is created.
   */
  stringData?: Record<string, string>;

  /**
   * Whether the Secret should be immutable.
   * Immutable Secrets cannot be updated once created.
   */
  immutable?: boolean;
}

/**
 * Output returned after Secret creation/update
 */
export interface Secret extends Resource<"k8s::Secret"> {
  /**
   * Name of the Secret
   */
  name: string;

  /**
   * Namespace of the Secret
   */
  namespace: string;

  /**
   * Labels applied to the Secret
   */
  labels?: Record<string, string>;

  /**
   * Annotations applied to the Secret
   */
  annotations?: Record<string, string>;

  /**
   * Type of secret
   */
  type?: string;

  /**
   * Secret data (base64 encoded)
   */
  data?: Record<string, string>;

  /**
   * Whether the Secret is immutable
   */
  immutable?: boolean;

  /**
   * Creation timestamp
   */
  creationTimestamp?: string;

  /**
   * Resource version for optimistic concurrency control
   */
  resourceVersion?: string;

  /**
   * Unique identifier for the Secret
   */
  uid?: string;
}

/**
 * Creates and manages Kubernetes Secrets.
 *
 * Secrets let you store and manage sensitive information, such as passwords,
 * OAuth tokens, SSH keys, and other credentials. Storing confidential information
 * in Secrets is more secure and flexible than putting it verbatim in a Pod
 * definition or in a container image.
 *
 * @example
 * ## Basic secret with string data
 *
 * Create a secret with database credentials using string data
 *
 * ```ts
 * const dbSecret = await Secret("database-credentials", {
 *   namespace: "production",
 *   type: "Opaque",
 *   stringData: {
 *     username: "admin",
 *     password: "super-secret-password",
 *     host: "db.internal.company.com",
 *     port: "5432"
 *   }
 * });
 * ```
 *
 * @example
 * ## TLS certificate secret
 *
 * Create a TLS secret for HTTPS termination
 *
 * ```ts
 * const tlsSecret = await Secret("tls-certificate", {
 *   namespace: "web",
 *   type: "kubernetes.io/tls",
 *   stringData: {
 *     "tls.crt": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
 *     "tls.key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
 *   }
 * });
 * ```
 *
 * @example
 * ## Docker registry secret
 *
 * Create a secret for pulling images from a private Docker registry
 *
 * ```ts
 * const registrySecret = await Secret("docker-registry", {
 *   namespace: "production",
 *   type: "kubernetes.io/dockerconfigjson",
 *   stringData: {
 *     ".dockerconfigjson": JSON.stringify({
 *       auths: {
 *         "private-registry.company.com": {
 *           username: "deployment",
 *           password: "registry-token",
 *           email: "devops@company.com",
 *           auth: btoa("deployment:registry-token")
 *         }
 *       }
 *     })
 *   }
 * });
 * ```
 *
 * @example
 * ## SSH authentication secret
 *
 * Create a secret for SSH key authentication
 *
 * ```ts
 * const sshSecret = await Secret("ssh-key", {
 *   namespace: "ci-cd",
 *   type: "kubernetes.io/ssh-auth",
 *   stringData: {
 *     "ssh-privatekey": "-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----",
 *     "ssh-publickey": "ssh-rsa AAAAB3NzaC1yc2E... user@host"
 *   }
 * });
 * ```
 *
 * @example
 * ## API keys and tokens
 *
 * Create an immutable secret for API keys in production
 *
 * ```ts
 * const apiSecret = await Secret("api-keys", {
 *   namespace: "production",
 *   type: "Opaque",
 *   stringData: {
 *     "stripe-api-key": "sk_live_...",
 *     "github-token": "ghp_...",
 *     "jwt-secret": "very-long-random-secret-key"
 *   },
 *   immutable: true,
 *   labels: {
 *     version: "v1.0.0",
 *     environment: "production"
 *   }
 * });
 * ```
 */
export const Secret = Resource(
  "k8s::Secret",
  async function (this: Context<Secret>, id: string, props: SecretProps = {}): Promise<Secret> {
    const client = createKubernetesClient(props);
    const secretName = props.name || id;
    const namespace = props.namespace || client.getCurrentNamespace();

    if (this.phase === "delete") {
      try {
        await client.coreV1Api.deleteNamespacedSecret(secretName, namespace);
        console.log(`Deleted Secret: ${secretName} in namespace: ${namespace}`);
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log(`Secret ${secretName} not found in namespace ${namespace}, already deleted`);
        } else {
          handleKubernetesError(error, "delete", "Secret", secretName);
        }
      }
      return this.destroy();
    }

    try {
      if (this.phase === "create") {
        // Create the Secret
        const secretSpec = {
          apiVersion: "v1",
          kind: "Secret",
          metadata: {
            name: secretName,
            namespace: namespace,
            labels: props.labels,
            annotations: props.annotations,
          },
          type: props.type || "Opaque",
          data: props.data,
          stringData: props.stringData,
          immutable: props.immutable,
        };

        const createResponse = await client.coreV1Api.createNamespacedSecret(namespace, secretSpec);
        console.log(`Created Secret: ${secretName} in namespace: ${namespace}`);

        return this({
          name: secretName,
          namespace: namespace,
          labels: createResponse.body.metadata?.labels,
          annotations: createResponse.body.metadata?.annotations,
          type: createResponse.body.type,
          data: createResponse.body.data,
          immutable: createResponse.body.immutable,
          creationTimestamp: createResponse.body.metadata?.creationTimestamp,
          resourceVersion: createResponse.body.metadata?.resourceVersion,
          uid: createResponse.body.metadata?.uid,
        });
      } else {
        // Update existing Secret
        // Note: Immutable Secrets cannot be updated
        if (this.output?.immutable) {
          throw new Error(`Cannot update immutable Secret: ${secretName}`);
        }

        const patchBody = {
          metadata: {
            labels: props.labels,
            annotations: props.annotations,
          },
          type: props.type || "Opaque",
          data: props.data,
          stringData: props.stringData,
        };

        const patchResponse = await client.coreV1Api.patchNamespacedSecret(
          secretName,
          namespace,
          patchBody,
          undefined, // pretty
          undefined, // dryRun
          undefined, // fieldManager
          undefined, // fieldValidation
          undefined, // force
          {
            headers: { "Content-Type": "application/merge-patch+json" },
          }
        );

        console.log(`Updated Secret: ${secretName} in namespace: ${namespace}`);

        return this({
          name: secretName,
          namespace: namespace,
          labels: patchResponse.body.metadata?.labels,
          annotations: patchResponse.body.metadata?.annotations,
          type: patchResponse.body.type,
          data: patchResponse.body.data,
          immutable: patchResponse.body.immutable,
          creationTimestamp: patchResponse.body.metadata?.creationTimestamp,
          resourceVersion: patchResponse.body.metadata?.resourceVersion,
          uid: patchResponse.body.metadata?.uid,
        });
      }
    } catch (error: any) {
      if (error.response?.status === 409 && this.phase === "create") {
        // Secret already exists, get its current state
        try {
          const getResponse = await client.coreV1Api.readNamespacedSecret(secretName, namespace);
          console.log(`Secret ${secretName} already exists in namespace ${namespace}, adopting it`);

          return this({
            name: secretName,
            namespace: namespace,
            labels: getResponse.body.metadata?.labels,
            annotations: getResponse.body.metadata?.annotations,
            type: getResponse.body.type,
            data: getResponse.body.data,
            immutable: getResponse.body.immutable,
            creationTimestamp: getResponse.body.metadata?.creationTimestamp,
            resourceVersion: getResponse.body.metadata?.resourceVersion,
            uid: getResponse.body.metadata?.uid,
          });
        } catch (getError: any) {
          handleKubernetesError(getError, "get", "Secret", secretName);
        }
      } else {
        handleKubernetesError(error, this.phase === "create" ? "create" : "update", "Secret", secretName);
      }
    }
  }
);
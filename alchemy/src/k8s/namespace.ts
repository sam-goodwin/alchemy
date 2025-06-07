import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { createKubernetesClient, handleKubernetesError, type KubernetesClientOptions } from "./client.ts";
import type { KubernetesMetadata } from "./types.ts";

/**
 * Properties for creating or updating a Kubernetes Namespace
 */
export interface NamespaceProps extends KubernetesClientOptions {
  /**
   * Name of the namespace. Must be unique within the cluster.
   * If not provided, the resource ID will be used.
   */
  name?: string;

  /**
   * Labels are key-value pairs used for organizing and selecting namespaces
   */
  labels?: Record<string, string>;

  /**
   * Annotations are arbitrary metadata that can be attached to the namespace
   */
  annotations?: Record<string, string>;
}

/**
 * Output returned after Namespace creation/update
 */
export interface Namespace extends Resource<"k8s::Namespace"> {
  /**
   * Name of the namespace
   */
  name: string;

  /**
   * Labels applied to the namespace
   */
  labels?: Record<string, string>;

  /**
   * Annotations applied to the namespace
   */
  annotations?: Record<string, string>;

  /**
   * Current status of the namespace
   */
  status?: {
    /**
     * Phase indicates the current lifecycle phase of the namespace
     */
    phase?: "Active" | "Terminating";
  };

  /**
   * Creation timestamp
   */
  creationTimestamp?: string;

  /**
   * Resource version for optimistic concurrency control
   */
  resourceVersion?: string;

  /**
   * Unique identifier for the namespace
   */
  uid?: string;
}

/**
 * Creates and manages Kubernetes Namespaces.
 *
 * Namespaces provide a mechanism for isolating groups of resources within a single cluster.
 * Names of resources need to be unique within a namespace, but not across namespaces.
 *
 * @example
 * ## Basic namespace creation
 *
 * Create a simple namespace with default settings
 *
 * ```ts
 * const namespace = await Namespace("my-app", {
 *   name: "my-application"
 * });
 * ```
 *
 * @example
 * ## Namespace with labels and annotations
 *
 * Create a namespace with organizational metadata
 *
 * ```ts
 * const namespace = await Namespace("production-ns", {
 *   name: "production",
 *   labels: {
 *     environment: "production",
 *     team: "backend"
 *   },
 *   annotations: {
 *     "description": "Production environment namespace",
 *     "contact": "backend-team@company.com"
 *   }
 * });
 * ```
 *
 * @example
 * ## Namespace for development environment
 *
 * Create a development namespace with appropriate labeling
 *
 * ```ts
 * const devNamespace = await Namespace("dev-environment", {
 *   name: "development",
 *   labels: {
 *     environment: "development",
 *     tier: "non-production"
 *   }
 * });
 * ```
 */
export const Namespace = Resource(
  "k8s::Namespace",
  async function (this: Context<Namespace>, id: string, props: NamespaceProps = {}): Promise<Namespace> {
    const client = createKubernetesClient(props);
    const namespaceName = props.name || id;

    if (this.phase === "delete") {
      try {
        await client.coreV1Api.deleteNamespace(namespaceName);
        console.log(`Deleted namespace: ${namespaceName}`);
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log(`Namespace ${namespaceName} not found, already deleted`);
        } else {
          handleKubernetesError(error, "delete", "namespace", namespaceName);
        }
      }
      return this.destroy();
    }

    try {
      if (this.phase === "create") {
        // Create the namespace
        const namespaceSpec = {
          apiVersion: "v1",
          kind: "Namespace",
          metadata: {
            name: namespaceName,
            labels: props.labels,
            annotations: props.annotations,
          },
        };

        const createResponse = await client.coreV1Api.createNamespace(namespaceSpec);
        console.log(`Created namespace: ${namespaceName}`);

        return this({
          name: namespaceName,
          labels: createResponse.body.metadata?.labels,
          annotations: createResponse.body.metadata?.annotations,
          status: createResponse.body.status,
          creationTimestamp: createResponse.body.metadata?.creationTimestamp,
          resourceVersion: createResponse.body.metadata?.resourceVersion,
          uid: createResponse.body.metadata?.uid,
        });
      } else {
        // Update existing namespace
        // Note: Only labels and annotations can be updated on namespaces
        const patchBody = {
          metadata: {
            labels: props.labels,
            annotations: props.annotations,
          },
        };

        const patchResponse = await client.coreV1Api.patchNamespace(
          namespaceName,
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

        console.log(`Updated namespace: ${namespaceName}`);

        return this({
          name: namespaceName,
          labels: patchResponse.body.metadata?.labels,
          annotations: patchResponse.body.metadata?.annotations,
          status: patchResponse.body.status,
          creationTimestamp: patchResponse.body.metadata?.creationTimestamp,
          resourceVersion: patchResponse.body.metadata?.resourceVersion,
          uid: patchResponse.body.metadata?.uid,
        });
      }
    } catch (error: any) {
      if (error.response?.status === 409 && this.phase === "create") {
        // Namespace already exists, get its current state
        try {
          const getResponse = await client.coreV1Api.readNamespace(namespaceName);
          console.log(`Namespace ${namespaceName} already exists, adopting it`);

          return this({
            name: namespaceName,
            labels: getResponse.body.metadata?.labels,
            annotations: getResponse.body.metadata?.annotations,
            status: getResponse.body.status,
            creationTimestamp: getResponse.body.metadata?.creationTimestamp,
            resourceVersion: getResponse.body.metadata?.resourceVersion,
            uid: getResponse.body.metadata?.uid,
          });
        } catch (getError: any) {
          handleKubernetesError(getError, "get", "namespace", namespaceName);
        }
      } else {
        handleKubernetesError(error, this.phase === "create" ? "create" : "update", "namespace", namespaceName);
      }
    }
  }
);
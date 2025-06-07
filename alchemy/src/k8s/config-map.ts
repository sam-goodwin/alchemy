import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { createKubernetesClient, handleKubernetesError, type KubernetesClientOptions } from "./client.ts";

/**
 * Properties for creating or updating a Kubernetes ConfigMap
 */
export interface ConfigMapProps extends KubernetesClientOptions {
  /**
   * Name of the ConfigMap. If not provided, the resource ID will be used.
   */
  name?: string;

  /**
   * Namespace where the ConfigMap should be created. Defaults to 'default'.
   */
  namespace?: string;

  /**
   * Labels are key-value pairs used for organizing and selecting ConfigMaps
   */
  labels?: Record<string, string>;

  /**
   * Annotations are arbitrary metadata that can be attached to the ConfigMap
   */
  annotations?: Record<string, string>;

  /**
   * Data contains the configuration data.
   * Each key must consist of alphanumeric characters, '-', '_' or '.'.
   * Values are always stored as strings.
   */
  data?: Record<string, string>;

  /**
   * BinaryData contains the binary data.
   * Each key must consist of alphanumeric characters, '-', '_' or '.'.
   * Values are base64 encoded byte arrays.
   */
  binaryData?: Record<string, string>;

  /**
   * Whether the ConfigMap should be immutable.
   * Immutable ConfigMaps cannot be updated once created.
   */
  immutable?: boolean;
}

/**
 * Output returned after ConfigMap creation/update
 */
export interface ConfigMap extends Resource<"k8s::ConfigMap"> {
  /**
   * Name of the ConfigMap
   */
  name: string;

  /**
   * Namespace of the ConfigMap
   */
  namespace: string;

  /**
   * Labels applied to the ConfigMap
   */
  labels?: Record<string, string>;

  /**
   * Annotations applied to the ConfigMap
   */
  annotations?: Record<string, string>;

  /**
   * Configuration data
   */
  data?: Record<string, string>;

  /**
   * Binary configuration data
   */
  binaryData?: Record<string, string>;

  /**
   * Whether the ConfigMap is immutable
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
   * Unique identifier for the ConfigMap
   */
  uid?: string;
}

/**
 * Creates and manages Kubernetes ConfigMaps.
 *
 * ConfigMaps allow you to decouple configuration artifacts from image content
 * to keep containerized applications portable. They store non-confidential data
 * in key-value pairs and can be consumed as environment variables, command-line
 * arguments, or configuration files in volumes.
 *
 * @example
 * ## Basic application configuration
 *
 * Create a ConfigMap with application settings
 *
 * ```ts
 * const appConfig = await ConfigMap("app-config", {
 *   namespace: "production",
 *   data: {
 *     "database.host": "db.example.com",
 *     "database.port": "5432",
 *     "log.level": "info",
 *     "feature.enabled": "true"
 *   }
 * });
 * ```
 *
 * @example
 * ## Configuration file content
 *
 * Store entire configuration files in a ConfigMap
 *
 * ```ts
 * const nginxConfig = await ConfigMap("nginx-config", {
 *   namespace: "web",
 *   data: {
 *     "nginx.conf": `
 *       server {
 *         listen 80;
 *         server_name example.com;
 *         location / {
 *           proxy_pass http://backend:3000;
 *         }
 *       }
 *     `,
 *     "mime.types": "text/html html htm shtml;"
 *   }
 * });
 * ```
 *
 * @example
 * ## Mixed data and binary data
 *
 * Create a ConfigMap with both text and binary content
 *
 * ```ts
 * const mixedConfig = await ConfigMap("mixed-config", {
 *   namespace: "production",
 *   data: {
 *     "config.yaml": `
 *       api:
 *         version: v1
 *         timeout: 30s
 *     `,
 *     "database.url": "postgresql://user:pass@host:5432/db"
 *   },
 *   binaryData: {
 *     "keystore.jks": "base64encodedkeystoredata=="
 *   }
 * });
 * ```
 *
 * @example
 * ## Immutable ConfigMap
 *
 * Create an immutable ConfigMap for production stability
 *
 * ```ts
 * const immutableConfig = await ConfigMap("prod-config-v1", {
 *   namespace: "production",
 *   data: {
 *     "api.endpoint": "https://api.prod.company.com",
 *     "cache.ttl": "3600",
 *     "max.connections": "100"
 *   },
 *   immutable: true,
 *   labels: {
 *     version: "v1.0.0",
 *     environment: "production"
 *   }
 * });
 * ```
 */
export const ConfigMap = Resource(
  "k8s::ConfigMap",
  async function (this: Context<ConfigMap>, id: string, props: ConfigMapProps = {}): Promise<ConfigMap> {
    const client = createKubernetesClient(props);
    const configMapName = props.name || id;
    const namespace = props.namespace || client.getCurrentNamespace();

    if (this.phase === "delete") {
      try {
        await client.coreV1Api.deleteNamespacedConfigMap(configMapName, namespace);
        console.log(`Deleted ConfigMap: ${configMapName} in namespace: ${namespace}`);
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log(`ConfigMap ${configMapName} not found in namespace ${namespace}, already deleted`);
        } else {
          handleKubernetesError(error, "delete", "ConfigMap", configMapName);
        }
      }
      return this.destroy();
    }

    try {
      if (this.phase === "create") {
        // Create the ConfigMap
        const configMapSpec = {
          apiVersion: "v1",
          kind: "ConfigMap",
          metadata: {
            name: configMapName,
            namespace: namespace,
            labels: props.labels,
            annotations: props.annotations,
          },
          data: props.data,
          binaryData: props.binaryData,
          immutable: props.immutable,
        };

        const createResponse = await client.coreV1Api.createNamespacedConfigMap(namespace, configMapSpec);
        console.log(`Created ConfigMap: ${configMapName} in namespace: ${namespace}`);

        return this({
          name: configMapName,
          namespace: namespace,
          labels: createResponse.body.metadata?.labels,
          annotations: createResponse.body.metadata?.annotations,
          data: createResponse.body.data,
          binaryData: createResponse.body.binaryData,
          immutable: createResponse.body.immutable,
          creationTimestamp: createResponse.body.metadata?.creationTimestamp,
          resourceVersion: createResponse.body.metadata?.resourceVersion,
          uid: createResponse.body.metadata?.uid,
        });
      } else {
        // Update existing ConfigMap
        // Note: Immutable ConfigMaps cannot be updated
        if (this.output?.immutable) {
          throw new Error(`Cannot update immutable ConfigMap: ${configMapName}`);
        }

        const patchBody = {
          metadata: {
            labels: props.labels,
            annotations: props.annotations,
          },
          data: props.data,
          binaryData: props.binaryData,
        };

        const patchResponse = await client.coreV1Api.patchNamespacedConfigMap(
          configMapName,
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

        console.log(`Updated ConfigMap: ${configMapName} in namespace: ${namespace}`);

        return this({
          name: configMapName,
          namespace: namespace,
          labels: patchResponse.body.metadata?.labels,
          annotations: patchResponse.body.metadata?.annotations,
          data: patchResponse.body.data,
          binaryData: patchResponse.body.binaryData,
          immutable: patchResponse.body.immutable,
          creationTimestamp: patchResponse.body.metadata?.creationTimestamp,
          resourceVersion: patchResponse.body.metadata?.resourceVersion,
          uid: patchResponse.body.metadata?.uid,
        });
      }
    } catch (error: any) {
      if (error.response?.status === 409 && this.phase === "create") {
        // ConfigMap already exists, get its current state
        try {
          const getResponse = await client.coreV1Api.readNamespacedConfigMap(configMapName, namespace);
          console.log(`ConfigMap ${configMapName} already exists in namespace ${namespace}, adopting it`);

          return this({
            name: configMapName,
            namespace: namespace,
            labels: getResponse.body.metadata?.labels,
            annotations: getResponse.body.metadata?.annotations,
            data: getResponse.body.data,
            binaryData: getResponse.body.binaryData,
            immutable: getResponse.body.immutable,
            creationTimestamp: getResponse.body.metadata?.creationTimestamp,
            resourceVersion: getResponse.body.metadata?.resourceVersion,
            uid: getResponse.body.metadata?.uid,
          });
        } catch (getError: any) {
          handleKubernetesError(getError, "get", "ConfigMap", configMapName);
        }
      } else {
        handleKubernetesError(error, this.phase === "create" ? "create" : "update", "ConfigMap", configMapName);
      }
    }
  }
);
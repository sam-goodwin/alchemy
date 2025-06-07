import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { createKubernetesClient, handleKubernetesError, type KubernetesClientOptions } from "./client.ts";
import type { ServicePort } from "./types.ts";

/**
 * Properties for creating or updating a Kubernetes Service
 */
export interface ServiceProps extends KubernetesClientOptions {
  /**
   * Name of the service. If not provided, the resource ID will be used.
   */
  name?: string;

  /**
   * Namespace where the service should be created. Defaults to 'default'.
   */
  namespace?: string;

  /**
   * Labels are key-value pairs used for organizing and selecting services
   */
  labels?: Record<string, string>;

  /**
   * Annotations are arbitrary metadata that can be attached to the service
   */
  annotations?: Record<string, string>;

  /**
   * Route service traffic to pods with label keys and values matching this selector.
   * Required for all service types except ExternalName.
   */
  selector?: Record<string, string>;

  /**
   * List of ports that are exposed by this service
   */
  ports: ServicePort[];

  /**
   * Type of service
   */
  type?: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";

  /**
   * ClusterIP is the IP address of the service. Usually assigned automatically.
   * Valid values are "None", empty string "", or a valid IP address.
   * Setting this to "None" makes this a headless service.
   */
  clusterIP?: string;

  /**
   * List of IP addresses for which nodes in the cluster will also accept traffic
   */
  externalIPs?: string[];

  /**
   * External name for ExternalName type services
   */
  externalName?: string;

  /**
   * Load balancer IP for LoadBalancer type services
   */
  loadBalancerIP?: string;

  /**
   * List of source ranges that will be allowed access to the load balancer
   */
  loadBalancerSourceRanges?: string[];

  /**
   * External traffic policy for NodePort and LoadBalancer services
   */
  externalTrafficPolicy?: "Cluster" | "Local";

  /**
   * Session affinity configuration
   */
  sessionAffinity?: "None" | "ClientIP";

  /**
   * Session affinity configuration options
   */
  sessionAffinityConfig?: {
    clientIP?: {
      timeoutSeconds?: number;
    };
  };

  /**
   * Health check node port for externalTrafficPolicy=Local
   */
  healthCheckNodePort?: number;

  /**
   * Whether to publish not-ready addresses
   */
  publishNotReadyAddresses?: boolean;

  /**
   * IP families for dual-stack support
   */
  ipFamilies?: ("IPv4" | "IPv6")[];

  /**
   * IP family policy for dual-stack support
   */
  ipFamilyPolicy?: "SingleStack" | "PreferDualStack" | "RequireDualStack";
}

/**
 * Output returned after Service creation/update
 */
export interface Service extends Resource<"k8s::Service"> {
  /**
   * Name of the service
   */
  name: string;

  /**
   * Namespace of the service
   */
  namespace: string;

  /**
   * Labels applied to the service
   */
  labels?: Record<string, string>;

  /**
   * Annotations applied to the service
   */
  annotations?: Record<string, string>;

  /**
   * Label selector for pods
   */
  selector?: Record<string, string>;

  /**
   * Ports exposed by the service
   */
  ports: ServicePort[];

  /**
   * Type of service
   */
  type?: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";

  /**
   * Cluster IP address assigned to the service
   */
  clusterIP?: string;

  /**
   * External IPs for the service
   */
  externalIPs?: string[];

  /**
   * External name for ExternalName services
   */
  externalName?: string;

  /**
   * Load balancer IP
   */
  loadBalancerIP?: string;

  /**
   * Session affinity setting
   */
  sessionAffinity?: "None" | "ClientIP";

  /**
   * Current status of the service
   */
  status?: {
    /**
     * Load balancer status for LoadBalancer type services
     */
    loadBalancer?: {
      /**
       * Ingress points for the load balancer
       */
      ingress?: Array<{
        ip?: string;
        hostname?: string;
        ports?: Array<{
          port: number;
          protocol: string;
          error?: string;
        }>;
      }>;
    };

    /**
     * Service conditions
     */
    conditions?: Array<{
      type: string;
      status: "True" | "False" | "Unknown";
      lastTransitionTime?: string;
      reason?: string;
      message?: string;
    }>;
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
   * Unique identifier for the service
   */
  uid?: string;
}

/**
 * Creates and manages Kubernetes Services.
 *
 * Services enable network access to a set of Pods. They provide stable networking
 * for dynamic Pod IP addresses and offer load balancing across Pod replicas.
 *
 * @example
 * ## Basic ClusterIP service
 *
 * Create an internal service for a web application
 *
 * ```ts
 * const webService = await Service("web-service", {
 *   namespace: "production",
 *   selector: { app: "web-app" },
 *   ports: [{
 *     port: 80,
 *     targetPort: 8080,
 *     protocol: "TCP"
 *   }],
 *   type: "ClusterIP"
 * });
 * ```
 *
 * @example
 * ## LoadBalancer service for external access
 *
 * Create a load balancer service to expose an application to the internet
 *
 * ```ts
 * const publicService = await Service("public-api", {
 *   namespace: "production",
 *   selector: { app: "api-server", tier: "web" },
 *   ports: [{
 *     name: "http",
 *     port: 80,
 *     targetPort: 8080,
 *     protocol: "TCP"
 *   }, {
 *     name: "https",
 *     port: 443,
 *     targetPort: 8443,
 *     protocol: "TCP"
 *   }],
 *   type: "LoadBalancer",
 *   loadBalancerSourceRanges: ["10.0.0.0/8", "192.168.0.0/16"]
 * });
 * ```
 *
 * @example
 * ## NodePort service with session affinity
 *
 * Create a NodePort service with session affinity for sticky sessions
 *
 * ```ts
 * const stickyService = await Service("sticky-app", {
 *   namespace: "production",
 *   selector: { app: "stateful-app" },
 *   ports: [{
 *     port: 80,
 *     targetPort: 8080,
 *     nodePort: 30080,
 *     protocol: "TCP"
 *   }],
 *   type: "NodePort",
 *   sessionAffinity: "ClientIP",
 *   sessionAffinityConfig: {
 *     clientIP: {
 *       timeoutSeconds: 86400
 *     }
 *   }
 * });
 * ```
 *
 * @example
 * ## Headless service for StatefulSets
 *
 * Create a headless service for direct Pod access
 *
 * ```ts
 * const headlessService = await Service("database-headless", {
 *   namespace: "production",
 *   selector: { app: "database" },
 *   ports: [{
 *     port: 5432,
 *     targetPort: 5432,
 *     protocol: "TCP"
 *   }],
 *   type: "ClusterIP",
 *   clusterIP: "None"
 * });
 * ```
 */
export const Service = Resource(
  "k8s::Service",
  async function (this: Context<Service>, id: string, props: ServiceProps): Promise<Service> {
    const client = createKubernetesClient(props);
    const serviceName = props.name || id;
    const namespace = props.namespace || client.getCurrentNamespace();

    if (this.phase === "delete") {
      try {
        await client.coreV1Api.deleteNamespacedService(serviceName, namespace);
        console.log(`Deleted service: ${serviceName} in namespace: ${namespace}`);
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log(`Service ${serviceName} not found in namespace ${namespace}, already deleted`);
        } else {
          handleKubernetesError(error, "delete", "service", serviceName);
        }
      }
      return this.destroy();
    }

    try {
      if (this.phase === "create") {
        // Create the service
        const serviceSpec = {
          apiVersion: "v1",
          kind: "Service",
          metadata: {
            name: serviceName,
            namespace: namespace,
            labels: props.labels,
            annotations: props.annotations,
          },
          spec: {
            selector: props.selector,
            ports: props.ports,
            type: props.type || "ClusterIP",
            clusterIP: props.clusterIP,
            externalIPs: props.externalIPs,
            externalName: props.externalName,
            loadBalancerIP: props.loadBalancerIP,
            loadBalancerSourceRanges: props.loadBalancerSourceRanges,
            externalTrafficPolicy: props.externalTrafficPolicy,
            sessionAffinity: props.sessionAffinity || "None",
            sessionAffinityConfig: props.sessionAffinityConfig,
            healthCheckNodePort: props.healthCheckNodePort,
            publishNotReadyAddresses: props.publishNotReadyAddresses,
            ipFamilies: props.ipFamilies,
            ipFamilyPolicy: props.ipFamilyPolicy,
          },
        };

        const createResponse = await client.coreV1Api.createNamespacedService(namespace, serviceSpec);
        console.log(`Created service: ${serviceName} in namespace: ${namespace}`);

        return this({
          name: serviceName,
          namespace: namespace,
          labels: createResponse.body.metadata?.labels,
          annotations: createResponse.body.metadata?.annotations,
          selector: createResponse.body.spec?.selector,
          ports: createResponse.body.spec?.ports || [],
          type: createResponse.body.spec?.type as any,
          clusterIP: createResponse.body.spec?.clusterIP,
          externalIPs: createResponse.body.spec?.externalIPs,
          externalName: createResponse.body.spec?.externalName,
          loadBalancerIP: createResponse.body.spec?.loadBalancerIP,
          sessionAffinity: createResponse.body.spec?.sessionAffinity as any,
          status: createResponse.body.status,
          creationTimestamp: createResponse.body.metadata?.creationTimestamp,
          resourceVersion: createResponse.body.metadata?.resourceVersion,
          uid: createResponse.body.metadata?.uid,
        });
      } else {
        // Update existing service
        const patchBody = {
          metadata: {
            labels: props.labels,
            annotations: props.annotations,
          },
          spec: {
            selector: props.selector,
            ports: props.ports,
            type: props.type || "ClusterIP",
            externalIPs: props.externalIPs,
            externalName: props.externalName,
            loadBalancerIP: props.loadBalancerIP,
            loadBalancerSourceRanges: props.loadBalancerSourceRanges,
            externalTrafficPolicy: props.externalTrafficPolicy,
            sessionAffinity: props.sessionAffinity || "None",
            sessionAffinityConfig: props.sessionAffinityConfig,
            healthCheckNodePort: props.healthCheckNodePort,
            publishNotReadyAddresses: props.publishNotReadyAddresses,
            ipFamilies: props.ipFamilies,
            ipFamilyPolicy: props.ipFamilyPolicy,
          },
        };

        const patchResponse = await client.coreV1Api.patchNamespacedService(
          serviceName,
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

        console.log(`Updated service: ${serviceName} in namespace: ${namespace}`);

        return this({
          name: serviceName,
          namespace: namespace,
          labels: patchResponse.body.metadata?.labels,
          annotations: patchResponse.body.metadata?.annotations,
          selector: patchResponse.body.spec?.selector,
          ports: patchResponse.body.spec?.ports || [],
          type: patchResponse.body.spec?.type as any,
          clusterIP: patchResponse.body.spec?.clusterIP,
          externalIPs: patchResponse.body.spec?.externalIPs,
          externalName: patchResponse.body.spec?.externalName,
          loadBalancerIP: patchResponse.body.spec?.loadBalancerIP,
          sessionAffinity: patchResponse.body.spec?.sessionAffinity as any,
          status: patchResponse.body.status,
          creationTimestamp: patchResponse.body.metadata?.creationTimestamp,
          resourceVersion: patchResponse.body.metadata?.resourceVersion,
          uid: patchResponse.body.metadata?.uid,
        });
      }
    } catch (error: any) {
      if (error.response?.status === 409 && this.phase === "create") {
        // Service already exists, get its current state
        try {
          const getResponse = await client.coreV1Api.readNamespacedService(serviceName, namespace);
          console.log(`Service ${serviceName} already exists in namespace ${namespace}, adopting it`);

          return this({
            name: serviceName,
            namespace: namespace,
            labels: getResponse.body.metadata?.labels,
            annotations: getResponse.body.metadata?.annotations,
            selector: getResponse.body.spec?.selector,
            ports: getResponse.body.spec?.ports || [],
            type: getResponse.body.spec?.type as any,
            clusterIP: getResponse.body.spec?.clusterIP,
            externalIPs: getResponse.body.spec?.externalIPs,
            externalName: getResponse.body.spec?.externalName,
            loadBalancerIP: getResponse.body.spec?.loadBalancerIP,
            sessionAffinity: getResponse.body.spec?.sessionAffinity as any,
            status: getResponse.body.status,
            creationTimestamp: getResponse.body.metadata?.creationTimestamp,
            resourceVersion: getResponse.body.metadata?.resourceVersion,
            uid: getResponse.body.metadata?.uid,
          });
        } catch (getError: any) {
          handleKubernetesError(getError, "get", "service", serviceName);
        }
      } else {
        handleKubernetesError(error, this.phase === "create" ? "create" : "update", "service", serviceName);
      }
    }
  }
);
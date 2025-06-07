import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { createKubernetesClient, handleKubernetesError, type KubernetesClientOptions } from "./client.ts";
import type { 
  KubernetesMetadata, 
  LabelSelector, 
  PodTemplateSpec,
  Container,
  Volume
} from "./types.ts";

/**
 * Properties for creating or updating a Kubernetes Deployment
 */
export interface DeploymentProps extends KubernetesClientOptions {
  /**
   * Name of the deployment. If not provided, the resource ID will be used.
   */
  name?: string;

  /**
   * Namespace where the deployment should be created. Defaults to 'default'.
   */
  namespace?: string;

  /**
   * Labels are key-value pairs used for organizing and selecting deployments
   */
  labels?: Record<string, string>;

  /**
   * Annotations are arbitrary metadata that can be attached to the deployment
   */
  annotations?: Record<string, string>;

  /**
   * Number of desired replicas. Defaults to 1.
   */
  replicas?: number;

  /**
   * Label selector for pods. Must match the template metadata labels.
   */
  selector: LabelSelector;

  /**
   * Pod template that describes the pods that will be created
   */
  template: PodTemplateSpec;

  /**
   * Deployment strategy for rolling updates
   */
  strategy?: {
    /**
     * Type of deployment strategy
     */
    type?: "RollingUpdate" | "Recreate";

    /**
     * Rolling update configuration
     */
    rollingUpdate?: {
      /**
       * Maximum number of pods that can be unavailable during update
       */
      maxUnavailable?: number | string;

      /**
       * Maximum number of pods that can be created above desired replica count
       */
      maxSurge?: number | string;
    };
  };

  /**
   * Minimum number of seconds for which a newly created pod should be ready
   */
  minReadySeconds?: number;

  /**
   * Number of old ReplicaSets to retain for rollback
   */
  revisionHistoryLimit?: number;

  /**
   * Indicates that the deployment is paused
   */
  paused?: boolean;

  /**
   * Maximum time in seconds for a deployment to make progress
   */
  progressDeadlineSeconds?: number;
}

/**
 * Output returned after Deployment creation/update
 */
export interface Deployment extends Resource<"k8s::Deployment"> {
  /**
   * Name of the deployment
   */
  name: string;

  /**
   * Namespace of the deployment
   */
  namespace: string;

  /**
   * Labels applied to the deployment
   */
  labels?: Record<string, string>;

  /**
   * Annotations applied to the deployment
   */
  annotations?: Record<string, string>;

  /**
   * Desired number of replicas
   */
  replicas?: number;

  /**
   * Label selector for pods
   */
  selector: LabelSelector;

  /**
   * Pod template specification
   */
  template: PodTemplateSpec;

  /**
   * Deployment strategy
   */
  strategy?: {
    type?: "RollingUpdate" | "Recreate";
    rollingUpdate?: {
      maxUnavailable?: number | string;
      maxSurge?: number | string;
    };
  };

  /**
   * Current status of the deployment
   */
  status?: {
    /**
     * Number of replicas observed by the deployment controller
     */
    observedGeneration?: number;

    /**
     * Total number of non-terminated pods targeted by this deployment
     */
    replicas?: number;

    /**
     * Number of non-terminated pods with the desired template spec
     */
    updatedReplicas?: number;

    /**
     * Number of ready replicas for this deployment
     */
    readyReplicas?: number;

    /**
     * Number of available replicas for this deployment
     */
    availableReplicas?: number;

    /**
     * Number of unavailable replicas for this deployment
     */
    unavailableReplicas?: number;

    /**
     * Deployment conditions
     */
    conditions?: Array<{
      type: string;
      status: "True" | "False" | "Unknown";
      lastUpdateTime?: string;
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
   * Unique identifier for the deployment
   */
  uid?: string;
}

/**
 * Creates and manages Kubernetes Deployments.
 *
 * Deployments provide declarative updates for Pods and ReplicaSets. They manage
 * rolling updates, scaling, and rollback capabilities for stateless applications.
 *
 * @example
 * ## Basic web application deployment
 *
 * Create a simple nginx deployment with 3 replicas
 *
 * ```ts
 * const webApp = await Deployment("web-app", {
 *   namespace: "production",
 *   replicas: 3,
 *   selector: {
 *     matchLabels: { app: "web-app" }
 *   },
 *   template: {
 *     metadata: {
 *       labels: { app: "web-app" }
 *     },
 *     spec: {
 *       containers: [{
 *         name: "nginx",
 *         image: "nginx:1.20",
 *         ports: [{ containerPort: 80 }]
 *       }]
 *     }
 *   }
 * });
 * ```
 *
 * @example
 * ## Application with environment variables and resource limits
 *
 * Deploy an API server with configuration from environment variables
 *
 * ```ts
 * const apiServer = await Deployment("api-server", {
 *   namespace: "production",
 *   replicas: 2,
 *   selector: {
 *     matchLabels: { app: "api-server", version: "v1" }
 *   },
 *   template: {
 *     metadata: {
 *       labels: { app: "api-server", version: "v1" }
 *     },
 *     spec: {
 *       containers: [{
 *         name: "api",
 *         image: "myapp/api:v1.2.3",
 *         ports: [{ containerPort: 8080 }],
 *         env: [
 *           { name: "NODE_ENV", value: "production" },
 *           { name: "PORT", value: "8080" }
 *         ],
 *         resources: {
 *           requests: { cpu: "100m", memory: "128Mi" },
 *           limits: { cpu: "500m", memory: "512Mi" }
 *         }
 *       }]
 *     }
 *   }
 * });
 * ```
 *
 * @example
 * ## Deployment with ConfigMap and Secret volumes
 *
 * Deploy an application that uses ConfigMap for configuration and Secret for credentials
 *
 * ```ts
 * const app = await Deployment("my-app", {
 *   namespace: "production",
 *   replicas: 1,
 *   selector: {
 *     matchLabels: { app: "my-app" }
 *   },
 *   template: {
 *     metadata: {
 *       labels: { app: "my-app" }
 *     },
 *     spec: {
 *       containers: [{
 *         name: "app",
 *         image: "myapp:latest",
 *         ports: [{ containerPort: 3000 }],
 *         volumeMounts: [
 *           { name: "config", mountPath: "/etc/config" },
 *           { name: "secrets", mountPath: "/etc/secrets", readOnly: true }
 *         ]
 *       }],
 *       volumes: [
 *         { name: "config", configMap: { name: "app-config" } },
 *         { name: "secrets", secret: { secretName: "app-secrets" } }
 *       ]
 *     }
 *   }
 * });
 * ```
 */
export const Deployment = Resource(
  "k8s::Deployment",
  async function (this: Context<Deployment>, id: string, props: DeploymentProps): Promise<Deployment> {
    const client = createKubernetesClient(props);
    const deploymentName = props.name || id;
    const namespace = props.namespace || client.getCurrentNamespace();

    if (this.phase === "delete") {
      try {
        await client.appsV1Api.deleteNamespacedDeployment(deploymentName, namespace);
        console.log(`Deleted deployment: ${deploymentName} in namespace: ${namespace}`);
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log(`Deployment ${deploymentName} not found in namespace ${namespace}, already deleted`);
        } else {
          handleKubernetesError(error, "delete", "deployment", deploymentName);
        }
      }
      return this.destroy();
    }

    try {
      if (this.phase === "create") {
        // Create the deployment
        const deploymentSpec = {
          apiVersion: "apps/v1",
          kind: "Deployment",
          metadata: {
            name: deploymentName,
            namespace: namespace,
            labels: props.labels,
            annotations: props.annotations,
          },
          spec: {
            replicas: props.replicas ?? 1,
            selector: props.selector,
            template: props.template,
            strategy: props.strategy,
            minReadySeconds: props.minReadySeconds,
            revisionHistoryLimit: props.revisionHistoryLimit,
            paused: props.paused,
            progressDeadlineSeconds: props.progressDeadlineSeconds,
          },
        };

        const createResponse = await client.appsV1Api.createNamespacedDeployment(namespace, deploymentSpec);
        console.log(`Created deployment: ${deploymentName} in namespace: ${namespace}`);

        return this({
          name: deploymentName,
          namespace: namespace,
          labels: createResponse.body.metadata?.labels,
          annotations: createResponse.body.metadata?.annotations,
          replicas: createResponse.body.spec?.replicas,
          selector: createResponse.body.spec?.selector,
          template: createResponse.body.spec?.template,
          strategy: createResponse.body.spec?.strategy,
          status: createResponse.body.status,
          creationTimestamp: createResponse.body.metadata?.creationTimestamp,
          resourceVersion: createResponse.body.metadata?.resourceVersion,
          uid: createResponse.body.metadata?.uid,
        });
      } else {
        // Update existing deployment
        const patchBody = {
          metadata: {
            labels: props.labels,
            annotations: props.annotations,
          },
          spec: {
            replicas: props.replicas ?? 1,
            selector: props.selector,
            template: props.template,
            strategy: props.strategy,
            minReadySeconds: props.minReadySeconds,
            revisionHistoryLimit: props.revisionHistoryLimit,
            paused: props.paused,
            progressDeadlineSeconds: props.progressDeadlineSeconds,
          },
        };

        const patchResponse = await client.appsV1Api.patchNamespacedDeployment(
          deploymentName,
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

        console.log(`Updated deployment: ${deploymentName} in namespace: ${namespace}`);

        return this({
          name: deploymentName,
          namespace: namespace,
          labels: patchResponse.body.metadata?.labels,
          annotations: patchResponse.body.metadata?.annotations,
          replicas: patchResponse.body.spec?.replicas,
          selector: patchResponse.body.spec?.selector,
          template: patchResponse.body.spec?.template,
          strategy: patchResponse.body.spec?.strategy,
          status: patchResponse.body.status,
          creationTimestamp: patchResponse.body.metadata?.creationTimestamp,
          resourceVersion: patchResponse.body.metadata?.resourceVersion,
          uid: patchResponse.body.metadata?.uid,
        });
      }
    } catch (error: any) {
      if (error.response?.status === 409 && this.phase === "create") {
        // Deployment already exists, get its current state
        try {
          const getResponse = await client.appsV1Api.readNamespacedDeployment(deploymentName, namespace);
          console.log(`Deployment ${deploymentName} already exists in namespace ${namespace}, adopting it`);

          return this({
            name: deploymentName,
            namespace: namespace,
            labels: getResponse.body.metadata?.labels,
            annotations: getResponse.body.metadata?.annotations,
            replicas: getResponse.body.spec?.replicas,
            selector: getResponse.body.spec?.selector,
            template: getResponse.body.spec?.template,
            strategy: getResponse.body.spec?.strategy,
            status: getResponse.body.status,
            creationTimestamp: getResponse.body.metadata?.creationTimestamp,
            resourceVersion: getResponse.body.metadata?.resourceVersion,
            uid: getResponse.body.metadata?.uid,
          });
        } catch (getError: any) {
          handleKubernetesError(getError, "get", "deployment", deploymentName);
        }
      } else {
        handleKubernetesError(error, this.phase === "create" ? "create" : "update", "deployment", deploymentName);
      }
    }
  }
);
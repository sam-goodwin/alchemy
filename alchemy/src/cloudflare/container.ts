import type { Context } from "../context.ts";
import { Image, type ImageProps } from "../docker/image.ts";
import { Resource } from "../resource.ts";
import { Scope } from "../scope.ts";
import { secret } from "../secret.ts";
import {
  type CloudflareApi,
  type CloudflareApiOptions,
  createCloudflareApi,
} from "./api.ts";

export interface ContainerProps
  extends Omit<ImageProps, "registry" | "skipPush">,
    Partial<CloudflareApiOptions> {
  className: string;
  maxInstances?: number;
  scriptName?: string;
  instanceType?: InstanceType;
  observability?: DeploymentObservability;
  schedulingPolicy?: SchedulingPolicy;
  dev?: {
    remote?: boolean;
  };
}

/**
 * @see https://developers.cloudflare.com/containers/pricing/
 */
export type InstanceType = "dev" | "basic" | "standard" | (string & {});

export function isContainer(binding: any): binding is Container {
  return binding.type === "container";
}

export type Container<T = any> = {
  type: "container";
  id: string;
  name?: string;
  className: string;
  image: Image;
  maxInstances?: number;
  scriptName?: string;
  sqlite?: true;
  instanceType?: InstanceType;
  observability?: DeploymentObservability;
  schedulingPolicy?: SchedulingPolicy;
  dev?: {
    remote?: boolean;
  };
  /**
   * @internal
   */
  __phantom?: T;
};

export async function Container<T>(
  id: string,
  props: ContainerProps,
): Promise<Container<T>> {
  const name = props.name ?? id;
  const tag =
    props.tag === undefined || props.tag === "latest"
      ? `latest-${Date.now()}`
      : props.tag;

  const output: Omit<Container<T>, "image"> = {
    type: "container",
    id,
    name,
    className: props.className,
    maxInstances: props.maxInstances,
    scriptName: props.scriptName,
    instanceType: props.instanceType,
    observability: props.observability,
    schedulingPolicy: props.schedulingPolicy,
    sqlite: true,
    dev: props.dev,
  };

  if (Scope.current.dev && !props.dev?.remote) {
    const image = await Image(id, {
      name: `cloudflare-dev/${name}`, // prefix used by Miniflare
      tag,
      build: props.build,
    });

    return {
      ...output,
      image,
    };
  }

  const api = await createCloudflareApi(props);
  const credentials = await getContainerCredentials(api);

  const image = await Image(id, {
    name: `${api.accountId}/${name}`,
    tag,
    registry: {
      server: "registry.cloudflare.com",
      username: credentials.username || credentials.user!,
      password: secret(credentials.password),
    },
  });

  return {
    ...output,
    image,
  };
}

export interface ContainerApplicationRollout {
  strategy: "rolling";
  kind?: "full_auto";
  stepPercentage: number;
  targetConfiguration: {
    image: string;
    instance_type?: InstanceType;
    observability: {
      logs: {
        enabled: boolean;
      };
    };
  };
}

export interface ContainerApplicationProps extends CloudflareApiOptions {
  name: string;
  schedulingPolicy?: SchedulingPolicy;
  instances?: number;
  /**
   * The instance type to be used for the deployment.
   *
   * @default "dev"
   */
  instanceType?: InstanceType;
  /**
   * The observability configuration for the deployment.
   */
  observability?: DeploymentObservability;
  /**
   * The maximum number of instances to be used for the deployment.
   */
  maxInstances?: number;
  image: Image;
  registryId?: string;
  durableObjects?: {
    namespaceId: string;
  };
  rollout?: ContainerApplicationRollout;
}

export type SchedulingPolicy =
  | "moon"
  | "gpu"
  | "regional"
  | "fill_metals"
  | "default";

export interface ContainerApplication
  extends Resource<"cloudflare::ContainerApplication"> {
  id: string;
  name: string;
}

/**
 * Deploy and manage container applications on Cloudflare's global network.
 *
 * ContainerApplication creates a managed container deployment that runs your Docker images
 * with automatic scaling, scheduling, and integration with Cloudflare's services.
 *
 * @example
 * // Deploy a simple web application container
 * const webApp = await ContainerApplication("my-web-app", {
 *   name: "my-web-app",
 *   image: await Image("web-app", {
 *     name: "web-app",
 *     build: {
 *       context: "./docker/web-app"
 *     }
 *   }),
 *   instances: 1,
 *   maxInstances: 3
 * });
 *
 * @example
 * // Deploy a container with GPU support for AI workloads
 * const aiApp = await ContainerApplication("ai-inference", {
 *   name: "ai-inference",
 *   image: await Image("ai-model", {
 *     name: "ai-model",
 *     build: {
 *       context: "./docker/ai"
 *     }
 *   }),
 *   schedulingPolicy: "gpu",
 *   instances: 2,
 *   maxInstances: 5
 * });
 *
 * @example
 * // Deploy a container integrated with Durable Objects
 * const doApp = await ContainerApplication("stateful-app", {
 *   name: "stateful-app",
 *   image: await Image("do-app", {
 *     name: "do-app",
 *     build: {
 *       context: "./container"
 *     }
 *   }),
 *   durableObjects: {
 *     namespaceId: myDurableObjectNamespace.id
 *   },
 *   instances: 1,
 *   maxInstances: 10
 * });
 *
 * @example
 * // Create a Container binding for use in a Worker
 * const worker = await Worker("my-worker", {
 *   name: "my-worker",
 *   entrypoint: "./src/worker.ts",
 *   bindings: {
 *     MY_CONTAINER: new Container("my-container", {
 *       className: "MyContainerClass",
 *       image: await Image("container-do", {
 *         name: "container-do",
 *         context: "./docker/durable-object"
 *       }),
 *       maxInstances: 100,
 *       name: "my-container-do"
 *     })
 *   }
 * });
 */
export const ContainerApplication = Resource(
  "cloudflare::ContainerApplication",
  async function (
    this: Context<ContainerApplication, ContainerApplicationProps>,
    _id: string,
    props: ContainerApplicationProps,
  ): Promise<ContainerApplication> {
    const api = await createCloudflareApi(props);
    if (this.phase === "delete") {
      if (this.output?.id) {
        // Delete the container application
        await deleteContainerApplication(api, this.output.id);
      }
      return this.destroy();
    }
    // Prefer the immutable repo digest if present. Falls back to the tag reference.
    const imageReference = props.image.repoDigest ?? props.image.imageRef;

    const configuration = {
      image: imageReference,
      instance_type: props.instanceType ?? "dev",
      observability: {
        logs: {
          enabled: true,
        },
        logging: {
          enabled: true,
        },
      },
    };
    if (this.phase === "update") {
      const application = await updateContainerApplication(
        api,
        this.output.id,
        {
          instances: props.instances ?? 1,
          max_instances: props.maxInstances ?? 10,
          scheduling_policy: props.schedulingPolicy ?? "default",
          configuration,
        },
      );
      // TODO(sam): should we wait for the rollout to complete?
      await createContainerApplicationRollout(api, application.id, {
        description: "Progressive update",
        strategy: "rolling",
        kind: props.rollout?.kind ?? "full_auto",
        step_percentage: props.rollout?.stepPercentage ?? 25,
        target_configuration: configuration,
      });
      return this({
        id: application.id,
        name: application.name,
      });
    } else {
      const application = await createContainerApplication(api, {
        name: props.name,
        scheduling_policy: props.schedulingPolicy ?? "default",
        instances: props.instances ?? 1,
        max_instances: props.maxInstances ?? 1,
        durable_objects: props.durableObjects
          ? {
              namespace_id: props.durableObjects.namespaceId,
            }
          : undefined,
        constraints: {
          tier: 1,
        },
        configuration: {
          image: imageReference,
          instance_type: props.instanceType ?? "dev",
          observability: {
            logs: {
              enabled: true,
            },
          },
        },
      });

      return this({
        id: application.id,
        name: application.name,
      });
    }
  },
);

export interface ContainerApplicationData {
  name: string;
  scheduling_policy: string;
  instances: number;
  max_instances: number;
  constraints: {
    tier: number;
    [key: string]: any;
  };
  configuration: {
    image: string;
    location: string;
    vcpu: number;
    memory_mib: number;
    disk: any;
    network: any;
    command: string[];
    entrypoint: string[];
    runtime: string;
    deployment_type: string;
    observability: any;
    memory: string;
    [key: string]: any;
  };
  durable_objects: {
    namespace_id: string;
    [key: string]: any;
  };
  id: string;
  account_id: string;
  created_at: string;
  version: number;
  durable_object_namespace_id: string;
  health: {
    instances: any;
    [key: string]: any;
  };
  [key: string]: any;
}

export async function listContainerApplications(
  api: CloudflareApi,
): Promise<ContainerApplicationData[]> {
  const deployments = await api.get(
    `/accounts/${api.accountId}/containers/applications`,
  );
  const response = (await deployments.json()) as any as {
    result: ContainerApplicationData[];
    errors: { message: string }[];
  };
  if (deployments.ok) {
    return response.result;
  }
  throw Error(
    `Failed to list container applications: ${response.errors.map((e) => e.message).join(", ")}`,
  );
}

export interface CreateContainerApplicationBody {
  name: string;
  max_instances: number;
  configuration: DeploymentConfiguration;
  durable_objects?: {
    namespace_id: string;
  };
  instances?: number;
  scheduling_policy?: string;
  constraints?: { tier: number };
  [key: string]: any;
}

export async function createContainerApplication(
  api: CloudflareApi,
  body: CreateContainerApplicationBody,
) {
  const response = await api.post(
    `/accounts/${api.accountId}/containers/applications`,
    body,
  );
  const result = (await response.json()) as {
    result: ContainerApplicationData;
    errors: { message: string }[];
  };
  if (response.ok) {
    return result.result;
  }

  throw Error(
    `Failed to create container application: ${result.errors?.map((e: { message: string }) => e.message).join(", ") ?? "Unknown error"}`,
  );
}

type Region =
  | "AFR"
  | "APAC"
  | "EEUR"
  | "ENAM"
  | "WNAM"
  | "ME"
  | "OC"
  | "SAM"
  | "WEUR"
  | (string & {});

type City =
  | "AFR"
  | "APAC"
  | "EEUR"
  | "ENAM"
  | "WNAM"
  | "ME"
  | "OC"
  | "SAM"
  | "WEUR"
  | (string & {});

export type UpdateApplicationRequestBody = {
  /**
   * Number of deployments to maintain within this applicaiton. This can be used to scale the appliation up/down.
   */
  instances?: number;
  max_instances?: number;
  affinities?: {
    colocation?: "datacenter";
  };
  scheduling_policy?: SchedulingPolicy;
  constraints?: {
    region?: Region;
    tier?: number;
    regions?: Array<Region>;
    cities?: Array<City>;
  };
  /**
   * The deployment configuration of all deployments created by this application.
   * Right now, if you modify the application configuration, only new deployments
   * created will have the new configuration. You can delete old deployments to
   * release new instances.
   *
   * TODO(sam): should this trigger a replacement?
   */
  configuration?: DeploymentConfiguration;
};

export async function updateContainerApplication(
  api: CloudflareApi,
  applicationId: string,
  body: UpdateApplicationRequestBody,
) {
  const response = await api.patch(
    `/accounts/${api.accountId}/containers/applications/${applicationId}`,
    body,
  );
  const result = (await response.json()) as {
    result: ContainerApplicationData;
    errors: { message: string }[];
  };
  if (response.ok) {
    return result.result;
  }

  throw Error(
    `Failed to create container application: ${result.errors?.map((e: { message: string }) => e.message).join(", ") ?? "Unknown error"}`,
  );
}

export async function deleteContainerApplication(
  api: CloudflareApi,
  applicationId: string,
) {
  const response = await api.delete(
    `/accounts/${api.accountId}/containers/applications/${applicationId}`,
  );
  const result = (await response.json()) as any;
  if (response.ok) {
    return result.result;
  }
  throw Error(
    `Failed to delete container application: ${result.errors?.map((e: { message: string }) => e.message).join(", ") ?? "Unknown error"}`,
  );
}

interface CreateRolloutApplicationRequest {
  description: string;
  strategy: "rolling";
  kind?: "full_auto";
  step_percentage: number;
  target_configuration: DeploymentConfiguration;
}

interface CreateRolloutApplicationResponse {
  id: string;
  created_at: string;
  last_updated_at: string;
  description: string;
  status: "progressing" | "completed" | "failed" | (string & {});
  health: {
    instances: {
      healthy: number;
      failed: number;
      starting: number;
      scheduling: number;
    };
  };
  kind: "full_auto" | (string & {});
  strategy: "rolling" | (string & {});
  current_configuration: {
    image: string;
    observability?: {
      logs?: {
        enabled: boolean;
      };
      logging?: {
        enabled: boolean;
      };
    };
  };
  target_configuration: DeploymentConfiguration;
  current_version: number;
  target_version: number;
  steps: Array<{
    id: number;
    status: "progressing" | "pending" | "completed" | "failed" | (string & {});
    step_size: {
      percentage: number;
    };
    description: string;
    started_at?: string;
  }>;
  progress: {
    total_steps: number;
    current_step: number;
    updated_instances: number;
    total_instances: number;
  };
}

export async function createContainerApplicationRollout(
  api: CloudflareApi,
  applicationId: string,
  body: CreateRolloutApplicationRequest,
) {
  const response = await api.post(
    `/accounts/${api.accountId}/containers/applications/${applicationId}/rollouts`,
    body,
  );
  const result = (await response.json()) as {
    result: CreateRolloutApplicationResponse;
    errors: { message: string }[];
  };
  if (response.ok) {
    return result.result;
  }
  throw Error(
    `Failed to create container application rollout: ${result.errors.map((e: { message: string }) => e.message).join(", ")}`,
  );
}

export type ImageRegistryCredentialsConfiguration = {
  permissions: Array<"pull" | "push">;
  expiration_minutes: number;
};

export async function getContainerCredentials(
  api: CloudflareApi,
  registryId = "registry.cloudflare.com",
) {
  const credentials = await api.post(
    `/accounts/${api.accountId}/containers/registries/${registryId}/credentials`,
    {
      permissions: ["pull", "push"],
      expiration_minutes: 60,
    } satisfies ImageRegistryCredentialsConfiguration,
  );
  const result = (await credentials.json()) as {
    result: {
      user?: string;
      username?: string;
      password: string;
    };
    errors: { message: string }[];
  };
  if (credentials.ok) {
    return result.result;
  }
  throw Error(
    `Failed to get container credentials: ${result.errors.map((e: { message: string }) => e.message).join(", ")}`,
  );
}

// The Cloudflare managed registry is special in that the namespaces for repos should always
// start with the Cloudflare Account tag
// This is a helper to generate the image tag with correct namespace attached to the Cloudflare Registry host
export const getCloudflareRegistryWithAccountNamespace = (
  accountID: string,
  tag: string,
): string => {
  return `${getCloudflareContainerRegistry()}/${accountID}/${tag}`;
};

// default cloudflare managed registry, can be overriden with the env var - CLOUDFLARE_CONTAINER_REGISTRY
export const getCloudflareContainerRegistry = () => {
  // previously defaulted to registry.cloudchamber.cfdata.org
  return process.env.CLOUDFLARE_CONTAINER_REGISTRY ?? "registry.cloudflare.com";
};

/**
 * Given a container image that is a registry link, this function
 * returns true if the link points the Cloudflare container registry
 * (defined as per `getCloudflareContainerRegistry` above)
 */
export function isCloudflareRegistryLink(image: string) {
  const cfRegistry = getCloudflareContainerRegistry();
  return image.includes(cfRegistry);
}

/** Prefixes with the cloudflare-dev namespace. The name should be the container's DO classname, and the tag a build uuid. */
export const getDevContainerImageName = (name: string, tag: string) => {
  return `${MF_DEV_CONTAINER_PREFIX}/${name.toLowerCase()}:${tag}`;
};

export const MF_DEV_CONTAINER_PREFIX = "cloudflare-dev";

export interface ContainerIdentity {
  account_id: string;
  external_account_id: string;
  legacy_identity: string;
  capabilities: string[];
  limits: {
    account_id: string;
    vcpu_per_deployment: number;
    memory_mib_per_deployment: number;
    memory_per_deployment: string;
    disk_per_deployment: string;
    disk_mb_per_deployment: number;
    total_vcpu: number;
    total_memory_mib: number;
    node_group: string;
    ipv4s: number;
    network_modes: string[];
    total_disk_mb: number;
    total_memory: string;
  };
  locations: any[];
  defaults: {
    vcpus: number;
    memory_mib: number;
    memory: string;
    disk_mb: number;
  };
}

export async function getContainerIdentity(api: CloudflareApi) {
  const metrics = await api.get(`/accounts/${api.accountId}/containers/me`);
  const result = (await metrics.json()) as {
    result: ContainerIdentity;
    errors: { message: string }[];
  };
  if (metrics.ok) {
    return result.result;
  }
  throw Error(
    `Failed to get container me: ${result.errors.map((e: { message: string }) => e.message).join(", ")}`,
  );
}

/**
 * Duration string. From Go documentation:
 * A string representing the duration in the form "3d1h3m". Leading zero units are omitted.
 * As a special case, durations less than one second format use a smaller unit (milli-, micro-, or nanoseconds)
 * to ensure that the leading digit is non-zero.
 */
export type Duration = string;

interface DeploymentObservability {
  logs?: {
    enabled: boolean;
  };
}

export type DeploymentConfiguration = {
  /**
   * The image to be used for the deployment.
   */
  image: string;
  /**
   * The instance type to be used for the deployment.
   */
  instance_type?: InstanceType;
  /**
   * The observability configuration for the deployment.
   */
  observability?: DeploymentObservability;
  /**
   * A list of SSH public key IDs from the account
   */
  ssh_public_key_ids?: Array<string>;
  /**
   * A list of objects with secret names and the their access types from the account
   */
  secrets?: Array<{
    /**
     * The name of the secret within the container
     */
    name: string;
    type: "env";
    /**
     * Corresponding secret name from the account
     */
    secret: string;
  }>;
  /**
   * Specify the vcpu to be used for the deployment. The default will be the one configured for the account.
   */
  vcpu?: number;
  /**
   * Specify the memory to be used for the deployment. The default will be the one configured for the account.
   */
  memory?: string;
  /**
   * The disk configuration for this deployment
   */
  disk?: {
    size: string;
  };
  /**
   * Container environment variables
   */
  environment_variables?: Array<{
    name: string;
    value: string;
  }>;
  /**
   * Deployment labels
   */
  labels?: Array<{
    name: string;
    value: string;
  }>;
  network?: {
    /**
     * Assign an IPv4 address to the deployment. One of 'none' (default), 'predefined' (allocate one from a set of IPv4 addresses in the global pool), 'account' (allocate one from a set of IPv4 addresses preassigned in the account pool). Only applicable to "public" mode.
     *
     */
    assign_ipv4?: "none" | "predefined" | "account";
    /**
     * Assign an IPv6 address to the deployment. One of 'predefined' (allocate one from a set of IPv6 addresses in the global pool), 'account' (allocate one from a set of IPv6 addresses preassigned in the account pool). The container will always be assigned to an IPv6 if the networking mode is "public".
     *
     */
    assign_ipv6?: "none" | "predefined" | "account";
    mode?: "public" | "private";
  };
  command?: string[];
  entrypoint?: string[];
  dns?: {
    /**
     * List of DNS servers that the deployment will use to resolve domain names. You can only specify a maximum of 3.
     */
    servers?: Array<string>;
    /**
     * The container resolver will append these domains to every resolve query. For example, if you have 'google.com',
     * and your deployment queries 'web', it will append 'google.com' to 'web' in the search query before trying 'web'.
     * Limited to 6 domains.
     */
    searches?: Array<string>;
  };
  ports?: Array<{
    /**
     * The name of the port. The port name should be unique for each deployment. Minimum length of 1 and maximum length of 15. No consecutive dashes. If the name is 'web-ui', the container will receive an environment variable as follows:
     * - CLOUDFLARE_PORT_WEB_UI: Port inside the container
     * - CLOUDFLARE_HOST_PORT_WEB_UI: Port outside the container
     * - CLOUDFLARE_HOST_IP_WEB_UI: Address of the external network interface the port is allocated on
     * - CLOUDFLARE_HOST_ADDR_WEB_UI: CLOUDFLARE_HOST_ADDR_WEB_UI ':' CLOUDFLARE_HOST_PORT_WEB_UI
     *
     */
    name: string;
    /**
     * Optional port number, it's assigned only if the user specified it. If it's not specified, the datacenter scheduler will decide it.
     */
    port?: number;
  }>;
  /**
   * Health and readiness checks for this deployment.
   */
  checks?: Array<{
    /**
     * Optional name for the check. If omitted, a name will be generated automatically.
     */
    name?: string;
    /**
     * The type of check to perform. A TCP check succeeds if it can connect to the provided port. An HTTP check succeeds if it receives a successful HTTP response (2XX)
     */
    type: "http" | "tcp";
    /**
     * Connect to the port using TLS
     */
    tls?: boolean;
    /**
     * The name of the port defined in the "ports" property of the deployment
     */
    port: string;
    /**
     * Configuration for HTTP checks. Only valid when "type" is "http"
     */
    http?: {
      method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";
      /**
       * If the method is one of POST, PATCH or PUT, this is required. It's the body that will be passed to the HTTP healthcheck request.
       */
      body?: string;
      /**
       * Path that will be used to perform the healthcheck.
       */
      path?: string;
      /**
       * HTTP headers to include in the request.
       */
      headers?: Record<string, any>;
    };
    /**
     * How often the check should be performed
     */
    interval: Duration;
    /**
     * The amount of time to wait for the check to complete before considering the check to have failed
     */
    timeout: Duration;
    /**
     * Number of times to attempt the check before considering it to have failed
     */
    retries?: number;
    /**
     * The kind of check. A failed "healthy" check affects a deployment's "healthy" status, while a failed "ready" check affects a deployment's "ready" status.
     */
    kind: "health" | "ready";
  }>;
};

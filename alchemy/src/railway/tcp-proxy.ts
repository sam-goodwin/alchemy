import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { createRailwayApi, handleRailwayDeleteError, type RailwayApi } from "./api.ts";
import type { Service } from "./service.ts";
import type { Environment } from "./environment.ts";

export interface TcpProxyProps {
  /**
   * The port number that the application is listening on
   */
  applicationPort: number;

  /**
   * The external proxy port number (optional)
   */
  proxyPort?: number;

  /**
   * The service this proxy belongs to. Can be a Service resource or service ID string
   */
  service: string | Service;

  /**
   * The environment this proxy belongs to. Can be an Environment resource or environment ID string
   */
  environment: string | Environment;

  /**
   * Railway API token to use for authentication. Defaults to RAILWAY_TOKEN environment variable
   */
  apiKey?: Secret;
}

export interface TcpProxy
  extends Resource<"railway::TcpProxy">,
    Omit<TcpProxyProps, "service" | "environment"> {
  /**
   * The unique identifier of the TCP proxy
   */
  id: string;

  /**
   * The ID of the service this proxy belongs to
   */
  serviceId: string;

  /**
   * The ID of the environment this proxy belongs to
   */
  environmentId: string;

  /**
   * The domain name for accessing the proxy
   */
  domain: string;

  /**
   * The timestamp when the TCP proxy was created
   */
  createdAt: string;

  /**
   * The timestamp when the TCP proxy was last updated
   */
  updatedAt: string;
}

/**
 * Create and manage Railway TCP proxies
 *
 * @example
 * ```typescript
 * // Create a TCP proxy for a database service
 * const dbProxy = await TcpProxy("db-proxy", {
 *   applicationPort: 5432,
 *   service: database,
 *   environment: environment,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a TCP proxy with custom proxy port
 * const customProxy = await TcpProxy("custom-proxy", {
 *   applicationPort: 3000,
 *   proxyPort: 8080,
 *   service: service,
 *   environment: environment,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a TCP proxy for Redis
 * const redisProxy = await TcpProxy("redis-proxy", {
 *   applicationPort: 6379,
 *   service: "service-id-string",
 *   environment: "environment-id-string",
 *   apiKey: secret("proxy-railway-token"),
 * });
 * ```
 */
export const TcpProxy = Resource(
  "railway::TcpProxy",
  async function (
    this: Context<TcpProxy>,
    _id: string,
    props: TcpProxyProps,
  ): Promise<TcpProxy> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await deleteTcpProxy(api, this.output.id);
        }
      } catch (error) {
        handleRailwayDeleteError(error, "TcpProxy", this.output?.id);
      }

      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const tcpProxy = await getTcpProxy(api, this.output.id);

      return this({
        id: tcpProxy.id,
        applicationPort: tcpProxy.applicationPort,
        proxyPort: tcpProxy.proxyPort,
        serviceId: tcpProxy.serviceId,
        environmentId: tcpProxy.environmentId,
        domain: tcpProxy.domain,
        createdAt: tcpProxy.createdAt,
        updatedAt: tcpProxy.updatedAt,
      });
    }

    const tcpProxy = await createTcpProxy(api, props);

    return this({
      id: tcpProxy.id,
      applicationPort: tcpProxy.applicationPort,
      proxyPort: tcpProxy.proxyPort,
      serviceId: tcpProxy.serviceId,
      environmentId: tcpProxy.environmentId,
      domain: tcpProxy.domain,
      createdAt: tcpProxy.createdAt,
      updatedAt: tcpProxy.updatedAt,
    });
  },
);

const TCP_PROXY_CREATE_MUTATION = `
  mutation TcpProxyCreate($input: TcpProxyCreateInput!) {
    tcpProxyCreate(input: $input) {
      id
      applicationPort
      proxyPort
      serviceId
      environmentId
      domain
      createdAt
      updatedAt
    }
  }
`;

const TCP_PROXY_QUERY = `
  query TcpProxy($id: String!) {
    tcpProxy(id: $id) {
      id
      applicationPort
      proxyPort
      serviceId
      environmentId
      domain
      createdAt
      updatedAt
    }
  }
`;

const TCP_PROXY_DELETE_MUTATION = `
  mutation TcpProxyDelete($id: String!) {
    tcpProxyDelete(id: $id)
  }
`;

export async function createTcpProxy(api: RailwayApi, props: TcpProxyProps) {
  const serviceId =
    typeof props.service === "string" ? props.service : props.service.id;
  const environmentId =
    typeof props.environment === "string"
      ? props.environment
      : props.environment.id;

  const response = await api.mutate(
    TCP_PROXY_CREATE_MUTATION,
    {
      input: {
        applicationPort: props.applicationPort,
        proxyPort: props.proxyPort,
        serviceId: serviceId,
        environmentId: environmentId,
      },
    },
  );

  const tcpProxy = response.data?.tcpProxyCreate;
  if (!tcpProxy) {
    throw new Error("Failed to create Railway TCP proxy");
  }

  return tcpProxy;
}

export async function getTcpProxy(api: RailwayApi, id: string) {
  const response = await api.query(
    TCP_PROXY_QUERY,
    { id },
  );

  const tcpProxy = response.data?.tcpProxy;
  if (!tcpProxy) {
    throw new Error("Failed to fetch Railway TCP proxy");
  }

  return tcpProxy;
}

export async function deleteTcpProxy(api: RailwayApi, id: string) {
  await api.mutate(
    TCP_PROXY_DELETE_MUTATION,
    { id },
  );
}

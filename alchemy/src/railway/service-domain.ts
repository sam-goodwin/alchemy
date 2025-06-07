import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { createRailwayApi, handleRailwayDeleteError, type RailwayApi } from "./api.ts";
import type { Service } from "./service.ts";
import type { Environment } from "./environment.ts";

export interface ServiceDomainProps {
  /**
   * The subdomain name for the service
   */
  domain: string;

  /**
   * The service this domain belongs to. Can be a Service resource or service ID string
   */
  service: string | Service;

  /**
   * The environment this domain belongs to. Can be an Environment resource or environment ID string
   */
  environment: string | Environment;

  /**
   * Railway API token to use for authentication. Defaults to RAILWAY_TOKEN environment variable
   */
  apiKey?: Secret;
}

export interface ServiceDomain
  extends Resource<"railway::ServiceDomain">,
    Omit<ServiceDomainProps, "service" | "environment"> {
  /**
   * The unique identifier of the service domain
   */
  id: string;

  /**
   * The ID of the service this domain belongs to
   */
  serviceId: string;

  /**
   * The ID of the environment this domain belongs to
   */
  environmentId: string;

  /**
   * The full URL of the service domain
   */
  url: string;

  /**
   * The timestamp when the service domain was created
   */
  createdAt: string;

  /**
   * The timestamp when the service domain was last updated
   */
  updatedAt: string;
}

/**
 * Create and manage Railway service domains
 *
 * @example
 * ```typescript
 * // Create a service domain for your API
 * const apiDomain = await ServiceDomain("api-domain", {
 *   domain: "my-api",
 *   service: service,
 *   environment: environment,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a service domain for frontend
 * const frontendDomain = await ServiceDomain("frontend-domain", {
 *   domain: "my-app-frontend",
 *   service: webService,
 *   environment: production,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Create a service domain with custom authentication
 * const domain = await ServiceDomain("service-domain", {
 *   domain: "my-service",
 *   service: "service-id-string",
 *   environment: "environment-id-string",
 *   apiKey: secret("service-railway-token"),
 * });
 * ```
 */
export const ServiceDomain = Resource(
  "railway::ServiceDomain",
  async function (
    this: Context<ServiceDomain>,
    _id: string,
    props: ServiceDomainProps,
  ): Promise<ServiceDomain> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await deleteServiceDomain(api, this.output.id);
        }
      } catch (error) {
        handleRailwayDeleteError(error, "ServiceDomain", this.output?.id);
      }

      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const serviceDomain = await updateServiceDomain(
        api,
        this.output.id,
        props,
      );

      return this({
        id: serviceDomain.id,
        domain: serviceDomain.domain,
        serviceId: serviceDomain.serviceId,
        environmentId: serviceDomain.environmentId,
        url: serviceDomain.url,
        createdAt: serviceDomain.createdAt,
        updatedAt: serviceDomain.updatedAt,
      });
    }

    const serviceDomain = await createServiceDomain(api, props);

    return this({
      id: serviceDomain.id,
      domain: serviceDomain.domain,
      serviceId: serviceDomain.serviceId,
      environmentId: serviceDomain.environmentId,
      url: serviceDomain.url,
      createdAt: serviceDomain.createdAt,
      updatedAt: serviceDomain.updatedAt,
    });
  },
);

const SERVICE_DOMAIN_CREATE_MUTATION = `
  mutation ServiceDomainCreate($input: ServiceDomainCreateInput!) {
    serviceDomainCreate(input: $input) {
      id
      domain
      serviceId
      environmentId
      url
      createdAt
      updatedAt
    }
  }
`;

const SERVICE_DOMAIN_UPDATE_MUTATION = `
  mutation ServiceDomainUpdate($id: String!, $input: ServiceDomainUpdateInput!) {
    serviceDomainUpdate(id: $id, input: $input) {
      id
      domain
      serviceId
      environmentId
      url
      createdAt
      updatedAt
    }
  }
`;

const SERVICE_DOMAIN_QUERY = `
  query ServiceDomain($id: String!) {
    serviceDomain(id: $id) {
      id
      domain
      serviceId
      environmentId
      url
      createdAt
      updatedAt
    }
  }
`;

const SERVICE_DOMAIN_DELETE_MUTATION = `
  mutation ServiceDomainDelete($id: String!) {
    serviceDomainDelete(id: $id)
  }
`;

export async function createServiceDomain(api: RailwayApi, props: ServiceDomainProps) {
  const serviceId =
    typeof props.service === "string" ? props.service : props.service.id;
  const environmentId =
    typeof props.environment === "string"
      ? props.environment
      : props.environment.id;

  const response = await api.mutate(
    SERVICE_DOMAIN_CREATE_MUTATION,
    {
      input: {
        domain: props.domain,
        serviceId: serviceId,
        environmentId: environmentId,
      },
    },
  );

  const serviceDomain = response.data?.serviceDomainCreate;
  if (!serviceDomain) {
    throw new Error("Failed to create Railway service domain");
  }

  return serviceDomain;
}

export async function updateServiceDomain(
  api: RailwayApi,
  id: string,
  props: ServiceDomainProps,
) {
  const response = await api.mutate(
    SERVICE_DOMAIN_UPDATE_MUTATION,
    {
      id,
      input: {
        domain: props.domain,
      },
    },
  );

  const serviceDomain = response.data?.serviceDomainUpdate;
  if (!serviceDomain) {
    throw new Error("Failed to update Railway service domain");
  }

  return serviceDomain;
}

export async function getServiceDomain(api: RailwayApi, id: string) {
  const response = await api.query(
    SERVICE_DOMAIN_QUERY,
    { id },
  );

  const serviceDomain = response.data?.serviceDomain;
  if (!serviceDomain) {
    throw new Error("Failed to fetch Railway service domain");
  }

  return serviceDomain;
}

export async function deleteServiceDomain(api: RailwayApi, id: string) {
  await api.mutate(
    SERVICE_DOMAIN_DELETE_MUTATION,
    { id },
  );
}

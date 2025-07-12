import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { createRailwayApi, type RailwayApi } from "./api.ts";
import type { Service } from "./service.ts";
import type { Environment } from "./environment.ts";

export interface CustomDomainProps {
  /**
   * The custom domain name to configure
   */
  domain: string;

  /**
   * The service this domain points to. Can be a Service resource or service ID string
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

export interface CustomDomain
  extends Resource<"railway::CustomDomain">,
    Omit<CustomDomainProps, "service" | "environment"> {
  /**
   * The unique identifier of the custom domain
   */
  id: string;

  /**
   * The ID of the service this domain points to
   */
  serviceId: string;

  /**
   * The ID of the environment this domain belongs to
   */
  environmentId: string;

  /**
   * The status of the custom domain configuration
   */
  status: string;

  /**
   * The timestamp when the custom domain was created
   */
  createdAt: string;

  /**
   * The timestamp when the custom domain was last updated
   */
  updatedAt: string;
}

// GraphQL operations
const CUSTOM_DOMAIN_CREATE_MUTATION = `
  mutation CustomDomainCreate($input: CustomDomainCreateInput!) {
    customDomainCreate(input: $input) {
      id
      domain
      serviceId
      environmentId
      status
      createdAt
      updatedAt
    }
  }
`;

const CUSTOM_DOMAIN_QUERY = `
  query CustomDomain($id: String!) {
    customDomain(id: $id) {
      id
      domain
      serviceId
      environmentId
      status
      createdAt
      updatedAt
    }
  }
`;

const CUSTOM_DOMAIN_DELETE_MUTATION = `
  mutation CustomDomainDelete($id: String!) {
    customDomainDelete(id: $id)
  }
`;

/**
 * Create and manage custom domains for Railway services
 *
 * @example
 * ```typescript
 * // Configure a custom domain for your web service
 * const customDomain = await CustomDomain("api-domain", {
 *   domain: "api.example.com",
 *   service: webService,
 *   environment: environment,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Set up a production domain with SSL
 * const productionDomain = await CustomDomain("prod-domain", {
 *   domain: "app.mycompany.com",
 *   service: "service-id-string",
 *   environment: "production-env-id",
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Configure subdomain for API service with authentication
 * const apiDomain = await CustomDomain("api-subdomain", {
 *   domain: "v1.api.acme.org",
 *   service: apiService,
 *   environment: environment,
 *   apiKey: secret("custom-railway-token"),
 * });
 * ```
 */
export const CustomDomain = Resource(
  "railway::CustomDomain",
  async function (
    this: Context<CustomDomain>,
    _id: string,
    props: CustomDomainProps,
  ): Promise<CustomDomain> {
    const api = createRailwayApi({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      if (this.output?.id) {
        await deleteCustomDomain(api, this.output.id);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      const customDomain = await getCustomDomain(api, this.output.id);

      return this({
        id: customDomain.id,
        domain: customDomain.domain,
        serviceId: customDomain.serviceId,
        environmentId: customDomain.environmentId,
        status: customDomain.status,
        createdAt: customDomain.createdAt,
        updatedAt: customDomain.updatedAt,
      });
    }

    const customDomain = await createCustomDomain(api, props);

    return this({
      id: customDomain.id,
      domain: customDomain.domain,
      serviceId: customDomain.serviceId,
      environmentId: customDomain.environmentId,
      status: customDomain.status,
      createdAt: customDomain.createdAt,
      updatedAt: customDomain.updatedAt,
    });
  },
);

export async function createCustomDomain(api: RailwayApi, props: CustomDomainProps) {
  const serviceId =
    typeof props.service === "string" ? props.service : props.service.id;
  const environmentId =
    typeof props.environment === "string"
      ? props.environment
      : props.environment.id;

  const response = await api.mutate(CUSTOM_DOMAIN_CREATE_MUTATION, {
    input: {
      domain: props.domain,
      serviceId: serviceId,
      environmentId: environmentId,
    },
  });

  const customDomain = response.data?.customDomainCreate;
  if (!customDomain) {
    throw new Error("Failed to create Railway custom domain");
  }

  return customDomain;
}

export async function getCustomDomain(api: RailwayApi, id: string) {
  const response = await api.query(CUSTOM_DOMAIN_QUERY, { id });

  const customDomain = response.data?.customDomain;
  if (!customDomain) {
    throw new Error("Failed to fetch Railway custom domain");
  }

  return customDomain;
}

export async function deleteCustomDomain(api: RailwayApi, id: string) {
  await api.mutate(CUSTOM_DOMAIN_DELETE_MUTATION, { id });
}

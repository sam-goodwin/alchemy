import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import { createResendApi, type ResendApiOptions } from "./api.ts";

/**
 * Domain region for Resend
 */
export type ResendDomainRegion = "us-east-1" | "eu-west-1" | "sa-east-1";

/**
 * Domain status in Resend
 */
export type ResendDomainStatus =
  | "not_started"
  | "pending"
  | "verified"
  | "failed";

/**
 * DNS record for domain verification
 */
export interface ResendDnsRecord {
  /**
   * DNS record name
   */
  name: string;

  /**
   * DNS record type
   */
  type: string;

  /**
   * DNS record value
   */
  value: string;

  /**
   * DNS record TTL
   */
  ttl?: string;

  /**
   * DNS record priority (for MX records)
   */
  priority?: number;

  /**
   * DNS record status
   */
  status: ResendDomainStatus;
}

/**
 * Properties for creating or updating a Resend domain
 */
export interface ResendDomainProps extends ResendApiOptions {
  /**
   * Domain name to add
   */
  name: string;

  /**
   * Region where the domain will be used
   * @default "us-east-1"
   */
  region?: ResendDomainRegion;

  /**
   * Existing domain ID to update
   * Used internally during update operations
   * @internal
   */
  existing_domain_id?: string;
}

/**
 * API response structure for Resend domains
 */
interface ResendDomainApiResponse {
  id: string;
  name: string;
  region: ResendDomainRegion;
  status: ResendDomainStatus;
  records: ResendDnsRecord[];
  created_at: string;
}

/**
 * Output returned after Resend domain creation/update
 */
export interface ResendDomain
  extends Resource<"resend::Domain">,
    Omit<ResendDomainProps, "apiKey" | "existing_domain_id"> {
  /**
   * The ID of the domain
   */
  id: string;

  /**
   * Current status of the domain
   */
  status: ResendDomainStatus;

  /**
   * DNS records required for domain verification
   */
  records: ResendDnsRecord[];

  /**
   * Time at which the domain was created
   */
  created_at: string;
}

/**
 * Creates a Resend domain for sending emails.
 *
 * @example
 * ## Basic Domain Setup
 *
 * Create a domain with default settings:
 *
 * ```ts
 * const domain = await ResendDomain("my-domain", {
 *   name: "example.com"
 * });
 * ```
 *
 * @example
 * ## Domain with Custom Region
 *
 * Create a domain in a specific region:
 *
 * ```ts
 * const euDomain = await ResendDomain("eu-domain", {
 *   name: "example.com",
 *   region: "eu-west-1",
 *   apiKey: alchemy.secret(process.env.RESEND_API_KEY)
 * });
 * ```
 *
 * @example
 * ## Using Domain DNS Records
 *
 * Access the DNS records needed for domain verification:
 *
 * ```ts
 * const domain = await ResendDomain("verified-domain", {
 *   name: "example.com"
 * });
 *
 * // DNS records are available in domain.records
 * domain.records.forEach(record => {
 *   console.log(`${record.type}: ${record.name} -> ${record.value}`);
 * });
 * ```
 */
export const ResendDomain = Resource(
  "resend::Domain",
  async function (
    this: Context<ResendDomain>,
    id: string,
    props: ResendDomainProps,
  ): Promise<ResendDomain> {
    const api = createResendApi(props);
    const domainId = props.existing_domain_id || this.output?.id;

    if (this.phase === "delete") {
      try {
        if (domainId) {
          const deleteResponse = await api.delete(`/domains/${domainId}`);
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "delete", "domain", id);
          }
        }
      } catch (error) {
        logger.error(`Error deleting Resend domain ${id}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      let response: ResendDomainApiResponse;

      if (this.phase === "update" && domainId) {
        // Check if domain exists first
        const getResponse = await api.get(`/domains/${domainId}`);
        if (!getResponse.ok) {
          await handleApiError(getResponse, "get", "domain", id);
        }
        response = await getResponse.json();

        // Validate immutable properties
        if (response.name !== props.name) {
          throw new Error(
            `Cannot change domain name from '${response.name}' to '${props.name}'. Domain name is immutable after creation.`,
          );
        }
        if (response.region !== (props.region || "us-east-1")) {
          throw new Error(
            `Cannot change domain region from '${response.region}' to '${props.region || "us-east-1"}'. Domain region is immutable after creation.`,
          );
        }
      } else {
        // Check if domain with this ID already exists
        if (domainId) {
          const getResponse = await api.get(`/domains/${domainId}`);
          if (getResponse.ok) {
            response = await getResponse.json();

            // Validate immutable properties
            if (response.name !== props.name) {
              throw new Error(
                `Cannot change domain name from '${response.name}' to '${props.name}'. Domain name is immutable after creation.`,
              );
            }
            if (response.region !== (props.region || "us-east-1")) {
              throw new Error(
                `Cannot change domain region from '${response.region}' to '${props.region || "us-east-1"}'. Domain region is immutable after creation.`,
              );
            }
          } else if (getResponse.status !== 404) {
            await handleApiError(getResponse, "get", "domain", id);
            throw new Error("Failed to check if domain exists");
          } else {
            // Domain doesn't exist, create new
            response = await createNewDomain(api, props);
          }
        } else {
          // No output ID, create new domain
          response = await createNewDomain(api, props);
        }
      }

      return this({
        id: response.id,
        name: response.name,
        region: response.region,
        status: response.status,
        records: response.records,
        created_at: response.created_at,
        // Pass through the provided props except sensitive ones
        baseUrl: props.baseUrl,
      });
    } catch (error) {
      logger.error(`Error ${this.phase} Resend domain '${id}':`, error);
      throw error;
    }
  },
);

/**
 * Helper function to create a new Resend domain
 */
async function createNewDomain(
  api: any,
  props: ResendDomainProps,
): Promise<ResendDomainApiResponse> {
  const domainResponse = await api.post("/domains", {
    name: props.name,
    region: props.region || "us-east-1",
  });

  if (!domainResponse.ok) {
    await handleApiError(domainResponse, "create", "domain");
  }

  return (await domainResponse.json()) as ResendDomainApiResponse;
}

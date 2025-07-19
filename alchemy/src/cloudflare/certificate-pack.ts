import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import { findZoneForHostname, type Zone } from "./zone.ts";

/**
 * Certificate Authority options for Advanced Certificate Packs
 */
export type CertificateAuthority = "google" | "lets_encrypt" | "ssl_com";

/**
 * Validation method for certificate verification
 */
export type ValidationMethod = "txt" | "http" | "email";

/**
 * Validity period options for certificates
 */
export type ValidityDays = 14 | 30 | 90 | 365;

/**
 * Certificate pack status values during lifecycle
 */
export type CertificatePackStatus =
  | "initializing"
  | "pending_validation"
  | "deleted"
  | "pending_issuance"
  | "pending_deployment"
  | "pending_deletion"
  | "pending_expiration"
  | "expired"
  | "active"
  | "initializing_timed_out"
  | "validation_timed_out"
  | "issuance_timed_out"
  | "deployment_timed_out"
  | "deletion_timed_out"
  | "pending_cleanup"
  | "staging_deployment"
  | "staging_active"
  | "deactivating"
  | "inactive"
  | "backup_issued"
  | "holding_deployment";

/**
 * Properties for creating a Certificate Pack
 */
export interface CertificatePackProps extends CloudflareApiOptions {
  /**
   * The zone to create the certificate pack for
   * Can be a Zone resource, zone ID string, or omitted to auto-infer from hosts
   */
  zone?: string | Zone;

  /**
   * Certificate Authority to use for issuing the certificate
   * - google: Google Trust Services (Enterprise features)
   * - lets_encrypt: Let's Encrypt (Free, shorter validity periods)
   * - ssl_com: SSL.com (Commercial certificates with extended validation)
   *
   * **Note:** This property is immutable after creation. To change the CA,
   * you must delete and recreate the certificate pack.
   */
  certificateAuthority: CertificateAuthority;

  /**
   * List of hostnames to include in the certificate
   * Maximum 50 hosts, must include the zone apex (root domain)
   * Supports wildcards (e.g., "*.example.com")
   *
   * **Note:** This property is immutable after creation.
   */
  hosts: string[];

  /**
   * Certificate type - only "advanced" is supported
   *
   * **Note:** This property is immutable after creation.
   * @default "advanced"
   */
  type?: "advanced";

  /**
   * Method used to validate domain ownership
   * - txt: DNS TXT record validation
   * - http: HTTP file validation
   * - email: Email validation
   *
   * **Note:** This property is immutable after creation.
   */
  validationMethod: ValidationMethod;

  /**
   * Certificate validity period in days
   * Available options: 14, 30, 90, or 365 days
   *
   * **Note:** This property is immutable after creation.
   */
  validityDays: ValidityDays;

  /**
   * Whether to add Cloudflare branding subdomain as Common Name
   * Adds sni.cloudflaressl.com subdomain when enabled
   *
   * **Note:** This is the only property that can be updated after creation.
   * @default false
   */
  cloudflareBranding?: boolean;

  /**
   * Whether to delete the certificate pack
   * If set to false, the pack will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;
}

/**
 * Output returned after Certificate Pack creation/update
 */
export interface CertificatePack
  extends Resource<"cloudflare::CertificatePack"> {
  /**
   * The unique ID of the certificate pack
   */
  id: string;

  /**
   * Certificate Authority used for the certificate
   */
  certificateAuthority: CertificateAuthority;

  /**
   * Whether Cloudflare branding is enabled
   */
  cloudflareBranding: boolean;

  /**
   * List of hostnames included in the certificate
   */
  hosts: string[];

  /**
   * Current status of the certificate pack
   */
  status: CertificatePackStatus;

  /**
   * Certificate type
   */
  type: "advanced";

  /**
   * Validation method used for domain verification
   */
  validationMethod: ValidationMethod;

  /**
   * Certificate validity period in days
   */
  validityDays: ValidityDays;

  /**
   * Zone ID the certificate pack belongs to
   */
  zoneId: string;

  /**
   * Zone name (domain)
   */
  zoneName: string;
}

/**
 * Creates and manages Cloudflare Advanced Certificate Packs.
 *
 * Advanced Certificate Packs provide flexible SSL/TLS certificates with
 * multiple Certificate Authority options, custom validity periods, and
 * support for up to 50 hostnames per certificate.
 *
 * **Important Notes:**
 * - Requires a paid Cloudflare plan (not available on Free plans)
 * - Certificate provisioning can take up to 10 minutes
 * - Most properties are immutable after creation (only cloudflareBranding can be updated)
 * - To change immutable properties, you must delete and recreate the certificate pack
 *
 * @example
 * // Create a basic certificate pack with Let's Encrypt
 * const basicCert = await CertificatePack("my-cert", {
 *   zone: myZone,
 *   certificateAuthority: "lets_encrypt",
 *   hosts: ["example.com", "www.example.com"],
 *   validationMethod: "txt",
 *   validityDays: 90
 * });
 *
 * @example
 * // Create an enterprise certificate with Google Trust Services
 * const enterpriseCert = await CertificatePack("enterprise-cert", {
 *   zone: "example.com",
 *   certificateAuthority: "google",
 *   hosts: ["example.com", "*.example.com", "api.example.com"],
 *   validationMethod: "txt",
 *   validityDays: 365,
 *   cloudflareBranding: true
 * });
 *
 * @example
 * // Create a wildcard certificate with SSL.com
 * const wildcardCert = await CertificatePack("wildcard-cert", {
 *   zone: myZone,
 *   certificateAuthority: "ssl_com",
 *   hosts: ["example.com", "*.example.com"],
 *   validationMethod: "email",
 *   validityDays: 365
 * });
 *
 * @example
 * // Create a certificate for multiple subdomains
 * const multiDomainCert = await CertificatePack("multi-cert", {
 *   zone: "example.com",
 *   certificateAuthority: "lets_encrypt",
 *   hosts: [
 *     "example.com",
 *     "www.example.com",
 *     "api.example.com",
 *     "admin.example.com",
 *     "blog.example.com"
 *   ],
 *   validationMethod: "http",
 *   validityDays: 90
 * });
 *
 * @see https://developers.cloudflare.com/api/resources/ssl/subresources/certificate_packs/
 */
export const CertificatePack = Resource(
  "cloudflare::CertificatePack",
  async function (
    this: Context<CertificatePack>,
    _id: string,
    props: CertificatePackProps,
  ): Promise<CertificatePack> {
    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi(props);

    // Resolve zone ID and zone name
    let zoneId: string;
    let zoneName: string;

    if (props.zone) {
      // Zone provided - use it
      if (typeof props.zone === "string") {
        zoneId = props.zone;
        // Try to get zone name from API for better error messages
        try {
          const zoneResponse = await api.get(`/zones/${zoneId}`);
          if (zoneResponse.ok) {
            const zoneData = (await zoneResponse.json()) as {
              result: { name: string };
            };
            zoneName = zoneData.result.name;
          } else {
            zoneName = zoneId; // Fallback to ID
          }
        } catch {
          zoneName = zoneId; // Fallback to ID
        }
      } else {
        zoneId = props.zone.id;
        zoneName = props.zone.name || props.zone.id;
      }
    } else {
      // Auto-infer zone from the first host
      if (props.hosts.length === 0) {
        throw new Error(
          "At least one host must be specified when zone is not provided",
        );
      }

      logger.log(`Auto-inferring zone from hostname: ${props.hosts[0]}`);
      const zoneInfo = await findZoneForHostname(api, props.hosts[0]);
      zoneId = zoneInfo.zoneId;
      zoneName = zoneInfo.zoneName;
      logger.log(`Auto-inferred zone: ${zoneName} (${zoneId})`);
    }

    if (this.phase === "delete") {
      if (this.output?.id && props.delete !== false) {
        const deleteResponse = await api.delete(
          `/zones/${zoneId}/ssl/certificate_packs/${this.output.id}`,
        );

        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          await handleApiError(
            deleteResponse,
            "delete",
            "certificate pack",
            this.output.id,
          );
        }
      } else {
        logger.warn("Certificate pack not found, skipping delete");
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.id) {
      // Validate immutable properties
      const currentPack = this.output;

      if (props.certificateAuthority !== currentPack.certificateAuthority) {
        throw new Error(
          `Cannot change certificateAuthority from '${currentPack.certificateAuthority}' to '${props.certificateAuthority}'. Certificate Authority is immutable after creation. You must delete and recreate the certificate pack.`,
        );
      }

      if (
        JSON.stringify(props.hosts.sort()) !==
        JSON.stringify(currentPack.hosts.sort())
      ) {
        throw new Error(
          `Cannot change hosts from [${currentPack.hosts.join(", ")}] to [${props.hosts.join(", ")}]. Hosts are immutable after creation. You must delete and recreate the certificate pack.`,
        );
      }

      if (props.validationMethod !== currentPack.validationMethod) {
        throw new Error(
          `Cannot change validationMethod from '${currentPack.validationMethod}' to '${props.validationMethod}'. Validation method is immutable after creation. You must delete and recreate the certificate pack.`,
        );
      }

      if (props.validityDays !== currentPack.validityDays) {
        throw new Error(
          `Cannot change validityDays from ${currentPack.validityDays} to ${props.validityDays}. Validity period is immutable after creation. You must delete and recreate the certificate pack.`,
        );
      }

      const type = props.type || "advanced";
      if (type !== currentPack.type) {
        throw new Error(
          `Cannot change type from '${currentPack.type}' to '${type}'. Type is immutable after creation. You must delete and recreate the certificate pack.`,
        );
      }

      // Only cloudflareBranding can be updated
      if (props.cloudflareBranding !== currentPack.cloudflareBranding) {
        logger.log(
          `Updating certificate pack cloudflare branding from ${currentPack.cloudflareBranding} to ${props.cloudflareBranding}`,
        );

        const updateResponse = await api.patch(
          `/zones/${zoneId}/ssl/certificate_packs/${this.output.id}`,
          {
            cloudflare_branding: props.cloudflareBranding || false,
          },
        );

        if (!updateResponse.ok) {
          await handleApiError(
            updateResponse,
            "update",
            "certificate pack",
            this.output.id,
          );
        }
      }

      // Get updated certificate pack details
      const response = await api.get(
        `/zones/${zoneId}/ssl/certificate_packs/${this.output.id}`,
      );

      if (!response.ok) {
        await handleApiError(
          response,
          "get",
          "certificate pack",
          this.output.id,
        );
      }

      const updatedPack = (
        (await response.json()) as { result: CloudflareCertificatePack }
      ).result;

      return this({
        id: updatedPack.id,
        certificateAuthority: updatedPack.certificate_authority,
        cloudflareBranding: updatedPack.cloudflare_branding,
        hosts: updatedPack.hosts,
        status: updatedPack.status,
        type: updatedPack.type,
        validationMethod: updatedPack.validation_method,
        validityDays: updatedPack.validity_days,
        zoneId: updatedPack.zone_id,
        zoneName: zoneName,
      });
    }

    // Create new certificate pack
    if (props.hosts.length === 0) {
      throw new Error("At least one host must be specified");
    }

    if (props.hosts.length > 50) {
      throw new Error("Maximum 50 hosts are allowed per certificate pack");
    }

    // Validate that zone apex is included
    const hasZoneApex = props.hosts.some(
      (host) => host === zoneName || (zoneName && host === zoneName),
    );

    if (!hasZoneApex && zoneName) {
      logger.warn(
        `Zone apex '${zoneName}' is not included in hosts. This may cause certificate validation issues.`,
      );
    }

    // Check for existing certificate pack that matches our configuration
    const existingPack = await findMatchingCertificatePack(api, zoneId, props);

    if (existingPack) {
      // Adopt the existing certificate pack
      logger.log(
        `Adopting existing certificate pack ${existingPack.id} instead of creating a new one`,
      );

      return this({
        id: existingPack.id,
        certificateAuthority: existingPack.certificate_authority,
        cloudflareBranding: existingPack.cloudflare_branding,
        hosts: existingPack.hosts,
        status: existingPack.status,
        type: existingPack.type,
        validationMethod: existingPack.validation_method,
        validityDays: existingPack.validity_days,
        zoneId: existingPack.zone_id,
        zoneName: zoneName,
      });
    }

    logger.log(
      `Creating certificate pack with ${props.hosts.length} hosts using ${props.certificateAuthority}`,
    );

    const createResponse = await api.post(
      `/zones/${zoneId}/ssl/certificate_packs/order`,
      {
        certificate_authority: props.certificateAuthority,
        cloudflare_branding: props.cloudflareBranding || false,
        hosts: props.hosts,
        type: props.type || "advanced",
        validation_method: props.validationMethod,
        validity_days: props.validityDays,
      },
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();

      // Provide helpful error messages for common issues
      if (errorText.includes("subscription")) {
        throw new Error(
          `Failed to create certificate pack: Advanced Certificate Packs require a paid Cloudflare plan. Please upgrade your subscription to use this feature.\n\nOriginal error: ${errorText}`,
        );
      }

      if (errorText.includes("quota")) {
        throw new Error(
          `Failed to create certificate pack: Certificate pack quota exceeded. Please check your account limits.\n\nOriginal error: ${errorText}`,
        );
      }

      // Throw generic error for other cases
      throw new Error(
        `Failed to create certificate pack: ${createResponse.statusText}\n\n${errorText}`,
      );
    }

    const createdPack = (
      (await createResponse.json()) as { result: CloudflareCertificatePack }
    ).result;

    logger.log(
      `Certificate pack created with ID ${createdPack.id}. Status: ${createdPack.status}. Note: Certificate provisioning can take up to 10 minutes.`,
    );

    return this({
      id: createdPack.id,
      certificateAuthority: createdPack.certificate_authority,
      cloudflareBranding: createdPack.cloudflare_branding,
      hosts: createdPack.hosts,
      status: createdPack.status,
      type: createdPack.type,
      validationMethod: createdPack.validation_method,
      validityDays: createdPack.validity_days,
      zoneId: createdPack.zone_id,
      zoneName: zoneName,
    });
  },
);

/**
 * Cloudflare Certificate Pack API response format
 */
interface CloudflareCertificatePack {
  id: string;
  certificate_authority: CertificateAuthority;
  cloudflare_branding: boolean;
  hosts: string[];
  status: CertificatePackStatus;
  type: "advanced";
  validation_method: ValidationMethod;
  validity_days: ValidityDays;
  zone_id: string;
}

/**
 * Helper function to wait for certificate pack to reach active status
 * Useful for testing or when you need to ensure the certificate is ready
 *
 * @param api CloudflareApi instance
 * @param zoneId Zone ID
 * @param certificatePackId Certificate pack ID
 * @param timeoutMs Maximum time to wait in milliseconds (default: 15 minutes)
 * @returns Promise resolving to the final certificate pack status
 *
 * @example
 * // Wait for certificate to become active
 * const finalStatus = await waitForCertificatePackActive(
 *   api,
 *   zoneId,
 *   certificatePack.id,
 *   10 * 60 * 1000 // 10 minutes
 * );
 * console.log(`Certificate pack is now: ${finalStatus}`);
 */
export async function waitForCertificatePackActive(
  api: CloudflareApi,
  zoneId: string,
  certificatePackId: string,
  timeoutMs: number = 15 * 60 * 1000, // 15 minutes default
): Promise<CertificatePackStatus> {
  const startTime = Date.now();
  const pollInterval = 30 * 1000; // Poll every 30 seconds

  while (Date.now() - startTime < timeoutMs) {
    const response = await api.get(
      `/zones/${zoneId}/ssl/certificate_packs/${certificatePackId}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to check certificate pack status: ${response.statusText}`,
      );
    }

    const pack = (
      (await response.json()) as { result: CloudflareCertificatePack }
    ).result;

    // Return immediately if active or in a final error state
    if (pack.status === "active") {
      return pack.status;
    }

    if (
      pack.status.includes("timed_out") ||
      pack.status === "expired" ||
      pack.status === "deleted"
    ) {
      return pack.status;
    }

    // Wait before next poll
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error(
    `Certificate pack did not become active within ${timeoutMs / 1000 / 60} minutes`,
  );
}

/**
 * Helper function to find existing certificate packs that match the given configuration
 * Used to adopt existing certificates instead of creating duplicates
 *
 * @param api CloudflareApi instance
 * @param zoneId Zone ID to search in
 * @param props Certificate pack properties to match
 * @returns Promise resolving to matching certificate pack or null if none found
 */
async function findMatchingCertificatePack(
  api: CloudflareApi,
  zoneId: string,
  props: CertificatePackProps,
): Promise<CloudflareCertificatePack | null> {
  const response = await api.get(`/zones/${zoneId}/ssl/certificate_packs`);

  if (!response.ok) {
    throw new Error(`Failed to list certificate packs: ${response.statusText}`);
  }

  const packsData = (await response.json()) as {
    result: CloudflareCertificatePack[];
  };

  // Find a certificate pack that matches our configuration
  for (const pack of packsData.result) {
    // Skip deleted or expired packs
    if (pack.status === "deleted" || pack.status === "expired") {
      continue;
    }

    // Check if the configuration matches
    if (
      pack.certificate_authority === props.certificateAuthority &&
      pack.validation_method === props.validationMethod &&
      pack.validity_days === props.validityDays &&
      pack.type === (props.type || "advanced")
    ) {
      // Check if all requested hosts are covered by this certificate pack
      const packHosts = new Set(pack.hosts);
      const allHostsCovered = props.hosts.every((host) => packHosts.has(host));

      if (allHostsCovered) {
        logger.log(
          `Found existing certificate pack ${pack.id} that covers all requested hosts`,
        );
        return pack;
      }
    }
  }

  return null;
}

import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import type { Zone } from "./zone.ts";

/**
 * SSL certificate validation method
 */
export type SslValidationMethod = "http" | "txt" | "email";

/**
 * SSL certificate type
 */
export type SslCertificateType = "dv";

/**
 * HTTP/2 setting
 */
export type Http2Setting = "on" | "off";

/**
 * TLS 1.3 setting
 */
export type Tls13Setting = "on" | "off";

/**
 * Minimum TLS version
 */
export type MinTlsVersion = "1.0" | "1.1" | "1.2" | "1.3";

/**
 * SSL certificate bundle method
 */
export type SslBundleMethod = "ubiquitous" | "optimal" | "force_ubiquitous";

/**
 * SSL certificate advanced settings
 */
export interface SslAdvancedSettings {
  /**
   * HTTP/2 settings
   * "on" - Enable HTTP/2
   * "off" - Disable HTTP/2
   * @default "on"
   */
  http2?: Http2Setting;

  /**
   * TLS 1.3 settings
   * "on" - Enable TLS 1.3
   * "off" - Disable TLS 1.3
   * @default "on"
   */
  tls_1_3?: Tls13Setting;

  /**
   * Minimum TLS version
   * @default "1.2"
   */
  min_tls_version?: MinTlsVersion;

  /**
   * Cipher list
   */
  ciphers?: string[];
}

/**
 * SSL settings for custom hostname
 */
export interface CustomHostnameSslSettings {
  /**
   * SSL certificate method
   * "http" - HTTP validation
   * "txt" - TXT record validation
   * "email" - Email validation
   * @default "http"
   */
  method?: SslValidationMethod;

  /**
   * SSL certificate type
   * "dv" - Domain Validated
   * @default "dv"
   */
  type?: SslCertificateType;

  /**
   * SSL certificate settings
   */
  settings?: SslAdvancedSettings;

  /**
   * Bundle method for certificate
   * "ubiquitous" - Ubiquitous bundle
   * "optimal" - Optimal bundle
   * "force_ubiquitous" - Force ubiquitous bundle
   * @default "ubiquitous"
   */
  bundle_method?: SslBundleMethod;

  /**
   * Wildcard setting
   * @default false
   */
  wildcard?: boolean;
}

/**
 * Properties for creating or updating a CustomHostname
 */
export interface CustomHostnameProps extends CloudflareApiOptions {
  /**
   * The custom hostname
   */
  hostname: string;

  /**
   * The zone where the custom hostname will be created.
   * Can be a Zone resource or zone ID string.
   */
  zone: string | Zone;

  /**
   * SSL configuration for the custom hostname
   */
  ssl?: CustomHostnameSslSettings;

  /**
   * Custom metadata for the hostname (key-value pairs)
   */
  custom_metadata?: Record<string, string>;
}

/**
 * SSL verification details from Cloudflare API
 */
interface CustomHostnameSslVerification {
  method: string;
  type: string;
  record_name?: string;
  record_value?: string;
  txt_name?: string;
  txt_value?: string;
  http_url?: string;
  http_body?: string;
}

/**
 * SSL status from Cloudflare API
 */
interface CustomHostnameSsl {
  id?: string;
  status: string;
  method: SslValidationMethod;
  type: SslCertificateType;
  verification_type?: string;
  verification_info?: CustomHostnameSslVerification;
  certificate_authority?: string;
  bundle_method?: SslBundleMethod;
  wildcard?: boolean;
  settings?: {
    http2?: Http2Setting;
    tls_1_3?: Tls13Setting;
    min_tls_version?: MinTlsVersion;
    ciphers?: string[];
  };
}

/**
 * Ownership verification from Cloudflare API
 */
interface CustomHostnameOwnershipVerification {
  type: string;
  name: string;
  value: string;
}

/**
 * Cloudflare Custom Hostname object structure from API
 */
interface CloudflareCustomHostname {
  id: string;
  hostname: string;
  ssl: CustomHostnameSsl;
  custom_metadata?: Record<string, string>;
  status: string;
  verification_errors?: string[];
  ownership_verification?: CustomHostnameOwnershipVerification;
  ownership_verification_http?: {
    http_url: string;
    http_body: string;
  };
  created_at: string;
  modified_at?: string;
}

/**
 * Output returned after CustomHostname creation/update
 */
export interface CustomHostname
  extends Resource<"cloudflare::CustomHostname">,
    Omit<CustomHostnameProps, "zone"> {
  /**
   * The unique identifier for the custom hostname
   */
  id: string;

  /**
   * The zone ID where the custom hostname was created
   */
  zoneId: string;

  /**
   * Current status of the custom hostname
   * "pending_validation" - Waiting for validation
   * "pending_issuance" - Certificate being issued
   * "pending_deployment" - Certificate being deployed
   * "active" - Active and ready to use
   * "moved" - Hostname moved to different account
   * "deleted" - Hostname deleted
   */
  status: string;

  /**
   * SSL certificate information and status
   */
  ssl: CustomHostnameSsl;

  /**
   * Ownership verification information
   */
  ownershipVerification?: CustomHostnameOwnershipVerification;

  /**
   * HTTP ownership verification (if applicable)
   */
  ownershipVerificationHttp?: {
    httpUrl: string;
    httpBody: string;
  };

  /**
   * Any verification errors
   */
  verificationErrors?: string[];

  /**
   * Time at which the custom hostname was created
   */
  createdAt: number;

  /**
   * Time at which the custom hostname was last modified
   */
  modifiedAt?: number;
}

/**
 * Create and manage Custom Hostnames for Cloudflare for SaaS.
 * Custom Hostnames allow you to provide SSL certificates for your customer's domains.
 *
 * @example
 * ## Basic Custom Hostname
 *
 * Create a custom hostname with default SSL settings:
 *
 * ```ts
 * const zone = await Zone("example-zone", {
 *   name: "example.com"
 * });
 *
 * const customHostname = await CustomHostname("customer-hostname", {
 *   hostname: "app.customer.com",
 *   zone: zone,
 *   ssl: {
 *     method: "http",
 *     type: "dv"
 *   }
 * });
 * ```
 *
 * @example
 * ## Custom Hostname with Advanced SSL Settings
 *
 * Create a custom hostname with specific SSL configuration:
 *
 * ```ts
 * const customHostname = await CustomHostname("secure-hostname", {
 *   hostname: "secure.customer.com",
 *   zone: "your-zone-id",
 *   ssl: {
 *     method: "txt",
 *     type: "dv",
 *     settings: {
 *       http2: "on",
 *       tls_1_3: "on",
 *       min_tls_version: "1.2"
 *     },
 *     bundle_method: "optimal"
 *   },
 *   custom_metadata: {
 *     customer_id: "12345",
 *     plan: "enterprise"
 *   }
 * });
 * ```
 *
 * @see https://developers.cloudflare.com/api/resources/custom_hostnames/
 * @see https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/
 */
export const CustomHostname = Resource(
  "cloudflare::CustomHostname",
  async function (
    this: Context<CustomHostname>,
    logicalId: string,
    props: CustomHostnameProps,
  ): Promise<CustomHostname> {
    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi(props);

    // Extract zone ID from Zone resource or use string directly
    const zoneId = typeof props.zone === "string" ? props.zone : props.zone.id;

    if (this.phase === "delete") {
      await deleteCustomHostname(this, api, zoneId, logicalId);
      return this.destroy();
    }

    // Create or Update phase
    return await ensureCustomHostname(this, api, zoneId, logicalId, props);
  },
);

/**
 * Helper function to delete the custom hostname
 */
async function deleteCustomHostname(
  context: Context<CustomHostname>,
  api: CloudflareApi,
  zoneId: string,
  logicalId: string,
): Promise<void> {
  const customHostnameId = context.output?.id;

  if (!customHostnameId) {
    logger.warn(
      `Cannot delete CustomHostname ${logicalId}: Missing custom hostname ID in state. Assuming already deleted.`,
    );
    return;
  }

  logger.log(`Deleting CustomHostname ${customHostnameId} from zone ${zoneId}`);

  const response = await api.delete(
    `/zones/${zoneId}/custom_hostnames/${customHostnameId}`,
  );

  logger.log(
    `Delete result for ${customHostnameId}:`,
    response.status,
    response.statusText,
  );

  // 404 is acceptable during deletion for idempotency
  if (!response.ok && response.status !== 404) {
    await handleApiError(
      response,
      "deleting",
      "custom hostname",
      customHostnameId,
    );
    throw new Error(
      `Failed to delete custom hostname ${customHostnameId}: ${response.statusText}`,
    );
  }
}

/**
 * Helper function to create or update the custom hostname
 */
async function ensureCustomHostname(
  context: Context<CustomHostname>,
  api: CloudflareApi,
  zoneId: string,
  _logicalId: string,
  props: CustomHostnameProps,
): Promise<CustomHostname> {
  const hostname = props.hostname;
  let existingHostname: CloudflareCustomHostname | undefined;

  // Check if custom hostname already exists in the zone
  logger.log(
    `Checking existing custom hostnames for zone ${zoneId} and hostname ${hostname}`,
  );

  const listResponse = await api.get(`/zones/${zoneId}/custom_hostnames`);

  if (!listResponse.ok) {
    await handleApiError(
      listResponse,
      "listing",
      "custom hostnames",
      `Zone ${zoneId}`,
    );
    throw new Error(
      `Failed to list custom hostnames for zone ${zoneId}: ${listResponse.statusText}`,
    );
  }

  const listData = (await listResponse.json()) as {
    result?: CloudflareCustomHostname[];
    success: boolean;
  };

  if (!listData.success || !listData.result) {
    throw new Error(
      `Failed to parse list custom hostnames response: ${JSON.stringify(listData)}`,
    );
  }

  // Find existing hostname by hostname value
  existingHostname = listData.result.find((h) => h.hostname === hostname);

  let operationPerformed: "create" | "update" | "none" = "none";
  let resultHostname: CloudflareCustomHostname;

  if (existingHostname) {
    // Update existing hostname if needed
    const needsUpdate = doesCustomHostnameNeedUpdate(existingHostname, props);

    if (needsUpdate) {
      operationPerformed = "update";
      logger.log(
        `Updating custom hostname: ${hostname} (ID: ${existingHostname.id})`,
      );

      const updatePayload = buildCustomHostnamePayload(props);
      const patchResponse = await api.patch(
        `/zones/${zoneId}/custom_hostnames/${existingHostname.id}`,
        updatePayload,
      );

      if (!patchResponse.ok) {
        await handleApiError(
          patchResponse,
          "updating",
          "custom hostname",
          hostname,
        );
        throw new Error(
          `Failed to update custom hostname ${hostname}: ${patchResponse.statusText}`,
        );
      }

      const patchResult = (await patchResponse.json()) as {
        result?: CloudflareCustomHostname;
        success: boolean;
      };

      if (!patchResult.success || !patchResult.result) {
        throw new Error(
          `Failed to parse update custom hostname response: ${JSON.stringify(patchResult)}`,
        );
      }

      resultHostname = patchResult.result;
      logger.log(`Successfully updated custom hostname: ${hostname}`);
    } else {
      logger.log(
        `Custom hostname already exists and is up to date: ${hostname} (ID: ${existingHostname.id})`,
      );
      resultHostname = existingHostname;
    }
  } else {
    // Create new custom hostname
    operationPerformed = "create";
    logger.log(`Creating custom hostname: ${hostname} in zone ${zoneId}`);

    const createPayload = buildCustomHostnamePayload(props);
    const postResponse = await api.post(
      `/zones/${zoneId}/custom_hostnames`,
      createPayload,
    );

    if (!postResponse.ok) {
      await handleApiError(
        postResponse,
        "creating",
        "custom hostname",
        hostname,
      );
      throw new Error(
        `Failed to create custom hostname ${hostname}: ${postResponse.statusText}`,
      );
    }

    const postResult = (await postResponse.json()) as {
      result?: CloudflareCustomHostname;
      success: boolean;
    };

    if (!postResult.success || !postResult.result) {
      throw new Error(
        `Failed to parse create custom hostname response: ${JSON.stringify(postResult)}`,
      );
    }

    resultHostname = postResult.result;
    logger.log(
      `Successfully created custom hostname: ${hostname} (ID: ${resultHostname.id})`,
    );
  }

  const now = Date.now();

  // Construct the output state
  return context({
    ...props,
    id: resultHostname.id,
    zoneId,
    hostname: resultHostname.hostname,
    status: resultHostname.status,
    ssl: resultHostname.ssl,
    custom_metadata: resultHostname.custom_metadata,
    ownershipVerification: resultHostname.ownership_verification,
    ownershipVerificationHttp: resultHostname.ownership_verification_http
      ? {
          httpUrl: resultHostname.ownership_verification_http.http_url,
          httpBody: resultHostname.ownership_verification_http.http_body,
        }
      : undefined,
    verificationErrors: resultHostname.verification_errors,
    createdAt: new Date(resultHostname.created_at).getTime(),
    modifiedAt: resultHostname.modified_at
      ? new Date(resultHostname.modified_at).getTime()
      : operationPerformed !== "none"
        ? now
        : context.output?.modifiedAt,
  });
}

/**
 * Helper function to build the API payload for custom hostname creation/update
 */
function buildCustomHostnamePayload(props: CustomHostnameProps) {
  const payload: any = {
    hostname: props.hostname,
  };

  if (props.ssl) {
    payload.ssl = {
      method: props.ssl.method || "http",
      type: props.ssl.type || "dv",
    };

    if (props.ssl.settings) {
      payload.ssl.settings = props.ssl.settings;
    }

    if (props.ssl.bundle_method) {
      payload.ssl.bundle_method = props.ssl.bundle_method;
    }

    if (props.ssl.wildcard !== undefined) {
      payload.ssl.wildcard = props.ssl.wildcard;
    }
  }

  if (props.custom_metadata) {
    payload.custom_metadata = props.custom_metadata;
  }

  return payload;
}

/**
 * Helper function to determine if a custom hostname needs updating
 */
function doesCustomHostnameNeedUpdate(
  existing: CloudflareCustomHostname,
  props: CustomHostnameProps,
): boolean {
  // Check hostname
  if (existing.hostname !== props.hostname) {
    return true;
  }

  // Check SSL settings
  if (props.ssl) {
    if (!existing.ssl) {
      return true;
    }

    // Check SSL method
    const expectedMethod = props.ssl.method || "http";
    if (existing.ssl.method !== expectedMethod) {
      return true;
    }

    // Check SSL type
    const expectedType = props.ssl.type || "dv";
    if (existing.ssl.type !== expectedType) {
      return true;
    }

    // Check SSL bundle method
    if (props.ssl.bundle_method !== undefined) {
      if (existing.ssl.bundle_method !== props.ssl.bundle_method) {
        return true;
      }
    }

    // Check SSL wildcard
    if (props.ssl.wildcard !== undefined) {
      if (existing.ssl.wildcard !== props.ssl.wildcard) {
        return true;
      }
    }

    // Check SSL settings
    if (props.ssl.settings) {
      if (!existing.ssl.settings) {
        return true;
      }

      // Check HTTP/2 setting
      if (props.ssl.settings.http2 !== undefined) {
        if (existing.ssl.settings.http2 !== props.ssl.settings.http2) {
          return true;
        }
      }

      // Check TLS 1.3 setting
      if (props.ssl.settings.tls_1_3 !== undefined) {
        if (existing.ssl.settings.tls_1_3 !== props.ssl.settings.tls_1_3) {
          return true;
        }
      }

      // Check min TLS version
      if (props.ssl.settings.min_tls_version !== undefined) {
        if (
          existing.ssl.settings.min_tls_version !==
          props.ssl.settings.min_tls_version
        ) {
          return true;
        }
      }

      // Check ciphers
      if (props.ssl.settings.ciphers !== undefined) {
        if (!existing.ssl.settings.ciphers) {
          return true;
        }
        if (
          props.ssl.settings.ciphers.length !==
          existing.ssl.settings.ciphers.length
        ) {
          return true;
        }
        for (let i = 0; i < props.ssl.settings.ciphers.length; i++) {
          if (
            props.ssl.settings.ciphers[i] !== existing.ssl.settings.ciphers[i]
          ) {
            return true;
          }
        }
      }
    }
  } else if (existing.ssl) {
    // Props has no SSL but existing has SSL - this is a change
    return true;
  }

  // Check custom metadata
  if (props.custom_metadata) {
    if (!existing.custom_metadata) {
      return true;
    }

    // Check all keys in props.custom_metadata
    for (const key of Object.keys(props.custom_metadata)) {
      if (existing.custom_metadata[key] !== props.custom_metadata[key]) {
        return true;
      }
    }

    // Check if existing has keys that props doesn't have
    for (const key of Object.keys(existing.custom_metadata)) {
      if (!(key in props.custom_metadata)) {
        return true;
      }
    }
  } else if (existing.custom_metadata) {
    // Props has no custom_metadata but existing has custom_metadata - this is a change
    return true;
  }

  return false;
}

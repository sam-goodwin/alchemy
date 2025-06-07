import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createFlyApi, type FlyApiOptions } from "./api.ts";
import type { App } from "./app.ts";

/**
 * Properties for creating or updating a Fly.io certificate
 */
export interface CertificateProps extends FlyApiOptions {
  /**
   * App this certificate belongs to (app name string or App resource)
   */
  app: string | App;

  /**
   * Hostname for the certificate
   */
  hostname: string;

  /**
   * Certificate type
   * @default "managed"
   */
  type?: "managed" | "manual";
}

/**
 * A Fly.io SSL/TLS certificate
 */
export interface Certificate
  extends Resource<"fly::Certificate">,
    Omit<CertificateProps, "apiToken"> {
  /**
   * The ID of the certificate
   */
  id: string;

  /**
   * Hostname for the certificate
   */
  hostname: string;

  /**
   * Whether certificate validation checks have passed
   */
  checkPassed: boolean;

  /**
   * Certificate source
   */
  source: string;

  /**
   * Time at which the certificate was created
   */
  createdAt: string;

  /**
   * Whether the certificate is configured
   */
  configured: boolean;

  /**
   * ACME error message, if any
   */
  acmeError?: string;

  /**
   * Whether the certificate is verified
   */
  verified: boolean;

  /**
   * Certificate authority that issued the certificate
   */
  certificateAuthority: string;

  /**
   * DNS validation target (for verification)
   */
  dnsValidationTarget?: string;

  /**
   * DNS validation hostname (for verification)
   */
  dnsValidationHostname?: string;
}

/**
 * Creates a Fly.io SSL/TLS certificate for custom domains.
 *
 * @example
 * ## Create a managed certificate
 *
 * Create a managed certificate for a custom domain:
 *
 * ```ts
 * const cert = await Certificate("main-cert", {
 *   app: "my-app",
 *   hostname: "example.com"
 * });
 * ```
 *
 * @example
 * ## Create a certificate for a subdomain
 *
 * Create a certificate for a subdomain:
 *
 * ```ts
 * const apiCert = await Certificate("api-cert", {
 *   app: myApp,
 *   hostname: "api.example.com",
 *   type: "managed"
 * });
 * ```
 *
 * @example
 * ## Create a wildcard certificate
 *
 * Create a wildcard certificate for multiple subdomains:
 *
 * ```ts
 * const wildcardCert = await Certificate("wildcard-cert", {
 *   app: myApp,
 *   hostname: "*.example.com"
 * });
 * ```
 */
export const Certificate = Resource(
  "fly::Certificate",
  async function (
    this: Context<Certificate>,
    id: string,
    props: CertificateProps,
  ): Promise<Certificate> {
    const api = createFlyApi(props);
    const appName = typeof props.app === "string" ? props.app : props.app.name;
    const certificateId = this.output?.id;

    if (this.phase === "delete") {
      try {
        if (certificateId) {
          const deleteResponse = await api.delete(
            `/apps/${appName}/certificates/${certificateId}`
          );
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "deleting", "certificate", props.hostname);
          }
        }
      } catch (error) {
        console.error(`Error deleting Fly.io certificate ${props.hostname}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      let certificateData: any;

      // Check if certificate already exists
      const listResponse = await api.get(`/apps/${appName}/certificates`);
      if (!listResponse.ok) {
        await handleApiError(listResponse, "listing", "certificates");
      }

      const certificates = await listResponse.json();
      const existingCert = certificates.data?.find(
        (cert: any) => cert.hostname === props.hostname
      );

      if (existingCert) {
        // Certificate exists, return current data
        certificateData = existingCert;
      } else {
        // Create new certificate
        const createPayload = {
          hostname: props.hostname,
          type: props.type || "managed",
        };

        const createResponse = await api.post(
          `/apps/${appName}/certificates`,
          createPayload
        );

        if (!createResponse.ok) {
          await handleApiError(createResponse, "creating", "certificate", props.hostname);
        }

        certificateData = await createResponse.json();

        // Wait for certificate to be processed
        await waitForCertificateReady(api, appName, certificateData.id);

        // Get updated certificate data
        const getResponse = await api.get(
          `/apps/${appName}/certificates/${certificateData.id}`
        );
        if (getResponse.ok) {
          const updatedData = await getResponse.json();
          certificateData = updatedData.data || updatedData;
        }
      }

      return this({
        id: certificateData.id,
        hostname: certificateData.hostname,
        checkPassed: certificateData.check_passed || false,
        source: certificateData.source || "unknown",
        createdAt: certificateData.created_at,
        configured: certificateData.configured || false,
        acmeError: certificateData.acme_error,
        verified: certificateData.verified || false,
        certificateAuthority: certificateData.certificate_authority || "Let's Encrypt",
        dnsValidationTarget: certificateData.dns_validation_target,
        dnsValidationHostname: certificateData.dns_validation_hostname,
        // Pass through props
        app: props.app,
        type: props.type,
        baseUrl: props.baseUrl,
      });
    } catch (error) {
      console.error(`Error ${this.phase} Fly.io certificate '${props.hostname}':`, error);
      throw error;
    }
  },
);

/**
 * Wait for certificate to be ready/processed
 */
async function waitForCertificateReady(
  api: any,
  appName: string,
  certificateId: string,
  timeoutMs: number = 60000,
): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await api.get(`/apps/${appName}/certificates/${certificateId}`);
      if (response.ok) {
        const certData = await response.json();
        const certificate = certData.data || certData;
        
        // Certificate is ready if it's configured or has some verification status
        if (certificate.configured || certificate.verified || certificate.check_passed) {
          return;
        }
        
        // Also consider it ready if there's an error (so we don't wait forever)
        if (certificate.acme_error) {
          console.warn(`Certificate ${certificateId} has error: ${certificate.acme_error}`);
          return;
        }
      }
    } catch (error) {
      console.warn(`Error checking certificate status: ${error}`);
    }

    // Wait 5 seconds before checking again (certificate processing takes time)
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  console.warn(`Certificate ${certificateId} may still be processing after timeout`);
}
import {
  CreateEmailIdentityCommand,
  DeleteEmailIdentityCommand,
  GetEmailIdentityCommand,
  NotFoundException,
  PutEmailIdentityDkimAttributesCommand,
  SESv2Client,
} from "@aws-sdk/client-sesv2";
import type { CloudflareApiOptions } from "../cloudflare/api.ts";
import { createCloudflareApi } from "../cloudflare/api.ts";
import { DnsRecords } from "../cloudflare/dns-records.ts";
import { getZoneByDomain } from "../cloudflare/zone.ts";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { ignore } from "../util/ignore.ts";
import { logger } from "../util/logger.ts";
import { retry } from "./retry.ts";

/**
 * Properties for configuring AWS SES verification with Cloudflare DNS
 */
export interface SESVerificationProps extends CloudflareApiOptions {
  /**
   * The domain to verify with AWS SES
   * @example "example.com"
   */
  domain: string;

  /**
   * Whether to enable DKIM signing for the domain
   * When enabled, creates 3 CNAME records for DKIM verification
   * @default false
   */
  enableDkim?: boolean;

  /**
   * Whether to create MX records for SES email receiving
   * @default false
   */
  enableReceiving?: boolean;

  /**
   * AWS region for SES email receiving (used for MX records)
   * @default "us-east-1"
   */
  region?: string;

  /**
   * Maximum time to wait for verification to complete (in milliseconds)
   * @default 300000 (5 minutes)
   */
  verificationTimeout?: number;

  /**
   * Polling interval for checking verification status (in milliseconds)
   * @default 30000 (30 seconds)
   */
  pollingInterval?: number;

  /**
   * Tags to apply to the DNS records created
   */
  tags?: Record<string, string>;
}

/**
 * Output returned after SES verification setup
 */
export interface SESVerification extends Resource<"aws::SESVerification"> {
  /**
   * The domain being verified
   */
  domain: string;

  /**
   * The AWS SES email identity ARN
   */
  emailIdentityArn: string;

  /**
   * Domain verification status
   */
  verificationStatus: string;

  /**
   * DKIM verification status (if DKIM is enabled)
   */
  dkimStatus?: string;

  /**
   * DKIM tokens for manual verification (if DKIM is enabled)
   */
  dkimTokens?: string[];

  /**
   * DNS records that were created for verification
   */
  dnsRecords: {
    /**
     * The TXT record for domain verification
     */
    domainVerificationRecord: string;

    /**
     * CNAME records for DKIM (if enabled)
     */
    dkimRecords?: string[];

    /**
     * MX record for receiving (if enabled)
     */
    mxRecord?: string;
  };

  /**
   * Cloudflare zone ID where DNS records were created
   */
  zoneId: string;

  /**
   * Whether verification completed successfully
   */
  verified: boolean;
}

/**
 * AWS SES Verification with Cloudflare DNS
 *
 * Automates the process of verifying an AWS SES domain identity using Cloudflare DNS.
 * This resource handles the complete verification workflow including:
 * - Creating the SES email identity
 * - Retrieving verification tokens from AWS SES
 * - Creating required DNS records in Cloudflare
 * - Polling for verification completion
 * - Optionally setting up DKIM and email receiving
 *
 * @example
 * // Basic domain verification
 * const verification = await SESVerification("example.com-ses", {
 *   domain: "example.com",
 *   apiToken: process.env.CLOUDFLARE_API_TOKEN
 * });
 *
 * @example
 * // Complete setup with DKIM and receiving
 * const verification = await SESVerification("example.com-ses", {
 *   domain: "example.com",
 *   enableDkim: true,
 *   enableReceiving: true,
 *   region: "us-east-1",
 *   apiToken: process.env.CLOUDFLARE_API_TOKEN
 * });
 *
 * @example
 * // Custom verification settings
 * const verification = await SESVerification("example.com-ses", {
 *   domain: "example.com",
 *   enableDkim: true,
 *   verificationTimeout: 600000, // 10 minutes
 *   pollingInterval: 15000, // 15 seconds
 *   apiToken: process.env.CLOUDFLARE_API_TOKEN
 * });
 */
export const SESVerification = Resource(
  "aws::SESVerification",
  async function (
    this: Context<SESVerification>,
    _id: string,
    props: SESVerificationProps,
  ): Promise<SESVerification> {
    const client = new SESv2Client({});
    const api = await createCloudflareApi(props);

    // Handle deletion
    if (this.phase === "delete") {
      const output = this.output;
      if (output) {
        // Delete the SES email identity
        await ignore(NotFoundException.name, () =>
          retry(() =>
            client.send(
              new DeleteEmailIdentityCommand({
                EmailIdentity: output.domain,
              }),
            ),
          ),
        );
        logger.info(`Deleted SES email identity: ${output.domain}`);
      }
      return this.destroy();
    }

    // Get the Cloudflare zone for the domain
    const zone = await getZoneByDomain(api, props.domain);
    if (!zone) {
      throw new Error(
        `No Cloudflare zone found for domain: ${props.domain}. Please ensure the domain is managed by Cloudflare.`,
      );
    }

    // Create or get the SES email identity
    let emailIdentity;
    try {
      emailIdentity = await retry(() =>
        client.send(
          new GetEmailIdentityCommand({
            EmailIdentity: props.domain,
          }),
        ),
      );
      logger.info(`Found existing SES email identity: ${props.domain}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Create new email identity
        await retry(() =>
          client.send(
            new CreateEmailIdentityCommand({
              EmailIdentity: props.domain,
            }),
          ),
        );
        logger.info(`Created SES email identity: ${props.domain}`);

        // Get the created identity
        emailIdentity = await retry(() =>
          client.send(
            new GetEmailIdentityCommand({
              EmailIdentity: props.domain,
            }),
          ),
        );
      } else {
        throw error;
      }
    }

    // Enable DKIM if requested
    if (
      props.enableDkim &&
      emailIdentity.DkimAttributes?.SigningEnabled !== true
    ) {
      await retry(() =>
        client.send(
          new PutEmailIdentityDkimAttributesCommand({
            EmailIdentity: props.domain,
            SigningEnabled: true,
          }),
        ),
      );
      logger.info(`Enabled DKIM for: ${props.domain}`);

      // Refresh identity to get DKIM tokens
      emailIdentity = await retry(() =>
        client.send(
          new GetEmailIdentityCommand({
            EmailIdentity: props.domain,
          }),
        ),
      );
    }

    // Prepare DNS records to create
    const dnsRecordsToCreate = [];

    // Domain verification record
    const verificationToken = emailIdentity.VerificationInfo?.VerificationToken;
    if (!verificationToken) {
      throw new Error(
        `No verification token found for domain: ${props.domain}. This may indicate the domain is already verified or there was an API issue.`,
      );
    }

    dnsRecordsToCreate.push({
      name: `_amazonses.${props.domain}`,
      type: "TXT" as const,
      content: verificationToken,
      ttl: 300,
    });

    // DKIM records
    let dkimTokens: string[] | undefined;
    if (props.enableDkim && emailIdentity.DkimAttributes?.Tokens) {
      dkimTokens = emailIdentity.DkimAttributes.Tokens;
      for (const token of dkimTokens) {
        dnsRecordsToCreate.push({
          name: `${token}._domainkey.${props.domain}`,
          type: "CNAME" as const,
          content: `${token}.dkim.amazonses.com`,
          ttl: 300,
        });
      }
    }

    // MX record for receiving
    const region = props.region || "us-east-1";
    if (props.enableReceiving) {
      dnsRecordsToCreate.push({
        name: props.domain,
        type: "MX" as const,
        content: `inbound-smtp.${region}.amazonaws.com`,
        priority: 10,
        ttl: 300,
      });
    }

    // Create DNS records in Cloudflare
    const _dnsRecords = await DnsRecords(`${props.domain}-ses-verification`, {
      zoneId: zone.id,
      records: dnsRecordsToCreate,
      ...props,
    });

    // Wait for verification to complete
    const timeout = props.verificationTimeout || 300000; // 5 minutes
    const pollingInterval = props.pollingInterval || 30000; // 30 seconds
    const startTime = Date.now();

    let verified = false;
    let verificationStatus = "PENDING";
    let dkimStatus: string | undefined;

    logger.info(
      `Waiting for SES verification to complete for: ${props.domain}`,
    );

    while (Date.now() - startTime < timeout) {
      try {
        const identity = await retry(() =>
          client.send(
            new GetEmailIdentityCommand({
              EmailIdentity: props.domain,
            }),
          ),
        );

        verificationStatus = identity.VerifiedForSendingStatus
          ? "SUCCESS"
          : "PENDING";

        if (props.enableDkim && identity.DkimAttributes?.Status) {
          dkimStatus = identity.DkimAttributes.Status;
        }

        // Check if verification is complete
        const domainVerified = identity.VerifiedForSendingStatus;
        const dkimVerified = !props.enableDkim || dkimStatus === "SUCCESS";

        if (domainVerified && dkimVerified) {
          verified = true;
          logger.info(`SES verification completed for: ${props.domain}`);
          break;
        }

        logger.info(
          `Verification in progress for ${props.domain}. Domain: ${verificationStatus}${
            dkimStatus ? `, DKIM: ${dkimStatus}` : ""
          }`,
        );

        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
      } catch (error) {
        logger.warn(
          `Error checking verification status for ${props.domain}:`,
          error,
        );
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
      }
    }

    if (!verified) {
      logger.warn(
        `SES verification did not complete within ${timeout}ms for: ${props.domain}. You may need to wait longer or check the DNS records manually.`,
      );
    }

    return this({
      domain: props.domain,
      emailIdentityArn: `arn:aws:ses:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:identity/${props.domain}`,
      verificationStatus,
      dkimStatus,
      dkimTokens,
      dnsRecords: {
        domainVerificationRecord: verificationToken,
        dkimRecords: dkimTokens,
        mxRecord: props.enableReceiving
          ? `inbound-smtp.${region}.amazonaws.com`
          : undefined,
      },
      zoneId: zone.id,
      verified,
    });
  },
);

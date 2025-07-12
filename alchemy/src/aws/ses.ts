import {
  CreateConfigurationSetCommand,
  CreateEmailIdentityCommand,
  DeleteConfigurationSetCommand,
  DeleteEmailIdentityCommand,
  type DeliveryOptions,
  GetConfigurationSetCommand,
  GetEmailIdentityCommand,
  NotFoundException,
  PutConfigurationSetDeliveryOptionsCommand,
  PutConfigurationSetReputationOptionsCommand,
  PutConfigurationSetSendingOptionsCommand,
  PutConfigurationSetSuppressionOptionsCommand,
  PutConfigurationSetTrackingOptionsCommand,
  PutEmailIdentityDkimAttributesCommand,
  type ReputationOptions,
  SESv2Client,
  type SendingOptions,
  type SuppressionOptions,
  type TrackingOptions,
} from "@aws-sdk/client-sesv2";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { ignore } from "../util/ignore.ts";
import { retry } from "./retry.ts";

/**
 * Properties for configuring AWS SES resources
 */
export interface SESProps {
  /**
   * Name of the configuration set
   * Used to group email sending and tracking settings
   */
  configurationSetName?: string;

  /**
   * Email identity to verify (email address or domain)
   * For domains, use the format "example.com"
   * For email addresses, use the format "user@example.com"
   */
  emailIdentity?: string;

  /**
   * Whether to enable DKIM signing for the email identity
   * DKIM helps prevent email spoofing by verifying sender authenticity
   */
  enableDkim?: boolean;

  /**
   * Sending options for the configuration set
   * Controls whether email sending is enabled and related settings
   */
  sendingOptions?: SendingOptions;

  /**
   * Reputation options for the configuration set
   * Controls reputation tracking and metrics collection
   */
  reputationOptions?: ReputationOptions;

  /**
   * Tracking options for the configuration set
   * Controls open and click tracking with optional custom domains
   */
  trackingOptions?: TrackingOptions;

  /**
   * Suppression options for the configuration set
   * Controls how bounces and complaints are handled
   */
  suppressionOptions?: SuppressionOptions;

  /**
   * Delivery options for the configuration set
   * Controls TLS settings and sending pool configuration
   */
  deliveryOptions?: DeliveryOptions;

  /**
   * Tags to apply to the SES resources
   * Key-value pairs for resource organization
   */
  tags?: Record<string, string>;
}

/**
 * Output returned after SES resource creation/update
 */
export interface SES extends Resource<"aws::SES">, SESProps {
  /**
   * ARN of the configuration set if created
   * Format: arn:aws:ses:region:account-id:configuration-set/name
   */
  configurationSetArn?: string;

  /**
   * Email identity verification status if an identity was created
   * Can be "PENDING" or "VERIFIED"
   */
  emailIdentityVerificationStatus?: string;

  /**
   * DKIM verification status if DKIM was enabled
   * Can be "PENDING", "SUCCESS", "FAILED", "TEMPORARY_FAILURE", or "NOT_STARTED"
   */
  dkimVerificationStatus?: string;

  /**
   * Email identity ARN if an identity was created
   * Format: arn:aws:ses:region:account-id:identity/name
   */
  emailIdentityArn?: string;
}

/**
 * AWS SES Resource
 *
 * Creates and manages Amazon Simple Email Service (SES) configuration sets and email identities.
 * Supports email sending configuration, DKIM signing, and identity verification.
 *
 * @example
 * // Create a configuration set with sending options
 * const configSet = await SES("email-config", {
 *   configurationSetName: "my-email-config",
 *   sendingOptions: {
 *     SendingEnabled: true
 *   },
 *   tags: {
 *     Environment: "production",
 *     Project: "notifications"
 *   }
 * });
 *
 * @example
 * // Create and verify a domain identity with DKIM
 * const domainIdentity = await SES("domain-identity", {
 *   emailIdentity: "example.com",
 *   enableDkim: true,
 *   tags: {
 *     Environment: "production",
 *     Project: "transactional-emails"
 *   }
 * });
 *
 * @example
 * // Update configuration set sending options
 * const updatedConfig = await SES("email-config", {
 *   configurationSetName: "my-email-config",
 *   sendingOptions: {
 *     SendingEnabled: false
 *   },
 *   tags: {
 *     Environment: "production",
 *     Project: "notifications",
 *     Updated: "true"
 *   }
 * });
 */
export const SES = Resource(
  "aws::SES",
  async function (
    this: Context<SES>,
    _id: string,
    props: SESProps,
  ): Promise<SES> {
    // Create SES client
    const client = new SESv2Client({
      endpoint: process.env.AWS_ENDPOINT,
    });

    // Resource ID is either based on the configuration set name or email identity
    // const id =
    //   props.configurationSetName || props.emailIdentity || this.resourceID;

    // Handle deletion
    if (this.phase === "delete") {
      const output = this.output;

      // Delete configuration set if it exists
      if (output?.configurationSetName) {
        await ignore(NotFoundException.name, () =>
          retry(() =>
            client.send(
              new DeleteConfigurationSetCommand({
                ConfigurationSetName: output.configurationSetName,
              }),
            ),
          ),
        );
      }

      // Delete email identity if it exists
      if (output?.emailIdentity) {
        await ignore(NotFoundException.name, () =>
          retry(() =>
            client.send(
              new DeleteEmailIdentityCommand({
                EmailIdentity: output.emailIdentity,
              }),
            ),
          ),
        );
      }

      // Return empty output for delete
      return this.destroy();
    }

    // Created resources
    let configurationSetArn: string | undefined;
    let emailIdentityArn: string | undefined;
    let emailIdentityVerificationStatus: string | undefined;
    let dkimVerificationStatus: string | undefined;

    // Create or update configuration set if specified
    if (props.configurationSetName) {
      // Check if configuration set exists
      let configSetExists = false;
      try {
        await retry(() =>
          client.send(
            new GetConfigurationSetCommand({
              ConfigurationSetName: props.configurationSetName,
            }),
          ),
        );
        configSetExists = true;
      } catch (error) {
        if (error instanceof NotFoundException) {
          configSetExists = false;
        } else {
          throw error;
        }
      }

      if (configSetExists) {
        // Update existing configuration set using appropriate update commands
        if (props.sendingOptions) {
          await retry(() =>
            client.send(
              new PutConfigurationSetSendingOptionsCommand({
                ConfigurationSetName: props.configurationSetName,
                SendingEnabled: props.sendingOptions!.SendingEnabled,
              }),
            ),
          );
        }

        if (props.reputationOptions) {
          await retry(() =>
            client.send(
              new PutConfigurationSetReputationOptionsCommand({
                ConfigurationSetName: props.configurationSetName,
                ReputationMetricsEnabled:
                  props.reputationOptions!.ReputationMetricsEnabled,
              }),
            ),
          );
        }

        if (props.trackingOptions) {
          await retry(() =>
            client.send(
              new PutConfigurationSetTrackingOptionsCommand({
                ConfigurationSetName: props.configurationSetName,
                CustomRedirectDomain:
                  props.trackingOptions!.CustomRedirectDomain,
              }),
            ),
          );
        }

        if (props.suppressionOptions) {
          await retry(() =>
            client.send(
              new PutConfigurationSetSuppressionOptionsCommand({
                ConfigurationSetName: props.configurationSetName,
                SuppressedReasons: props.suppressionOptions!.SuppressedReasons,
              }),
            ),
          );
        }

        if (props.deliveryOptions) {
          await retry(() =>
            client.send(
              new PutConfigurationSetDeliveryOptionsCommand({
                ConfigurationSetName: props.configurationSetName,
                TlsPolicy: props.deliveryOptions!.TlsPolicy,
                SendingPoolName: props.deliveryOptions!.SendingPoolName,
              }),
            ),
          );
        }

        // In SESv2, the ARN isn't directly returned in the response
        configurationSetArn = `arn:aws:ses:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:configuration-set/${props.configurationSetName}`;
      } else {
        // Create new configuration set
        await retry(() =>
          client.send(
            new CreateConfigurationSetCommand({
              ConfigurationSetName: props.configurationSetName,
              SendingOptions: props.sendingOptions,
              ReputationOptions: props.reputationOptions,
              TrackingOptions: props.trackingOptions,
              SuppressionOptions: props.suppressionOptions,
              DeliveryOptions: props.deliveryOptions,
              Tags: Object.entries(props.tags || {}).map(([Key, Value]) => ({
                Key,
                Value,
              })),
            }),
          ),
        );

        // In SESv2, the ARN isn't directly returned in the response
        configurationSetArn = `arn:aws:ses:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:configuration-set/${props.configurationSetName}`;
      }
    }

    // Create or verify email identity if specified
    if (props.emailIdentity) {
      // Check if identity exists
      let getIdentityResult;
      try {
        getIdentityResult = await retry(() =>
          client.send(
            new GetEmailIdentityCommand({
              EmailIdentity: props.emailIdentity,
            }),
          ),
        );
      } catch (error) {
        if (error instanceof NotFoundException) {
          getIdentityResult = null;
        } else {
          throw error;
        }
      }

      if (!getIdentityResult) {
        // Create new email identity
        const createIdentityResult = await retry(() =>
          client.send(
            new CreateEmailIdentityCommand({
              EmailIdentity: props.emailIdentity,
              Tags: Object.entries(props.tags || {}).map(([Key, Value]) => ({
                Key,
                Value,
              })),
            }),
          ),
        );

        // If it's an email address, we don't need to explicitly verify in v2
        // The verification email is automatically sent by SES in v2

        // Store the identity information
        emailIdentityArn = `arn:aws:ses:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:identity/${props.emailIdentity}`;
        emailIdentityVerificationStatus =
          createIdentityResult.VerifiedForSendingStatus
            ? "VERIFIED"
            : "PENDING";
      } else {
        // Store the identity information
        emailIdentityArn = `arn:aws:ses:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:identity/${props.emailIdentity}`;
        emailIdentityVerificationStatus =
          getIdentityResult.VerifiedForSendingStatus ? "VERIFIED" : "PENDING";

        // Update DKIM settings if requested
        if (props.enableDkim !== undefined) {
          if (props.enableDkim) {
            await retry(() =>
              client.send(
                new PutEmailIdentityDkimAttributesCommand({
                  EmailIdentity: props.emailIdentity,
                  SigningEnabled: true,
                }),
              ),
            );

            // We can check the current status of DKIM
            dkimVerificationStatus = "PENDING"; // Default to pending

            // Get the updated identity to check DKIM status
            const updatedIdentity = await retry(() =>
              client.send(
                new GetEmailIdentityCommand({
                  EmailIdentity: props.emailIdentity,
                }),
              ),
            );

            if (updatedIdentity.DkimAttributes?.Status) {
              dkimVerificationStatus = updatedIdentity.DkimAttributes.Status;
            }
          }
        }
      }
    }

    // Return the resource output
    return this({
      ...props,
      configurationSetArn,
      emailIdentityArn,
      emailIdentityVerificationStatus,
      dkimVerificationStatus,
    });
  },
);

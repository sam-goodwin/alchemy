import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { createAndVerifyGitHubClient } from "./client.ts";

/**
 * Properties for creating or updating a GitHub Repository Webhook
 */
export interface RepositoryWebhookProps {
  /**
   * Repository owner (user or organization)
   */
  owner: string;

  /**
   * Repository name
   */
  repository: string;

  /**
   * The URL to which the payloads will be delivered
   */
  url: string;

  /**
   * Webhook secret for payload validation
   * @default undefined
   */
  secret?: string;

  /**
   * The media type used to serialize the payloads
   * @default "application/json"
   */
  contentType?: "application/json" | "application/x-www-form-urlencoded";

  /**
   * Determines whether the SSL certificate of the host for url will be verified
   * @default false
   */
  insecureSsl?: boolean;

  /**
   * Determines if notifications are sent when the webhook is triggered
   * @default true
   */
  active?: boolean;

  /**
   * Determines what events the hook is triggered for
   * @default ["push"]
   */
  events?: string[];

  /**
   * Optional GitHub API token (overrides environment variable)
   * If not provided, will use GITHUB_TOKEN environment variable
   * @default process.env.GITHUB_TOKEN
   */
  token?: string;
}

/**
 * Output returned after Repository Webhook creation/update
 */
export interface RepositoryWebhook
  extends Resource<"github::RepositoryWebhook">,
    RepositoryWebhookProps {
  /**
   * The ID of the resource
   */
  id: string;

  /**
   * The numeric ID of the webhook in GitHub
   */
  webhookId: number;

  /**
   * The webhook URL that was configured
   */
  url: string;

  /**
   * Time at which the object was created
   */
  createdAt: string;

  /**
   * Time at which the object was last updated
   */
  updatedAt: string;

  /**
   * The ping URL for the webhook
   */
  pingUrl: string;

  /**
   * The test URL for the webhook
   */
  testUrl: string;
}

/**
 * Resource for managing GitHub repository webhooks
 *
 * Webhooks allow external services to be notified when certain events happen in a repository.
 * This resource manages the full lifecycle of repository webhooks including creation, updates, and deletion.
 *
 * @example
 * // Create a basic webhook for push events
 * const pushWebhook = await RepositoryWebhook("push-webhook", {
 *   owner: "my-org",
 *   repository: "my-repo",
 *   url: "https://my-service.com/github-webhook",
 *   events: ["push"]
 * });
 *
 * @example
 * // Create a webhook with secret validation for multiple events
 * const ciWebhook = await RepositoryWebhook("ci-webhook", {
 *   owner: "my-org",
 *   repository: "my-repo",
 *   url: "https://ci.example.com/webhook",
 *   secret: "my-webhook-secret",
 *   events: ["push", "pull_request", "release"],
 *   contentType: "application/json"
 * });
 *
 * @example
 * // Create a webhook for all events with custom SSL settings
 * const monitoringWebhook = await RepositoryWebhook("monitoring-webhook", {
 *   owner: "my-org",
 *   repository: "my-repo",
 *   url: "https://monitoring.internal.com/github",
 *   secret: "super-secret-key",
 *   events: ["*"], // All events
 *   insecureSsl: true, // For internal services with self-signed certs
 *   contentType: "application/x-www-form-urlencoded"
 * });
 */
export const RepositoryWebhook = Resource(
  "github::RepositoryWebhook",
  async function (
    this: Context<RepositoryWebhook>,
    _id: string,
    props: RepositoryWebhookProps,
  ): Promise<RepositoryWebhook> {
    // Create authenticated Octokit client and verify repository access
    const octokit = await createAndVerifyGitHubClient({
      token: props.token,
      owner: props.owner,
      repository: props.repository,
      quiet: this.quiet,
    });

    if (this.phase === "delete") {
      if (this.output?.webhookId) {
        try {
          // Delete the webhook
          await octokit.rest.repos.deleteWebhook({
            owner: props.owner,
            repo: props.repository,
            hook_id: this.output.webhookId,
          });
        } catch (error: any) {
          // Ignore 404 errors (webhook already deleted)
          if (error.status === 404) {
            logger.log("Webhook doesn't exist, ignoring");
          } else {
            throw error;
          }
        }
      }

      // Return void (a deleted resource has no content)
      return this.destroy();
    }

    try {
      const webhookConfig = {
        url: props.url,
        content_type: props.contentType || "application/json",
        insecure_ssl: props.insecureSsl ? "1" : "0",
        ...(props.secret && { secret: props.secret }),
      };

      const events = props.events || ["push"];
      const active = props.active !== false; // Default to true

      let webhookData;
      let webhookId: number;

      if (this.phase === "update" && this.output?.webhookId) {
        // Update existing webhook
        const { data: updatedWebhook } = await octokit.rest.repos.updateWebhook(
          {
            owner: props.owner,
            repo: props.repository,
            hook_id: this.output.webhookId,
            config: webhookConfig,
            events,
            active,
          },
        );

        webhookData = updatedWebhook;
        webhookId = this.output.webhookId;
      } else {
        // Create new webhook
        const { data: createdWebhook } = await octokit.rest.repos.createWebhook(
          {
            owner: props.owner,
            repo: props.repository,
            name: "web", // GitHub webhook type
            config: webhookConfig,
            events,
            active,
          },
        );

        webhookData = createdWebhook;
        webhookId = createdWebhook.id;
      }

      // Return webhook details
      return this({
        id: `${props.owner}/${props.repository}/webhook/${webhookId}`,
        webhookId,
        owner: props.owner,
        repository: props.repository,
        url: props.url,
        secret: props.secret,
        contentType: props.contentType || "application/json",
        insecureSsl: props.insecureSsl,
        active: props.active,
        events: props.events || ["push"],
        token: props.token,
        createdAt: webhookData.created_at,
        updatedAt: webhookData.updated_at,
        pingUrl: webhookData.ping_url,
        testUrl: webhookData.test_url,
      });
    } catch (error: any) {
      if (
        error.status === 403 &&
        error.message?.includes("Must have admin rights")
      ) {
        logger.error(
          "\n⚠️ Error creating/updating GitHub webhook: You must have admin rights to the repository.",
        );
        logger.error(
          "Make sure your GitHub token has the required permissions (repo scope for private repos).\n",
        );
      } else if (error.status === 422) {
        logger.error(
          "\n⚠️ Error creating/updating GitHub webhook: Invalid webhook configuration.",
        );
        logger.error("Check your webhook URL and event configuration.\n");
      } else {
        logger.error("Error creating/updating GitHub webhook:", error.message);
      }
      throw error;
    }
  },
);

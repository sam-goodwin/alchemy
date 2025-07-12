import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import { createResendApi, type ResendApiOptions } from "./api.ts";
import type { ResendAudience } from "./audience.ts";

/**
 * Status of a broadcast
 */
export type ResendBroadcastStatus =
  | "draft"
  | "scheduled"
  | "sent"
  | "cancelled";

/**
 * Properties for creating or updating a Resend broadcast
 */
export interface ResendBroadcastProps extends ResendApiOptions {
  /**
   * Name of the broadcast
   */
  name: string;

  /**
   * Subject line of the broadcast
   */
  subject: string;

  /**
   * From email address
   */
  from: string;

  /**
   * Reply-to email address
   */
  reply_to?: string;

  /**
   * HTML content of the broadcast
   */
  html?: string;

  /**
   * Text content of the broadcast
   */
  text?: string;

  /**
   * Audience to send the broadcast to
   * Can be an audience ID string or ResendAudience resource
   */
  audience: string | ResendAudience;

  /**
   * Existing broadcast ID to update
   * Used internally during update operations
   * @internal
   */
  existing_broadcast_id?: string;
}

/**
 * API response structure for Resend broadcasts
 */
interface ResendBroadcastApiResponse {
  id: string;
  name: string;
  subject: string;
  from: string;
  reply_to?: string;
  html?: string;
  text?: string;
  audience_id: string;
  status: ResendBroadcastStatus;
  scheduled_at?: string;
  sent_at?: string;
  created_at: string;
}

/**
 * Output returned after Resend broadcast creation/update
 */
export interface ResendBroadcast
  extends Resource<"resend::Broadcast">,
    Omit<
      ResendBroadcastProps,
      "apiKey" | "existing_broadcast_id" | "audience"
    > {
  /**
   * The ID of the broadcast
   */
  id: string;

  /**
   * ID of the audience this broadcast is sent to
   */
  audience_id: string;

  /**
   * Current status of the broadcast
   */
  status: ResendBroadcastStatus;

  /**
   * When the broadcast was sent (if applicable)
   */
  sent_at?: string;

  /**
   * Time at which the broadcast was created
   */
  created_at: string;
}

/**
 * Creates a Resend broadcast for sending emails to audiences.
 *
 * @example
 * ## Basic Broadcast
 *
 * Create a draft broadcast:
 *
 * ```ts
 * const audience = await ResendAudience("subscribers", {
 *   name: "Subscribers"
 * });
 *
 * const broadcast = await ResendBroadcast("newsletter", {
 *   name: "Weekly Newsletter",
 *   subject: "This Week's Updates",
 *   from: "news@example.com",
 *   html: "<h1>Weekly Newsletter</h1><p>Content here...</p>",
 *   audience: audience
 * });
 * ```
 *
 * @example
 * ## Broadcast with Custom API Key
 *
 * Create a broadcast with a custom API key:
 *
 * ```ts
 * const broadcast = await ResendBroadcast("premium-newsletter", {
 *   name: "Premium Newsletter",
 *   subject: "Premium Content",
 *   from: "premium@example.com",
 *   html: "<h1>Premium Newsletter</h1><p>Exclusive content...</p>",
 *   audience: "aud_premium",
 *   apiKey: alchemy.secret(process.env.RESEND_API_KEY)
 * });
 * ```
 */
export const ResendBroadcast = Resource(
  "resend::Broadcast",
  async function (
    this: Context<ResendBroadcast>,
    id: string,
    props: ResendBroadcastProps,
  ): Promise<ResendBroadcast> {
    const api = createResendApi(props);
    const broadcastId = props.existing_broadcast_id || this.output?.id;

    if (this.phase === "delete") {
      try {
        if (broadcastId) {
          const deleteResponse = await api.delete(`/broadcasts/${broadcastId}`);
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "delete", "broadcast", id);
          }
        }
      } catch (error) {
        logger.error(`Error deleting Resend broadcast ${id}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      let response: ResendBroadcastApiResponse;

      // Extract audience ID from audience prop
      const audienceId =
        typeof props.audience === "string" ? props.audience : props.audience.id;

      if (this.phase === "update" && broadcastId) {
        // Update existing broadcast
        const updateResponse = await api.patch(`/broadcasts/${broadcastId}`, {
          name: props.name,
          subject: props.subject,
          from: props.from,
          reply_to: props.reply_to,
          html: props.html,
          text: props.text,
          audience_id: audienceId,
        });

        if (!updateResponse.ok) {
          await handleApiError(updateResponse, "update", "broadcast", id);
        }

        response = await updateResponse.json();
      } else {
        // Check if broadcast with this ID already exists
        if (broadcastId) {
          const getResponse = await api.get(`/broadcasts/${broadcastId}`);
          if (getResponse.ok) {
            // Broadcast exists, update it
            const updateResponse = await api.patch(
              `/broadcasts/${broadcastId}`,
              {
                name: props.name,
                subject: props.subject,
                from: props.from,
                reply_to: props.reply_to,
                html: props.html,
                text: props.text,
                audience_id: audienceId,
              },
            );

            if (!updateResponse.ok) {
              await handleApiError(updateResponse, "update", "broadcast", id);
            }

            response = await updateResponse.json();
          } else if (getResponse.status !== 404) {
            await handleApiError(getResponse, "get", "broadcast", id);
            throw new Error("Failed to check if broadcast exists");
          } else {
            // Broadcast doesn't exist, create new
            response = await createNewBroadcast(api, props, audienceId);
          }
        } else {
          // No output ID, create new broadcast
          response = await createNewBroadcast(api, props, audienceId);
        }
      }

      return this({
        id: response.id,
        name: response.name,
        subject: response.subject,
        from: response.from,
        reply_to: response.reply_to,
        html: response.html,
        text: response.text,
        audience_id: response.audience_id,
        status: response.status,
        scheduled_at: response.scheduled_at,
        sent_at: response.sent_at,
        created_at: response.created_at,
        // Pass through the provided props except sensitive ones
        baseUrl: props.baseUrl,
      });
    } catch (error) {
      logger.error(`Error ${this.phase} Resend broadcast '${id}':`, error);
      throw error;
    }
  },
);

/**
 * Helper function to create a new Resend broadcast
 */
async function createNewBroadcast(
  api: any,
  props: ResendBroadcastProps,
  audienceId: string,
): Promise<ResendBroadcastApiResponse> {
  const broadcastResponse = await api.post("/broadcasts", {
    name: props.name,
    subject: props.subject,
    from: props.from,
    reply_to: props.reply_to,
    html: props.html,
    text: props.text,
    audience_id: audienceId,
  });

  if (!broadcastResponse.ok) {
    await handleApiError(broadcastResponse, "create", "broadcast");
  }

  return (await broadcastResponse.json()) as ResendBroadcastApiResponse;
}

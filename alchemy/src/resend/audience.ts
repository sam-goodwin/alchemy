import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import { createResendApi, type ResendApiOptions } from "./api.ts";

/**
 * Properties for creating or updating a Resend audience
 */
export interface ResendAudienceProps extends ResendApiOptions {
  /**
   * Name of the audience
   */
  name: string;

  /**
   * Existing audience ID to update
   * Used internally during update operations
   * @internal
   */
  existing_audience_id?: string;
}

/**
 * API response structure for Resend audiences
 */
interface ResendAudienceApiResponse {
  id: string;
  name: string;
  created_at: string;
}

/**
 * Output returned after Resend audience creation/update
 */
export interface ResendAudience
  extends Resource<"resend::Audience">,
    Omit<ResendAudienceProps, "apiKey" | "existing_audience_id"> {
  /**
   * The ID of the audience
   */
  id: string;

  /**
   * Time at which the audience was created
   */
  created_at: string;
}

/**
 * Creates a Resend audience for managing email contacts.
 *
 * @example
 * ## Basic Audience
 *
 * Create an audience with a name:
 *
 * ```ts
 * const audience = await ResendAudience("newsletter-subscribers", {
 *   name: "Newsletter Subscribers"
 * });
 * ```
 *
 * @example
 * ## Audience with Custom API Key
 *
 * Create an audience with a custom API key:
 *
 * ```ts
 * const audience = await ResendAudience("premium-users", {
 *   name: "Premium Users",
 *   apiKey: alchemy.secret(process.env.RESEND_API_KEY)
 * });
 * ```
 *
 * @example
 * ## Using Audience for Broadcasts
 *
 * Create an audience and use it for broadcasts:
 *
 * ```ts
 * const audience = await ResendAudience("marketing-list", {
 *   name: "Marketing List"
 * });
 *
 * const broadcast = await ResendBroadcast("weekly-newsletter", {
 *   name: "Weekly Newsletter",
 *   subject: "This Week's Updates",
 *   from: "news@example.com",
 *   html: "<h1>Weekly Newsletter</h1><p>Content here...</p>",
 *   audience: audience
 * });
 * ```
 */
export const ResendAudience = Resource(
  "resend::Audience",
  async function (
    this: Context<ResendAudience>,
    id: string,
    props: ResendAudienceProps,
  ): Promise<ResendAudience> {
    const api = createResendApi(props);
    const audienceId = props.existing_audience_id || this.output?.id;

    if (this.phase === "delete") {
      try {
        if (audienceId) {
          const deleteResponse = await api.delete(`/audiences/${audienceId}`);
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "delete", "audience", id);
          }
        }
      } catch (error) {
        logger.error(`Error deleting Resend audience ${id}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      let response: ResendAudienceApiResponse;

      if (this.phase === "update" && audienceId) {
        // Update existing audience
        const updateResponse = await api.patch(`/audiences/${audienceId}`, {
          name: props.name,
        });

        if (!updateResponse.ok) {
          await handleApiError(updateResponse, "update", "audience", id);
        }

        response = await updateResponse.json();
      } else {
        // Check if audience with this ID already exists
        if (audienceId) {
          const getResponse = await api.get(`/audiences/${audienceId}`);
          if (getResponse.ok) {
            // Audience exists, update it
            const updateResponse = await api.patch(`/audiences/${audienceId}`, {
              name: props.name,
            });

            if (!updateResponse.ok) {
              await handleApiError(updateResponse, "update", "audience", id);
            }

            response = await updateResponse.json();
          } else if (getResponse.status !== 404) {
            await handleApiError(getResponse, "get", "audience", id);
            throw new Error("Failed to check if audience exists");
          } else {
            // Audience doesn't exist, create new
            response = await createNewAudience(api, props);
          }
        } else {
          // No output ID, create new audience
          response = await createNewAudience(api, props);
        }
      }

      return this({
        id: response.id,
        name: response.name,
        created_at: response.created_at,
        // Pass through the provided props except sensitive ones
        baseUrl: props.baseUrl,
      });
    } catch (error) {
      logger.error(`Error ${this.phase} Resend audience '${id}':`, error);
      throw error;
    }
  },
);

/**
 * Helper function to create a new Resend audience
 */
async function createNewAudience(
  api: any,
  props: ResendAudienceProps,
): Promise<ResendAudienceApiResponse> {
  const audienceResponse = await api.post("/audiences", {
    name: props.name,
  });

  if (!audienceResponse.ok) {
    await handleApiError(audienceResponse, "create", "audience");
  }

  return (await audienceResponse.json()) as ResendAudienceApiResponse;
}

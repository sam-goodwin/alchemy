import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { getTursoApi } from "./api.ts";

export interface ApiTokenProps {
  /**
   * The name of the API token.
   * This is used to identify the token and cannot be changed after creation.
   */
  name: string;
}

export interface ApiToken extends Resource<"turso::api-token"> {
  /**
   * The name of the API token.
   */
  name: string;

  /**
   * The unique identifier for the token.
   */
  id: string;

  /**
   * The actual token value.
   * This is only available when the token is first created.
   * Store this securely as it cannot be retrieved again.
   */
  token?: string;
}

interface TursoApiTokenResponse {
  id: string;
  name: string;
  token: string;
}

interface TursoApiTokensResponse {
  tokens: Array<{
    id: string;
    name: string;
  }>;
}

/**
 * Creates and manages API tokens for Turso authentication.
 *
 * **Important**: The token value is only available when first created.
 * Store it securely as it cannot be retrieved again.
 *
 * @example
 * ## Create an API Token
 *
 * Create a token for CI/CD:
 *
 * ```ts
 * const token = await ApiToken("ci-token", {
 *   name: "github-actions",
 * });
 *
 * // Save the token value securely
 * console.log("Token:", token.token);
 * ```
 *
 * @example
 * ## Multiple Tokens
 *
 * Create different tokens for different purposes:
 *
 * ```ts
 * const ciToken = await ApiToken("ci", {
 *   name: "ci-cd-pipeline",
 * });
 *
 * const devToken = await ApiToken("dev", {
 *   name: "development",
 * });
 *
 * const prodToken = await ApiToken("prod", {
 *   name: "production",
 * });
 * ```
 *
 * @example
 * ## Token Rotation
 *
 * To rotate a token, delete and recreate it:
 *
 * ```ts
 * // This will delete the old token if it exists
 * // and create a new one with a new value
 * const newToken = await ApiToken("api-token", {
 *   name: "rotated-token",
 * });
 *
 * // Update your secrets with newToken.token
 * ```
 */
export const ApiToken = Resource(
  "turso::api-token",
  async function (
    this: Context,
    id: string,
    props: ApiTokenProps,
  ): Promise<ApiToken> {
    const api = getTursoApi();
    const tokenName = props.name;

    // Validate token name
    if (!tokenName || tokenName.length === 0) {
      throw new Error("Token name is required");
    }

    try {
      // Check if token exists
      const existingTokens = await api.get<TursoApiTokensResponse>(
        "/v1/auth/api-tokens",
      );
      const existingToken = existingTokens.tokens.find(
        (t) => t.name === tokenName,
      );

      if (existingToken) {
        // Tokens are immutable, so we just return the existing one
        // Note: We don't have access to the token value after creation
        return {
          type: "turso::api-token",
          name: existingToken.name,
          id: existingToken.id,
        };
      } else {
        // Create new token
        const response = await api.post<TursoApiTokenResponse>(
          `/v1/auth/api-tokens/${tokenName}`,
          {},
        );

        // Return with the token value (only available on creation)
        return {
          type: "turso::api-token",
          name: response.name,
          id: response.id,
          token: response.token,
        };
      }
    } catch (error: any) {
      if (error.statusCode === 409) {
        throw new Error(`API token with name '${tokenName}' already exists`);
      }
      throw error;
    }
  },
);

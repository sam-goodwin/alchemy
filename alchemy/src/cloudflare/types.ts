/**
 * Cloudflare API response format
 */
export interface CloudflareApiResponse<T> {
  /**
   * API response result
   */
  result: T;

  /**
   * Success status
   */
  success: boolean;

  /**
   * Error details if success is false
   */
  errors: CloudflareApiError[];

  /**
   * Response messages
   */
  messages: string[];

  /**
   * Result information (typically for paginated results)
   */
  result_info?: {
    page: number;
    per_page: number;
    total_pages: number;
    count: number;
    total_count: number;
  };
}

/**
 * Cloudflare API error format
 */
export interface CloudflareApiError {
  /**
   * Error code
   */
  code: number;

  /**
   * Error message
   */
  message: string;
}

/**
 * Helper to extract and handle Cloudflare API errors
 *
 * @param response Fetch response object
 * @returns Formatted error message
 */
export async function extractCloudflareError(
  response: Response,
): Promise<string> {
  try {
    const data = (await response.json()) as CloudflareApiResponse<any>;
    if (data.errors && data.errors.length > 0) {
      return data.errors.map((e) => `Error ${e.code}: ${e.message}`).join(", ");
    }
    return `HTTP ${response.status}: ${response.statusText}`;
  } catch {
    return `HTTP ${response.status}: ${response.statusText}`;
  }
}

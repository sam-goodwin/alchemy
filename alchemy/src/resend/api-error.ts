import { logger } from "../util/logger.ts";

/**
 * Error response from Resend API
 */
export interface ResendApiError {
  name: string;
  message: string;
}

/**
 * Handle API errors from Resend
 */
export async function handleApiError(
  response: Response,
  operation: string,
  resourceType: string,
  resourceId?: string,
): Promise<never> {
  const errorId = resourceId ? `${resourceType} '${resourceId}'` : resourceType;
  let errorMessage = `Failed to ${operation} ${errorId}: HTTP ${response.status}`;

  try {
    const errorData = await response.json();
    if (errorData.message) {
      errorMessage = `Failed to ${operation} ${errorId}: ${errorData.message}`;
    }
  } catch {
    // If we can't parse the error response, use the status-based message
  }

  logger.error(errorMessage);
  throw new Error(errorMessage);
}

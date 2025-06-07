/**
 * Custom error class for Fly.io API errors
 * Includes HTTP status information from the Response
 */
export class FlyApiError extends Error {
  /**
   * HTTP status code
   */
  status: number;

  /**
   * HTTP status text
   */
  statusText: string;

  /**
   * Raw error data from the API
   */
  errorData?: any;

  /**
   * Create a new FlyApiError
   */
  constructor(message: string, response: Response, errorData?: any) {
    super(message);
    this.name = "FlyApiError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.errorData = errorData;

    // Ensure instanceof works correctly
    Object.setPrototypeOf(this, FlyApiError.prototype);
  }
}

/**
 * Helper function to handle API errors
 *
 * @param response The fetch Response object
 * @param action The action being performed (e.g., "creating", "deleting")
 * @param resourceType The type of resource being acted upon (e.g., "app", "machine")
 * @param resourceName The name/identifier of the specific resource
 * @returns Never returns - always throws an error
 */
export async function handleApiError(
  response: Response,
  action: string,
  resourceType: string,
  resourceName?: string,
): Promise<never> {
  const text = await response.text();
  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    json = { error: text };
  }

  // Fly.io API error format
  const errorMessage = json?.error || json?.message || response.statusText;
  const fullMessage = `Error ${response.status} ${action} ${resourceType}${resourceName ? ` '${resourceName}'` : ""}: ${errorMessage}`;
  
  throw new FlyApiError(fullMessage, response, json);
}
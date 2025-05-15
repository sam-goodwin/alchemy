/**
 * Error class for Neon API errors
 */
export class NeonApiError extends Error {
  /**
   * HTTP status code
   */
  public readonly status: number;

  /**
   * HTTP status text
   */
  public readonly statusText: string;

  /**
   * Error data from the API response
   */
  public readonly errorData?: any;

  /**
   * Create a new NeonApiError
   */
  constructor(message: string, response: Response, errorData?: any) {
    super(message);
    this.name = "NeonApiError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.errorData = errorData;

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NeonApiError);
    }
  }
}

/**
 * Handle API errors and throw NeonApiError with context
 *
 * @param response Response object from fetch
 * @param action Action that was being performed
 * @param resourceType Type of resource
 * @param resourceId ID of the resource
 */
export async function handleApiError(
  response: Response,
  action: "get" | "create" | "update" | "delete" | "list",
  resourceType: string,
  resourceId?: string,
): Promise<never> {
  const resourceDisplay = resourceId ? `'${resourceId}'` : "";
  let errorData: any;

  try {
    errorData = await response.json();
  } catch (_e) {
    // If we can't parse JSON, just use the response text
    try {
      errorData = { message: await response.text() };
    } catch (_textError) {
      errorData = { message: response.statusText };
    }
  }

  let message = `Error ${action} ${resourceType} ${resourceDisplay}: `;

  if (errorData?.error?.message) {
    message += errorData.error.message;
  } else if (errorData?.message) {
    message += errorData.message;
  } else if (errorData?.error) {
    message +=
      typeof errorData.error === "string"
        ? errorData.error
        : JSON.stringify(errorData.error);
  } else {
    message += response.statusText;
  }

  throw new NeonApiError(message, response, errorData);
}

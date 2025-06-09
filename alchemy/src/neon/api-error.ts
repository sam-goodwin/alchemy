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
  public readonly errorData?: unknown;

  /**
   * Create a new NeonApiError
   */
  constructor(message: string, response: Response, errorData?: unknown) {
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
  let errorData: unknown;

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

  if (errorData && typeof errorData === "object" && "error" in errorData) {
    const error = (errorData as { error: unknown }).error;
    if (error && typeof error === "object" && "message" in error) {
      message += (error as { message: string }).message;
    } else if (typeof error === "string") {
      message += error;
    } else {
      message += JSON.stringify(error);
    }
  } else if (
    errorData &&
    typeof errorData === "object" &&
    "message" in errorData
  ) {
    message += (errorData as { message: string }).message;
  } else {
    message += response.statusText;
  }

  throw new NeonApiError(message, response, errorData);
}

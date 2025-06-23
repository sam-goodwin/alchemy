/**
 * Handle and format Prisma API errors
 * @param response HTTP response from the API
 * @param action The action being performed (create, update, delete, get)
 * @param resource The resource type (project, environment, etc.)
 * @param id Optional resource identifier
 * @throws Error with formatted message
 */
export async function handleApiError(
  response: Response,
  action: string,
  resource: string,
  id?: string,
): Promise<never> {
  let errorMessage = `Failed to ${action} ${resource}`;
  if (id) {
    errorMessage += ` '${id}'`;
  }
  errorMessage += `: HTTP ${response.status} ${response.statusText}`;

  try {
    const errorData = await response.json();
    if (errorData.message) {
      errorMessage += ` - ${errorData.message}`;
    } else if (errorData.error) {
      errorMessage += ` - ${errorData.error}`;
    } else if (errorData.errors && Array.isArray(errorData.errors)) {
      errorMessage += ` - ${errorData.errors.map((e: any) => e.message || e).join(", ")}`;
    }
  } catch {
    // Failed to parse error response, use the raw text if available
    try {
      const errorText = await response.text();
      if (errorText) {
        errorMessage += ` - ${errorText}`;
      }
    } catch {
      // Failed to get error text, use generic message
    }
  }

  throw new Error(errorMessage);
}

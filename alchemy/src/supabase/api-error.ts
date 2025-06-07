export class SupabaseApiError extends Error {
  status: number;
  statusText: string;
  errorData?: any;

  constructor(message: string, response: Response, errorData?: any) {
    super(message);
    this.name = "SupabaseApiError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.errorData = errorData;
    Object.setPrototypeOf(this, SupabaseApiError.prototype);
  }
}

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
    json = { errors: [{ message: text }] };
  }
  const errors: { message: string }[] = json?.errors || [
    { message: response.statusText },
  ];
  const errorMessage = `Error ${response.status} ${action} ${resourceType}${
    resourceName ? ` '${resourceName}'` : ""
  }: ${errors[0]?.message || response.statusText}`;
  throw new SupabaseApiError(errorMessage, response, errors);
}

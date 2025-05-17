import type { ProgressEvent } from "./client.js";

/**
 * Error thrown by Cloud Control API operations
 */
export class CloudControlError extends Error {
  constructor(
    public readonly message: string,
    public readonly response?: Response,
  ) {
    super(message);
  }
}
export class NetworkError extends CloudControlError {}
export class RequestError extends CloudControlError {
  constructor(public readonly response: Response) {
    super(response.statusText);
  }
}
export class UpdateFailedError extends CloudControlError {
  constructor(public readonly progressEvent: ProgressEvent) {
    super(progressEvent.StatusMessage!);
  }
}
export class AlreadyExistsError extends CloudControlError {
  constructor(public readonly progressEvent: ProgressEvent) {
    super(progressEvent.StatusMessage!);
  }
}
export class TimeoutError extends CloudControlError {}

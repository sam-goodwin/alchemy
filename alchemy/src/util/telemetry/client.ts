import os from "node:os";
import type { Phase } from "../../alchemy.ts";
import {
  POSTHOG_CLIENT_API_HOST,
  POSTHOG_PROJECT_ID,
  TELEMETRY_DISABLED,
} from "./constants.ts";
import { context } from "./context.ts";
import type { Telemetry } from "./types.ts";

export interface TelemetryClientOptions {
  sessionId: string;
  phase?: Phase;
  enabled: boolean;
  quiet: boolean;
}

export interface ITelemetryClient {
  ready: Promise<unknown>;
  record(event: Telemetry.EventInput): void;
  finalize(): Promise<void>;
}

export class NoopTelemetryClient implements ITelemetryClient {
  ready = Promise.resolve();
  record(_: Telemetry.EventInput) {}
  finalize() {
    return Promise.resolve();
  }
}

export class TelemetryClient implements ITelemetryClient {
  private context: Promise<Telemetry.Context>;
  private events: Telemetry.Event[] = [];

  constructor(readonly options: TelemetryClientOptions) {
    this.context = context({
      sessionId: this.options.sessionId,
      phase: this.options.phase,
    });
    this.record({
      event: "app.start",
    });
  }

  get ready() {
    return this.context;
  }

  record(event: Telemetry.EventInput, timestamp = Date.now()) {
    const payload = {
      ...event,
      error: this.serializeError(event.error),
      timestamp,
    } as Telemetry.Event;
    this.events.push(payload);
  }

  private serializeError(
    error: Telemetry.ErrorInput | undefined,
  ): Telemetry.SerializedError | undefined {
    if (!error) {
      return undefined;
    }
    if (error instanceof Error) {
      return {
        ...error, // include additional properties from error object
        name: error.name,
        message: error.message?.replaceAll(os.homedir(), "~"), // redact home directory
        stack: error.stack?.replaceAll(os.homedir(), "~"),
      };
    }
    return error;
  }

  async finalize() {
    await this.send(this.events).catch((error) => {
      if (!this.options.quiet) {
        console.warn(error);
      }
    });
  }

  private async send(events: Telemetry.Event[]) {
    if (events.length === 0) {
      return;
    }
    const { userId, projectId, ...context } = await this.context;
    const safeProjectId = projectId ?? `temp_${userId}`;
    const groupResponse = await fetch(`${POSTHOG_CLIENT_API_HOST}/i/v0/e/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: POSTHOG_PROJECT_ID,
        event: "$groupidentify",
        distinct_id: "project-identify",
        properties: {
          $group_type: "project",
          $group_key: safeProjectId,
        },
      }),
    });
    if (!groupResponse.ok) {
      throw new Error(
        `Failed to send group identify: ${groupResponse.status} ${groupResponse.statusText} - ${await groupResponse.text()}`,
      );
    }
    const response = await fetch(`${POSTHOG_CLIENT_API_HOST}/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: POSTHOG_PROJECT_ID,
        historical_migration: false,
        batch: events.map(({ event, timestamp, ...properties }) => ({
          event,
          properties: {
            distinct_id: userId,
            ...context,
            ...properties,
            projectId: safeProjectId,
            $groups: { project: safeProjectId },
          },
          timestamp: new Date(timestamp).toISOString(),
        })),
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to send telemetry: ${response.status} ${response.statusText} - ${await response.text()}`,
      );
    }
  }

  static create({
    phase,
    enabled,
    quiet,
  }: Omit<TelemetryClientOptions, "sessionId">): ITelemetryClient {
    if (!enabled || TELEMETRY_DISABLED) {
      if (!quiet) {
        console.warn("[Alchemy] Telemetry is disabled.");
      }
      return new NoopTelemetryClient();
    }
    return new TelemetryClient({
      sessionId: crypto.randomUUID(),
      phase,
      enabled,
      quiet,
    });
  }
}

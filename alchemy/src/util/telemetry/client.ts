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
  phase: Phase;
  enabled: boolean;
  quiet: boolean;
}

export interface ITelemetryClient {
  ready: Promise<void>;
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
  ready: Promise<void>;

  private events: Telemetry.Event[] = [];
  private context?: Telemetry.Context;

  constructor(readonly options: TelemetryClientOptions) {
    this.ready = this.init();
  }

  private async init() {
    const now = Date.now();
    this.context = await context({
      sessionId: this.options.sessionId,
      phase: this.options.phase,
    });
    this.record(
      {
        event: "app.start",
      },
      now,
    );
  }

  record(event: Telemetry.EventInput, timestamp = Date.now()) {
    if (!this.context) {
      return;
    }
    const payload = {
      ...event,
      error: this.serializeError(event.error),
      context: this.context,
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
        message: error.message,
        // TODO: maybe redact more of the stack trace?
        stack: error.stack?.replaceAll(os.homedir(), "~"), // redact home directory
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
    const response = await fetch(`${POSTHOG_CLIENT_API_HOST}/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: POSTHOG_PROJECT_ID,
        historical_migration: false,
        batch: events.map((e) => ({
          event: e.event,
          properties: {
            distinct_id: this.context?.sessionId,
          },
          timestamp: new Date(e.timestamp).toISOString(),
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

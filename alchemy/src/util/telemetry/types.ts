import type { Phase } from "../../alchemy.ts";

export namespace Telemetry {
  export interface Context {
    /** Random UUID generated once per machine and stored in XDG config directory (e.g. `~/Library/Preferences/alchemy` on Mac). Null for CI environments. */
    userId: string | null;
    /** Root commit hash for the git repository. Anonymous, stable identifier for anyone using git. */
    projectId: string | null;
    /** UUID generated once per application run. */
    sessionId: string;

    system: {
      platform: string;
      osVersion: string;
      arch: string;
      cpus: number;
      memory: number;
    };

    runtime: {
      name: string | null;
      version: string | null;
    };

    environment: {
      provider: string | null;
      isCI: boolean;
    };

    alchemy: {
      version: string;
      phase?: Phase;
    };
  }

  export interface BaseEvent {
    event: string;
    timestamp: number;
  }

  export interface SerializedError {
    name?: string;
    message: string;
    stack?: string;
  }

  export type ErrorInput = Error | SerializedError;

  export interface AppEvent extends BaseEvent {
    event: "app.start" | "app.success" | "app.error";
    elapsed?: number;
    error?: SerializedError;
  }

  export interface ResourceEvent extends BaseEvent {
    event:
      | "resource.start"
      | "resource.success"
      | "resource.error"
      | "resource.skip"
      | "resource.read";
    resource: string;
    status?:
      | "creating"
      | "created"
      | "updating"
      | "updated"
      | "deleting"
      | "deleted";
    elapsed?: number;
    error?: SerializedError;
    replaced?: boolean;
  }

  export interface CliEvent extends BaseEvent {
    event: "cli.start" | "cli.success" | "cli.error";
    command: string;
  }

  export interface StateStoreEvent extends BaseEvent {
    event:
      | "stateStore.init"
      | "stateStore.deinit"
      | "stateStore.list"
      | "stateStore.count"
      | "stateStore.get"
      | "stateStore.getBatch"
      | "stateStore.all"
      | "stateStore.set"
      | "stateStore.delete";
    stateStoreClass: string;
    elapsed?: number;
    error?: SerializedError;
  }

  export type Event = AppEvent | ResourceEvent | StateStoreEvent | CliEvent;
  export type EventInput = (
    | Omit<AppEvent, "timestamp" | "error">
    | Omit<ResourceEvent, "timestamp" | "error">
    | Omit<StateStoreEvent, "timestamp" | "error">
    | Omit<CliEvent, "timestamp" | "error">
  ) & {
    error?: ErrorInput;
  };
}

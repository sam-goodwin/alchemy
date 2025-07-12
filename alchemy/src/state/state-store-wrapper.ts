import type { State, StateStore } from "../state.ts";
import type { ITelemetryClient } from "../util/telemetry/client.ts";
import type { Telemetry } from "../util/telemetry/types.ts";

//todo(michael): we should also handle serde here
export class StateStoreWrapper implements StateStore {
  private readonly stateStore: StateStore;
  private readonly telemetryClient: ITelemetryClient;
  private readonly stateStoreClass: string;

  constructor(stateStore: StateStore, telemetryClient: ITelemetryClient) {
    this.stateStore = stateStore;
    this.telemetryClient = telemetryClient;
    this.stateStoreClass = stateStore.constructor.name;
  }

  private async callWithTelemetry<T>(
    event: Telemetry.StateStoreEvent["event"],
    fn: () => Promise<T>,
  ): Promise<T> {
    const start = performance.now();
    let error: unknown;
    return await fn()
      .catch((err) => (error = err))
      .finally(() => {
        this.telemetryClient.record({
          event,
          stateStoreClass: this.stateStoreClass,
          elapsed: performance.now() - start,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      });
  }

  async init() {
    if (this.stateStore.init == null) {
      return;
    }
    await this.callWithTelemetry(
      "stateStore.init",
      this.stateStore.init.bind(this.stateStore),
    );
  }
  async deinit() {
    if (this.stateStore.deinit == null) {
      return;
    }
    await this.callWithTelemetry(
      "stateStore.deinit",
      this.stateStore.deinit.bind(this.stateStore),
    );
  }
  async list() {
    return await this.callWithTelemetry(
      "stateStore.list",
      this.stateStore.list.bind(this.stateStore),
    );
  }
  async count() {
    return await this.callWithTelemetry(
      "stateStore.count",
      this.stateStore.count.bind(this.stateStore),
    );
  }
  async get(key: string) {
    return await this.callWithTelemetry(
      "stateStore.get",
      this.stateStore.get.bind(this.stateStore, key),
    );
  }
  async getBatch(ids: string[]) {
    return await this.callWithTelemetry(
      "stateStore.getBatch",
      this.stateStore.getBatch.bind(this.stateStore, ids),
    );
  }
  async all() {
    return await this.callWithTelemetry(
      "stateStore.all",
      this.stateStore.all.bind(this.stateStore),
    );
  }
  async set(key: string, value: State) {
    await this.callWithTelemetry(
      "stateStore.set",
      this.stateStore.set.bind(this.stateStore, key, value),
    );
  }
  async delete(key: string) {
    await this.callWithTelemetry(
      "stateStore.delete",
      this.stateStore.delete.bind(this.stateStore, key),
    );
  }
}

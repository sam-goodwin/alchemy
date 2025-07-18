import type { Resource, ResourceProps } from "./resource.ts";
import type { Scope } from "./scope.ts";
import { withExponentialBackoff } from "./util/retry.ts";

export type State<
  Kind extends string = string,
  Props extends ResourceProps | undefined = ResourceProps | undefined,
  Out extends Resource = Resource,
> = {
  status:
    | `creating`
    | `created`
    | `updating`
    | `updated`
    | `deleting`
    | `deleted`;
  kind: Kind;
  id: string;
  fqn: string;
  seq: number;
  data: Record<string, any>;
  // deps: string[];
  props: Props;
  oldProps?: Props;
  output: Out;
};

export type StateStoreType = (scope: Scope) => StateStore;

export interface StateStoreRetryOptions {
  enableRetry?: boolean;
  maxAttempts?: number;
  initialDelayMs?: number;
  isRetryable?: (error: any) => boolean;
}

export abstract class StateStore {
  protected retryOptions: Required<StateStoreRetryOptions>;

  constructor(
    protected readonly scope: Scope,
    retryOptions?: StateStoreRetryOptions,
  ) {
    this.retryOptions = {
      enableRetry: retryOptions?.enableRetry ?? true,
      maxAttempts: retryOptions?.maxAttempts ?? 5,
      initialDelayMs: retryOptions?.initialDelayMs ?? 100,
      isRetryable: retryOptions?.isRetryable ?? (() => true),
    };
  }

  init?(): Promise<void>;
  deinit?(): Promise<void>;
  abstract listRaw(): Promise<string[]>;
  abstract countRaw(): Promise<number>;
  abstract getRaw(key: string): Promise<State | undefined>;
  abstract getBatchRaw(ids: string[]): Promise<Record<string, State>>;
  abstract allRaw(): Promise<Record<string, State>>;
  abstract setRaw(key: string, value: State): Promise<void>;
  abstract deleteRaw(key: string): Promise<void>;

  async list(): Promise<string[]> {
    return this.withTelemetry("list", () => this.listRaw());
  }

  async count(): Promise<number> {
    return this.withTelemetry("count", () => this.countRaw());
  }

  async get(key: string): Promise<State | undefined> {
    return this.withTelemetry("get", async () => {
      const result = await this.getRaw(key);
      if (result === undefined) {
        return undefined;
      }
      return await this.deserialize(result);
    });
  }

  async getBatch(ids: string[]): Promise<Record<string, State>> {
    return this.withTelemetry("getBatch", async () => {
      const result = await this.getBatchRaw(ids);
      return await this.deserializeMany(result);
    });
  }

  async all(): Promise<Record<string, State>> {
    return this.withTelemetry("all", async () => {
      const result = await this.allRaw();
      return await this.deserializeMany(result);
    });
  }

  async set(key: string, value: State): Promise<void> {
    return this.withTelemetry("set", async () => {
      const serialized = await this.serialize(value);
      return await this.setRaw(key, serialized);
    });
  }

  async delete(key: string): Promise<void> {
    return this.withTelemetry("delete", () => this.deleteRaw(key));
  }

  private async deserialize(state: State): Promise<State> {
    const { deserialize } = await import("./serde.ts");
    return await deserialize(this.scope, state);
  }

  private async serialize(state: State) {
    const { serialize } = await import("./serde.ts");
    return await serialize(this.scope, state);
  }

  private async deserializeMany(states: Record<string, State>) {
    return Object.fromEntries(
      await Promise.all(
        Object.entries(states).map(async ([key, value]) => [
          key,
          await this.deserialize(value),
        ]),
      ),
    );
  }

  private async executeWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    if (this.retryOptions.enableRetry) {
      return withExponentialBackoff(
        fn,
        this.retryOptions.isRetryable,
        this.retryOptions.maxAttempts,
        this.retryOptions.initialDelayMs,
      );
    } else {
      return fn();
    }
  }

  private async withTelemetry<T>(
    operation: string,
    fn: () => Promise<T>,
  ): Promise<T> {
    const start = performance.now();
    let error: unknown;

    try {
      return await this.executeWithRetry(fn);
    } catch (err) {
      error = err;
      throw err;
    } finally {
      this.scope.telemetryClient.record({
        event: `stateStore.${operation}` as any,
        stateStoreClass: this.constructor.name,
        elapsed: performance.now() - start,
        error:
          error instanceof Error
            ? error
            : error
              ? new Error(String(error))
              : undefined,
      });
    }
  }
}

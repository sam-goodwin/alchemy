import { AsyncLocalStorage } from "node:async_hooks";
import type { Phase } from "./alchemy.ts";
import { destroy, destroyAll } from "./destroy.ts";
import { FileSystemStateStore } from "./fs/file-system-state-store.ts";
import {
  ResourceID,
  ResourceScope,
  type PendingResource,
  type Resource,
  type ResourceProps,
} from "./resource.ts";
import type { StateStore, StateStoreType } from "./state.ts";
import {
  createDummyLogger,
  createLoggerInstance,
  type LoggerApi,
} from "./util/cli.ts";
import { AsyncMutex } from "./util/mutex.ts";
import type { ITelemetryClient } from "./util/telemetry/client.ts";

export interface ScopeOptions {
  appName?: string;
  stage?: string;
  parent?: Scope;
  scopeName?: string;
  password?: string;
  stateStore?: StateStoreType;
  quiet?: boolean;
  phase?: Phase;
  telemetryClient?: ITelemetryClient;
  logger?: LoggerApi;
}

export type PendingDeletions = Array<{
  resource: Resource<string>;
  oldProps?: ResourceProps;
}>;

// TODO: support browser
const DEFAULT_STAGE = process.env.ALCHEMY_STAGE ?? process.env.USER ?? "dev";

declare global {
  var __ALCHEMY_STORAGE__: AsyncLocalStorage<Scope>;
  var __ALCHEMY_GLOBALS__: Scope[];
}

const ScopeSymbol = Symbol.for("alchemy::Scope");

export function isScope(value: any): value is Scope {
  return value instanceof Scope || value?.[ScopeSymbol] === true;
}

export class Scope {
  readonly [ScopeSymbol] = true;

  public static readonly KIND = "alchemy::Scope" as const;

  public static storage = (globalThis.__ALCHEMY_STORAGE__ ??=
    new AsyncLocalStorage<Scope>());
  public static globals: Scope[] = (globalThis.__ALCHEMY_GLOBALS__ ??= []);

  public static getScope(): Scope | undefined {
    const scope = Scope.storage.getStore();
    if (!scope) {
      if (Scope.globals.length > 0) {
        return Scope.globals[Scope.globals.length - 1];
      }
      return undefined;
    }
    return scope;
  }

  public static get root(): Scope {
    return Scope.current.root;
  }

  public static get current(): Scope {
    const scope = Scope.getScope();
    if (!scope) throw new Error("Not running within an Alchemy Scope");
    return scope;
  }

  public readonly resources = new Map<ResourceID, PendingResource>();
  public readonly children: Map<ResourceID, Scope> = new Map();
  public readonly appName: string | undefined;
  public readonly stage: string;
  public readonly scopeName: string | null;
  public readonly parent: Scope | undefined;
  public readonly password: string | undefined;
  public readonly state: StateStore;
  public readonly stateStore: StateStoreType;
  public readonly quiet: boolean;
  public readonly phase: Phase;
  public readonly logger: LoggerApi;
  public readonly telemetryClient: ITelemetryClient;
  public readonly dataMutex: AsyncMutex;

  private isErrored = false;
  private finalized = false;
  private startedAt = performance.now();

  private deferred: (() => Promise<any>)[] = [];

  constructor(options: ScopeOptions) {
    this.appName = options.appName;
    this.scopeName = options.scopeName ?? null;
    if (this.scopeName?.includes(":")) {
      throw new Error(
        `Scope name ${this.scopeName} cannot contain double colons`,
      );
    }
    this.parent = options.parent ?? Scope.getScope();
    this.stage = options?.stage ?? this.parent?.stage ?? DEFAULT_STAGE;
    this.parent?.children.set(this.scopeName!, this);
    this.quiet = options.quiet ?? this.parent?.quiet ?? false;
    if (this.parent && !this.scopeName) {
      throw new Error("Scope name is required when creating a child scope");
    }
    this.password = options.password ?? this.parent?.password;
    const phase = options.phase ?? this.parent?.phase;
    if (phase === undefined) {
      throw new Error("Phase is required");
    }
    this.phase = phase;

    this.logger = this.quiet
      ? createDummyLogger()
      : createLoggerInstance(
          {
            phase: this.phase,
            stage: this.stage,
            appName: this.appName ?? "",
          },
          options.logger,
        );

    this.stateStore =
      options.stateStore ??
      this.parent?.stateStore ??
      ((scope) => new FileSystemStateStore(scope));
    this.state = this.stateStore(this);
    if (!options.telemetryClient && !this.parent?.telemetryClient) {
      throw new Error("Telemetry client is required");
    }
    this.telemetryClient =
      options.telemetryClient ?? this.parent?.telemetryClient!;
    this.dataMutex = new AsyncMutex();
  }

  public get root(): Scope {
    let root: Scope = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
  }

  public async deleteResource(resourceID: ResourceID) {
    await this.state.delete(resourceID);
    this.resources.delete(resourceID);
  }

  private _seq = 0;

  public seq() {
    return this._seq++;
  }

  public get chain(): string[] {
    const thisScope = this.scopeName ? [this.scopeName] : [];
    const app = this.appName ? [this.appName] : [];
    if (this.parent) {
      return [...this.parent.chain, ...thisScope];
    }
    return [...app, this.stage, ...thisScope];
  }

  public fail() {
    this.logger.error("Scope failed", this.chain.join("/"));
    this.isErrored = true;
  }

  public async init() {
    await Promise.all([this.state.init?.(), this.telemetryClient.ready]);
  }

  public async deinit() {
    await this.parent?.state.delete(this.scopeName!);
    await this.state.deinit?.();
  }

  public fqn(resourceID: ResourceID): string {
    return [...this.chain, resourceID].join("/");
  }

  public async set<T>(key: string, value: T): Promise<void> {
    return this.dataMutex.lock(async () => {
      // Get the current scope state from the parent (if it exists)
      if (this.parent && this.scopeName) {
        const scopeState = await this.parent.state.get(this.scopeName);
        if (scopeState) {
          scopeState.data[key] = value;
          return await this.parent.state.set(this.scopeName, scopeState);
        }
      }
      throw new Error("Root scope cannot contain state");
    });
  }

  public async get<T>(key: string): Promise<T> {
    return this.dataMutex.lock(async () => {
      // Get the current scope state from the parent (if it exists)
      if (this.parent && this.scopeName) {
        const scopeState = await this.parent.state.get(this.scopeName);
        return scopeState?.data[key];
      }
      throw new Error("Root scope cannot contain state");
    });
  }

  public async delete(key: string): Promise<void> {
    return this.dataMutex.lock(async () => {
      if (this.parent && this.scopeName) {
        const scopeState = await this.parent.state.get(this.scopeName);
        if (scopeState) {
          delete scopeState.data[key];
          return await this.parent.state.set(this.scopeName, scopeState);
        }
      }
      throw new Error("Root scope cannot contain state");
    });
  }

  public async run<T>(fn: (scope: Scope) => Promise<T>): Promise<T> {
    return Scope.storage.run(this, () => fn(this));
  }

  [Symbol.asyncDispose]() {
    return this.finalize();
  }

  /**
   * The telemetry client for the root scope.
   * This is used so that app-level hooks are only called once.
   */
  private get rootTelemetryClient(): ITelemetryClient | null {
    if (!this.parent) {
      return this.telemetryClient;
    }
    return null;
  }

  public async finalize(force?: boolean) {
    if (this.phase === "read") {
      this.rootTelemetryClient?.record({
        event: "app.success",
        elapsed: performance.now() - this.startedAt,
      });
      return;
    }
    if (this.finalized && !force) {
      return;
    }
    if (this.parent === undefined && Scope.globals.length > 0) {
      const last = Scope.globals.pop();
      if (last !== this) {
        throw new Error(
          "Running in AsyncLocaStorage.enterWith emulation mode and attempted to finalize a global Scope that wasn't top of the stack",
        );
      }
    }
    this.finalized = true;
    // trigger and await all deferred promises
    await Promise.all(this.deferred.map((fn) => fn()));
    if (!this.isErrored) {
      // TODO: need to detect if it is in error
      const resourceIds = await this.state.list();
      const aliveIds = new Set(this.resources.keys());
      const orphanIds = Array.from(
        resourceIds.filter((id) => !aliveIds.has(id)),
      );

      if (force || this.parent === undefined) {
        await this.destroyPendingDeletions();
        await Promise.all(
          Array.from(this.children.values()).map((child) =>
            child.finalize(force),
          ),
        );
      }

      const orphans = await Promise.all(
        orphanIds.map(async (id) => (await this.state.get(id))!.output),
      );
      await destroyAll(orphans, {
        quiet: this.quiet,
        strategy: "sequential",
        force: force || this.parent === undefined,
      });
      this.rootTelemetryClient?.record({
        event: "app.success",
        elapsed: performance.now() - this.startedAt,
      });
    } else {
      this.logger.warn("Scope is in error, skipping finalize");
      this.rootTelemetryClient?.record({
        event: "app.error",
        error: new Error("Scope failed"),
        elapsed: performance.now() - this.startedAt,
      });
    }

    await this.rootTelemetryClient?.finalize();
  }

  public async destroyPendingDeletions() {
    const pendingDeletions =
      (await this.get<PendingDeletions>("pendingDeletions")) ?? [];
    if (pendingDeletions) {
      for (const { resource, oldProps } of pendingDeletions) {
        //todo(michael): ugly hack due to the way scope is serialized
        const realResource = this.resources.get(resource[ResourceID])!;
        resource[ResourceScope] = realResource?.[ResourceScope] ?? this;
        await destroy(resource, {
          quiet: this.quiet,
          strategy: "sequential",
          replace: {
            props: oldProps,
            output: resource,
          },
        });
      }
    }
  }

  /**
   * Defers execution of a function until the Alchemy application finalizes.
   */
  public defer<T>(fn: () => Promise<T>): Promise<T> {
    let _resolve: (value: T) => void;
    let _reject: (reason?: any) => void;
    const promise = new Promise<T>((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    this.deferred.push(() => {
      if (!this.finalized) {
        throw new Error(
          "Attempted to await a deferred Promise before finalization",
        );
      }
      // lazily trigger the worker on first await
      return this.run(() => fn()).then(_resolve, _reject);
    });
    return promise;
  }

  /**
   * Returns a string representation of the scope.
   */
  public toString() {
    return `Scope(
  chain=${this.chain.join("/")},
  resources=[${Array.from(this.resources.values())
    .map((r) => r[ResourceID])
    .join(",\n  ")}]
)`;
  }
}

declare global {
  // for runtime
  // TODO(sam): maybe inject is a better way to achieve this
  var __ALCHEMY_SCOPE__: typeof Scope;
}

globalThis.__ALCHEMY_SCOPE__ = Scope;

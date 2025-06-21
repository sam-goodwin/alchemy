import { AsyncLocalStorage } from "node:async_hooks";
import type { Phase } from "./alchemy.ts";
import { destroyAll } from "./destroy.ts";
import { FileSystemStateStore } from "./fs/file-system-state-store.ts";
import { ResourceID, type PendingResource } from "./resource.ts";
import type { StateStore, StateStoreType } from "./state.ts";
import {
  createDummyLogger,
  createLoggerInstance,
  type LoggerApi,
} from "./util/cli.ts";
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
  dev?: boolean;
  telemetryClient?: ITelemetryClient;
  logger?: LoggerApi;
}

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

  public static get(): Scope | undefined {
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
    const scope = Scope.get();
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
  public readonly dev?: boolean;
  public readonly logger: LoggerApi;
  public readonly telemetryClient: ITelemetryClient;

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
    this.parent = options.parent ?? Scope.get();
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

    this.dev = options.dev ?? this.parent?.dev ?? false;

    if (this.dev) {
      this.logger.warnOnce(
        "Local development mode is in beta. Please report any issues to https://github.com/sam-goodwin/alchemy/issues.",
      );
    }

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
  }

  public get root(): Scope {
    let root: Scope = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
  }

  public async delete(resourceID: ResourceID) {
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

  public async finalize() {
    if (this.phase === "read") {
      this.rootTelemetryClient?.record({
        event: "app.success",
        elapsed: performance.now() - this.startedAt,
      });
      return;
    }
    if (this.finalized) {
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
      const orphans = await Promise.all(
        orphanIds.map(async (id) => (await this.state.get(id))!.output),
      );
      await destroyAll(orphans, {
        quiet: this.quiet,
        strategy: "sequential",
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

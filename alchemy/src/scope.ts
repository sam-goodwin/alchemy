import { AsyncLocalStorage } from "node:async_hooks";
import type { Phase } from "./alchemy.js";
import { destroy } from "./destroy.js";
import { FileSystemStateStore } from "./fs/file-system-state-store.js";
import { ResourceID, type PendingResource } from "./resource.js";
import {
  HydratingStateStore,
  type StateStore,
  type StateStoreType,
} from "./state.js";

const scopeStorage = new AsyncLocalStorage<Scope>();

export type ScopeOptions = {
  appName?: string;
  stage?: string;
  parent?: Scope;
  scopeName?: string;
  password?: string;
  stateStore?: StateStoreType;
  quiet?: boolean;
  phase?: Phase;
  seq?: number;
};

// TODO: support browser
const DEFAULT_STAGE = process.env.ALCHEMY_STAGE ?? process.env.USER ?? "dev";

export class Scope {
  public static readonly KIND = "alchemy::Scope";

  public static get(): Scope | undefined {
    return scopeStorage.getStore();
  }

  public static get current(): Scope {
    const scope = Scope.get();
    if (!scope) {
      throw new Error("Not running within an Alchemy Scope");
    }
    return scope;
  }

  public static async create(options: ScopeOptions) {
    const scope = new Scope(options);
    for (const sibling of scope.parent?.scopes ?? []) {
      if (sibling.scopeName === scope.scopeName) {
        // remove the sibling from the parent's scope chain
        scope.parent!.scopes = scope.parent!.scopes.filter(
          (s) => s !== sibling,
        );
        // we just overwrote the scope, we should finalize the previous scope?
        await sibling.finalize();
      }
    }
    scope.parent?.scopes.push(scope);
    return scope;
  }

  public readonly resources = new Map<ResourceID, PendingResource>();
  public scopes: Scope[] = [];
  public readonly appName: string | undefined;
  public readonly stage: string;
  public readonly scopeName: string | null;
  public readonly parent: Scope | undefined;
  public readonly password: string | undefined;
  public readonly state: StateStore;
  public readonly quiet: boolean;
  public readonly phase: Phase;
  public readonly seq: number;

  private isErrored = false;
  private _isFinalized = false;

  constructor(options: ScopeOptions) {
    this.appName = options.appName;
    this.stage = options?.stage ?? DEFAULT_STAGE;
    this.scopeName = options.scopeName ?? null;
    this.parent = options.parent ?? Scope.get();
    this.quiet = options.quiet ?? this.parent?.quiet ?? false;
    if (this.parent && !this.scopeName) {
      throw new Error("Scope name is required when creating a child scope");
    }
    this.password = options.password ?? this.parent?.password;
    this.state = new HydratingStateStore(
      this,
      options.stateStore
        ? options.stateStore(this)
        : new FileSystemStateStore(this),
    );
    const phase = options.phase ?? this.parent?.phase;
    if (phase === undefined) {
      throw new Error("Phase is required");
    }
    this.phase = phase;
    this.seq = options.seq ?? this.parent?.nextSeq() ?? 0;
  }

  public async delete(resourceID: ResourceID) {
    await this.state.delete(resourceID);
    this.resources.delete(resourceID);
  }

  private _seqCounter = 0;

  public nextSeq() {
    return this._seqCounter++;
  }

  public get chain(): string[] {
    const thisScope = this.scopeName ? [this.scopeName] : [];
    const app = this.appName ? [this.appName] : [];
    if (this.parent) {
      return [...this.parent.chain, ...thisScope];
    }
    return [...app, this.stage, ...thisScope];
  }

  public fail(err?: any) {
    if (!this.isErrored) {
      console.error("Failed: ", `"${this.addr}"`);
      if (err) {
        console.error(err);
      }
    }
    this.isErrored = true;
  }

  public enter() {
    scopeStorage.enterWith(this);
  }

  public async init() {
    await this.state.init?.();
  }

  public async deinit() {
    await this.parent?.state.delete(this.scopeName!);
    await this.state.deinit?.();
  }

  public fqn(resourceID: ResourceID): string {
    return [...this.chain, resourceID].join("/");
  }

  public get addr() {
    return this.chain.join("/");
  }

  public async run<T>(fn: (scope: Scope) => Promise<T>): Promise<T> {
    return scopeStorage.run(this, () => fn(this));
  }

  [Symbol.asyncDispose]() {
    return this.finalize();
  }

  public async finalize(force?: boolean) {
    if (this.phase === "read") {
      return;
    }
    if (this._isFinalized && !force) {
      return;
    }
    this._isFinalized = true;
    if (!this.isErrored) {
      // TODO: need to detect if it is in error
      const resourceIds = await this.state.list();

      const aliveIds = Array.from(this.resources.keys());
      const aliveIdsSet = new Set(aliveIds);
      const orphanIds = Array.from(
        resourceIds.filter((id) => !aliveIdsSet.has(id)),
      );

      const load = (ids: Iterable<string>) =>
        Promise.all(
          Array.from(ids).map(async (id) => (await this.state.get(id))!),
        ).then((states) => states.filter((s) => s !== undefined));
      const [replaced, orphans] = await Promise.all([
        load(aliveIds).then((alive) =>
          alive
            .filter((r) => r.replace !== undefined)
            .map((state) => ({
              type: "replaced",
              seq: state.seq,
              state,
            })),
        ),
        // TODO(sam): what if an orphan also has replace !== undefined? We need to delete it too (2 deletions).
        load(orphanIds).then((orphans) =>
          orphans.map((state) => ({
            type: "orphan",
            state,
            seq: state.seq,
          })),
        ),
      ]);

      const scopes = this.scopes.toReversed();
      const sequence = [...orphans, ...replaced, ...scopes].sort((a, b) => {
        const ordinal = a.seq - b.seq;
        if (ordinal === 0) {
          // we want to finalize Scopes before deleting them
          if (a instanceof Scope) {
            return -1;
          } else if (b instanceof Scope) {
            return 1;
          }
        }
        return ordinal;
      });

      // now destroy all resources and finalize scopes in sequence order
      for (const node of sequence) {
        if (node instanceof Scope) {
          // finalize the scope (destroy orphans within it)
          await node.finalize(force);
        } else {
          const { type, state } = node;
          if (type === "replaced") {
            // replaced resource that needs to be deleted
            await destroy(state.replace!.output, {
              replace: {
                props: state.replace!.props,
              },
            });
          } else {
            if (state.replace !== undefined) {
              // delete the orphaned resource's replaced resource
              // this is an edge case that indicates that we failed to delete a replaced resource
              // .. and then later orphaned the replacement resource
              // this leaves us with two resource that must be deleted
              // TODO(sam): we are using the sequence order of the replacement instead of the replaced resource, is that a problem?
              await destroy(state.replace.output, {
                replace: state.replace,
              });
            }

            // delete the orphaned resource
            await destroy(state.output, {
              quiet: this.quiet,
            });
          }
        }
      }
    } else {
      console.warn("Scope is in error, skipping finalize");
    }
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

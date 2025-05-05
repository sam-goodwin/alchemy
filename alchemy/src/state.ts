import {
  ResourceFQN,
  ResourceID,
  ResourceKind,
  ResourceScope,
  ResourceSeq,
  type Resource,
  type ResourceProps,
} from "./resource.js";
import type { Scope } from "./scope.js";

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
  replace?: {
    // the repalce
    output: Out;
    // props to pass in when deleting the replaced resource
    props: Props;
  };
};

export type StateStoreType = (scope: Scope) => StateStore;

export interface StateStore {
  /** Initialize the state container if one is required */
  init?(): Promise<void>;
  /** Delete the state container if one exists */
  deinit?(): Promise<void>;
  /** List all resources in the given stage. */
  list(): Promise<string[]>;
  /** Return the number of items let in this store */
  count(): Promise<number>;
  get(key: string): Promise<State | undefined>;
  getBatch(ids: string[]): Promise<Record<string, State>>;
  all(): Promise<Record<string, State>>;
  set(key: string, value: State): Promise<void>;
  delete(key: string): Promise<void>;
}

/**
 * Wraps a State Store to hydrate State with Scope and other internal IDs.
 */
export class HydratingStateStore implements StateStore {
  constructor(
    private readonly scope: Scope,
    private readonly store: StateStore,
  ) {}

  private hydrate(state: State | State[]): any {
    if (Array.isArray(state)) {
      return state.map((state) => this.hydrate(state));
    }
    const hydrate = (output: Resource) => {
      output[ResourceScope] = this.scope;
      output[ResourceID] = state.id;
      output[ResourceKind] = state.kind;
      output[ResourceFQN] = state.fqn;
      output[ResourceSeq] = state.seq;
    };
    hydrate(state.output);
    if (state.replace) {
      hydrate(state.replace.output);
    }
  }

  init?(): Promise<void> {
    return this.store.init?.() ?? Promise.resolve();
  }
  deinit?(): Promise<void> {
    return this.store.deinit?.() ?? Promise.resolve();
  }
  list(): Promise<string[]> {
    return this.store.list();
  }
  count(): Promise<number> {
    return this.store.count();
  }
  async get(key: string): Promise<State | undefined> {
    const state = await this.store.get(key);
    if (state) {
      this.hydrate(state);
    }
    return state;
  }

  async getBatch(ids: string[]): Promise<Record<string, State>> {
    const batch = await this.store.getBatch(ids);
    for (const state of Object.values(batch)) {
      this.hydrate(state);
    }
    return batch;
  }
  async all(): Promise<Record<string, State>> {
    const all = await this.store.all();
    this.hydrate(Object.values(all));
    return all;
  }
  set(key: string, value: State): Promise<void> {
    return this.store.set(key, value);
  }
  delete(key: string): Promise<void> {
    return this.store.delete(key);
  }
}

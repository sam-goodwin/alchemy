import {
  ResourceFQN,
  ResourceID,
  ResourceKind,
  ResourceScope,
  ResourceSeq,
  type Resource,
  type ResourceProps,
} from "./resource.ts";
import { Scope } from "./scope.ts";
import { deserialize } from "./serde.ts";

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
  version?: number;
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

export async function deserializeState(
  scope: Scope,
  content: string,
): Promise<State> {
  const state = (await deserialize(scope, JSON.parse(content))) as State;

  if (ResourceID in state.output) {
    // this is a new state
    return state;
  }
  const output: any = state.output;
  delete output.Kind;
  delete output.ID;
  delete output.FQN;
  delete output.Scope;
  delete output.Seq;
  // fix this bug
  if (state.kind === "scope") {
    state.kind = Scope.KIND;
  }
  output[ResourceKind] = state.kind;
  output[ResourceID] = state.id;
  output[ResourceFQN] = state.fqn;
  output[ResourceScope] = scope;
  output[ResourceSeq] = state.seq;
  state.output = output;
  // re-write the state with the migrated format
  await scope.state.set(state.id, state);
  return state;
}

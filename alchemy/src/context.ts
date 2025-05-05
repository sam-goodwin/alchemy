import { DestroyedSignal } from "./destroy.js";
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
import type { State } from "./state.js";

export type Context<
  Out extends Resource,
  Props extends ResourceProps = ResourceProps,
> = CreateContext<Out> | UpdateContext<Out, Props> | DeleteContext<Out, Props>;

export interface CreateContext<Out extends Resource> extends BaseContext<Out> {
  phase: "create";
  output?: undefined;
  props?: undefined;
}

export interface UpdateContext<
  Out extends Resource,
  Props extends ResourceProps = ResourceProps,
> extends BaseContext<Out> {
  phase: "update";
  output: Out;
  props: Props;
}

export interface DeleteContext<
  Out extends Resource,
  Props extends ResourceProps = ResourceProps,
> extends BaseContext<Out> {
  phase: "delete";
  output: Out;
  props: Props;
}

export interface BaseContext<Out extends Resource> {
  quiet: boolean;
  stage: string;
  id: ResourceID;
  fqn: ResourceFQN;
  scope: Scope;
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
  delete<T>(key: string): Promise<T | undefined>;
  /**
   * Indicate that this resource is being replaced.
   * This will cause the resource to be deleted at the end of the stack's CREATE phase.
   */
  replace(): void;
  /**
   * Terminate the resource lifecycle handler and destroy the resource.
   *
   * This is the final operation performed during a delete operation.
   *
   * It is so that the resource lifecycle handler can "return never" instead of
   * "return undefined" so that `await MyResource()` always returns a value.
   */
  destroy(): never;
  /**
   * Create the Resource envelope (with Alchemy + User properties)
   */
  create(props: Omit<Out, keyof Resource>): Out;
  /**
   * Create the Resource envelope (with Alchemy + User properties)
   */
  (id: string, props: Omit<Out, keyof Resource>): Out;
  (props: Omit<Out, keyof Resource>): Out;
}

export function context<
  Kind extends string,
  Props extends ResourceProps | undefined,
  Out extends Resource,
>({
  scope,
  phase,
  kind,
  id,
  fqn,
  seq,
  state,
  replace,
}: {
  scope: Scope;
  phase: "create" | "update" | "delete";
  kind: ResourceKind;
  id: ResourceID;
  fqn: ResourceFQN;
  seq: number;
  props: Props;
  state: State<Kind, Props, Out>;
  replace?: () => void;
}): Context<Out> {
  function create(props: Omit<Out, "Kind" | "ID" | "Scope">): Out;
  function create(id: string, props: Omit<Out, "Kind" | "ID" | "Scope">): Out;
  function create(
    ...args:
      | [props: Omit<Out, "Kind" | "ID" | "Scope">]
      | [id: string, props: Omit<Out, "Kind" | "ID" | "Scope">]
  ): Out {
    const [ID, props] =
      typeof args[0] === "string" ? (args as [string, any]) : [id, args[0]];

    return {
      ...props,
      [ResourceKind]: kind,
      [ResourceID]: ID,
      [ResourceFQN]: fqn,
      [ResourceScope]: scope,
      [ResourceSeq]: seq,
    } as Out;
  }
  return Object.assign(create, {
    stage: scope.stage,
    scope: scope,
    id: id,
    fqn: fqn,
    phase: phase,
    output: state.output,
    props: state.props,
    replace: () => replace?.(),
    get: (key: string) => state.data[key],
    set: async (key: string, value: any) => {
      state.data[key] = value;
    },
    delete: async (key: string) => {
      const value = state.data[key];
      delete state.data[key];
      return value;
    },
    quiet: scope.quiet,
    destroy: () => {
      throw new DestroyedSignal();
    },
    create,
  }) as Context<any>;
}

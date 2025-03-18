import { alchemize } from "./alchemize";
import { type ApplyOptions, apply } from "./apply";
import type { DestroyOptions } from "./destroy";
import { defaultStateStore, deletions, providers } from "./global";
import type { Inputs, Input as input } from "./input";
import { type Export, type Output, OutputChain, type Resolved } from "./output";
import { type Scope as IScope, getScope, pushScope } from "./scope";
import type { State, StateStore } from "./state";

export type ResourceID = string;
export type ResourceFQN = string;
export type ResourceType = string;

export const ResourceID = Symbol.for("ResourceID");
export const ResourceFQN = Symbol.for("ResourceFQN");
export const ResourceHandle = Symbol.for("ResourceHandle");
export const Provider = Symbol.for("Provider");
export const Input = Symbol.for("Input");
export const Value = Symbol.for("Value");
export const Apply = Symbol.for("Apply");
export const Provide = Symbol.for("Provide");
export const Scope = Symbol.for("Scope");
export const Options = Symbol.for("Options");

// properties that pierce through the Proxy
const OrthogonalProperties = [
  ResourceID,
  ResourceFQN,
  ResourceHandle,
  Provider,
  Input,
  Value,
  Apply,
  Provide,
  Scope,
  Options,
] as const;

export interface ProviderOptions {
  /**
   * If true, the resource will be updated even if the inputs have not changed.
   */
  alwaysUpdate: boolean;
}

export type Resource<In extends any[] = any[], Out = any> = {
  [ResourceID]: string;
  [ResourceFQN]: string;
  [Provider]: Provider<any, any[], any>;
  [Input]: Inputs<In>;
  [Value]?: Out;
  [Apply]: <O>(value: Out) => O;
  [Provide]: (value: Out) => void;
  [Options]: ProviderOptions;
} & Output<Out> &
  Export<
    // the resource handler may export another Output - we need to resolve it first
    // then, export that resolved value
    Resolved<Out>
  >;

export interface BaseContext {
  quiet: boolean;
  stage: string;
  resourceID: ResourceID;
  resourceFQN: ResourceFQN;
  scope: IScope;
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
  delete<T>(key: string): Promise<T | undefined>;
  /**
   * Indicate that this resource is being replaced.
   * This will cause the resource to be deleted at the end of the stack's CREATE phase.
   */
  replace(): void;
}

export interface CreateContext extends BaseContext {
  event: "create";
  output?: undefined;
}

export interface UpdateContext<Outputs> extends BaseContext {
  event: "update";
  output: Outputs;
}

export interface DeleteContext<Outputs> extends BaseContext {
  event: "delete";
  output: Outputs;
}

export type Context<Outputs> =
  | CreateContext
  | UpdateContext<Outputs>
  | DeleteContext<Outputs>;

export type Provider<
  Type extends ResourceType = ResourceType,
  In extends any[] = any[],
  Out = any,
> = {
  type: Type;
  update(
    stage: string,
    resource: Resource,
    deps: Set<ResourceID>,
    inputs: Inputs<In>,
    stateStore: StateStore,
    options: ApplyOptions,
  ): Promise<Awaited<Out>>;
  delete(
    stage: string,
    scope: IScope | undefined,
    resourceID: ResourceID,
    state: State,
    inputs: Inputs<In>,
    options: DestroyOptions,
  ): Promise<void>;
} & (new (
  id: string,
  ...inputs: [...Inputs<In>, ...any[]]
) => Resource<In, Out>);

export function isResource(value: any): value is Resource {
  return value?.[ResourceID] !== undefined;
}

const applied = new Map<Object, any>();

const destroyed = new WeakMap<Resource<any, any>, Promise<void>>();

const i = 0;

export function Resource<
  // const Type extends ResourceType,
  Args extends any[],
  Out,
>(
  type: string,
  options: Partial<ProviderOptions>,
  func: (
    ctx: Context<Out>,
    ...args: Args
  ) => Promise<input<Out> | void> | input<Out> | void,
): Provider<string, Args, Awaited<Out>>;

export function Resource<
  const Type extends ResourceType,
  Args extends any[],
  Out,
>(
  type: Type,
  func: (
    ctx: Context<Out>,
    ...args: Args
  ) => Promise<input<Out> | void> | input<Out> | void,
): Provider<Type, Args, Awaited<Out>>;

export function Resource<
  const Type extends ResourceType,
  Args extends any[],
  Out,
>(
  type: Type,
  ...args:
    | [
        Partial<ProviderOptions>,
        (
          ctx: Context<Out>,
          ...args: Args
        ) => Promise<input<Out> | void> | input<Out> | void,
      ]
    | [
        (
          ctx: Context<Out>,
          ...args: Args
        ) => Promise<input<Out> | void> | input<Out> | void,
      ]
): Provider<Type, Args, Awaited<Out>> {
  if (providers.has(type)) {
    throw new Error(`Resource ${type} already exists`);
  }
  const [options, func] = args.length === 2 ? args : [undefined, args[0]];

  interface Resource {
    [ResourceID]: ResourceID;
    [ResourceFQN]: string;
    [ResourceHandle]: Object;
    [Provider]: Provider<Type, Args, Out>;
    [Input]: Inputs<Args>;
    [Value]?: Out;
    [Scope]: IScope;
    [Options]: ProviderOptions;
  }

  class Resource {
    static readonly type = type;

    constructor(id: ResourceID, ...input: Inputs<Args>) {
      const scope = getScope();
      const node = {
        provider: Resource,
        resource: this,
      } as const;

      if (scope.nodes.has(id)) {
        // TODO(sam): do we want to throw?
        // it's kind of awesome that you can re-create a resource and call apply
        // console.warn(`Resource ${id} already exists in the stack: ${stack.id}`);
      }
      scope.nodes.set(id, node as any);

      const resourceFQN = scope.getScopePath(id) + "/" + id;

      this[ResourceID] = id;
      this[ResourceHandle] = new Object();
      this[ResourceFQN] = resourceFQN;
      // this[ResourceFQN] = i++;
      this[Provider] = Resource as any;
      this[Input] = input;
      this[Value] = undefined;
      this[Scope] = scope;
      this[Provide] = (value: Out) => {
        this[Value] = value;
      };
      this[Options] = {
        alwaysUpdate: options?.alwaysUpdate ?? false,
      };

      return new Proxy(this, {
        // TODO(sam): this won't work for the sub-class (class Table extends Resource)
        getPrototypeOf() {
          return Resource.prototype;
        },
        get(target: any, prop) {
          if (OrthogonalProperties.includes(prop as any)) {
            return target[prop];
          } else if (prop === "apply") {
            return target[Apply].bind(target);
          } else {
            return target[Apply]((value: Out) => value[prop as keyof Out]);
          }
        },
      });
    }

    public apply<U>(fn: (value: Out) => U): Output<U> {
      return this[Apply](fn);
    }

    public [Apply]<U>(fn: (value: Out) => U): Output<U> {
      return new OutputChain<Out, U>(this as any, fn);
    }

    private box?: {
      value: Out;
    } = undefined;

    public [Provide](value: Out) {
      if (this.box) {
        throw new Error(`Output ${this[ResourceID]} already has a value`);
      }
      this.box = { value };
      const subscribers = this.subscribers;
      this.subscribers = [];
      subscribers.forEach((fn) => fn(value));
    }

    private subscribers: ((value: Out) => void)[] = [];

    /**
     * @internal
     */
    public subscribe(fn: (value: Out) => Promise<void>) {
      if (this.box) {
        fn(this.box.value);
      } else {
        this.subscribers.push(fn);
      }
    }

    static async update(
      stage: string,
      resource: Resource,
      deps: Set<ResourceID>,
      inputs: Args,
      stateStore: StateStore,
      options: ApplyOptions,
    ): Promise<Awaited<Out | void>> {
      // const stack = resource[ResourceStack];
      const resourceID = resource[ResourceID];
      const resourceFQN = `${resource[Scope].getScopePath(stage)}/${resourceID}`;
      const cacheKey = resource[ResourceHandle];
      if (!applied.has(cacheKey)) {
        let res, rej;
        const promise = new Promise<Awaited<Out | void>>((resolve, reject) => {
          res = resolve;
          rej = reject;
        });
        applied.set(cacheKey, promise);
        update().then(res).catch(rej);
        return promise;
      }
      return await applied.get(cacheKey);

      async function update(): Promise<Awaited<Out | void>> {
        let resourceState: State | undefined = await stateStore.get(resourceID);
        if (resourceState === undefined) {
          resourceState = {
            provider: type,
            status: "creating",
            data: {},
            output: undefined,
            deps: [...deps],
            inputs,
          };
          await stateStore.set(resourceID, resourceState);
        }

        // Skip update if inputs haven't changed and resource is in a stable state
        if (
          resourceState.status === "created" ||
          resourceState.status === "updated"
        ) {
          if (
            JSON.stringify(resourceState.inputs) === JSON.stringify(inputs) &&
            !resource[Options].alwaysUpdate
          ) {
            if (!options?.quiet) {
              console.log(`Skip:    ${resourceFQN} (no changes)`);
            }
            if (resourceState.output !== undefined) {
              resource[Provide](resourceState.output);
            }
            return resourceState.output;
          }
        }

        const event = resourceState.status === "creating" ? "create" : "update";
        resourceState.status = event === "create" ? "creating" : "updating";
        resourceState.oldInputs = resourceState.inputs;
        resourceState.inputs = inputs;

        if (!options?.quiet) {
          console.log(
            `${event === "create" ? "Create" : "Update"}:  ${resourceFQN}`,
          );
        }

        await stateStore.set(resourceID, resourceState);

        let isReplaced = false;

        const quiet = options.quiet ?? false;

        const evaluated = await pushScope(
          resource[Scope],
          resourceID,
          async () => {
            const result = await func(
              {
                stage,
                resourceID,
                resourceFQN,
                event,
                scope: getScope(),
                output: resourceState.output,
                replace: () => {
                  if (isReplaced) {
                    console.warn(
                      `Resource ${type} ${resourceFQN} is already marked as REPLACE`,
                    );
                    return;
                  }
                  isReplaced = true;
                  deletions.push({
                    id: resourceID,
                    data: {
                      ...resourceState!.data,
                    },
                    inputs: inputs,
                  });
                },
                get: (key) => resourceState!.data[key],
                set: async (key, value) => {
                  resourceState!.data[key] = value;
                  await stateStore.set(resourceID, resourceState!);
                },
                delete: async (key) => {
                  const value = resourceState!.data[key];
                  delete resourceState!.data[key];
                  await stateStore.set(resourceID, resourceState!);
                  return value;
                },
                quiet,
              },
              ...inputs,
            );

            if (result === undefined) {
              return undefined;
            }

            const evaluated = await apply(result as Out, {
              stage,
              scope: getScope(),
              quiet,
            });

            return evaluated;
          },
        );

        if (!options?.quiet) {
          console.log(
            `${event === "create" ? "Created" : "Updated"}: ${resourceFQN}`,
          );
        }
        await stateStore.set(resourceID, {
          provider: type,
          data: resourceState.data,
          status: event === "create" ? "created" : "updated",
          output: evaluated,
          inputs,
          deps: [...deps],
        });
        if (evaluated !== undefined) {
          resource[Provide](evaluated as Out);
        }
        return evaluated as Awaited<Out>;
      }
    }

    static async delete(
      stage: string,
      scope: IScope,
      resourceID: ResourceID,
      state: State,
      inputs: Args,
      options: DestroyOptions,
    ) {
      const { Scope } = await import("./scope");
      const resourceFQN = `${scope.getScopePath(stage)}/${resourceID}`;
      const nestedScope = new Scope(resourceID, scope);

      await alchemize({
        mode: "destroy",
        stage,
        scope: nestedScope,
        // TODO(sam): should use the appropriate state store
        stateStore: defaultStateStore,
        quiet: options.quiet,
      });

      if (!options?.quiet) {
        console.log(`Delete:  ${resourceFQN}`);
      }

      await func(
        {
          stage,
          scope,
          resourceID: resourceID,
          resourceFQN: resourceFQN,
          event: "delete",
          output: state.output,
          replace() {
            throw new Error("Cannot replace a resource that is being deleted");
          },
          get: (key) => {
            return state.data[key];
          },
          set: async (key, value) => {
            state.data[key] = value;
          },
          delete: async (key) => {
            const value = state.data[key];
            delete state.data[key];
            return value;
          },
          quiet: options.quiet ?? false,
        },
        ...inputs,
      );

      if (!options?.quiet) {
        console.log(`Deleted: ${resourceFQN}`);
      }
    }
  }
  providers.set(type, Resource as any);
  return Resource as any;
}

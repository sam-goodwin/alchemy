import * as Effect from "effect/Effect";
import type * as Schema from "effect/Schema";
import type { YieldWrap } from "effect/Utils";
import { apply } from "./apply.ts";
import type { Context } from "./context.ts";
import { DestroyStrategy } from "./destroy.ts";
import { Rune } from "./rune.ts";
import { Scope as _Scope, type Scope } from "./scope.ts";

declare global {
  var ALCHEMY_PROVIDERS: Map<ResourceKind, Provider<string, any>>;
  var ALCHEMY_HANDLERS: Map<ResourceKind, ResourceLifecycleHandler>;
  var ALCHEMY_DYNAMIC_RESOURCE_RESOLVERS: DynamicResourceResolver[];
}

export const PROVIDERS: Map<
  ResourceKind,
  Provider<string, any>
> = (globalThis.ALCHEMY_PROVIDERS ??= new Map<
  ResourceKind,
  Provider<string, any>
>());
const HANDLERS: Map<ResourceKind, ResourceLifecycleHandler> =
  (globalThis.ALCHEMY_HANDLERS ??= new Map<
    ResourceKind,
    ResourceLifecycleHandler
  >());

const DYNAMIC_RESOURCE_RESOLVERS: DynamicResourceResolver[] =
  (globalThis.ALCHEMY_DYNAMIC_RESOURCE_RESOLVERS ??= []);

export type DynamicResourceResolver = (
  typeName: string,
) => Provider | undefined;

/**
 * Register a function that will be called if a Resource Type cannot be found during deletion.
 */
export function registerDynamicResource(
  handler: DynamicResourceResolver,
): void {
  DYNAMIC_RESOURCE_RESOLVERS.push(handler);
}

export function resolveDeletionHandler(typeName: string): Provider | undefined {
  const provider: Provider<string, any> | undefined = PROVIDERS.get(typeName);
  if (provider) {
    return provider;
  }
  for (const handler of DYNAMIC_RESOURCE_RESOLVERS) {
    const result = handler(typeName);
    if (result) {
      return result;
    }
  }
  return undefined;
}

export type ResourceID = string;
export const ResourceID = Symbol.for("alchemy::ResourceID");
export type ResourceFQN = string;
export const ResourceFQN = Symbol.for("alchemy::ResourceFQN");
export type ResourceKind = string;
export const ResourceKind = Symbol.for("alchemy::ResourceKind");
export const ResourceScope = Symbol.for("alchemy::ResourceScope");
export const ResourceSeq = Symbol.for("alchemy::ResourceSeq");

export interface ProviderOptions {
  /**
   * If true, the resource will be updated even if the inputs have not changed.
   */
  alwaysUpdate: boolean;

  /**
   * The strategy to use when destroying the resource.
   *
   * @default "sequential"
   */
  destroyStrategy?: DestroyStrategy;
}

export type ResourceProps = {
  [key: string]: any;
};

export type Provider<
  Type extends string = string,
  F extends ResourceLifecycleHandler = ResourceLifecycleHandler,
> = F &
  IsClass & {
    type: Type;
    options: Partial<ProviderOptions> | undefined;
    handler: F;
  };

export interface PendingResource<Out = unknown> extends Promise<Out> {
  [ResourceKind]: ResourceKind;
  [ResourceID]: ResourceID;
  [ResourceFQN]: ResourceFQN;
  [ResourceScope]: Scope;
  [ResourceSeq]: number;
  [DestroyStrategy]: DestroyStrategy;
}

export interface Resource<Kind extends ResourceKind = ResourceKind> {
  [ResourceKind]: Kind;
  [ResourceID]: ResourceID;
  [ResourceFQN]: ResourceFQN;
  [ResourceScope]: Scope;
  [ResourceSeq]: number;
  [DestroyStrategy]: DestroyStrategy;
}

// helper for semantic syntax highlighting (color as a type/class instead of function/value)
type IsClass = {
  new (_: never): never;
};

type ResourceLifecycleHandler = (
  this: Context<any, any>,
  id: string,
  props: any,
) => Promise<Resource<string>>;

type Handler<F extends (...args: any[]) => any> = (
  id: string,
  props: Resource.input<Parameters<F>[1]>,
) => Rune.of<Awaited<ReturnType<F>>>;

export function Resource<
  const Type extends ResourceKind,
  Input extends Schema.Struct.Fields,
  Output extends Schema.Struct.Fields,
>(
  type: Type,
  props: {
    input: Input;
    output: Output;
  },
): <E, R>(
  fn: (
    this: Context<Schema.Struct.Type<Input>, Schema.Struct.Type<Output>>,
    id: string,
    props: Schema.Struct.Type<Input>,
  ) => Generator<
    YieldWrap<Effect.Effect<any, E, R>>,
    Schema.Struct.Type<Output>,
    any
  >,
) => {
  input: Schema.Struct<Input>;
  output: Schema.Struct.Type<Output>;
  (
    id: string,
    props: Rune.of<Schema.Struct.Type<Input>>,
  ): Rune<Schema.Struct.Type<Output>>;
};

export function Resource<F extends ResourceLifecycleHandler>(
  type: string,
  fn: F,
): Handler<F>;

export function Resource<
  const Type extends string,
  F extends ResourceLifecycleHandler,
>(type: Type, options: Partial<ProviderOptions>, fn: F): Handler<F>;

export function Resource<
  const Type extends string,
  F extends ResourceLifecycleHandler,
>(
  type: Type,
  ...args: [options: Partial<ProviderOptions>, handler: F] | [handler: F]
): any {
  const [options, handler] = args.length === 2 ? args : [undefined, args[0]];
  if (PROVIDERS.has(type)) {
    // We want Alchemy to work in a PNPM monorepo environment unfortunately,
    // global registries do not work because PNPM's symlinks result in multiple
    // instances of alchemy being loaded even if the package version is the
    // same (peers do not fix this).
    // MITIGATION: to ensure that most cases of accidental double-registration
    // are caught, we're going to check the handler's toString() to see if it's
    // the same as the previous handler. if it is, we're going to overwrite it.
    if (HANDLERS.get(type)!.toString() !== handler.toString()) {
      throw new Error(`Resource ${type} already exists`);
    }
  }
  HANDLERS.set(type, handler);

  type Out = Awaited<ReturnType<F>>;

  const provider = (
    resourceID: string,
    props: ResourceProps,
  ): Rune.of<Resource<string>> => {
    const scope = _Scope.current;
    if (resourceID.includes(":")) {
      // we want to use : as an internal separator for resources
      throw new Error(`ID cannot include colons: ${resourceID}`);
    }
    return Rune(
      Effect.promise(() => {
        if (scope.resources.has(resourceID)) {
          // TODO(sam): do we want to throw?
          // it's kind of awesome that you can re-create a resource and call apply
          const otherResource = scope.resources.get(resourceID);
          if (otherResource?.[ResourceKind] !== type) {
            scope.fail();
            const error = new Error(
              `Resource ${resourceID} already exists in the stack and is of a different type: '${otherResource?.[ResourceKind]}' !== '${type}'`,
            );
            scope.telemetryClient.record({
              event: "resource.error",
              resource: type,
              error,
            });
            throw error;
          }
        }

        // get a sequence number (unique within the scope) for the resource
        const seq = scope.seq();
        const meta = {
          [ResourceKind]: type,
          [ResourceID]: resourceID,
          [ResourceFQN]: scope.fqn(resourceID),
          [ResourceSeq]: seq,
          [ResourceScope]: scope,
          [DestroyStrategy]: options?.destroyStrategy ?? "sequential",
        } as any as PendingResource<Out>;
        const promise = apply(meta, props, options);
        const resource = Object.assign(promise, meta);
        scope.resources.set(resourceID, resource);
        return resource;
      }),
    ) as Rune.of<Resource<string>>;
  };
  provider.type = type;
  provider.handler = handler;
  provider.options = options;
  PROVIDERS.set(type, provider);
  return provider;
}

export declare namespace Resource {
  export type input<T> =
    | T
    | Rune.of<T>
    | (T extends any[]
        ? array<T>
        : {
            [k in keyof T]: input<T[k]>;
          });

  type array<
    T extends any[],
    Accum extends any[] = [],
  > = number extends T["length"]
    ? input<T[number]>[]
    : T extends [infer Head, ...infer Tail]
      ? array<Tail, [...Accum, input<Head>]>
      : Accum;
}

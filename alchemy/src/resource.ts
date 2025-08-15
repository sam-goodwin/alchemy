import { apply } from "./apply.ts";
import type { Context } from "./context.ts";
import { DestroyStrategy } from "./destroy.ts";
import { Scope as _Scope, type Scope } from "./scope.ts";

declare global {
  var ALCHEMY_PROVIDERS: Map<ResourceKind, Provider<string, any>>;
  var ALCHEMY_DYNAMIC_RESOURCE_RESOLVERS: DynamicResourceResolver[];
}

export const PROVIDERS: Map<
  ResourceKind,
  Provider<string, any>
> = (globalThis.ALCHEMY_PROVIDERS ??= new Map<
  ResourceKind,
  Provider<string, any>
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

// see: https://x.com/samgoodwin89/status/1904640134097887653
type Handler<F extends (...args: any[]) => any> =
  | F
  | (((this: any, id: string, props?: {}) => never) & IsClass);

export function Resource<
  const Type extends string,
  F extends ResourceLifecycleHandler,
>(type: Type, fn: F): Handler<F>;

export function Resource<
  const Type extends string,
  F extends ResourceLifecycleHandler,
>(type: Type, options: Partial<ProviderOptions>, fn: F): Handler<F>;

export function Resource<
  const Type extends ResourceKind,
  F extends ResourceLifecycleHandler,
>(type: Type, ...args: [Partial<ProviderOptions>, F] | [F]): Handler<F> {
  if (PROVIDERS.has(type)) {
    throw new Error(`Resource ${type} already exists`);
  }
  const [options, handler] = args.length === 2 ? args : [undefined, args[0]];

  type Out = Awaited<ReturnType<F>>;

  const provider = (async (
    resourceID: string,
    props: ResourceProps,
  ): Promise<Resource<string>> => {
    const scope = _Scope.current;

    if (resourceID.includes(":")) {
      // we want to use : as an internal separator for resources
      throw new Error(`ID cannot include colons: ${resourceID}`);
    }

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
  }) as Provider<Type, F>;
  provider.type = type;
  provider.handler = handler;
  provider.options = options;
  PROVIDERS.set(type, provider);
  return provider;
}

import { isPromise } from "node:util/types";
import type { Binding as CloudflareBinding } from "../cloudflare/bindings.js";
import type { Bound as CloudflareBound } from "../cloudflare/bound.js";
import { ResourceFQN, type Resource } from "../resource.js";
import { env } from "./env.js";

/**
 * Get a Resource's Binding from the Environment.
 */
export function getBinding<T extends Resource>(resource: T): Bound<T> {
  return env[getBindKey(resource)];
}

/**
 * Compute a unique key for where to store a Resource's Binding.
 */
export function getBindKey(resource: Resource): string {
  return resource[ResourceFQN].replace(/[^a-zA-Z0-9]/g, "_");
}

export type Bound<T> = T extends CloudflareBinding ? CloudflareBound<T> : T;

/**
 * Create a lazy binding of a Resource to an environment that exposes the Resource's methods
 * throw a Proxy that delays initialization of the binding until the Resource's methods are accessed.
 *
 * This allows us to run the same code during build time and runtime.
 */
export async function bind<T extends Resource>(
  resource: T | Promise<T>,
  reify?: (value: T, key: string) => Bound<T>,
): Promise<Bound<T>> {
  if (isPromise(resource)) {
    return resource.then((r) => bind(r, reify)) as Promise<Bound<T>>;
  }
  let _runtime: [Bound<T>] | undefined;
  const runtime = (): any =>
    (_runtime ??= [
      reify ? reify(resource, getBindKey(resource)) : getBinding(resource),
    ])[0];

  return new Proxy(() => {}, {
    get: (target: any, prop: string) => {
      if (prop in target) {
        return (resource as T)[prop as keyof T];
      } else if (prop === "then" || prop === "catch" || prop === "finally") {
        return target[prop];
      }
      return (...args: any[]) => {
        const rt = runtime();
        if (rt === undefined) {
          throw new Error(`Resource ${resource[ResourceFQN]} is not bound`);
        }
        const method = rt[prop];
        if (typeof method !== "function") {
          throw new Error(
            `Method ${prop} on '${resource[ResourceFQN]}' is not a function`,
          );
        }
        return method(...args);
      };
    },
    // apply: (target, thisArg, argArray) => {
    //   return target(thisArg, ...argArray);
    // },
  }) as T & Bound<T>;
}

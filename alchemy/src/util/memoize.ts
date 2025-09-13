import { createHash } from "node:crypto";
import { isSecret } from "../secret.ts";

type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : T;

export function memoize<F extends (...args: any[]) => Promise<any>>(
  fn: F,
  keyFn: (...args: Parameters<F>) => string = defaultKeyFn,
) {
  const cache = new Map<string, Promise<AsyncReturnType<F>>>();
  return async (...args: Parameters<F>): Promise<AsyncReturnType<F>> => {
    const key = keyFn(...args);
    const cached = cache.get(key);
    if (cached) {
      return await cached;
    }
    const promise = fn(...args).catch((error) => {
      cache.delete(key);
      throw error;
    });
    cache.set(key, promise);
    return await promise;
  };
}

export function singleFlight<F extends (...args: any[]) => Promise<any>>(
  fn: F,
  keyFn: (...args: Parameters<F>) => string = defaultKeyFn,
) {
  const cache = new Map<string, Promise<AsyncReturnType<F>>>();
  return async (...args: Parameters<F>): Promise<AsyncReturnType<F>> => {
    const key = keyFn(...args);
    const cached = cache.get(key);
    if (cached) {
      return await cached;
    }
    const promise = fn(...args);
    cache.set(key, promise);
    try {
      return await promise;
    } finally {
      cache.delete(key);
    }
  };
}

export function defaultKeyFn(...args: any[]): string {
  return createHash("sha256")
    .update(
      JSON.stringify(args, (_, value) => {
        // Secret names may differ between instantiations,
        // so we unwrap it to make the key deterministic.
        if (isSecret(value)) {
          return value.unencrypted;
        }
        return value;
      }),
    )
    .digest("hex");
}

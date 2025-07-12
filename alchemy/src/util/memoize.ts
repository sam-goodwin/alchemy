import { createHash } from "node:crypto";

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

const defaultKeyFn = (...args: any[]) => {
  return createHash("sha256").update(JSON.stringify(args)).digest("hex");
};

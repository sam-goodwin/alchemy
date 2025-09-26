import { isDeepStrictEqual } from "node:util";

/**
 * Returns an array of keys in `b` that are different from `a`.
 */
export const diff = <T>(a: T, b: NoInfer<T>) => {
  const keys: (keyof T)[] = [];
  for (const key in a) {
    if (!isDeepStrictEqual(a[key], b[key])) {
      keys.push(key);
    }
  }
  return keys;
};

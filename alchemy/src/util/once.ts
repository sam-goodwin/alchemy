export function once<T>(fn: () => T) {
  let _value: { value: T };
  return () => (_value ??= { value: fn() }).value;
}

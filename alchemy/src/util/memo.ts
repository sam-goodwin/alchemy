export function memo<T>(fn: () => Promise<T>) {
  let result: {
    value: Promise<T>;
  };
  return () => (result ??= { value: fn() }).value;
}

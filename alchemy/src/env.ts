export interface Env {
  [key: string]: Promise<string>;
  <T = string>(name: string, value?: T | undefined, error?: string): Promise<T>;
}

export const env = new Proxy(_env, {
  get: (_, name: string) => _env(name),
  apply: (_, __, args: [string, any?, string?]) => _env(...args),
}) as Env;

async function _env<T = string>(
  name: string,
  value?: T | undefined,
  error?: string,
): Promise<T> {
  if (value !== undefined) {
    return value;
  }
  if (typeof process !== "undefined") {
    // we are in a node environment
    return process.env[name]! as T;
  }
  // we are in a browser environment
  try {
    const { env } = await import("cloudflare:workers");
    if (name in env) {
      return env[name as keyof typeof env] as T;
    }
  } catch (_error) {}
  throw new Error(error ?? `Environment variable ${name} is not set`);
}

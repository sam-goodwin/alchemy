export interface Env {
  [key: string]: string;
  <T = string>(name: string, value?: T | undefined, error?: string): T;
}

export const env = new Proxy(_env, {
  get: (_, name: string) => _env(name),
  apply: (_, __, args: [string, any?, string?]) => _env(...args),
}) as Env;

function _env<T = string>(
  name: string,
  value?: T | undefined,
  error?: string,
): T {
  if (value !== undefined) {
    return value;
  }
  if (name in environment) {
    return environment[name] as T;
  }
  throw new Error(error ?? `Environment variable ${name} is not set`);
}

// removed for cjs compatibility: top-level await, used for import("cloudflare:workers")
const environment = ((): Record<string, any> => {
  if (typeof process !== "undefined") {
    return process.env;
  }
  if (typeof import.meta !== "undefined") {
    return import.meta.env;
  }
  throw new Error("No environment found");
})();

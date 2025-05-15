declare global {
  const __ALCHEMY_ENV__: Record<string, any>;
}

export const isRuntime = typeof __ALCHEMY_ENV__ !== "undefined";

/**
 * The env (for module augmentation)
 */
export interface Env {
  [key: string]: any | undefined;
}

const _env = await resolveEnv();

async function resolveEnv() {
  if (typeof process !== "undefined") {
    return process.env;
  }
  try {
    const worker = await import("cloudflare:workers");
    return worker.env;
  } catch {}
  return import.meta.env;
}

export const env: Env = new Proxy(
  {},
  {
    get(_target, prop, _receiver) {
      // TODO: instantiate bindings
      return _env[prop as keyof typeof _env];
    },
  },
);

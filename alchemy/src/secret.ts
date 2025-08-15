import { inspect } from "node:util";
import { alchemy } from "./alchemy.ts";

declare global {
  var __ALCHEMY_SECRETS__: {
    [name: string]: Secret;
  };
}

// a global registry of all secrets that we will use when serializing an application
const globalSecrets: {
  [name: string]: Secret<any>;
} = (globalThis.__ALCHEMY_SECRETS__ ??= {});

let i = 0;
function nextName() {
  return `alchemy:anonymous-secret-${i++}`;
}

/**
 * Internal wrapper for sensitive values like API keys and credentials.
 * When stored in alchemy state files, the value is automatically encrypted
 * using the application's password. The password can be provided either:
 *
 * 1. Globally when initializing the alchemy application:
 * ```ts
 * const app = await alchemy("my-app", {
 *   password: process.env.SECRET_PASSPHRASE
 * });
 * ```
 *
 * 2. For a specific scope using alchemy.run:
 * ```ts
 * await alchemy.run("scope-name", {
 *   password: process.env.SECRET_PASSPHRASE
 * }, async () => {
 *   // Secrets in this scope will use this password
 *   alchemy.secret(process.env.MY_SECRET)
 * });
 * ```
 *
 * Without a password, secrets cannot be encrypted or decrypted, and operations
 * involving sensitive values will fail.
 *
 * @example
 * // In state file (.alchemy/app/prod/resource.json):
 * {
 *   "props": {
 *     "apiKey": {
 *       "@secret": "encrypted-value-here..." // encrypted using app password
 *     }
 *   }
 * }
 */
export class Secret<T = string> {
  /**
   * @internal
   */
  public static all(): Secret<any>[] {
    return Object.values(globalSecrets);
  }

  public readonly type = "secret";
  constructor(
    readonly unencrypted: T,
    readonly name: string = nextName(),
  ) {
    globalSecrets[name] = this;
  }

  /**
   * Ensures that a value is wrapped in a Secret.
   */
  static wrap<T>(value: T | Secret<T>): Secret<T> {
    return isSecret<T>(value) ? value : new Secret(value);
  }

  /**
   * Unwraps a Secret if it is wrapped, otherwise returns the value.
   */
  static unwrap<T, U = T>(value: T | Secret<U>): T | U {
    return isSecret<U>(value) ? value.unencrypted : value;
  }

  /**
   * Override toString to prevent accidental exposure of secret values
   */
  toString(): string {
    return `Secret(${this.name ?? ""})`;
  }

  /**
   * Custom inspect implementation for console.log to prevent exposing secrets
   */
  [inspect.custom](): string {
    return this.toString();
  }
}

/**
 * Type guard to check if a value is a Secret wrapper
 */
export function isSecret<T = string>(binding: any): binding is Secret<T> {
  return (
    binding instanceof Secret ||
    (typeof binding === "object" && binding?.type === "secret")
  );
}

/**
 * Wraps a sensitive value so it will be encrypted when stored in state files.
 * Requires a password to be set either globally in the alchemy application options
 * or locally in an alchemy.run scope.
 *
 * @example
 * // Global password for all secrets
 * const app = await alchemy("my-app", {
 *   password: process.env.SECRET_PASSPHRASE
 * });
 *
 * const resource = await Resource("my-resource", {
 *   apiKey: alchemy.secret(process.env.API_KEY)
 * });
 *
 * @example
 * // Scoped password for specific secrets
 * await alchemy.run("secure-scope", {
 *   password: process.env.SCOPE_SECRET_PASSPHRASE
 * }, async () => {
 *   const resource = await Resource("my-resource", {
 *     apiKey: alchemy.secret(process.env.API_KEY)
 *   });
 * });
 *
 * @param unencrypted The sensitive value to encrypt in state files
 * @throws {Error} If the value is undefined
 * @throws {Error} If no password is set in the alchemy application options or current scope
 */
export function secret<S = string>(
  unencrypted: S | undefined,
  name?: string,
): Secret<S> {
  if (unencrypted === undefined) {
    throw new Error("Secret cannot be undefined");
  }
  return new Secret(unencrypted, name);
}

export namespace secret {
  export interface Env {
    [key: string]: Secret;
    (name: string, value?: string, error?: string): Secret;
  }

  export const env = new Proxy(_env, {
    get: (_, name: string) => _env(name),
    apply: (_, __, args: [string, any?, string?]) => _env(...args),
  }) as Env;

  function _env(name: string, value?: string, error?: string): Secret {
    const result = alchemy.env(name, value, error);
    if (typeof result === "string") {
      return secret(result, name);
    }
    throw new Error(`Secret environment variable ${name} is not a string`);
  }
}

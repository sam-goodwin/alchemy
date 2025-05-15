import { alchemy } from "./alchemy.js";

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
export class Secret {
  public readonly type = "secret";
  constructor(
    readonly unencrypted: string,
    readonly name?: string,
  ) {}
}

/**
 * Type guard to check if a value is a Secret wrapper
 */
export function isSecret(binding: any): binding is Secret {
  return (
    binding instanceof Secret ||
    (typeof binding === "object" && binding.type === "secret_text")
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
export function secret<S extends string | undefined>(
  unencrypted: S,
  name?: string,
): Secret {
  if (unencrypted === undefined) {
    throw new Error("Secret cannot be undefined");
  }
  return new Secret(unencrypted, name);
}

export namespace secret {
  export interface Env {
    [key: string]: Promise<Secret>;
    (name: string, value?: string, error?: string): Promise<Secret>;
  }

  export const env = new Proxy(_env, {
    get: (_, name: string) => _env(name),
    apply: (_, __, args: [string, any?, string?]) => _env(...args),
  }) as Env;

  async function _env(
    name: string,
    value?: string,
    error?: string,
  ): Promise<Secret> {
    const result = await alchemy.env(name, value, error);
    if (typeof result === "string") {
      return secret(result, name);
    }
    throw new Error(`Secret environment variable ${name} is not a string`);
  }
}

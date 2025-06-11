import { alchemy } from "./alchemy.ts";
import { decryptWithKey, encrypt } from "./encrypt.ts";
import type { Scope } from "./scope.ts";

export const SALT_KEY = "_passkey-salt";

// a global registry of all secrets that we will use when serializing an application
const globalSecrets: {
  [name: string]: Secret;
} = {};

let i = 0;
function nextName() {
  return `alchemy:anonymous-secret-${i++}`;
}

/**
 * Generate a new salt for secret encryption.
 * This should only be called during serialization if no salt exists.
 */
export async function generateSalt(): Promise<string> {
  const sodium = (await import("libsodium-wrappers-sumo" as any)).default;
  await sodium.ready;
  // Generate a random salt using proper pwhash salt size
  const saltBytes = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
  const saltValue = sodium.to_base64(
    saltBytes,
    sodium.base64_variants.ORIGINAL,
  );
  return saltValue;
}

/**
 * Internal wrapper for sensitive values like API keys and credentials.
 * When stored in alchemy state files, the value is automatically encrypted
 * using libsodium's pwhash or generichash depending on salt availability.
 *
 * The password can be provided either:
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
 * A salt is stored in the root scope and used for all secret encryption.
 * This salt enables secure key derivation using libsodium's pwhash.
 * If no salt is present, encryption falls back to generichash for compatibility.
 *
 * @example
 * // In state file (.alchemy/app/prod/resource.json):
 * {
 *   "props": {
 *     "apiKey": {
 *       "@secret": "encrypted-value-here..." // encrypted using app password and salt
 *     }
 *   }
 * }
 */
export class Secret {
  /**
   * @internal
   */
  public static all(): Secret[] {
    return Object.values(globalSecrets);
  }

  public readonly type = "secret";
  constructor(
    readonly unencrypted: string,
    readonly name: string = nextName(),
  ) {
    globalSecrets[name] = this;
  }
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
 * The root scope's salt is used for encryption, enabling secure key derivation
 * using libsodium's pwhash. If no salt exists, encryption falls back to generichash.
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

/**
 * Serialize a secret for storage, using the root scope's password and salt.
 * If no salt exists, one will be generated and stored in the root scope.
 */
export async function serializeSecret(
  secret: Secret,
  scope: Scope,
  salt?: string,
): Promise<{ "@secret": string }> {
  if (!scope.password) {
    throw new Error(
      "Cannot serialize secret without password, did you forget to set password when initializing your alchemy app?\n" +
        "See: https://alchemy.run/docs/concepts/secret.html#encryption-password",
    );
  }

  // Encrypt using the password and root scope's salt
  const encrypted = await encrypt(
    secret.unencrypted,
    scope.password,
    scope,
    salt,
  );

  return {
    "@secret": encrypted,
  };
}

/**
 * Deserialize an encrypted secret value using the root scope's password and salt.
 */
export async function deserializeSecret(
  value: { "@secret": string },
  scope: Scope,
): Promise<Secret> {
  if (!scope.password) {
    throw new Error(
      "Cannot deserialize secret without password, did you forget to set password when initializing your alchemy app?\n" +
        "See: https://alchemy.run/docs/concepts/secret.html#encryption-password",
    );
  }

  // Decrypt using the password and root scope's salt
  const decrypted = await decryptWithKey(
    value["@secret"],
    scope.password,
    scope,
  );

  return new Secret(decrypted);
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

import { alchemy } from "../alchemy.ts";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";

/**
 * Properties for configuring a random string generation
 */
export interface RandomStringProps {
  /**
   * The number of random bytes to generate.
   * The actual string length will depend on the encoding:
   * - hex: length * 2 characters
   * - base64: approximately length * 1.33 characters
   * @default 32
   */
  length?: number;

  /**
   * The encoding format for the random string.
   * - "hex": Hexadecimal encoding (0-9, a-f)
   * - "base64": Base64 encoding (A-Z, a-z, 0-9, +, /)
   * @default "hex"
   */
  encoding?: "hex" | "base64";
}

/**
 * A cryptographically secure random string resource
 */
export interface RandomString extends Resource<"random::String"> {
  /**
   * The generated random string value, stored as a secret
   */
  value: Secret;

  /**
   * The length of the random string
   */
  length: number;

  /**
   * The encoding format of the random string
   */
  encoding: "hex" | "base64";
}

/**
 * Generates a cryptographically secure random string that can be used
 * for API keys, tokens, passwords, or other security-sensitive values.
 * The generated value is automatically wrapped as a secret to prevent
 * accidental exposure in logs or console output.
 *
 * @example
 * // Generate a default random string (32 bytes, hex encoded)
 * const apiKey = await RandomString("api-key");
 * // Result: 64 character hex string (e.g., "a1b2c3d4...")
 *
 * @example
 * // Generate a shorter random string for a verification code
 * const verificationCode = await RandomString("email-verification", {
 *   length: 8,
 *   encoding: "hex"
 * });
 * // Result: 16 character hex string
 *
 * @example
 * // Generate a base64-encoded random string for a session token
 * const sessionToken = await RandomString("session-token", {
 *   length: 48,
 *   encoding: "base64"
 * });
 * // Result: ~64 character base64 string
 *
 * @example
 * // Use with other resources that require secrets
 * const database = await PostgresDatabase("mydb", {
 *   name: "production",
 *   password: (await RandomString("db-password")).value
 * });
 *
 * @example
 * // Generate multiple unique secrets
 * const jwtSecret = await RandomString("jwt-secret", { length: 64 });
 * const encryptionKey = await RandomString("encryption-key", {
 *   length: 32,
 *   encoding: "base64"
 * });
 *
 * @param id - Unique identifier for this random string resource
 * @param props - Configuration options for the random string generation
 * @returns A RandomString resource containing the generated secret value
 */
export const RandomString = Resource(
  "random::String",
  async function (
    this: Context<RandomString>,
    _id: string,
    props: RandomStringProps = {},
  ): Promise<RandomString> {
    if (this.phase === "delete") {
      return this.destroy();
    }
    const length = props.length ?? 32;
    const encoding = props.encoding ?? "hex";

    if (
      this.phase === "update" &&
      this.props.length === length &&
      this.props.encoding === encoding
    ) {
      // this is an update (input props changed)
      // but the length and encoding did not change
      // so, we can just return the existing output (no-op)
      return this(this.output);
    }
    const crypto = await import("node:crypto");
    return this({
      length,
      encoding,
      value: alchemy.secret(
        crypto
          .randomBytes(props.length ?? 32)
          .toString(props.encoding ?? "hex"),
      ),
    });
  },
  {
    getLength() {
      console.log("getting length");
      return this.output?.length || 0;
    },
  },
);

if (import.meta.main) {
  const randomString = await RandomString("test", { length: 10 });
  // FIXME: `getLength` is properly typed with `this` being the context, but
  // typescript errors as `randomString` is a `RandomString` not a `Context<RandomString>`
  // See ../../resource.ts:112 for type declaration
  //
  // The actual calling is still not implemented
  console.log(randomString.getLength());
}

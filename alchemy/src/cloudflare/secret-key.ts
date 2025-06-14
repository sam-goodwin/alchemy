/**
 * SecretKey binding for Cloudflare Workers
 *
 * A data class that represents a secret key binding with cryptographic properties.
 * Based on the Cloudflare Workers API specification for secret keys.
 *
 * @see https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/
 */

/**
 * Data format of the key
 */
export type SecretKeyFormat = "raw" | "pkcs8" | "spki" | "jwk";

/**
 * Allowed operations with the key
 */
export type SecretKeyUsage =
  | "encrypt"
  | "decrypt"
  | "sign"
  | "verify"
  | "deriveKey"
  | "deriveBits"
  | "wrapKey"
  | "unwrapKey";

/**
 * SecretKey binding properties
 */
export interface SecretKeyProps {
  /**
   * Algorithm-specific key parameters
   */
  algorithm: unknown;

  /**
   * Data format of the key
   */
  format: SecretKeyFormat;

  /**
   * Allowed operations with the key
   */
  usages: SecretKeyUsage[];

  /**
   * Base64-encoded key data. Required if format is "raw", "pkcs8", or "spki"
   */
  key_base64?: string;

  /**
   * Key data in JSON Web Key format. Required if format is "jwk"
   */
  key_jwk?: unknown;
}

/**
 * SecretKey binding type
 */
export type SecretKey = SecretKeyProps & {
  /**
   * The kind of resource that the binding provides
   */
  type: "secret_key";
};

/**
 * Create a SecretKey binding
 *
 * @example
 * ```ts
 * const secretKey = SecretKey({
 *   algorithm: { name: "HMAC", hash: "SHA-256" },
 *   format: "raw",
 *   usages: ["sign", "verify"],
 *   key_base64: "dGVzdC1rZXk="
 * });
 * ```
 *
 * @example
 * ```ts
 * const jwkKey = SecretKey({
 *   algorithm: { name: "RSA-PSS", hash: "SHA-256" },
 *   format: "jwk",
 *   usages: ["sign"],
 *   key_jwk: {
 *     kty: "RSA",
 *     n: "...",
 *     e: "AQAB"
 *   }
 * });
 * ```
 */
export function SecretKey(props: SecretKeyProps): SecretKey {
  return {
    type: "secret_key",
    ...props,
  };
}

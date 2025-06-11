import type { Scope } from "./scope.ts";

/**
 * Encrypt a value with a symmetric key using libsodium.
 * If a salt is available in the scope, uses pwhash for key derivation.
 * Otherwise falls back to generichash.
 *
 * @param value - The value to encrypt
 * @param key - The encryption key
 * @param scope - Optional scope for salt lookup
 * @returns The base64-encoded encrypted value with nonce
 */
export async function encrypt(
  value: string,
  key: string,
  scope?: Scope,
  salt?: string,
): Promise<string> {
  const sodium = (await import("libsodium-wrappers-sumo" as any)).default;
  await sodium.ready;

  let cryptoKey: Uint8Array;

  // If scope is provided, try to get salt for pwhash
  if (scope) {
    if (salt) {
      // Derive key using pwhash
      const saltBytes = sodium.from_base64(
        salt,
        sodium.base64_variants.ORIGINAL,
      );

      cryptoKey = sodium.crypto_pwhash(
        sodium.crypto_secretbox_KEYBYTES,
        sodium.from_string(key),
        saltBytes,
        sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_ALG_DEFAULT,
      );
    } else {
      // No salt available, fall back to generichash
      cryptoKey = sodium.crypto_generichash(
        sodium.crypto_secretbox_KEYBYTES,
        sodium.from_string(key),
      );
    }
  } else {
    // No scope provided, use generichash
    cryptoKey = sodium.crypto_generichash(
      sodium.crypto_secretbox_KEYBYTES,
      sodium.from_string(key),
    );
  }

  // Generate a random nonce
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

  // Encrypt the message
  const encryptedBin = sodium.crypto_secretbox_easy(
    sodium.from_string(value),
    nonce,
    cryptoKey,
  );

  // Combine nonce and ciphertext, then encode to base64
  const combined = new Uint8Array(nonce.length + encryptedBin.length);
  combined.set(nonce);
  combined.set(encryptedBin, nonce.length);

  return sodium.to_base64(combined, sodium.base64_variants.ORIGINAL);
}

/**
 * Decrypt a value encrypted with a symmetric key.
 * If a salt is available in the scope, uses pwhash for key derivation.
 * Otherwise falls back to generichash.
 *
 * @param encryptedValue - The base64-encoded encrypted value with nonce
 * @param key - The decryption key
 * @param scope - Optional scope for salt lookup
 * @returns The decrypted string
 */
export async function decryptWithKey(
  encryptedValue: string,
  key: string,
  scope?: Scope,
  salt?: string,
): Promise<string> {
  const sodium = (await import("libsodium-wrappers-sumo" as any)).default;
  await sodium.ready;

  let cryptoKey: Uint8Array;

  // If scope is provided, try to get salt for pwhash
  if (scope) {
    if (salt) {
      // Derive key using pwhash
      const saltBytes = sodium.from_base64(
        salt,
        sodium.base64_variants.ORIGINAL,
      );

      cryptoKey = sodium.crypto_pwhash(
        sodium.crypto_secretbox_KEYBYTES,
        sodium.from_string(key),
        saltBytes,
        sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_ALG_DEFAULT,
      );
    } else {
      // No salt available, fall back to generichash
      cryptoKey = sodium.crypto_generichash(
        sodium.crypto_secretbox_KEYBYTES,
        sodium.from_string(key),
      );
    }
  } else {
    // No scope provided, use generichash
    cryptoKey = sodium.crypto_generichash(
      sodium.crypto_secretbox_KEYBYTES,
      sodium.from_string(key),
    );
  }

  // Decode the base64 combined value
  const combined = sodium.from_base64(
    encryptedValue,
    sodium.base64_variants.ORIGINAL,
  );

  // Extract nonce and ciphertext
  const nonce = combined.slice(0, sodium.crypto_secretbox_NONCEBYTES);
  const ciphertext = combined.slice(sodium.crypto_secretbox_NONCEBYTES);

  // Decrypt the message
  const decryptedBin = sodium.crypto_secretbox_open_easy(
    ciphertext,
    nonce,
    cryptoKey,
  );

  return sodium.to_string(decryptedBin);
}

/**
 * Encrypt a value with a symmetric key using libsodium
 *
 * @param value - The value to encrypt
 * @param key - The encryption key
 * @returns The base64-encoded encrypted value with nonce
 */
export async function encrypt(value: string, key: string): Promise<string> {
  const sodium = (await import("libsodium-wrappers")).default;
  // Initialize libsodium
  await sodium.ready;

  // Derive a key from the passphrase
  const cryptoKey = sodium.crypto_generichash(
    sodium.crypto_secretbox_KEYBYTES,
    sodium.from_string(key),
  );

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
 * Decrypt a value encrypted with a symmetric key
 *
 * @param encryptedValue - The base64-encoded encrypted value with nonce
 * @param key - The decryption key
 * @returns The decrypted string
 */
export async function decryptWithKey(
  encryptedValue: string,
  key: string,
): Promise<string> {
  const sodium = (await import("libsodium-wrappers")).default;
  // Initialize libsodium
  await sodium.ready;

  // Derive a key from the passphrase
  const cryptoKey = sodium.crypto_generichash(
    sodium.crypto_secretbox_KEYBYTES,
    sodium.from_string(key),
  );

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

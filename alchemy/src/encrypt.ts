const ENCRYPTION_VERSION_V1 = "v1:";
const ENCRYPTION_VERSION_V2 = "v2:";

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

  return (
    ENCRYPTION_VERSION_V1 +
    sodium.to_base64(combined, sodium.base64_variants.ORIGINAL)
  );
}

/**
 * Encrypt a value using secure key derivation with salt (new method)
 */
export async function encryptSecure(
  value: string,
  key: string,
): Promise<string> {
  const sodium = (await import("libsodium-wrappers")).default;
  await sodium.ready;

  const SALTBYTES = 32;
  const salt = sodium.randombytes_buf(SALTBYTES);

  const masterKey = sodium.crypto_generichash(
    sodium.crypto_kdf_KEYBYTES,
    sodium.from_string(key),
  );

  const cryptoKey = sodium.crypto_kdf_derive_from_key(
    sodium.crypto_secretbox_KEYBYTES,
    1,
    "alchemy",
    masterKey,
  );

  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

  const encryptedBin = sodium.crypto_secretbox_easy(
    sodium.from_string(value),
    nonce,
    cryptoKey,
  );

  const combined = new Uint8Array(
    salt.length + nonce.length + encryptedBin.length,
  );
  combined.set(salt);
  combined.set(nonce, salt.length);
  combined.set(encryptedBin, salt.length + nonce.length);

  return (
    ENCRYPTION_VERSION_V2 +
    sodium.to_base64(combined, sodium.base64_variants.ORIGINAL)
  );
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
  await sodium.ready;

  if (encryptedValue.startsWith(ENCRYPTION_VERSION_V2)) {
    return await decryptWithKeyV2(
      encryptedValue.slice(ENCRYPTION_VERSION_V2.length),
      key,
      sodium,
    );
  }

  const v1Data = encryptedValue.startsWith(ENCRYPTION_VERSION_V1)
    ? encryptedValue.slice(ENCRYPTION_VERSION_V1.length)
    : encryptedValue;

  try {
    return await decryptWithKeyV1(v1Data, key, sodium);
  } catch (error) {
    throw new Error(
      `Failed to decrypt data with both v2 and v1 methods: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Decrypt using new secure key derivation method (v2)
 */
async function decryptWithKeyV2(
  encryptedValue: string,
  key: string,
  sodium: any,
): Promise<string> {
  const combined = sodium.from_base64(
    encryptedValue,
    sodium.base64_variants.ORIGINAL,
  );

  const SALTBYTES = 32;
  const _salt = combined.slice(0, SALTBYTES);
  const nonce = combined.slice(
    SALTBYTES,
    SALTBYTES + sodium.crypto_secretbox_NONCEBYTES,
  );
  const ciphertext = combined.slice(
    SALTBYTES + sodium.crypto_secretbox_NONCEBYTES,
  );

  const masterKey = sodium.crypto_generichash(
    sodium.crypto_kdf_KEYBYTES,
    sodium.from_string(key),
  );

  const cryptoKey = sodium.crypto_kdf_derive_from_key(
    sodium.crypto_secretbox_KEYBYTES,
    1,
    "alchemy",
    masterKey,
  );

  const decryptedBin = sodium.crypto_secretbox_open_easy(
    ciphertext,
    nonce,
    cryptoKey,
  );
  return sodium.to_string(decryptedBin);
}

/**
 * Decrypt using legacy crypto_generichash method (v1)
 */
async function decryptWithKeyV1(
  encryptedValue: string,
  key: string,
  sodium: any,
): Promise<string> {
  const cryptoKey = sodium.crypto_generichash(
    sodium.crypto_secretbox_KEYBYTES,
    sodium.from_string(key),
  );

  const combined = sodium.from_base64(
    encryptedValue,
    sodium.base64_variants.ORIGINAL,
  );

  const nonce = combined.slice(0, sodium.crypto_secretbox_NONCEBYTES);
  const ciphertext = combined.slice(sodium.crypto_secretbox_NONCEBYTES);

  const decryptedBin = sodium.crypto_secretbox_open_easy(
    ciphertext,
    nonce,
    cryptoKey,
  );
  return sodium.to_string(decryptedBin);
}

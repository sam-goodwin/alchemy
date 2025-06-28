---
title: SecretKey
description: Securely store and use cryptographic keys in Cloudflare Workers with the SecretKey binding.
---

A data class that represents a secret key binding for Cloudflare Workers, enabling secure cryptographic operations using the Web Crypto API.

## Overview

The `SecretKey` binding allows you to securely store and use cryptographic keys in your Cloudflare Workers. Keys are stored as bindings and exposed as `CryptoKey` objects that can be used with the [SubtleCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto).

## Key Formats

SecretKey supports multiple key formats:

- **`raw`** - Raw binary key data
- **`pkcs8`** - PKCS #8 format for private keys
- **`spki`** - SubjectPublicKeyInfo format for public keys
- **`jwk`** - JSON Web Key format

## Key Usages

Keys can be configured with specific [usage permissions](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyusages):

- **`encrypt`** / **`decrypt`** - For encryption/decryption operations
- **`sign`** / **`verify`** - For digital signatures
- **`deriveKey`** / **`deriveBits`** - For key derivation
- **`wrapKey`** / **`unwrapKey`** - For key wrapping

## Examples

### RSA Signing Key (JWK Format)

```typescript
import { SecretKey } from "alchemy/cloudflare";
import { Worker } from "alchemy/cloudflare";
import { secret } from "alchemy";

// Generate an RSA key pair
const keyPair = await crypto.subtle.generateKey(
  {
    name: "RSA-PSS",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true, // extractable
  ["sign", "verify"]
);

// Export the private key as JWK
const privateKeyJwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);

const signingKey = new SecretKey({
  algorithm: { name: "RSA-PSS", hash: "SHA-256" },
  format: "jwk",
  usages: ["sign"],
  key_jwk: secret(privateKeyJwk),
});

const worker = await Worker("my-worker", {
  entrypoint: "./worker.ts",
  bindings: {
    SIGNING_KEY: signingKey,
  },
});
```

**worker.ts**

```javascript
export default {
  async fetch(request, env) {
    const data = new TextEncoder().encode("Hello, World!");

    const signature = await crypto.subtle.sign(
      { name: "RSA-PSS", saltLength: 32 },
      env.SIGNING_KEY,
      data
    );

    return Response.json({
      signed: Array.from(new Uint8Array(signature)),
    });
  },
};
```

### AES Encryption Key (Raw Format)

```typescript
import { SecretKey } from "alchemy/cloudflare";
import { Worker } from "alchemy/cloudflare";
import { secret } from "alchemy";

// Generate a 256-bit AES key
const aesKey = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true,
  ["encrypt", "decrypt"]
);

// Export as raw bytes
const keyData = await crypto.subtle.exportKey("raw", aesKey);
const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(keyData)));

const encryptionKey = new SecretKey({
  algorithm: { name: "AES-GCM" },
  format: "raw",
  usages: ["encrypt", "decrypt"],
  key_base64: secret(keyBase64),
});

const worker = await Worker("encryption-worker", {
  bindings: {
    ENCRYPTION_KEY: encryptionKey,
  },
  entrypoint: "./encryption-worker.js",
});
```

**encryption-worker.js**

```javascript
export default {
  async fetch(request, env) {
    const plaintext = new TextEncoder().encode("secret message");
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      env.ENCRYPTION_KEY,
      plaintext
    );

    return Response.json({
      ciphertext: Array.from(new Uint8Array(ciphertext)),
      iv: Array.from(iv),
    });
  },
};
```

### ECDSA Key from PKCS#8

```typescript
import { SecretKey } from "alchemy/cloudflare";
import { secret } from "alchemy";

// Assuming you have a PKCS#8 encoded private key
const pkcs8Key = "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg...";

const ecdsaKey = new SecretKey({
  algorithm: { name: "ECDSA", namedCurve: "P-256" },
  format: "pkcs8",
  usages: ["sign"],
  key_base64: secret(pkcs8Key),
});
```

### HMAC Key for Message Authentication

```typescript
import { SecretKey } from "alchemy/cloudflare";
import { secret } from "alchemy";

// Generate HMAC key
const hmacKey = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"]
);

const keyData = await crypto.subtle.exportKey("raw", hmacKey);
const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(keyData)));

const macKey = new SecretKey({
  algorithm: { name: "HMAC", hash: "SHA-256" },
  format: "raw",
  usages: ["sign", "verify"],
  key_base64: secret(keyBase64),
});
```

## Security Considerations

- **Key Storage**: Keys are securely stored by Cloudflare and never exposed in plain text
- **Access Control**: Keys are only accessible to the specific Worker they're bound to
- **Usage Restrictions**: The `usages` array strictly controls what operations can be performed
- **Non-extractable**: Keys imported into Workers are typically non-extractable for security

## Algorithm Support

SecretKey works with all algorithms supported by the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API/Supported_algorithms):

- **RSA** (RSA-OAEP, RSA-PSS, RSASSA-PKCS1-v1_5)
- **ECDSA** / **ECDH** (P-256, P-384, P-521)
- **AES** (AES-CBC, AES-CTR, AES-GCM, AES-KW)
- **HMAC** (SHA-1, SHA-256, SHA-384, SHA-512)
- **PBKDF2**, **HKDF**
- **Ed25519**, **X25519**

## See Also

- [SubtleCrypto.importKey() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey)
- [Web Crypto API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Cloudflare Workers Bindings](https://developers.cloudflare.com/workers/configuration/bindings/)

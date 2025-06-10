---
title: Key
description: Learn how to create, update, and manage AWS PaymentCryptography Keys using Alchemy Cloud Control.
---


The Key resource allows you to manage [AWS PaymentCryptography Keys](https://docs.aws.amazon.com/paymentcryptography/latest/userguide/) for secure payment processing and cryptographic operations.

## Minimal Example

Create a basic PaymentCryptography Key with essential properties.

```ts
import AWS from "alchemy/aws/control";

const paymentKey = await AWS.PaymentCryptography.Key("basicKey", {
  Exportable: false,
  KeyAttributes: {
    KeyAlgorithm: "SYMMETRIC",
    KeyLength: 256
  }
});
```

## Advanced Configuration

Configure a PaymentCryptography Key with additional properties such as enabling the key and specifying tags.

```ts
const advancedKey = await AWS.PaymentCryptography.Key("advancedKey", {
  Exportable: true,
  KeyAttributes: {
    KeyAlgorithm: "SYMMETRIC",
    KeyLength: 256,
    KeyUsage: "ENCRYPT_DECRYPT"
  },
  Enabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "PaymentGateway" }
  ]
});
```

## Key with Derive Key Usage

Create a PaymentCryptography Key that specifies derive key usage for key management.

```ts
const deriveKeyUsageKey = await AWS.PaymentCryptography.Key("deriveKeyUsageKey", {
  Exportable: false,
  KeyAttributes: {
    KeyAlgorithm: "SYMMETRIC",
    KeyLength: 256
  },
  DeriveKeyUsage: "DERIVE_KEY"
});
```

## Key with Check Value Algorithm

Define a PaymentCryptography Key that includes a key check value algorithm for enhanced security.

```ts
const checkValueAlgorithmKey = await AWS.PaymentCryptography.Key("checkValueAlgorithmKey", {
  Exportable: true,
  KeyAttributes: {
    KeyAlgorithm: "SYMMETRIC",
    KeyLength: 256
  },
  KeyCheckValueAlgorithm: "SHA256",
  Enabled: true
});
```

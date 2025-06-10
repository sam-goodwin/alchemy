---
title: Alias
description: Learn how to create, update, and manage AWS PaymentCryptography Aliases using Alchemy Cloud Control.
---


The Alias resource allows you to manage [AWS PaymentCryptography Aliases](https://docs.aws.amazon.com/paymentcryptography/latest/userguide/) for your cryptographic keys. Aliases are friendly names that provide a way to refer to a cryptographic key.

## Minimal Example

Create a basic alias with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const paymentCryptographyAlias = await AWS.PaymentCryptography.Alias("myAlias", {
  AliasName: "MyPrimaryKeyAlias",
  KeyArn: "arn:aws:payment-cryptography:us-east-1:123456789012:key/my-key-id"
});
```

## Advanced Configuration

Create an alias that adopts an existing resource instead of failing if it already exists.

```ts
const existingAlias = await AWS.PaymentCryptography.Alias("existingAlias", {
  AliasName: "MyExistingKeyAlias",
  KeyArn: "arn:aws:payment-cryptography:us-east-1:123456789012:key/existing-key-id",
  adopt: true
});
```

## Key Management

Create an alias with a specific key ARN to manage your cryptographic keys effectively.

```ts
const keyManagementAlias = await AWS.PaymentCryptography.Alias("keyManagementAlias", {
  AliasName: "KeyForTransactions",
  KeyArn: "arn:aws:payment-cryptography:us-east-1:123456789012:key/transaction-key-id"
});
```

## Alias Creation with Optional Properties

Create an alias and inspect its creation time and ARN as additional properties.

```ts
const detailedAlias = await AWS.PaymentCryptography.Alias("detailedAlias", {
  AliasName: "DetailedTransactionKeyAlias",
  KeyArn: "arn:aws:payment-cryptography:us-east-1:123456789012:key/detailed-key-id"
});

// Accessing additional properties
console.log("Alias ARN:", detailedAlias.Arn);
console.log("Creation Time:", detailedAlias.CreationTime);
```

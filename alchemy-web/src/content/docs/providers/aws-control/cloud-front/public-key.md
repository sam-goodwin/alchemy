---
title: PublicKey
description: Learn how to create, update, and manage AWS CloudFront PublicKeys using Alchemy Cloud Control.
---


The PublicKey resource lets you manage [AWS CloudFront PublicKeys](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for use in your CloudFront distributions, allowing you to serve content securely.

## Minimal Example

Create a basic PublicKey with required properties and an optional property for adopting an existing resource.

```ts
import AWS from "alchemy/aws/control";

const myPublicKey = await AWS.CloudFront.PublicKey("myPublicKey", {
  PublicKeyConfig: {
    Name: "MyPublicKey",
    CallerReference: "unique-caller-reference",
    Comment: "Public key for secure content delivery"
  },
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a PublicKey with additional settings, such as enabling comments for better resource management.

```ts
const advancedPublicKey = await AWS.CloudFront.PublicKey("advancedPublicKey", {
  PublicKeyConfig: {
    Name: "AdvancedPublicKey",
    CallerReference: "unique-caller-reference-advanced",
    Comment: "This is an advanced public key for enhanced security",
    Encoding: "PEM",
    PublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIG..."
  }
});
```

## Example with Key Rotation

Create a PublicKey that can be used for key rotation with a defined maximum age.

```ts
const keyRotationPublicKey = await AWS.CloudFront.PublicKey("keyRotationPublicKey", {
  PublicKeyConfig: {
    Name: "KeyRotationPublicKey",
    CallerReference: "unique-caller-reference-key-rotation",
    Comment: "Public key with key rotation enabled",
    PublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIG...",
    MaxAge: 30 // Optional: maximum age in days for key rotation
  }
});
```

## Example with Multiple Keys

Manage multiple PublicKeys for different CloudFront distributions.

```ts
const primaryKey = await AWS.CloudFront.PublicKey("primaryKey", {
  PublicKeyConfig: {
    Name: "PrimaryPublicKey",
    CallerReference: "unique-caller-reference-primary",
    PublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIG...",
    Comment: "Primary public key for CDN"
  }
});

const secondaryKey = await AWS.CloudFront.PublicKey("secondaryKey", {
  PublicKeyConfig: {
    Name: "SecondaryPublicKey",
    CallerReference: "unique-caller-reference-secondary",
    PublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIG...",
    Comment: "Secondary public key for CDN"
  }
});
```

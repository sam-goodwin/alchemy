---
title: Managing AWS KMS Keys with Alchemy
description: Learn how to create, update, and manage AWS KMS Keys using Alchemy Cloud Control.
---

# Key

The Key resource lets you manage [AWS KMS Keys](https://docs.aws.amazon.com/kms/latest/userguide/) for encrypting and decrypting data within your AWS account.

## Minimal Example

Create a basic KMS Key with essential properties and a key policy.

```ts
import AWS from "alchemy/aws/control";

const BasicKMSKey = await AWS.KMS.Key("BasicKMSKey", {
  Description: "Basic encryption key for application data.",
  KeyPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "*"
        },
        Action: "kms:*",
        Resource: "*"
      }
    ]
  }),
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Advanced Configuration

Configure a KMS Key with multi-region support and key rotation enabled.

```ts
const AdvancedKMSKey = await AWS.KMS.Key("AdvancedKMSKey", {
  Description: "Advanced key with multi-region support and rotation enabled.",
  MultiRegion: true,
  EnableKeyRotation: true,
  KeyPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "*"
        },
        Action: "kms:Decrypt",
        Resource: "*"
      }
    ]
  }),
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Key Usage Configuration

Create a KMS Key specifically for encrypting data.

```ts
const EncryptOnlyKMSKey = await AWS.KMS.Key("EncryptOnlyKMSKey", {
  Description: "Key dedicated to encrypting data only.",
  KeyUsage: "ENCRYPT_DECRYPT",
  KeyPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "*"
        },
        Action: "kms:Encrypt",
        Resource: "*"
      }
    ]
  })
});
```

## Adoption of Existing Resources

Adopt an existing KMS Key instead of failing if the key already exists.

```ts
const AdoptExistingKMSKey = await AWS.KMS.Key("AdoptExistingKMSKey", {
  Description: "Adopting an existing KMS Key if available.",
  adopt: true
});
```
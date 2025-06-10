---
title: Key
description: Learn how to create, update, and manage AWS KMS Keys using Alchemy Cloud Control.
---


The Key resource lets you manage [AWS KMS Keys](https://docs.aws.amazon.com/kms/latest/userguide/) for encrypting and decrypting data securely within your AWS environment.

## Minimal Example

Create a basic KMS Key with default settings and a description.

```ts
import AWS from "alchemy/aws/control";

const basicKmsKey = await AWS.KMS.Key("myBasicKmsKey", {
  Description: "A basic KMS key for encryption",
  KeyPolicy: {
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
  },
  Enabled: true
});
```

## Advanced Configuration

Configure a KMS Key with additional options such as rotation and multi-region support.

```ts
const advancedKmsKey = await AWS.KMS.Key("myAdvancedKmsKey", {
  Description: "An advanced KMS key with rotation enabled",
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/my-user"
        },
        Action: "kms:Encrypt",
        Resource: "*"
      }
    ]
  },
  EnableKeyRotation: true,
  MultiRegion: true,
  KeySpec: "SYMMETRIC_DEFAULT",
  KeyUsage: "ENCRYPT_DECRYPT"
});
```

## Key with Custom Tags

Create a KMS Key with custom tags for better resource management.

```ts
const taggedKmsKey = await AWS.KMS.Key("myTaggedKmsKey", {
  Description: "A KMS key with custom tags for organization",
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/my-user"
        },
        Action: "kms:*",
        Resource: "*"
      }
    ]
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MyApp"
    }
  ]
});
```

## KMS Key with Rotation Period

Create a KMS Key with a specified rotation period.

```ts
const rotatedKmsKey = await AWS.KMS.Key("myRotatedKmsKey", {
  Description: "A KMS key with a rotation period of 30 days",
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/my-user"
        },
        Action: "kms:Decrypt",
        Resource: "*"
      }
    ]
  },
  EnableKeyRotation: true,
  RotationPeriodInDays: 30
});
```

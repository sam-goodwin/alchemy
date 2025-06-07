---
title: Managing AWS KMS ReplicaKeys with Alchemy
description: Learn how to create, update, and manage AWS KMS ReplicaKeys using Alchemy Cloud Control.
---

# ReplicaKey

The ReplicaKey resource allows you to create and manage [AWS KMS ReplicaKeys](https://docs.aws.amazon.com/kms/latest/userguide/) for cross-region key replication, enhancing your data security and availability.

## Minimal Example

Create a basic KMS ReplicaKey with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const MyReplicaKey = await AWS.KMS.ReplicaKey("MyReplicaKey", {
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyKMSRole"
        },
        Action: "kms:Decrypt",
        Resource: "*"
      }
    ]
  },
  PrimaryKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234567890ab",
  Description: "Replica key for critical data encryption"
});
```

## Advanced Configuration

Configure a KMS ReplicaKey with additional options, including enabling the key and setting tags.

```ts
const AdvancedReplicaKey = await AWS.KMS.ReplicaKey("AdvancedReplicaKey", {
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyKMSRole"
        },
        Action: "kms:Decrypt",
        Resource: "*"
      }
    ]
  },
  PrimaryKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234567890ab",
  Enabled: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "FinanceApp" }
  ]
});
```

## Setting Pending Window

Create a KMS ReplicaKey with a specified pending window, allowing for a delay in key replication.

```ts
const PendingWindowReplicaKey = await AWS.KMS.ReplicaKey("PendingWindowReplicaKey", {
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyKMSRole"
        },
        Action: "kms:Decrypt",
        Resource: "*"
      }
    ]
  },
  PrimaryKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234567890ab",
  PendingWindowInDays: 7
});
```
---
title: ReplicaKey
description: Learn how to create, update, and manage AWS KMS ReplicaKeys using Alchemy Cloud Control.
---


The ReplicaKey resource allows you to create and manage [AWS KMS ReplicaKeys](https://docs.aws.amazon.com/kms/latest/userguide/) for enhancing data protection across AWS Regions. ReplicaKeys enable you to replicate your primary keys to other AWS Regions seamlessly.

## Minimal Example

Create a basic ReplicaKey with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicReplicaKey = await AWS.KMS.ReplicaKey("basicReplicaKey", {
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyKMSRole"
        },
        Action: "kms:*",
        Resource: "*"
      }
    ]
  },
  PrimaryKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd5678",
  Description: "Basic ReplicaKey for cross-region replication"
});
```

## Advanced Configuration

Create a ReplicaKey with more advanced settings, including enabling the key and specifying a pending window.

```ts
const advancedReplicaKey = await AWS.KMS.ReplicaKey("advancedReplicaKey", {
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyKMSRole"
        },
        Action: "kms:*",
        Resource: "*"
      }
    ]
  },
  PrimaryKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd5678",
  Enabled: true,
  PendingWindowInDays: 7,
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Adoption of Existing Keys

If you want to adopt an existing ReplicaKey instead of failing, you can set the `adopt` property to true.

```ts
const adoptedReplicaKey = await AWS.KMS.ReplicaKey("adoptedReplicaKey", {
  KeyPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyKMSRole"
        },
        Action: "kms:*",
        Resource: "*"
      }
    ]
  },
  PrimaryKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd5678",
  Enabled: true,
  adopt: true
});
```

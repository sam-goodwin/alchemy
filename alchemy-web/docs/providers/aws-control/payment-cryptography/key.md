---
title: Managing AWS PaymentCryptography Keys with Alchemy
description: Learn how to create, update, and manage AWS PaymentCryptography Keys using Alchemy Cloud Control.
---

# Key

The Key resource lets you create and manage [AWS PaymentCryptography Keys](https://docs.aws.amazon.com/paymentcryptography/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-paymentcryptography-key.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const key = await AWS.PaymentCryptography.Key("key-example", {
  Exportable: true,
  KeyAttributes: "example-keyattributes",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a key with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedKey = await AWS.PaymentCryptography.Key("advanced-key", {
  Exportable: true,
  KeyAttributes: "example-keyattributes",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


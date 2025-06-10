---
title: KeyGroup
description: Learn how to create, update, and manage AWS CloudFront KeyGroups using Alchemy Cloud Control.
---


The KeyGroup resource allows you to manage [AWS CloudFront KeyGroups](https://docs.aws.amazon.com/cloudfront/latest/userguide/) that specify a set of public keys used for signed URLs and signed cookies.

## Minimal Example

Create a basic KeyGroup with required properties and an optional adoption setting.

```ts
import AWS from "alchemy/aws/control";

const keyGroup = await AWS.CloudFront.KeyGroup("myKeyGroup", {
  KeyGroupConfig: {
    Name: "MyKeyGroup",
    Items: [
      "arn:aws:iam::123456789012:server-certificate/my-public-key"
    ],
    Comment: "This key group contains my public keys."
  },
  adopt: false // Set to true to adopt existing resources
});
```

## Advanced Configuration

Configure a KeyGroup with additional options such as a comment for better clarity.

```ts
const advancedKeyGroup = await AWS.CloudFront.KeyGroup("advancedKeyGroup", {
  KeyGroupConfig: {
    Name: "AdvancedKeyGroup",
    Items: [
      "arn:aws:iam::123456789012:server-certificate/my-public-key-1",
      "arn:aws:iam::123456789012:server-certificate/my-public-key-2"
    ],
    Comment: "KeyGroup for advanced features and multiple keys."
  },
  adopt: true // Adopt existing key group if it already exists
});
```

## Use Case: Rotating Keys

Demonstrate how to create a KeyGroup that can be updated to rotate keys.

```ts
const keyGroupForRotation = await AWS.CloudFront.KeyGroup("keyGroupForRotation", {
  KeyGroupConfig: {
    Name: "KeyGroupForRotation",
    Items: [
      "arn:aws:iam::123456789012:server-certificate/my-old-public-key"
    ],
    Comment: "KeyGroup for rotating keys. Update this as keys change."
  }
});

// Later, update the KeyGroup to include a new key
await AWS.CloudFront.KeyGroup("keyGroupForRotation", {
  KeyGroupConfig: {
    Name: "KeyGroupForRotation",
    Items: [
      "arn:aws:iam::123456789012:server-certificate/my-old-public-key",
      "arn:aws:iam::123456789012:server-certificate/my-new-public-key"
    ],
    Comment: "Updated KeyGroup with a new public key."
  }
});
```

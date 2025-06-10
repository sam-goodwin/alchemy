---
title: FlowEntitlement
description: Learn how to create, update, and manage AWS MediaConnect FlowEntitlements using Alchemy Cloud Control.
---


The FlowEntitlement resource allows you to manage [AWS MediaConnect FlowEntitlements](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) which provide control over how media flows are shared between different users and services.

## Minimal Example

Create a basic FlowEntitlement with required properties and one optional property for description.

```ts
import AWS from "alchemy/aws/control";

const simpleFlowEntitlement = await AWS.MediaConnect.FlowEntitlement("basicFlowEntitlement", {
  description: "Basic entitlement for sharing video flow",
  FlowArn: "arn:aws:mediaconnect:us-east-1:123456789012:flow:example-flow",
  Subscribers: ["arn:aws:mediaconnect:us-east-1:123456789012:subscriber:example-subscriber"]
});
```

## Advanced Configuration

Configure a FlowEntitlement with encryption settings and data transfer subscriber fee percent.

```ts
const secureFlowEntitlement = await AWS.MediaConnect.FlowEntitlement("secureFlowEntitlement", {
  description: "Secure entitlement with encryption",
  FlowArn: "arn:aws:mediaconnect:us-east-1:123456789012:flow:example-secure-flow",
  Subscribers: ["arn:aws:mediaconnect:us-east-1:123456789012:subscriber:another-subscriber"],
  Encryption: {
    Algorithm: "aes128", // Encryption algorithm
    KeyType: "static-key", // Key type used for encryption
    RoleArn: "arn:aws:iam::123456789012:role/MediaConnectEncryptionRole" // IAM role for encryption
  },
  DataTransferSubscriberFeePercent: 10 // 10% fee for data transfer
});
```

## Managing Entitlement Status

You can also set the entitlement status to enable or disable the flow entitlement.

```ts
const entitlementWithStatus = await AWS.MediaConnect.FlowEntitlement("entitlementWithStatus", {
  description: "Entitlement with status management",
  FlowArn: "arn:aws:mediaconnect:us-east-1:123456789012:flow:example-status-flow",
  Subscribers: ["arn:aws:mediaconnect:us-east-1:123456789012:subscriber:status-subscriber"],
  EntitlementStatus: "ENABLED" // Set the entitlement status to ENABLED
});
```

## Adopting Existing Resources

If you need to adopt an existing FlowEntitlement without failing, you can set the adopt property to true.

```ts
const existingFlowEntitlement = await AWS.MediaConnect.FlowEntitlement("existingFlowEntitlement", {
  description: "Adopting an existing entitlement",
  FlowArn: "arn:aws:mediaconnect:us-east-1:123456789012:flow:existing-flow",
  Subscribers: ["arn:aws:mediaconnect:us-east-1:123456789012:subscriber:existing-subscriber"],
  adopt: true // Adopt existing resource instead of failing
});
```

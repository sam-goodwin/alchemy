---
title: SecurityKey
description: Learn how to create, update, and manage AWS Connect SecurityKeys using Alchemy Cloud Control.
---


The SecurityKey resource lets you manage [AWS Connect SecurityKeys](https://docs.aws.amazon.com/connect/latest/userguide/) for secure access to your Amazon Connect instances.

## Minimal Example

Create a basic SecurityKey with the required properties:

```ts
import AWS from "alchemy/aws/control";

const securityKey = await AWS.Connect.SecurityKey("default-security-key", {
  InstanceId: "instance-12345678",
  Key: "my-secure-key"
});
```

## Adoption of Existing Resource

You can adopt an existing SecurityKey instead of failing when it already exists:

```ts
const existingSecurityKey = await AWS.Connect.SecurityKey("existing-security-key", {
  InstanceId: "instance-12345678",
  Key: "my-secure-key",
  adopt: true // This will adopt the existing SecurityKey if it exists
});
```

## Advanced Configuration

This example demonstrates how to access the ARN and timestamps of the created SecurityKey:

```ts
const securityKeyWithDetails = await AWS.Connect.SecurityKey("detailed-security-key", {
  InstanceId: "instance-12345678",
  Key: "my-secure-key"
});

// Accessing additional properties
console.log(`Security Key ARN: ${securityKeyWithDetails.Arn}`);
console.log(`Created At: ${securityKeyWithDetails.CreationTime}`);
console.log(`Last Updated At: ${securityKeyWithDetails.LastUpdateTime}`);
```

## Use Case: Key Rotation

In this example, we create a new SecurityKey for key rotation purposes:

```ts
const newSecurityKey = await AWS.Connect.SecurityKey("key-rotation-security-key", {
  InstanceId: "instance-12345678",
  Key: "my-new-secure-key"
});

// Implement logic to update applications to use the new key
console.log(`New Security Key created: ${newSecurityKey.Arn}`);
```

## Use Case: Multiple Security Keys

You can create multiple SecurityKeys for different purposes, such as development and production:

```ts
const devSecurityKey = await AWS.Connect.SecurityKey("dev-security-key", {
  InstanceId: "instance-12345678",
  Key: "dev-secure-key"
});

const prodSecurityKey = await AWS.Connect.SecurityKey("prod-security-key", {
  InstanceId: "instance-12345678",
  Key: "prod-secure-key"
});

// Log the ARNs for both SecurityKeys
console.log(`Development Security Key ARN: ${devSecurityKey.Arn}`);
console.log(`Production Security Key ARN: ${prodSecurityKey.Arn}`);
```

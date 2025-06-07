---
title: Managing AWS IAM VirtualMFADevices with Alchemy
description: Learn how to create, update, and manage AWS IAM VirtualMFADevices using Alchemy Cloud Control.
---

# VirtualMFADevice

The VirtualMFADevice resource allows you to create and manage [AWS IAM Virtual MFA Devices](https://docs.aws.amazon.com/iam/latest/userguide/). These devices can be used to enable multi-factor authentication (MFA) for AWS IAM users, enhancing security for your AWS accounts.

## Minimal Example

Create a basic Virtual MFA Device with required properties and a common optional path.

```ts
import AWS from "alchemy/aws/control";

const BasicVirtualMFADevice = await AWS.IAM.VirtualMFADevice("BasicMFADevice", {
  VirtualMfaDeviceName: "UserMFADevice",
  Users: ["arn:aws:iam::123456789012:user/JohnDoe"],
  Path: "/mfa/"
});
```

## Advanced Configuration

Configure a Virtual MFA Device with tags for better organization and management.

```ts
const TaggedVirtualMFADevice = await AWS.IAM.VirtualMFADevice("TaggedMFADevice", {
  VirtualMfaDeviceName: "TaggedUserMFADevice",
  Users: ["arn:aws:iam::123456789012:user/JaneDoe"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Adopting Existing Resources

Adopt an existing Virtual MFA Device instead of failing if the resource already exists.

```ts
const AdoptedVirtualMFADevice = await AWS.IAM.VirtualMFADevice("AdoptMFADevice", {
  VirtualMfaDeviceName: "ExistingMFADevice",
  Users: ["arn:aws:iam::123456789012:user/ExistingUser"],
  adopt: true
});
```
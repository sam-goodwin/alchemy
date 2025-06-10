---
title: VirtualMFADevice
description: Learn how to create, update, and manage AWS IAM VirtualMFADevices using Alchemy Cloud Control.
---


The VirtualMFADevice resource allows you to create and manage [AWS IAM Virtual MFA Devices](https://docs.aws.amazon.com/iam/latest/userguide/). Virtual MFA devices provide an additional layer of security for your AWS resources by requiring a second form of authentication.

## Minimal Example

Create a basic Virtual MFA Device for a specified user:

```ts
import AWS from "alchemy/aws/control";

const virtualMfaDevice = await AWS.IAM.VirtualMFADevice("myVirtualMfaDevice", {
  VirtualMfaDeviceName: "MyVirtualMFADevice",
  Users: ["user@example.com"],
  Path: "/mfa/",
  Tags: [
    {
      Key: "Purpose",
      Value: "MFA for user authentication"
    }
  ]
});
```

## Advanced Configuration

Configure a Virtual MFA Device with additional properties for more control:

```ts
const advancedMfaDevice = await AWS.IAM.VirtualMFADevice("advancedVirtualMfaDevice", {
  VirtualMfaDeviceName: "AdvancedVirtualMFADevice",
  Users: ["admin@example.com"],
  Path: "/admin/mfa/",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "SecurityLevel",
      Value: "High"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Use Case: Multiple Users

Create a Virtual MFA Device for multiple users to enhance security in a team environment:

```ts
const teamMfaDevice = await AWS.IAM.VirtualMFADevice("teamVirtualMfaDevice", {
  VirtualMfaDeviceName: "TeamVirtualMFADevice",
  Users: [
    "developer1@example.com",
    "developer2@example.com",
    "developer3@example.com"
  ],
  Path: "/team/mfa/",
  Tags: [
    {
      Key: "Team",
      Value: "Development"
    }
  ]
});
```

## Use Case: MFA Device with Specific Path

Create a Virtual MFA Device with a specific path to categorize it under a certain hierarchy:

```ts
const categorizedMfaDevice = await AWS.IAM.VirtualMFADevice("categorizedVirtualMfaDevice", {
  VirtualMfaDeviceName: "CategorizedVirtualMFADevice",
  Users: ["user@example.com"],
  Path: "/specific/path/",
  Tags: [
    {
      Key: "Category",
      Value: "User Security"
    }
  ]
});
```

---
title: Managing AWS DirectoryService SimpleADs with Alchemy
description: Learn how to create, update, and manage AWS DirectoryService SimpleADs using Alchemy Cloud Control.
---

# SimpleAD

The SimpleAD resource allows you to create and manage an [AWS DirectoryService SimpleAD](https://docs.aws.amazon.com/directoryservice/latest/userguide/) for your applications, providing basic Active Directory functionality without the need for a full Microsoft AD deployment.

## Minimal Example

This example demonstrates how to create a basic SimpleAD instance with required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const simpleAD = await AWS.DirectoryService.SimpleAD("MySimpleAD", {
  Name: "my-simple-ad",
  Size: "Small",
  VpcSettings: {
    VpcId: "vpc-12345678",
    SubnetIds: ["subnet-12345678", "subnet-87654321"]
  },
  Description: "A SimpleAD directory for testing purposes.",
  CreateAlias: true,
  EnableSso: false
});
```

## Advanced Configuration

In this example, we configure a SimpleAD with additional advanced options like enabling SSO and specifying a short name.

```ts
const advancedSimpleAD = await AWS.DirectoryService.SimpleAD("AdvancedSimpleAD", {
  Name: "advanced-simple-ad",
  Size: "Large",
  VpcSettings: {
    VpcId: "vpc-87654321",
    SubnetIds: ["subnet-abcdef01", "subnet-fedcba10"]
  },
  Description: "An advanced SimpleAD directory with SSO enabled.",
  CreateAlias: true,
  EnableSso: true,
  ShortName: "adv-simp-ad"
});
```

## Adoption of Existing SimpleAD

Here's how to adopt an existing SimpleAD directory without causing any failures if it already exists.

```ts
const adoptSimpleAD = await AWS.DirectoryService.SimpleAD("AdoptExistingSimpleAD", {
  Name: "existing-simple-ad",
  Size: "Medium",
  VpcSettings: {
    VpcId: "vpc-abcdef12",
    SubnetIds: ["subnet-abc12345", "subnet-54321cba"]
  },
  Description: "Adopting an existing SimpleAD directory.",
  adopt: true
});
```
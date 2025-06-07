---
title: Managing AWS EC2 IPAMScopes with Alchemy
description: Learn how to create, update, and manage AWS EC2 IPAMScopes using Alchemy Cloud Control.
---

# IPAMScope

The IPAMScope resource allows you to manage [AWS EC2 IPAMScopes](https://docs.aws.amazon.com/ec2/latest/userguide/) which are used for IP Address Management (IPAM) within your AWS environment.

## Minimal Example

Create a basic IPAMScope with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicIpamScope = await AWS.EC2.IPAMScope("BasicIpamScope", {
  IpamId: "ipam-12345678",
  Description: "A basic IPAM scope for managing IP addresses",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure an IPAMScope with additional options such as tags for better resource management:

```ts
const advancedIpamScope = await AWS.EC2.IPAMScope("AdvancedIpamScope", {
  IpamId: "ipam-87654321",
  Description: "An advanced IPAM scope for production",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" },
    { Key: "Project", Value: "IPAMMigration" }
  ],
  adopt: true // Adopt an existing resource if it already exists
});
```

## Use Case: Adopting Existing Resources

This example demonstrates how to adopt an existing IPAMScope instead of failing when it already exists:

```ts
const existingIpamScope = await AWS.EC2.IPAMScope("ExistingIpamScope", {
  IpamId: "ipam-existing-id",
  Description: "Adopting an existing IPAM scope",
  adopt: true
});
```

## Use Case: Creating Without Tags

You can create an IPAMScope without any tags if not required:

```ts
const ipamScopeWithoutTags = await AWS.EC2.IPAMScope("NoTagsIpamScope", {
  IpamId: "ipam-no-tags-id",
  Description: "An IPAM scope created without tags"
});
```
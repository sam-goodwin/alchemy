---
title: IPAMScope
description: Learn how to create, update, and manage AWS EC2 IPAMScopes using Alchemy Cloud Control.
---


The IPAMScope resource lets you manage [AWS EC2 IPAMScopes](https://docs.aws.amazon.com/ec2/latest/userguide/) for organizing your IP address management in a scalable and efficient manner.

## Minimal Example

Create a basic IPAMScope with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicIpamScope = await AWS.EC2.IPAMScope("basicIpamScope", {
  IpamId: "ipam-12345678",
  Description: "Basic IPAM Scope for managing IP addresses"
});
```

## Advanced Configuration

Configure an IPAMScope with tags for better organization and management.

```ts
const advancedIpamScope = await AWS.EC2.IPAMScope("advancedIpamScope", {
  IpamId: "ipam-87654321",
  Description: "Advanced IPAM Scope with tags",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing IPAMScope if it already exists instead of failing.

```ts
const adoptedIpamScope = await AWS.EC2.IPAMScope("adoptedIpamScope", {
  IpamId: "ipam-13579246",
  Description: "This scope might already exist",
  adopt: true
});
```

## Updating an IPAMScope

Update an existing IPAMScope's description to reflect changes in your network architecture.

```ts
const updatedIpamScope = await AWS.EC2.IPAMScope("updatedIpamScope", {
  IpamId: "ipam-24681357",
  Description: "Updated description for IPAM Scope"
});
```

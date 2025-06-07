---
title: Managing AWS EC2 IPAMPools with Alchemy
description: Learn how to create, update, and manage AWS EC2 IPAMPools using Alchemy Cloud Control.
---

# IPAMPool

The IPAMPool resource allows you to manage [AWS EC2 IPAMPools](https://docs.aws.amazon.com/ec2/latest/userguide/) for allocating and managing IP addresses within your AWS environment.

## Minimal Example

Create a basic IPAMPool with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicIPAMPool = await AWS.EC2.IPAMPool("BasicIPAMPool", {
  IpamScopeId: "ipam-scope-12345678",
  AddressFamily: "ipv4",
  AllocationMinNetmaskLength: 24,
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure an IPAMPool with additional options for enhanced management.

```ts
const advancedIPAMPool = await AWS.EC2.IPAMPool("AdvancedIPAMPool", {
  IpamScopeId: "ipam-scope-87654321",
  AddressFamily: "ipv6",
  PubliclyAdvertisable: true,
  AllocationMaxNetmaskLength: 48,
  AllocationDefaultNetmaskLength: 32,
  Description: "Advanced IPAM Pool for IPv6 addresses",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Auto Import Configuration

Set up an IPAMPool with auto-import functionality for existing resources.

```ts
const autoImportIPAMPool = await AWS.EC2.IPAMPool("AutoImportIPAMPool", {
  IpamScopeId: "ipam-scope-13579246",
  AddressFamily: "ipv4",
  AutoImport: true,
  SourceIpamPoolId: "source-ipam-pool-12345678",
  AllocationMinNetmaskLength: 20,
  Tags: [{ Key: "Environment", Value: "Staging" }]
});
```

## Public IP Source Configuration

Create an IPAMPool that specifies a public IP source for allocations.

```ts
const publicIPSourceIPAMPool = await AWS.EC2.IPAMPool("PublicIPSourceIPAMPool", {
  IpamScopeId: "ipam-scope-24681357",
  AddressFamily: "ipv4",
  PublicIpSource: "aws-global",
  AllocationDefaultNetmaskLength: 28,
  Tags: [
    { Key: "Environment", Value: "QA" },
    { Key: "Team", Value: "Network" }
  ]
});
```
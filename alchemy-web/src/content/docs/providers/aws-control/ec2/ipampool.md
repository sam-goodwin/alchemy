---
title: IPAMPool
description: Learn how to create, update, and manage AWS EC2 IPAMPools using Alchemy Cloud Control.
---


The IPAMPool resource allows you to manage [AWS EC2 IPAMPools](https://docs.aws.amazon.com/ec2/latest/userguide/) for efficient IP address management in your AWS environment.

## Minimal Example

Create a basic IPAM pool with required properties and some common optional settings:

```ts
import AWS from "alchemy/aws/control";

const ipamPool = await AWS.EC2.IPAMPool("myIpamPool", {
  IpamScopeId: "ipam-scope-12345678",
  AddressFamily: "ipv4",
  AllocationDefaultNetmaskLength: 24,
  Description: "My first IPAM pool for IPv4 addresses"
});
```

## Advanced Configuration

Configure an IPAM pool with more advanced options including source resources and allocation settings:

```ts
const advancedIpamPool = await AWS.EC2.IPAMPool("advancedIpamPool", {
  IpamScopeId: "ipam-scope-87654321",
  AddressFamily: "ipv6",
  AllocationMinNetmaskLength: 48,
  AllocationMaxNetmaskLength: 64,
  PublicIpSource: "Amazon",
  AutoImport: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IPManagement" }
  ]
});
```

## Creating a Publicly Advertisable IPAM Pool

Create an IPAM pool that is publicly addressable and describes its purpose:

```ts
const publicIpamPool = await AWS.EC2.IPAMPool("publicIpamPool", {
  IpamScopeId: "ipam-scope-12345678",
  AddressFamily: "ipv4",
  PubliclyAdvertisable: true,
  Description: "Publicly available IPAM pool for external services",
  ProvisionedCidrs: [
    { Cidr: "203.0.113.0/24" }
  ]
});
```

## Importing Existing Resources

Adopt existing resources into a new IPAM pool instead of failing on conflict:

```ts
const importedIpamPool = await AWS.EC2.IPAMPool("importedIpamPool", {
  IpamScopeId: "ipam-scope-87654321",
  AddressFamily: "ipv4",
  SourceIpamPoolId: "existing-ipam-pool-id",
  adopt: true,
  Description: "Importing an existing IPAM pool"
});
```

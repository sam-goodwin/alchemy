---
title: Managing AWS EC2 IPAMAllocations with Alchemy
description: Learn how to create, update, and manage AWS EC2 IPAMAllocations using Alchemy Cloud Control.
---

# IPAMAllocation

The IPAMAllocation resource allows you to manage IP address allocations within AWS EC2's IP Address Management (IPAM) system. For more information, visit the [AWS EC2 IPAMAllocations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create an IPAM allocation with the required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicIpamAllocation = await AWS.EC2.IPAMAllocation("BasicIpamAllocation", {
  IpamPoolId: "ipam-pool-12345678",
  Description: "Basic IPAM Allocation for testing"
});
```

## Advanced Configuration

Configure an IPAM allocation with additional options such as CIDR and netmask length.

```ts
const AdvancedIpamAllocation = await AWS.EC2.IPAMAllocation("AdvancedIpamAllocation", {
  IpamPoolId: "ipam-pool-87654321",
  Cidr: "10.0.0.0/24",
  NetmaskLength: 24,
  Description: "Advanced IPAM Allocation with CIDR and netmask"
});
```

## Adoption of Existing Resource

Adopt an existing IPAM allocation instead of failing if the resource already exists.

```ts
const AdoptExistingIpamAllocation = await AWS.EC2.IPAMAllocation("AdoptExistingIpamAllocation", {
  IpamPoolId: "ipam-pool-12345678",
  Description: "Adopting an existing IPAM Allocation",
  adopt: true
});
```

## Custom CIDR Allocation

Create a custom IPAM allocation with specific CIDR and netmask configuration.

```ts
const CustomCidrIpamAllocation = await AWS.EC2.IPAMAllocation("CustomCidrIpamAllocation", {
  IpamPoolId: "ipam-pool-abcde123",
  Cidr: "192.168.1.0/24",
  NetmaskLength: 24,
  Description: "Custom CIDR allocation for project"
});
```
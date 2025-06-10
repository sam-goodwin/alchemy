---
title: IPAMPoolCidr
description: Learn how to create, update, and manage AWS EC2 IPAMPoolCidrs using Alchemy Cloud Control.
---


The IPAMPoolCidr resource allows you to manage [AWS EC2 IPAMPoolCidrs](https://docs.aws.amazon.com/ec2/latest/userguide/) effectively by specifying CIDR blocks within an IP address management (IPAM) pool.

## Minimal Example

Create a basic IPAMPoolCidr with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const ipamPoolCidr = await AWS.EC2.IPAMPoolCidr("MyIPAMPoolCidr", {
  IpamPoolId: "ipam-pool-12345678",
  Cidr: "10.0.0.0/24",
  NetmaskLength: 24 // Optional: The length of the CIDR netmask
});
```

## Advanced Configuration

Configure an IPAMPoolCidr with adoption of existing resources.

```ts
const adoptExistingCidr = await AWS.EC2.IPAMPoolCidr("AdoptedIPAMPoolCidr", {
  IpamPoolId: "ipam-pool-87654321",
  Cidr: "192.168.1.0/24",
  NetmaskLength: 24,
  adopt: true // Optional: Adopt existing resource instead of failing
});
```

## Unique Use Case: Multiple CIDRs

Create multiple IPAMPoolCidrs for different subnets within the same IPAM pool.

```ts
const subnetA = await AWS.EC2.IPAMPoolCidr("SubnetA", {
  IpamPoolId: "ipam-pool-12345678",
  Cidr: "10.0.1.0/24",
  NetmaskLength: 24
});

const subnetB = await AWS.EC2.IPAMPoolCidr("SubnetB", {
  IpamPoolId: "ipam-pool-12345678",
  Cidr: "10.0.2.0/24",
  NetmaskLength: 24
});
```

## Unique Use Case: Custom Netmask Length

Create an IPAMPoolCidr with a custom netmask length for more granular control.

```ts
const customNetmaskCidr = await AWS.EC2.IPAMPoolCidr("CustomNetmaskCidr", {
  IpamPoolId: "ipam-pool-12345678",
  Cidr: "172.16.0.0/20", // A larger CIDR block
  NetmaskLength: 20 // Custom netmask length
});
```

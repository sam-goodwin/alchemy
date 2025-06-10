---
title: IPAMAllocation
description: Learn how to create, update, and manage AWS EC2 IPAMAllocations using Alchemy Cloud Control.
---


The IPAMAllocation resource allows you to manage IP address allocations within AWS EC2 using the AWS IP Address Manager (IPAM). For more details, refer to the [AWS EC2 IPAMAllocations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic IPAM allocation with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicIpamAllocation = await AWS.EC2.IPAMAllocation("basicIpamAllocation", {
  IpamPoolId: "ipam-pool-12345678", // Replace with a valid IPAM pool ID
  Cidr: "10.0.0.0/24", // Allocating a CIDR block
  Description: "Basic IPAM allocation for development purposes"
});
```

## Advanced Configuration

Configure an IPAM allocation with a specific netmask length to control the size of the CIDR block.

```ts
const advancedIpamAllocation = await AWS.EC2.IPAMAllocation("advancedIpamAllocation", {
  IpamPoolId: "ipam-pool-87654321", // Replace with a valid IPAM pool ID
  Cidr: "10.0.1.0/24",
  NetmaskLength: 24,
  Description: "Advanced IPAM allocation with specific netmask length"
});
```

## Adoption of Existing Resources

If you want to adopt an existing IPAM allocation instead of failing when it already exists, you can enable the adoption feature.

```ts
const adoptedIpamAllocation = await AWS.EC2.IPAMAllocation("adoptedIpamAllocation", {
  IpamPoolId: "ipam-pool-11223344", // Replace with a valid IPAM pool ID
  Cidr: "10.0.2.0/24",
  adopt: true, // Enables adoption of existing resources
  Description: "Adopted IPAM allocation from existing resources"
});
```

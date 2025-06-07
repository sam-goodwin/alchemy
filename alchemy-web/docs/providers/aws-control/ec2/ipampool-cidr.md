---
title: Managing AWS EC2 IPAMPoolCidrs with Alchemy
description: Learn how to create, update, and manage AWS EC2 IPAMPoolCidrs using Alchemy Cloud Control.
---

# IPAMPoolCidr

The IPAMPoolCidr resource allows you to manage CIDR blocks within an IP address management (IPAM) pool in AWS. This resource can be used to allocate IP address ranges for your Amazon EC2 instances and other AWS services. For more information, refer to the [AWS EC2 IPAMPoolCidrs documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic IPAMPoolCidr with required properties and one optional property for the CIDR block.

```ts
import AWS from "alchemy/aws/control";

const BasicIPAMPoolCidr = await AWS.EC2.IPAMPoolCidr("BasicIPAMPoolCidr", {
  IpamPoolId: "ipam-pool-12345678",
  Cidr: "10.0.0.0/24" // Optional: Specify the CIDR block to use
});
```

## Advanced Configuration

In this example, we specify the netmask length to configure a more refined CIDR allocation.

```ts
const AdvancedIPAMPoolCidr = await AWS.EC2.IPAMPoolCidr("AdvancedIPAMPoolCidr", {
  IpamPoolId: "ipam-pool-87654321",
  Cidr: "192.168.1.0/24", // Optional: Specify the CIDR block to use
  NetmaskLength: 24 // Optional: Specify the netmask length
});
```

## Adopting Existing Resources

This example demonstrates how to adopt an existing IPAMPoolCidr resource instead of failing when it already exists.

```ts
const AdoptExistingIPAMPoolCidr = await AWS.EC2.IPAMPoolCidr("AdoptExistingIPAMPoolCidr", {
  IpamPoolId: "ipam-pool-12345678",
  Cidr: "10.1.0.0/24",
  adopt: true // Optional: Enables adoption of an existing resource
});
```

## Creating Multiple CIDRs

This example shows how to create multiple IPAMPoolCidrs by varying CIDR blocks for different use cases.

```ts
const ProductionIPAMPoolCidr = await AWS.EC2.IPAMPoolCidr("ProductionIPAMPoolCidr", {
  IpamPoolId: "ipam-pool-prod",
  Cidr: "10.2.0.0/24"
});

const StagingIPAMPoolCidr = await AWS.EC2.IPAMPoolCidr("StagingIPAMPoolCidr", {
  IpamPoolId: "ipam-pool-staging",
  Cidr: "10.3.0.0/24"
});
```
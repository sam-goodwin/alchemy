---
title: Managing AWS EC2 NatGateways with Alchemy
description: Learn how to create, update, and manage AWS EC2 NatGateways using Alchemy Cloud Control.
---

# NatGateway

The NatGateway resource lets you create and manage [AWS EC2 NatGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) to enable outbound internet traffic for instances in a private subnet.

## Minimal Example

Create a basic NatGateway with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const natGateway = await AWS.EC2.NatGateway("MyNatGateway", {
  SubnetId: "subnet-0abcd1234efgh5678",
  AllocationId: "eipalloc-0123456789abcdef0",
  Tags: [
    { Key: "Name", Value: "MyNatGateway" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a NatGateway with additional settings including a private IP address and connectivity type.

```ts
const advancedNatGateway = await AWS.EC2.NatGateway("AdvancedNatGateway", {
  SubnetId: "subnet-0abcd1234efgh5678",
  AllocationId: "eipalloc-0123456789abcdef0",
  PrivateIpAddress: "10.0.1.25",
  ConnectivityType: "public",
  SecondaryPrivateIpAddresses: ["10.0.1.26", "10.0.1.27"],
  Tags: [
    { Key: "Name", Value: "AdvancedNatGateway" },
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Using Secondary IP Addresses

Create a NatGateway that utilizes secondary private IP addresses for better resource management.

```ts
const secondaryIpNatGateway = await AWS.EC2.NatGateway("SecondaryIpNatGateway", {
  SubnetId: "subnet-0abcd1234efgh5678",
  AllocationId: "eipalloc-0123456789abcdef0",
  SecondaryPrivateIpAddressCount: 2,
  Tags: [
    { Key: "Name", Value: "SecondaryIpNatGateway" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Max Drain Duration Configuration

Set a max drain duration for shutting down the NatGateway gracefully.

```ts
const drainDurationNatGateway = await AWS.EC2.NatGateway("DrainDurationNatGateway", {
  SubnetId: "subnet-0abcd1234efgh5678",
  AllocationId: "eipalloc-0123456789abcdef0",
  MaxDrainDurationSeconds: 300,
  Tags: [
    { Key: "Name", Value: "DrainDurationNatGateway" },
    { Key: "Environment", Value: "Testing" }
  ]
});
```
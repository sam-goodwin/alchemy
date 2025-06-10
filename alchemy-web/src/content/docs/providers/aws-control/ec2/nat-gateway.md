---
title: NatGateway
description: Learn how to create, update, and manage AWS EC2 NatGateways using Alchemy Cloud Control.
---


The NatGateway resource lets you manage [AWS EC2 NatGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) which allow instances in a private subnet to connect to the internet while preventing inbound traffic from the internet.

## Minimal Example

Create a basic NatGateway with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const natGateway = await AWS.EC2.NatGateway("myNatGateway", {
  AllocationId: "eipalloc-12345678", // Elastic IP allocation ID
  SubnetId: "subnet-12345678",        // Subnet ID where the NAT gateway will reside
  Tags: [{ Key: "Name", Value: "MyNatGateway" }] // Tag for identification
});
```

## Advanced Configuration

Configure a NatGateway with additional properties, such as private IP address and secondary private IP addresses.

```ts
const advancedNatGateway = await AWS.EC2.NatGateway("advancedNatGateway", {
  AllocationId: "eipalloc-12345678",
  SubnetId: "subnet-12345678",
  PrivateIpAddress: "10.0.1.10", // Specify a private IP address
  SecondaryPrivateIpAddresses: ["10.0.1.11", "10.0.1.12"], // Additional private IPs
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Secondary IP Configuration

Create a NatGateway with secondary private IP addresses and a count of secondary private IPs.

```ts
const secondaryIpNatGateway = await AWS.EC2.NatGateway("secondaryIpNatGateway", {
  AllocationId: "eipalloc-12345678",
  SubnetId: "subnet-12345678",
  SecondaryPrivateIpAddressCount: 2, // Automatically assign 2 secondary IP addresses
  Tags: [{ Key: "Name", Value: "SecondaryIpNatGateway" }]
});
```

## Connectivity Type Configuration

Demonstrate how to create a NatGateway with a specific connectivity type, which affects how the NAT Gateway connects to the internet.

```ts
const connectivityNatGateway = await AWS.EC2.NatGateway("connectivityNatGateway", {
  AllocationId: "eipalloc-12345678",
  SubnetId: "subnet-12345678",
  ConnectivityType: "public", // Specify connectivity type
  Tags: [{ Key: "Name", Value: "ConnectivityNatGateway" }]
});
```

## Adoption of Existing Resource

Use the adopt option to manage an existing NAT Gateway without causing an error if it already exists.

```ts
const adoptNatGateway = await AWS.EC2.NatGateway("adoptNatGateway", {
  AllocationId: "eipalloc-12345678",
  SubnetId: "subnet-12345678",
  adopt: true, // Attempt to adopt an existing NAT Gateway
  Tags: [{ Key: "Name", Value: "AdoptNatGateway" }]
});
```

---
title: Managing AWS EC2 CarrierGateways with Alchemy
description: Learn how to create, update, and manage AWS EC2 CarrierGateways using Alchemy Cloud Control.
---

# CarrierGateway

The CarrierGateway resource lets you manage [AWS EC2 CarrierGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) for enabling carrier-grade NAT in your Amazon VPC.

## Minimal Example

Create a basic CarrierGateway with required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const carrierGateway = await AWS.EC2.CarrierGateway("MyCarrierGateway", {
  VpcId: "vpc-0abcdef1234567890",
  Tags: [{ Key: "Environment", Value: "production" }]
});
```

## Advanced Configuration

Configure a CarrierGateway with additional properties and multiple tags.

```ts
const advancedCarrierGateway = await AWS.EC2.CarrierGateway("AdvancedCarrierGateway", {
  VpcId: "vpc-0abcdef1234567890",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Networking" },
    { Key: "Project", Value: "CarrierIntegration" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Adoption

Create a CarrierGateway while allowing for the adoption of an existing resource.

```ts
const adoptedCarrierGateway = await AWS.EC2.CarrierGateway("AdoptedCarrierGateway", {
  VpcId: "vpc-0abcdef1234567890",
  Tags: [{ Key: "Environment", Value: "development" }],
  adopt: true // This will enable adopting an existing resource
});
```
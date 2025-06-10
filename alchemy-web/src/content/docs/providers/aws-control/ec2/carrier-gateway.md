---
title: CarrierGateway
description: Learn how to create, update, and manage AWS EC2 CarrierGateways using Alchemy Cloud Control.
---


The CarrierGateway resource allows you to manage [AWS EC2 CarrierGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) that connect a VPC to carrier networks, enabling the transport of data between the AWS cloud and on-premises locations.

## Minimal Example

Create a basic CarrierGateway associated with a specified VPC.

```ts
import AWS from "alchemy/aws/control";

const carrierGateway = await AWS.EC2.CarrierGateway("myCarrierGateway", {
  VpcId: "vpc-12345678", // Replace with your VPC ID
  Tags: [
    {
      Key: "Name",
      Value: "MyCarrierGateway"
    }
  ]
});
```

## Advanced Configuration

Create a CarrierGateway with additional tags for better resource organization.

```ts
const advancedCarrierGateway = await AWS.EC2.CarrierGateway("advancedCarrierGateway", {
  VpcId: "vpc-87654321", // Replace with your VPC ID
  Tags: [
    {
      Key: "Name",
      Value: "AdvancedCarrierGateway"
    },
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "NetworkIntegration"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using CarrierGateway in a Network Configuration

Here’s how you might utilize a CarrierGateway in a more complex networking setup, such as when integrating with on-premises infrastructure.

```ts
const networkCarrierGateway = await AWS.EC2.CarrierGateway("networkCarrierGateway", {
  VpcId: "vpc-abcdef12", // Replace with your VPC ID
  Tags: [
    {
      Key: "Name",
      Value: "NetworkCarrierGateway"
    },
    {
      Key: "Type",
      Value: "Hybrid"
    }
  ]
});

// Further networking logic can be added here to establish connections
```

## Example with Conditional Resource Adoption

This example illustrates creating a CarrierGateway while ensuring existing resources are adopted if they already exist, which is useful for maintaining continuity in configurations.

```ts
const conditionalCarrierGateway = await AWS.EC2.CarrierGateway("conditionalCarrierGateway", {
  VpcId: "vpc-fedcba98", // Replace with your VPC ID
  Tags: [
    {
      Key: "Name",
      Value: "ConditionalCarrierGateway"
    }
  ],
  adopt: true // This will enable the adoption of an existing gateway if it exists
});
```

These examples demonstrate how to effectively create and manage CarrierGateways using Alchemy, allowing for integration with VPCs and on-premises networks. With proper tagging and configurations, you can ensure your network resources are organized and easily identifiable.

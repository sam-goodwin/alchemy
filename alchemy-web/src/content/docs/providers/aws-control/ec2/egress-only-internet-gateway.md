---
title: EgressOnlyInternetGateway
description: Learn how to create, update, and manage AWS EC2 EgressOnlyInternetGateways using Alchemy Cloud Control.
---


The `EgressOnlyInternetGateway` resource allows you to create an Egress-Only Internet Gateway for your Amazon VPC, enabling instances in the VPC to access the internet while preventing the internet from initiating connections with those instances. For more details, visit the [AWS EC2 EgressOnlyInternetGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) documentation.

## Minimal Example

Create a basic Egress-Only Internet Gateway associated with a specific VPC.

```ts
import AWS from "alchemy/aws/control";

const egressOnlyInternetGateway = await AWS.EC2.EgressOnlyInternetGateway("myEgressOnlyGateway", {
  VpcId: "vpc-1234abcd", // Replace with your actual VPC ID
  adopt: false // Default is false: Will not adopt existing resources
});
```

## Advanced Configuration

Configure an Egress-Only Internet Gateway while adopting an existing resource.

```ts
const existingEgressOnlyInternetGateway = await AWS.EC2.EgressOnlyInternetGateway("adoptedEgressOnlyGateway", {
  VpcId: "vpc-5678efgh", // Replace with your actual VPC ID
  adopt: true // Set to true to adopt an existing resource
});
```

## Network Configuration

This example demonstrates how to create an Egress-Only Internet Gateway and associate it with a VPC, ensuring proper network settings.

```ts
const networkEgressOnlyInternetGateway = await AWS.EC2.EgressOnlyInternetGateway("networkEgressOnlyGateway", {
  VpcId: "vpc-9012ijkl", // Replace with your actual VPC ID
  adopt: false // Default is false: Will not adopt existing resources
});

// Additional configuration can be applied as needed for routing and security
```

## Multiple Gateways

This example shows how to create multiple Egress-Only Internet Gateways for different VPCs.

```ts
const egressOnlyGateway1 = await AWS.EC2.EgressOnlyInternetGateway("egressOnlyGateway1", {
  VpcId: "vpc-abc12345", // Replace with your actual VPC ID
  adopt: false
});

const egressOnlyGateway2 = await AWS.EC2.EgressOnlyInternetGateway("egressOnlyGateway2", {
  VpcId: "vpc-def67890", // Replace with your actual VPC ID
  adopt: false
});
```

These examples provide a foundational understanding of how to utilize the `EgressOnlyInternetGateway` resource in AWS using Alchemy. Adjust the properties as needed to fit your specific infrastructure requirements.

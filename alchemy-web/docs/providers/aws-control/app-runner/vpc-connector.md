---
title: Managing AWS AppRunner VpcConnectors with Alchemy
description: Learn how to create, update, and manage AWS AppRunner VpcConnectors using Alchemy Cloud Control.
---

# VpcConnector

The VpcConnector resource allows you to connect your AWS AppRunner services to your Amazon Virtual Private Cloud (VPC) for enhanced security and access to private resources. For more details, refer to the [AWS AppRunner VpcConnectors documentation](https://docs.aws.amazon.com/apprunner/latest/userguide/).

## Minimal Example

This example demonstrates how to create a simple VpcConnector with essential properties such as subnets and security groups.

```ts
import AWS from "alchemy/aws/control";

const SimpleVpcConnector = await AWS.AppRunner.VpcConnector("SimpleVpcConnector", {
  Subnets: ["subnet-0123456789abcdef0", "subnet-0abcdef1234567890"], // Specify your subnet IDs
  SecurityGroups: ["sg-0123456789abcdef0"], // Specify your security group IDs
  VpcConnectorName: "MyVpcConnector", // Optional: Name for the VPC connector
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

This example illustrates how to configure a VpcConnector with additional options and multiple subnets for redundancy.

```ts
const AdvancedVpcConnector = await AWS.AppRunner.VpcConnector("AdvancedVpcConnector", {
  Subnets: ["subnet-0123456789abcdef0", "subnet-0abcdef1234567890", "subnet-0fedcba9876543210"], // Multiple subnets for high availability
  SecurityGroups: ["sg-0123456789abcdef0"], // Security group to control access
  VpcConnectorName: "AdvancedVpcConnector", // Optional name for the VPC connector
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Backend" }
  ],
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Specific Use Case: Enhanced Security

This example demonstrates how to configure a VpcConnector for a service that requires strict network security by utilizing specific subnets and security groups.

```ts
const SecureVpcConnector = await AWS.AppRunner.VpcConnector("SecureVpcConnector", {
  Subnets: ["subnet-0987654321abcdef0"], // Use a specific private subnet
  SecurityGroups: ["sg-0987654321abcdef0"], // Use a security group with strict rules
  VpcConnectorName: "SecureVpcConnector", // Optional name
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Compliance", Value: "HIPAA" }
  ]
});
```
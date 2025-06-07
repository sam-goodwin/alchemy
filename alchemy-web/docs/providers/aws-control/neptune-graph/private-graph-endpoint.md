---
title: Managing AWS NeptuneGraph PrivateGraphEndpoints with Alchemy
description: Learn how to create, update, and manage AWS NeptuneGraph PrivateGraphEndpoints using Alchemy Cloud Control.
---

# PrivateGraphEndpoint

The PrivateGraphEndpoint resource allows you to create and manage private endpoints for your AWS NeptuneGraph databases, enabling secure connections within your VPC. For more details, refer to the [AWS NeptuneGraph PrivateGraphEndpoints documentation](https://docs.aws.amazon.com/neptunegraph/latest/userguide/).

## Minimal Example

This example demonstrates how to create a minimal private graph endpoint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const MinimalPrivateGraphEndpoint = await AWS.NeptuneGraph.PrivateGraphEndpoint("MyPrivateGraphEndpoint", {
  VpcId: "vpc-123abc456def", // The ID of the VPC where the endpoint will be created
  GraphIdentifier: "my-neptune-graph", // The identifier for the Neptune graph
  SecurityGroupIds: ["sg-abc12345"], // Optional: Security group IDs to associate with the endpoint
  SubnetIds: ["subnet-abc12345", "subnet-def67890"] // Optional: Subnet IDs for the endpoint's network interface
});
```

## Advanced Configuration

In this example, we demonstrate how to configure a private graph endpoint with additional properties for enhanced security and network configuration.

```ts
const AdvancedPrivateGraphEndpoint = await AWS.NeptuneGraph.PrivateGraphEndpoint("AdvancedPrivateGraphEndpoint", {
  VpcId: "vpc-678xyz123uvw", // The ID of the VPC
  GraphIdentifier: "secure-neptune-graph", // The identifier for the Neptune graph
  SecurityGroupIds: ["sg-xyz98765"], // Security group IDs
  SubnetIds: ["subnet-xyz98765", "subnet-uvw12345"], // Subnet IDs
  adopt: true // Optional: Adopt existing resource instead of failing when resource already exists
});
```

## Use Case: Connecting to a Neptune Graph from an EC2 Instance

This example illustrates how to set up a private graph endpoint that allows an EC2 instance to connect securely to the Neptune graph.

```ts
import AWS from "alchemy/aws/control";

const MyGraphEndpoint = await AWS.NeptuneGraph.PrivateGraphEndpoint("GraphConnectionEndpoint", {
  VpcId: "vpc-abc123xyz456", // The VPC ID
  GraphIdentifier: "connected-neptune-graph", // The Neptune graph identifier
  SecurityGroupIds: ["sg-12345abcde"], // Security group for access control
  SubnetIds: ["subnet-123abc456def"] // Subnet for network interface
});

// Here, you would typically follow up by configuring the EC2 instance to use this endpoint.
```
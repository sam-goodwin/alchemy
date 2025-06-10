---
title: PrivateGraphEndpoint
description: Learn how to create, update, and manage AWS NeptuneGraph PrivateGraphEndpoints using Alchemy Cloud Control.
---


The PrivateGraphEndpoint resource allows you to manage private endpoints for AWS NeptuneGraph, enabling secure access to your graph databases. For more information, refer to the [AWS NeptuneGraph PrivateGraphEndpoints](https://docs.aws.amazon.com/neptunegraph/latest/userguide/) documentation.

## Minimal Example

Create a basic private graph endpoint with the required properties and one optional security group.

```ts
import AWS from "alchemy/aws/control";

const privateGraphEndpoint = await AWS.NeptuneGraph.PrivateGraphEndpoint("myPrivateGraphEndpoint", {
  VpcId: "vpc-0123456789abcdef0",
  GraphIdentifier: "myGraph",
  SecurityGroupIds: ["sg-0123456789abcdef0"]
});
```

## Advanced Configuration

Configure a private graph endpoint with additional optional settings like multiple security groups and subnet IDs.

```ts
const advancedPrivateGraphEndpoint = await AWS.NeptuneGraph.PrivateGraphEndpoint("advancedPrivateGraphEndpoint", {
  VpcId: "vpc-0123456789abcdef0",
  GraphIdentifier: "myGraph",
  SecurityGroupIds: [
    "sg-0123456789abcdef0",
    "sg-abcdef0123456789"
  ],
  SubnetIds: [
    "subnet-0123456789abcdef0",
    "subnet-abcdef0123456789"
  ]
});
```

## Resource Adoption

Create a private graph endpoint while adopting an existing resource if it already exists.

```ts
const adoptExistingPrivateGraphEndpoint = await AWS.NeptuneGraph.PrivateGraphEndpoint("adoptPrivateGraphEndpoint", {
  VpcId: "vpc-0123456789abcdef0",
  GraphIdentifier: "myGraph",
  adopt: true
});
```

## Using with Multiple Subnets

Set up a private graph endpoint using multiple subnets for high availability.

```ts
const multiSubnetPrivateGraphEndpoint = await AWS.NeptuneGraph.PrivateGraphEndpoint("multiSubnetPrivateGraphEndpoint", {
  VpcId: "vpc-0123456789abcdef0",
  GraphIdentifier: "myGraph",
  SubnetIds: [
    "subnet-0123456789abcdef0",
    "subnet-1234567890abcdef1"
  ]
});
```

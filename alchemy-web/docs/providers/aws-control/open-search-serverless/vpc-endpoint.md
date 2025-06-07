---
title: Managing AWS OpenSearchServerless VpcEndpoints with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchServerless VpcEndpoints using Alchemy Cloud Control.
---

# VpcEndpoint

The VpcEndpoint resource allows you to create and manage [AWS OpenSearchServerless VpcEndpoints](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/) to enable secure communication between your OpenSearch Serverless domain and your VPC.

## Minimal Example

This example demonstrates how to create a basic VpcEndpoint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicVpcEndpoint = await AWS.OpenSearchServerless.VpcEndpoint("BasicVpcEndpoint", {
  VpcId: "vpc-0abc1234def5678gh",
  SubnetIds: ["subnet-0abc1234def5678gh", "subnet-1abc1234def5678gh"],
  SecurityGroupIds: ["sg-0abc1234def5678gh"],
  Name: "BasicVpcEndpoint"
});
```

## Advanced Configuration

In this example, we configure a VpcEndpoint with additional properties, including a custom name and multiple security groups.

```ts
const advancedVpcEndpoint = await AWS.OpenSearchServerless.VpcEndpoint("AdvancedVpcEndpoint", {
  VpcId: "vpc-0abc1234def5678gh",
  SubnetIds: ["subnet-0abc1234def5678gh"],
  SecurityGroupIds: [
    "sg-0abc1234def5678gh",
    "sg-1abc1234def5678gh"
  ],
  Name: "AdvancedVpcEndpoint"
});
```

## Enhanced Network Security

This example shows how to create a VpcEndpoint with specific security group settings to enhance network security.

```ts
const secureVpcEndpoint = await AWS.OpenSearchServerless.VpcEndpoint("SecureVpcEndpoint", {
  VpcId: "vpc-0abc1234def5678gh",
  SubnetIds: ["subnet-0abc1234def5678gh"],
  SecurityGroupIds: [
    "sg-0abc1234def5678gh"
  ],
  Name: "SecureVpcEndpoint"
});
```

## Resource Adoption

In this example, we demonstrate how to adopt an existing VpcEndpoint resource instead of failing if it already exists.

```ts
const adoptVpcEndpoint = await AWS.OpenSearchServerless.VpcEndpoint("AdoptVpcEndpoint", {
  VpcId: "vpc-0abc1234def5678gh",
  SubnetIds: ["subnet-0abc1234def5678gh"],
  SecurityGroupIds: ["sg-0abc1234def5678gh"],
  Name: "AdoptVpcEndpoint",
  adopt: true
});
```
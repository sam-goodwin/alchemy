---
title: FlowVpcInterface
description: Learn how to create, update, and manage AWS MediaConnect FlowVpcInterfaces using Alchemy Cloud Control.
---


The FlowVpcInterface resource allows you to manage [AWS MediaConnect FlowVpcInterfaces](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) for your media workflows in a VPC.

## Minimal Example

Create a basic FlowVpcInterface with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const flowVpcInterface = await AWS.MediaConnect.FlowVpcInterface("basicFlowVpcInterface", {
  SubnetId: "subnet-0123456789abcdef0",
  FlowArn: "arn:aws:mediaconnect:us-east-1:123456789012:flow:example-flow",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  RoleArn: "arn:aws:iam::123456789012:role/example-role",
  Name: "BasicFlowVpcInterface"
});
```

## Advanced Configuration

Configure a FlowVpcInterface with additional properties to enable more advanced networking:

```ts
const advancedFlowVpcInterface = await AWS.MediaConnect.FlowVpcInterface("advancedFlowVpcInterface", {
  SubnetId: "subnet-0abcdef1234567890",
  FlowArn: "arn:aws:mediaconnect:us-west-2:123456789012:flow:advanced-flow",
  SecurityGroupIds: ["sg-0abcdef1234567890"],
  RoleArn: "arn:aws:iam::123456789012:role/advanced-role",
  Name: "AdvancedFlowVpcInterface",
  adopt: true // Adopts an existing resource if it already exists
});
```

## High Availability Configuration

Create a FlowVpcInterface that ensures high availability by using multiple security groups:

```ts
const highAvailabilityFlowVpcInterface = await AWS.MediaConnect.FlowVpcInterface("highAvailabilityFlowVpcInterface", {
  SubnetId: "subnet-0123456789abcdef1",
  FlowArn: "arn:aws:mediaconnect:eu-west-1:123456789012:flow:high-availability-flow",
  SecurityGroupIds: [
    "sg-0123456789abcdef1",
    "sg-0123456789abcdef2"
  ],
  RoleArn: "arn:aws:iam::123456789012:role/high-availability-role",
  Name: "HighAvailabilityFlowVpcInterface"
});
```

## Example with IAM Policy

Define a FlowVpcInterface where the role has specific permissions defined in an IAM policy:

```ts
const flowVpcInterfaceWithPolicy = await AWS.MediaConnect.FlowVpcInterface("flowVpcInterfaceWithPolicy", {
  SubnetId: "subnet-0abcdef1234567892",
  FlowArn: "arn:aws:mediaconnect:us-east-1:123456789012:flow:policy-flow",
  SecurityGroupIds: ["sg-0abcdef1234567893"],
  RoleArn: "arn:aws:iam::123456789012:role/policy-role",
  Name: "FlowVpcInterfaceWithPolicy",
  adopt: true
});

// Example IAM policy JSON
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: "mediaconnect:*",
      Resource: "*"
    }
  ]
};
```

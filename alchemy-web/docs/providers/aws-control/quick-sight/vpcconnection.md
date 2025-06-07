---
title: Managing AWS QuickSight VPCConnections with Alchemy
description: Learn how to create, update, and manage AWS QuickSight VPCConnections using Alchemy Cloud Control.
---

# VPCConnection

The VPCConnection resource allows you to create and manage [AWS QuickSight VPCConnections](https://docs.aws.amazon.com/quicksight/latest/userguide/) which enable QuickSight to securely access data sources in your Virtual Private Cloud (VPC).

## Minimal Example

Create a basic VPCConnection with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicVPCConnection = await AWS.QuickSight.VPCConnection("BasicVPCConnection", {
  AwsAccountId: "123456789012",
  VPCConnectionId: "myVPCConnection",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0"],
  RoleArn: "arn:aws:iam::123456789012:role/myQuickSightRole"
});
```

## Advanced Configuration

Configure a VPCConnection with additional properties like DNS resolvers and tags.

```ts
const advancedVPCConnection = await AWS.QuickSight.VPCConnection("AdvancedVPCConnection", {
  AwsAccountId: "123456789012",
  VPCConnectionId: "myAdvancedVPCConnection",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0"],
  RoleArn: "arn:aws:iam::123456789012:role/myQuickSightRole",
  DnsResolvers: ["192.0.2.1", "192.0.2.2"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataAnalytics" }
  ]
});
```

## Using Availability Status

Create a VPCConnection and check the availability status after creation.

```ts
const vpcConnectionWithStatus = await AWS.QuickSight.VPCConnection("StatusVPCConnection", {
  AwsAccountId: "123456789012",
  VPCConnectionId: "myStatusVPCConnection",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0"],
  RoleArn: "arn:aws:iam::123456789012:role/myQuickSightRole"
});

// Check the availability status
console.log(`VPC Connection Status: ${vpcConnectionWithStatus.AvailabilityStatus}`);
```

## Adopting Existing Resources

Adopt an existing VPCConnection instead of creating a new one if it already exists.

```ts
const adoptExistingVPCConnection = await AWS.QuickSight.VPCConnection("AdoptVPCConnection", {
  AwsAccountId: "123456789012",
  VPCConnectionId: "myExistingVPCConnection",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0"],
  RoleArn: "arn:aws:iam::123456789012:role/myQuickSightRole",
  adopt: true
});
```
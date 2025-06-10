---
title: VPCConnection
description: Learn how to create, update, and manage AWS QuickSight VPCConnections using Alchemy Cloud Control.
---


The VPCConnection resource allows you to manage [AWS QuickSight VPCConnections](https://docs.aws.amazon.com/quicksight/latest/userguide/) for securely connecting QuickSight to your VPC resources.

## Minimal Example

Create a basic VPCConnection with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const vpcConnection = await AWS.QuickSight.VPCConnection("myVpcConnection", {
  AwsAccountId: "123456789012",
  Name: "MyVPCConnection",
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  DnsResolvers: ["10.0.0.2"]
});
```

## Advanced Configuration

Configure a VPCConnection with additional properties for role ARN and tags.

```ts
const advancedVpcConnection = await AWS.QuickSight.VPCConnection("advancedVpcConnection", {
  AwsAccountId: "123456789012",
  Name: "AdvancedVPCConnection",
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  DnsResolvers: ["10.0.0.2"],
  RoleArn: "arn:aws:iam::123456789012:role/MyQuickSightRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Analytics" }
  ]
});
```

## Managing Availability Status

Create or update a VPCConnection while managing its availability status.

```ts
const vpcConnectionWithStatus = await AWS.QuickSight.VPCConnection("vpcConnectionWithStatus", {
  AwsAccountId: "123456789012",
  Name: "StatusManagedVPCConnection",
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  AvailabilityStatus: "AVAILABLE"
});
```

## Adopting Existing VPCConnection

Adopt an existing VPCConnection by setting the adopt property to true.

```ts
const adoptedVpcConnection = await AWS.QuickSight.VPCConnection("adoptedVpcConnection", {
  AwsAccountId: "123456789012",
  Name: "AdoptedVPCConnection",
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  DnsResolvers: ["10.0.0.2"],
  adopt: true
});
```

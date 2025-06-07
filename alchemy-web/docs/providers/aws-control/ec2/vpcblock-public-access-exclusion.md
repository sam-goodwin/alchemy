---
title: Managing AWS EC2 VPCBlockPublicAccessExclusions with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCBlockPublicAccessExclusions using Alchemy Cloud Control.
---

# VPCBlockPublicAccessExclusion

The VPCBlockPublicAccessExclusion resource allows you to manage public access exclusions for your Amazon EC2 VPCs. This resource helps ensure that specific internet gateway configurations can be excluded from the VPC's public access block settings. For more information, refer to the [AWS EC2 VPCBlockPublicAccessExclusions documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPCBlockPublicAccessExclusion with required properties and an optional VPC ID.

```ts
import AWS from "alchemy/aws/control";

const VPCExclusion = await AWS.EC2.VPCBlockPublicAccessExclusion("MyVPCExclusion", {
  InternetGatewayExclusionMode: "Exclude",
  VpcId: "vpc-12345678"
});
```

## Advanced Configuration

Configure a VPCBlockPublicAccessExclusion with additional options such as tags and subnet ID.

```ts
const AdvancedVPCExclusion = await AWS.EC2.VPCBlockPublicAccessExclusion("AdvancedVPCExclusion", {
  InternetGatewayExclusionMode: "Exclude",
  VpcId: "vpc-12345678",
  SubnetId: "subnet-87654321",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing resource instead of failing when the resource already exists, use the adopt property.

```ts
const AdoptExistingVPCExclusion = await AWS.EC2.VPCBlockPublicAccessExclusion("AdoptExistingVPCExclusion", {
  InternetGatewayExclusionMode: "Exclude",
  VpcId: "vpc-12345678",
  adopt: true
});
```
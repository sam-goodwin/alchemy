---
title: VPCBlockPublicAccessExclusion
description: Learn how to create, update, and manage AWS EC2 VPCBlockPublicAccessExclusions using Alchemy Cloud Control.
---


The VPCBlockPublicAccessExclusion resource allows you to manage the public access settings for your Amazon EC2 VPCs by excluding specific components such as internet gateways from public access blocking. For more details, refer to the [AWS EC2 VPCBlockPublicAccessExclusions documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic VPCBlockPublicAccessExclusion resource to exclude an internet gateway from public access blocking.

```ts
import AWS from "alchemy/aws/control";

const basicExclusion = await AWS.EC2.VPCBlockPublicAccessExclusion("basicExclusion", {
  InternetGatewayExclusionMode: "ExcludeGateway",
  VpcId: "vpc-123abc45", // Replace with your VPC ID
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Advanced Configuration

Configure a VPCBlockPublicAccessExclusion with a subnet ID for more granular control over public access settings.

```ts
const advancedExclusion = await AWS.EC2.VPCBlockPublicAccessExclusion("advancedExclusion", {
  InternetGatewayExclusionMode: "ExcludeGateway",
  VpcId: "vpc-678def90", // Replace with your VPC ID
  SubnetId: "subnet-abc12345", // Replace with your Subnet ID
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Excluding Multiple Resources

Create multiple exclusions for different internet gateways within the same VPC.

```ts
const exclusion1 = await AWS.EC2.VPCBlockPublicAccessExclusion("exclusion1", {
  InternetGatewayExclusionMode: "ExcludeGateway",
  VpcId: "vpc-abc12345", // Replace with your VPC ID
  Tags: [
    { Key: "Purpose", Value: "Web Server" }
  ]
});

const exclusion2 = await AWS.EC2.VPCBlockPublicAccessExclusion("exclusion2", {
  InternetGatewayExclusionMode: "ExcludeGateway",
  VpcId: "vpc-abc12345", // Same VPC ID
  Tags: [
    { Key: "Purpose", Value: "Load Balancer" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing VPCBlockPublicAccessExclusion without failing, you can set the `adopt` property to `true`.

```ts
const adoptExistingExclusion = await AWS.EC2.VPCBlockPublicAccessExclusion("adoptExistingExclusion", {
  InternetGatewayExclusionMode: "ExcludeGateway",
  VpcId: "vpc-abc12345", // Replace with your VPC ID
  adopt: true // Adopt existing resource if it exists
});
```

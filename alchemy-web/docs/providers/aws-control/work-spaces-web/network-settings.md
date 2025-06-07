---
title: Managing AWS WorkSpacesWeb NetworkSettingss with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb NetworkSettingss using Alchemy Cloud Control.
---

# NetworkSettings

The NetworkSettings resource allows you to manage network configurations for AWS WorkSpacesWeb, including VPC and security group settings. For more detailed information, refer to the [AWS WorkSpacesWeb NetworkSettings documentation](https://docs.aws.amazon.com/workspacesweb/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic NetworkSettings resource with required properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const BasicNetworkSettings = await AWS.WorkSpacesWeb.NetworkSettings("BasicNetworkSettings", {
  VpcId: "vpc-0123456789abcdef0",
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

In this example, we demonstrate how to create NetworkSettings with additional properties by using multiple security groups and subnets.

```ts
const AdvancedNetworkSettings = await AWS.WorkSpacesWeb.NetworkSettings("AdvancedNetworkSettings", {
  VpcId: "vpc-abcdef0123456789",
  SecurityGroupIds: [
    "sg-abcdef0123456789",
    "sg-1234567890abcdef"
  ],
  SubnetIds: [
    "subnet-abcdef0123456789",
    "subnet-1234567890abcdef"
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Adoption of Existing Resource

This example shows how to adopt an existing NetworkSettings resource instead of creating a new one if it already exists.

```ts
const ExistingNetworkSettings = await AWS.WorkSpacesWeb.NetworkSettings("ExistingNetworkSettings", {
  VpcId: "vpc-0987654321fedcba0",
  SecurityGroupIds: ["sg-0987654321fedcba0"],
  SubnetIds: ["subnet-0987654321fedcba0"],
  adopt: true // Indicates that we want to adopt the existing resource
});
```
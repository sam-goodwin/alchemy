---
title: NetworkSettings
description: Learn how to create, update, and manage AWS WorkSpacesWeb NetworkSettings using Alchemy Cloud Control.
---


The NetworkSettings resource allows you to manage the network settings for AWS WorkSpacesWeb, including the VPC, security groups, and subnets. For more details, visit the [AWS WorkSpacesWeb NetworkSettings documentation](https://docs.aws.amazon.com/workspacesweb/latest/userguide/).

## Minimal Example

Create a basic NetworkSettings resource with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicNetworkSettings = await AWS.WorkSpacesWeb.NetworkSettings("basicNetworkSettings", {
  VpcId: "vpc-12345678",
  SecurityGroupIds: ["sg-12345678"],
  SubnetIds: ["subnet-12345678", "subnet-87654321"],
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Advanced Configuration

Configure a NetworkSettings resource with multiple security groups and a set of tags for better management.

```ts
const advancedNetworkSettings = await AWS.WorkSpacesWeb.NetworkSettings("advancedNetworkSettings", {
  VpcId: "vpc-87654321",
  SecurityGroupIds: ["sg-87654321", "sg-12345678"],
  SubnetIds: ["subnet-11223344", "subnet-44332211"],
  Tags: [{
    Key: "Project",
    Value: "WorkSpacesWeb"
  }, {
    Key: "Owner",
    Value: "Team Alpha"
  }]
});
```

## Using Existing Resources

If you have existing network settings that you want to adopt rather than recreate, you can set the `adopt` property to true.

```ts
const adoptExistingNetworkSettings = await AWS.WorkSpacesWeb.NetworkSettings("adoptExistingNetworkSettings", {
  VpcId: "vpc-12345678",
  SecurityGroupIds: ["sg-12345678"],
  SubnetIds: ["subnet-12345678"],
  adopt: true
});
```

## Example with Multiple Subnets

Create a NetworkSettings resource that specifies multiple subnets for a more distributed architecture.

```ts
const distributedNetworkSettings = await AWS.WorkSpacesWeb.NetworkSettings("distributedNetworkSettings", {
  VpcId: "vpc-98765432",
  SecurityGroupIds: ["sg-98765432"],
  SubnetIds: ["subnet-11111111", "subnet-22222222", "subnet-33333333"],
  Tags: [{
    Key: "Type",
    Value: "Production"
  }]
});
```

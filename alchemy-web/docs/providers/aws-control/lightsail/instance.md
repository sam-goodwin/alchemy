---
title: Managing AWS Lightsail Instances with Alchemy
description: Learn how to create, update, and manage AWS Lightsail Instances using Alchemy Cloud Control.
---

# Instance

The Instance resource lets you create and manage [AWS Lightsail Instances](https://docs.aws.amazon.com/lightsail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lightsail-instance.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const instance = await AWS.Lightsail.Instance("instance-example", {
  InstanceName: "instance-instance",
  BundleId: "example-bundleid",
  BlueprintId: "example-blueprintid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a instance with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInstance = await AWS.Lightsail.Instance("advanced-instance", {
  InstanceName: "instance-instance",
  BundleId: "example-bundleid",
  BlueprintId: "example-blueprintid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


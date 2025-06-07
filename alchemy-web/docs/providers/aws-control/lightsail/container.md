---
title: Managing AWS Lightsail Containers with Alchemy
description: Learn how to create, update, and manage AWS Lightsail Containers using Alchemy Cloud Control.
---

# Container

The Container resource lets you create and manage [AWS Lightsail Containers](https://docs.aws.amazon.com/lightsail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lightsail-container.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const container = await AWS.Lightsail.Container("container-example", {
  ServiceName: "container-service",
  Scale: 1,
  Power: "example-power",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a container with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedContainer = await AWS.Lightsail.Container("advanced-container", {
  ServiceName: "container-service",
  Scale: 1,
  Power: "example-power",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```


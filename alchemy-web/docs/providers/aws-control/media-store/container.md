---
title: Managing AWS MediaStore Containers with Alchemy
description: Learn how to create, update, and manage AWS MediaStore Containers using Alchemy Cloud Control.
---

# Container

The Container resource lets you create and manage [AWS MediaStore Containers](https://docs.aws.amazon.com/mediastore/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediastore-container.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const container = await AWS.MediaStore.Container("container-example", {
  ContainerName: "container-container",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a container with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedContainer = await AWS.MediaStore.Container("advanced-container", {
  ContainerName: "container-container",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Policy: {
    Version: "2012-10-17",
    Statement: [{ Effect: "Allow", Action: ["s3:GetObject"], Resource: "*" }],
  },
});
```


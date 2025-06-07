---
title: Managing AWS Pipes Pipes with Alchemy
description: Learn how to create, update, and manage AWS Pipes Pipes using Alchemy Cloud Control.
---

# Pipe

The Pipe resource lets you create and manage [AWS Pipes Pipes](https://docs.aws.amazon.com/pipes/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pipes-pipe.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const pipe = await AWS.Pipes.Pipe("pipe-example", {
  RoleArn: "example-rolearn",
  Source: "example-source",
  Target: "example-target",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A pipe resource managed by Alchemy",
});
```

## Advanced Configuration

Create a pipe with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPipe = await AWS.Pipes.Pipe("advanced-pipe", {
  RoleArn: "example-rolearn",
  Source: "example-source",
  Target: "example-target",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A pipe resource managed by Alchemy",
});
```


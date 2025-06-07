---
title: Managing AWS Lambda EventSourceMappings with Alchemy
description: Learn how to create, update, and manage AWS Lambda EventSourceMappings using Alchemy Cloud Control.
---

# EventSourceMapping

The EventSourceMapping resource lets you create and manage [AWS Lambda EventSourceMappings](https://docs.aws.amazon.com/lambda/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-eventsourcemapping.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventsourcemapping = await AWS.Lambda.EventSourceMapping("eventsourcemapping-example", {
  FunctionName: "eventsourcemapping-function",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a eventsourcemapping with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEventSourceMapping = await AWS.Lambda.EventSourceMapping(
  "advanced-eventsourcemapping",
  {
    FunctionName: "eventsourcemapping-function",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```


---
title: Managing AWS Bedrock Flows with Alchemy
description: Learn how to create, update, and manage AWS Bedrock Flows using Alchemy Cloud Control.
---

# Flow

The Flow resource lets you create and manage [AWS Bedrock Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-flow.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flow = await AWS.Bedrock.Flow("flow-example", {
  ExecutionRoleArn: "example-executionrolearn",
  Name: "flow-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A flow resource managed by Alchemy",
});
```

## Advanced Configuration

Create a flow with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFlow = await AWS.Bedrock.Flow("advanced-flow", {
  ExecutionRoleArn: "example-executionrolearn",
  Name: "flow-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A flow resource managed by Alchemy",
});
```


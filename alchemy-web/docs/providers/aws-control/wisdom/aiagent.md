---
title: Managing AWS Wisdom AIAgents with Alchemy
description: Learn how to create, update, and manage AWS Wisdom AIAgents using Alchemy Cloud Control.
---

# AIAgent

The AIAgent resource lets you create and manage [AWS Wisdom AIAgents](https://docs.aws.amazon.com/wisdom/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wisdom-aiagent.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const aiagent = await AWS.Wisdom.AIAgent("aiagent-example", {
  Type: "example-type",
  Configuration: "example-configuration",
  AssistantId: "example-assistantid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A aiagent resource managed by Alchemy",
});
```

## Advanced Configuration

Create a aiagent with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAIAgent = await AWS.Wisdom.AIAgent("advanced-aiagent", {
  Type: "example-type",
  Configuration: "example-configuration",
  AssistantId: "example-assistantid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A aiagent resource managed by Alchemy",
});
```


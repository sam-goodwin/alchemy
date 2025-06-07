---
title: Managing AWS Bedrock Agents with Alchemy
description: Learn how to create, update, and manage AWS Bedrock Agents using Alchemy Cloud Control.
---

# Agent

The Agent resource lets you create and manage [AWS Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-agent.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const agent = await AWS.Bedrock.Agent("agent-example", {
  AgentName: "agent-agent",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A agent resource managed by Alchemy",
});
```

## Advanced Configuration

Create a agent with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAgent = await AWS.Bedrock.Agent("advanced-agent", {
  AgentName: "agent-agent",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A agent resource managed by Alchemy",
});
```


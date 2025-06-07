---
title: Managing AWS Bedrock AgentAliass with Alchemy
description: Learn how to create, update, and manage AWS Bedrock AgentAliass using Alchemy Cloud Control.
---

# AgentAlias

The AgentAlias resource lets you create and manage [AWS Bedrock AgentAliass](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-agentalias.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const agentalias = await AWS.Bedrock.AgentAlias("agentalias-example", {
  AgentAliasName: "agentalias-agentalias",
  AgentId: "example-agentid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A agentalias resource managed by Alchemy",
});
```

## Advanced Configuration

Create a agentalias with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAgentAlias = await AWS.Bedrock.AgentAlias("advanced-agentalias", {
  AgentAliasName: "agentalias-agentalias",
  AgentId: "example-agentid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A agentalias resource managed by Alchemy",
});
```


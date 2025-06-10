---
title: AgentAlias
description: Learn how to create, update, and manage AWS Bedrock AgentAliases using Alchemy Cloud Control.
---


The AgentAlias resource lets you manage [AWS Bedrock AgentAliases](https://docs.aws.amazon.com/bedrock/latest/userguide/) and their configurations for routing requests to different agents.

## Minimal Example

Create a basic AgentAlias with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicAgentAlias = await AWS.Bedrock.AgentAlias("basic-agent-alias", {
  AgentAliasName: "BasicAgent",
  AgentId: "agent-1234567890",
  Description: "A basic agent alias for routing requests."
});
```

## Advanced Configuration

Configure an AgentAlias with a routing configuration and tags for better management.

```ts
const advancedAgentAlias = await AWS.Bedrock.AgentAlias("advanced-agent-alias", {
  AgentAliasName: "AdvancedAgent",
  AgentId: "agent-0987654321",
  Description: "An advanced agent alias with routing configuration.",
  RoutingConfiguration: [
    {
      Route: "route1",
      Weight: 70
    },
    {
      Route: "route2",
      Weight: 30
    }
  ],
  Tags: {
    Environment: "Production",
    Team: "AI"
  }
});
```

## Adoption of Existing Resource

Create an AgentAlias that will adopt an existing resource if it already exists.

```ts
const adoptAgentAlias = await AWS.Bedrock.AgentAlias("adopt-agent-alias", {
  AgentAliasName: "AdoptedAgent",
  AgentId: "agent-1122334455",
  adopt: true // Adopts the existing resource instead of failing
});
```

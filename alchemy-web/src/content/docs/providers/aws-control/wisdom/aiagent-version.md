---
title: AIAgentVersion
description: Learn how to create, update, and manage AWS Wisdom AIAgentVersions using Alchemy Cloud Control.
---


The AIAgentVersion resource allows you to create and manage versions of AI Agents within AWS Wisdom. This resource is essential for maintaining the configuration and deployment of your AI agents. For more information, consult the [AWS Wisdom AIAgentVersions documentation](https://docs.aws.amazon.com/wisdom/latest/userguide/).

## Minimal Example

Create a basic AIAgentVersion with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicAIAgentVersion = await AWS.Wisdom.AIAgentVersion("basicAgentVersion", {
  AssistantId: "assistant-123456",
  AIAgentId: "agent-987654",
  ModifiedTimeSeconds: Date.now() / 1000 // current time in seconds
});
```

## Advanced Configuration

Update the AIAgentVersion with additional properties, such as the adoption of existing resources:

```ts
const advancedAIAgentVersion = await AWS.Wisdom.AIAgentVersion("advancedAgentVersion", {
  AssistantId: "assistant-123456",
  AIAgentId: "agent-987654",
  ModifiedTimeSeconds: Date.now() / 1000,
  adopt: true // adopt existing resource if it exists
});
```

## Version Management

Create multiple versions of the same AI Agent for managing updates efficiently:

```ts
const version1 = await AWS.Wisdom.AIAgentVersion("agentVersion1", {
  AssistantId: "assistant-123456",
  AIAgentId: "agent-987654",
  ModifiedTimeSeconds: Date.now() / 1000
});

const version2 = await AWS.Wisdom.AIAgentVersion("agentVersion2", {
  AssistantId: "assistant-123456",
  AIAgentId: "agent-987654",
  ModifiedTimeSeconds: Date.now() / 1000 + 3600 // one hour later
});
```

## Handling Updates and Changes

When making changes to the AIAgentVersion, you can specify the modified time to reflect updates accurately:

```ts
const updatedAIAgentVersion = await AWS.Wisdom.AIAgentVersion("updatedAgentVersion", {
  AssistantId: "assistant-123456",
  AIAgentId: "agent-987654",
  ModifiedTimeSeconds: Date.now() / 1000 + 7200, // two hours later to indicate a new update
  adopt: false // will fail if the resource already exists
});
```

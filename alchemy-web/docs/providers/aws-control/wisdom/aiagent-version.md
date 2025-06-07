---
title: Managing AWS Wisdom AIAgentVersions with Alchemy
description: Learn how to create, update, and manage AWS Wisdom AIAgentVersions using Alchemy Cloud Control.
---

# AIAgentVersion

The AIAgentVersion resource allows you to create and manage versions of AI agents in AWS Wisdom, enabling enhanced support capabilities. For more details, refer to the [AWS Wisdom AIAgentVersions documentation](https://docs.aws.amazon.com/wisdom/latest/userguide/).

## Minimal Example

Create a basic AI agent version with required properties.

```ts
import AWS from "alchemy/aws/control";

const AIAgentVersion = await AWS.Wisdom.AIAgentVersion("BasicAIAgentVersion", {
  AssistantId: "assistant-123456",
  AIAgentId: "ai-agent-789012",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000) // Current Unix time
});
```

## Advanced Configuration

Configure an AI agent version with optional properties including adoption of existing resources.

```ts
const AdvancedAIAgentVersion = await AWS.Wisdom.AIAgentVersion("AdvancedAIAgentVersion", {
  AssistantId: "assistant-654321",
  AIAgentId: "ai-agent-210987",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000),
  adopt: true // Adopt existing resource instead of failing
});
```

## Versioning and Updates

Create a new version of an existing AI agent with updated properties.

```ts
const UpdatedAIAgentVersion = await AWS.Wisdom.AIAgentVersion("UpdatedAIAgentVersion", {
  AssistantId: "assistant-123456",
  AIAgentId: "ai-agent-789012",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000), // Updated timestamp
  adopt: false // Default behavior, will fail if resource exists
});
```

## Resource Metadata

Create an AI agent version while also capturing metadata properties like creation and update times.

```ts
const MetadataAIAgentVersion = await AWS.Wisdom.AIAgentVersion("MetadataAIAgentVersion", {
  AssistantId: "assistant-111111",
  AIAgentId: "ai-agent-222222",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000),
  adopt: true // Adopt existing resource
});

// Accessing additional properties
console.log(`ARN: ${MetadataAIAgentVersion.Arn}`);
console.log(`Creation Time: ${MetadataAIAgentVersion.CreationTime}`);
console.log(`Last Updated Time: ${MetadataAIAgentVersion.LastUpdateTime}`);
```
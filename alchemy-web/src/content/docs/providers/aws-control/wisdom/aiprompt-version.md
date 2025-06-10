---
title: AIPromptVersion
description: Learn how to create, update, and manage AWS Wisdom AIPromptVersions using Alchemy Cloud Control.
---


The AIPromptVersion resource allows you to manage versions of AI prompts within AWS Wisdom. This resource enables you to create, update, and configure AI prompt versions for enhanced customer support and knowledge management. For more information, visit the [AWS Wisdom AIPromptVersions](https://docs.aws.amazon.com/wisdom/latest/userguide/) documentation.

## Minimal Example

Create a basic AI prompt version with required properties:

```ts
import AWS from "alchemy/aws/control";

const aiPromptVersion = await AWS.Wisdom.AIPromptVersion("basicPromptVersion", {
  AssistantId: "assistant-123456",
  AIPromptId: "prompt-987654",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000) // Current time in seconds
});
```

## Advanced Configuration

Configure an AI prompt version with the option to adopt an existing resource:

```ts
const advancedPromptVersion = await AWS.Wisdom.AIPromptVersion("advancedPromptVersion", {
  AssistantId: "assistant-123456",
  AIPromptId: "prompt-987654",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000),
  adopt: true // Adoption of an existing resource
});
```

## Using Modified Time

Create an AI prompt version where you specify the modified time explicitly to reflect updates:

```ts
const updatedPromptVersion = await AWS.Wisdom.AIPromptVersion("updatedPromptVersion", {
  AssistantId: "assistant-654321",
  AIPromptId: "prompt-123456",
  ModifiedTimeSeconds: 1691234567 // Specific timestamp for modified time
});
```

## Resource Management

Demonstrate creating a new AI prompt version while managing resources effectively:

```ts
const resourceManagedPromptVersion = await AWS.Wisdom.AIPromptVersion("managedPromptVersion", {
  AssistantId: "assistant-789012",
  AIPromptId: "prompt-345678",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000),
  adopt: false // Default behavior
});
```

---
title: Managing AWS Wisdom AIPromptVersions with Alchemy
description: Learn how to create, update, and manage AWS Wisdom AIPromptVersions using Alchemy Cloud Control.
---

# AIPromptVersion

The AIPromptVersion resource allows you to manage versions of AI prompts within AWS Wisdom. This resource enables you to create, update, and retrieve AI prompt versions associated with specific assistants. For more details, refer to the [AWS Wisdom AIPromptVersions documentation](https://docs.aws.amazon.com/wisdom/latest/userguide/).

## Minimal Example

Create a basic AIPromptVersion with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicAIPromptVersion = await AWS.Wisdom.AIPromptVersion("basicAIPromptVersion", {
  AssistantId: "assistant-12345",
  AIPromptId: "prompt-67890",
  ModifiedTimeSeconds: Date.now() / 1000 // Current time in seconds
});
```

## Advanced Configuration

Configure an AIPromptVersion with optional properties, including adopting an existing resource.

```ts
const advancedAIPromptVersion = await AWS.Wisdom.AIPromptVersion("advancedAIPromptVersion", {
  AssistantId: "assistant-12345",
  AIPromptId: "prompt-67890",
  ModifiedTimeSeconds: Date.now() / 1000, // Current time in seconds
  adopt: true // Adoption of existing resource
});
```

## Example with Resource Metadata

Create an AIPromptVersion and log its metadata including ARN and creation time.

```ts
const metadataAIPromptVersion = await AWS.Wisdom.AIPromptVersion("metadataAIPromptVersion", {
  AssistantId: "assistant-12345",
  AIPromptId: "prompt-67890"
});

console.log(`AIPromptVersion ARN: ${metadataAIPromptVersion.Arn}`);
console.log(`Created at: ${metadataAIPromptVersion.CreationTime}`);
```
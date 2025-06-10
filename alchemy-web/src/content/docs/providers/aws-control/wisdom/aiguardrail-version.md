---
title: AIGuardrailVersion
description: Learn how to create, update, and manage AWS Wisdom AIGuardrailVersions using Alchemy Cloud Control.
---


The AIGuardrailVersion resource allows you to manage versions of AI guardrails within the AWS Wisdom service. For more information, visit the [AWS Wisdom AIGuardrailVersions](https://docs.aws.amazon.com/wisdom/latest/userguide/).

## Minimal Example

Create a basic AIGuardrailVersion with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const aiGuardrailVersion = await AWS.Wisdom.AIGuardrailVersion("basicGuardrailVersion", {
  AIGuardrailId: "my-guardrail-id",
  AssistantId: "my-assistant-id",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000) // Current timestamp in seconds
});
```

## Advanced Configuration

Configure an AIGuardrailVersion with additional options, including the adoption of an existing resource.

```ts
const advancedGuardrailVersion = await AWS.Wisdom.AIGuardrailVersion("advancedGuardrailVersion", {
  AIGuardrailId: "my-advanced-guardrail-id",
  AssistantId: "my-advanced-assistant-id",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000), // Current timestamp
  adopt: true // Adopt existing resource instead of failing
});
```

## Updating an Existing Version

Here’s how to create a new version of an existing guardrail.

```ts
const updatedGuardrailVersion = await AWS.Wisdom.AIGuardrailVersion("updatedGuardrailVersion", {
  AIGuardrailId: "existing-guardrail-id",
  AssistantId: "existing-assistant-id",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000), // Update timestamp
  adopt: false // Fails if resource already exists
});
```

## Creating Multiple Versions

Demonstrating the creation of multiple versions for the same guardrail.

```ts
const versionOne = await AWS.Wisdom.AIGuardrailVersion("firstGuardrailVersion", {
  AIGuardrailId: "multi-version-guardrail-id",
  AssistantId: "multi-version-assistant-id",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000) // Version 1 timestamp
});

const versionTwo = await AWS.Wisdom.AIGuardrailVersion("secondGuardrailVersion", {
  AIGuardrailId: "multi-version-guardrail-id",
  AssistantId: "multi-version-assistant-id",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000) + 60 // Version 2 timestamp, 60 seconds later
});
```

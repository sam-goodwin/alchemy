---
title: Managing AWS Wisdom AIGuardrailVersions with Alchemy
description: Learn how to create, update, and manage AWS Wisdom AIGuardrailVersions using Alchemy Cloud Control.
---

# AIGuardrailVersion

The AIGuardrailVersion resource allows you to manage versions of AI guardrails in AWS Wisdom, enabling you to configure and refine AI-assisted workflows. For more details, refer to the [AWS Wisdom AIGuardrailVersions](https://docs.aws.amazon.com/wisdom/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic AIGuardrailVersion resource using required properties.

```ts
import AWS from "alchemy/aws/control";

const basicGuardrailVersion = await AWS.Wisdom.AIGuardrailVersion("BasicGuardrailVersion", {
  AIGuardrailId: "guardrail-12345",
  AssistantId: "assistant-67890",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000) // Current time in seconds
});
```

## Advanced Configuration

In this example, we configure an AIGuardrailVersion with an existing resource adoption strategy.

```ts
const advancedGuardrailVersion = await AWS.Wisdom.AIGuardrailVersion("AdvancedGuardrailVersion", {
  AIGuardrailId: "guardrail-54321",
  AssistantId: "assistant-09876",
  ModifiedTimeSeconds: Math.floor(Date.now() / 1000),
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Creation Time

This example illustrates creating an AIGuardrailVersion and displaying its creation time.

```ts
const guardrailVersionWithCreationTime = await AWS.Wisdom.AIGuardrailVersion("GuardrailVersionWithCreationTime", {
  AIGuardrailId: "guardrail-11223",
  AssistantId: "assistant-44556"
});

console.log("Creation Time:", guardrailVersionWithCreationTime.CreationTime);
```

## Example with Last Update Time

Here we demonstrate how to access the last update time of the AIGuardrailVersion resource.

```ts
const guardrailVersionWithLastUpdateTime = await AWS.Wisdom.AIGuardrailVersion("GuardrailVersionWithLastUpdateTime", {
  AIGuardrailId: "guardrail-77889",
  AssistantId: "assistant-99000"
});

console.log("Last Update Time:", guardrailVersionWithLastUpdateTime.LastUpdateTime);
```
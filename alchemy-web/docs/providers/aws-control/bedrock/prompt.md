---
title: Managing AWS Bedrock Prompts with Alchemy
description: Learn how to create, update, and manage AWS Bedrock Prompts using Alchemy Cloud Control.
---

# Prompt

The Prompt resource lets you create and manage [AWS Bedrock Prompts](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-prompt.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const prompt = await AWS.Bedrock.Prompt("prompt-example", {
  Name: "prompt-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A prompt resource managed by Alchemy",
});
```

## Advanced Configuration

Create a prompt with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPrompt = await AWS.Bedrock.Prompt("advanced-prompt", {
  Name: "prompt-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A prompt resource managed by Alchemy",
});
```


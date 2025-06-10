---
title: Prompt
description: Learn how to create, update, and manage AWS Bedrock Prompts using Alchemy Cloud Control.
---


The Prompt resource allows you to create and manage [AWS Bedrock Prompts](https://docs.aws.amazon.com/bedrock/latest/userguide/) for generating and customizing prompts in AI applications.

## Minimal Example

Create a basic prompt with a name and a default variant.

```ts
import AWS from "alchemy/aws/control";

const simplePrompt = await AWS.Bedrock.Prompt("simple-prompt", {
  name: "Simple Prompt",
  defaultVariant: "basic-variant",
  description: "A simple prompt for testing purposes."
});
```

## Advanced Configuration

Configure a prompt with multiple variants and customer encryption key.

```ts
const advancedPrompt = await AWS.Bedrock.Prompt("advanced-prompt", {
  name: "Advanced Prompt",
  defaultVariant: "detailed-variant",
  description: "An advanced prompt with multiple variants.",
  variants: [
    {
      name: "basic-variant",
      data: {
        promptText: "What is the capital of France?"
      }
    },
    {
      name: "detailed-variant",
      data: {
        promptText: "Provide a detailed explanation of the capital of France."
      }
    }
  ],
  customerEncryptionKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
});
```

## Using Tags

Create a prompt with metadata tags for better organization.

```ts
const taggedPrompt = await AWS.Bedrock.Prompt("tagged-prompt", {
  name: "Tagged Prompt",
  defaultVariant: "tagged-variant",
  description: "A prompt with tagging for better management.",
  tags: {
    environment: "production",
    project: "AI Research"
  }
});
```

## Adopting Existing Resources

Adopt an existing prompt if it already exists instead of failing.

```ts
const adoptedPrompt = await AWS.Bedrock.Prompt("existing-prompt", {
  name: "Existing Prompt",
  defaultVariant: "existing-variant",
  description: "This prompt adopts an existing resource.",
  adopt: true
});
```

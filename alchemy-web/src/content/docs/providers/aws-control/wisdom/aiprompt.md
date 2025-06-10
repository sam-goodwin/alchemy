---
title: AIPrompt
description: Learn how to create, update, and manage AWS Wisdom AIPrompts using Alchemy Cloud Control.
---


The AIPrompt resource lets you create and manage [AWS Wisdom AIPrompts](https://docs.aws.amazon.com/wisdom/latest/userguide/). This resource enables applications to utilize AI-generated prompts that assist users in gaining insights and providing better responses.

## Minimal Example

Create a basic AIPrompt with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicAIPrompt = await AWS.Wisdom.AIPrompt("basicPrompt", {
  Type: "Default",
  ApiFormat: "text",
  TemplateConfiguration: {
    // Basic template configuration
    type: "simple",
    content: "What can I help you with today?"
  },
  TemplateType: "Standard",
  ModelId: "gpt-3.5-turbo",
  Name: "Basic AIPrompt"
});
```

## Advanced Configuration

Configure an AIPrompt with advanced settings, including a description and tags for better organization.

```ts
const advancedAIPrompt = await AWS.Wisdom.AIPrompt("advancedPrompt", {
  Type: "Custom",
  Description: "An advanced AIPrompt for customer support",
  ApiFormat: "json",
  AssistantId: "assistant-1234",
  TemplateConfiguration: {
    type: "complex",
    content: "How can I assist you with your account today?"
  },
  TemplateType: "Custom",
  ModelId: "gpt-4",
  Tags: {
    project: "customerSupport",
    environment: "production"
  },
  Name: "Advanced AIPrompt"
});
```

## Adoption of Existing Resource

If you want to adopt an existing AIPrompt instead of failing when a resource already exists, you can set the `adopt` property.

```ts
const adoptExistingAIPrompt = await AWS.Wisdom.AIPrompt("adoptPrompt", {
  Type: "Default",
  ApiFormat: "text",
  TemplateConfiguration: {
    type: "simple",
    content: "Can I help you with anything else?"
  },
  TemplateType: "Standard",
  ModelId: "gpt-3.5-turbo",
  adopt: true // Adopt existing resource if it already exists
});
```

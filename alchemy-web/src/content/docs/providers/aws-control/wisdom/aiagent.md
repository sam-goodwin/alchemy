---
title: AIAgent
description: Learn how to create, update, and manage AWS Wisdom AIAgents using Alchemy Cloud Control.
---


The AIAgent resource allows you to manage [AWS Wisdom AIAgents](https://docs.aws.amazon.com/wisdom/latest/userguide/) which are designed to assist in providing intelligent recommendations and insights based on the data available in your AWS environment.

## Minimal Example

Create a basic AIAgent with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicAIAgent = await AWS.Wisdom.AIAgent("basicAIAgent", {
  Type: "support",
  Description: "Basic AIAgent for customer support",
  Configuration: {
    // Example configuration details
    language: "en",
    model: "customer-support-v1"
  },
  AssistantId: "customerSupportAssistant"
});
```

## Advanced Configuration

Configure an AIAgent with additional options such as tags and a custom name.

```ts
const advancedAIAgent = await AWS.Wisdom.AIAgent("advancedAIAgent", {
  Type: "support",
  Description: "Advanced AIAgent with custom settings",
  Configuration: {
    language: "en",
    model: "customer-support-advanced-v1",
    features: {
      contextAware: true,
      proactiveSuggestions: true
    }
  },
  AssistantId: "customerSupportAssistant",
  Tags: {
    project: "customer-support",
    environment: "production"
  },
  Name: "AdvancedCustomerSupportAgent"
});
```

## Using Existing Resources

Create an AIAgent that adopts an existing resource if it already exists.

```ts
const adoptExistingAIAgent = await AWS.Wisdom.AIAgent("existingAIAgent", {
  Type: "support",
  Configuration: {
    language: "en",
    model: "customer-support-adopted-v1"
  },
  AssistantId: "customerSupportAssistant",
  adopt: true // Adopt the existing resource if it exists
});
```

## Custom Configuration for Different Use Cases

Set up a specialized AIAgent for technical support with specific configurations.

```ts
const techSupportAIAgent = await AWS.Wisdom.AIAgent("techSupportAIAgent", {
  Type: "technicalSupport",
  Description: "AIAgent tailored for technical support queries",
  Configuration: {
    language: "en",
    model: "technical-support-v1",
    features: {
      contextAware: true,
      knowledgeBaseIntegration: true
    }
  },
  AssistantId: "techSupportAssistant",
  Tags: {
    useCase: "technical-support",
    priority: "high"
  }
});
```

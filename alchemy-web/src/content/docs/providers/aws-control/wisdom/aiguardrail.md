---
title: AIGuardrail
description: Learn how to create, update, and manage AWS Wisdom AIGuardrails using Alchemy Cloud Control.
---


The AIGuardrail resource allows you to manage [AWS Wisdom AIGuardrails](https://docs.aws.amazon.com/wisdom/latest/userguide/) to ensure that the AI models operate within defined constraints and guidelines.

## Minimal Example

Create a basic AIGuardrail resource with essential properties.

```ts
import AWS from "alchemy/aws/control";

const aiGuardrail = await AWS.Wisdom.AIGuardrail("basicGuardrail", {
  AssistantId: "assistant-12345",
  BlockedInputMessaging: "Input messages containing sensitive information are blocked.",
  BlockedOutputsMessaging: "Output messages containing sensitive information are blocked."
});
```

## Advanced Configuration

Configure an AIGuardrail with policy settings for enhanced control over AI interactions.

```ts
const advancedGuardrail = await AWS.Wisdom.AIGuardrail("advancedGuardrail", {
  AssistantId: "assistant-12345",
  BlockedInputMessaging: "Input messages that violate policies are blocked.",
  BlockedOutputsMessaging: "Output messages that violate policies are blocked.",
  TopicPolicyConfig: {
    TopicArn: "arn:aws:sns:us-west-2:123456789012:my-topic",
    Policy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: "*",
          Action: "SNS:Publish",
          Resource: "arn:aws:sns:us-west-2:123456789012:my-topic"
        }
      ]
    })
  },
  WordPolicyConfig: {
    BlockedWords: ["badword1", "badword2"],
    Policy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Deny",
          Action: "wisdom:ListAssistants",
          Resource: "*"
        }
      ]
    })
  }
});
```

## Custom Messaging Configuration

Create an AIGuardrail with custom contextual grounding policy configurations.

```ts
const customMessagingGuardrail = await AWS.Wisdom.AIGuardrail("customMessagingGuardrail", {
  AssistantId: "assistant-12345",
  BlockedInputMessaging: "All messages that contain prohibited content will be blocked.",
  BlockedOutputsMessaging: "Any outputs that may mislead users will be blocked.",
  ContextualGroundingPolicyConfig: {
    ContextualGrounding: "Ensure user queries are grounded in relevant context.",
    GroundingPolicy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "wisdom:GetAssistant",
          Resource: "arn:aws:wisdome:us-west-2:123456789012:assistant/assistant-12345"
        }
      ]
    })
  }
});
``` 

## Tags and Descriptions

Set additional metadata for your AIGuardrail using tags and descriptions.

```ts
const taggedGuardrail = await AWS.Wisdom.AIGuardrail("taggedGuardrail", {
  AssistantId: "assistant-12345",
  BlockedInputMessaging: "Blocked due to policy violations.",
  BlockedOutputsMessaging: "Responses blocked to prevent misinformation.",
  Description: "Guardrail to ensure compliance with company policies.",
  Tags: {
    Environment: "Production",
    Owner: "team@example.com"
  }
});
```

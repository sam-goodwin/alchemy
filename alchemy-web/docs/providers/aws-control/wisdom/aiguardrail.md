---
title: Managing AWS Wisdom AIGuardrails with Alchemy
description: Learn how to create, update, and manage AWS Wisdom AIGuardrails using Alchemy Cloud Control.
---

# AIGuardrail

The AIGuardrail resource lets you create and manage [AWS Wisdom AIGuardrails](https://docs.aws.amazon.com/wisdom/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wisdom-aiguardrail.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const aiguardrail = await AWS.Wisdom.AIGuardrail("aiguardrail-example", {
  BlockedInputMessaging: "example-blockedinputmessaging",
  AssistantId: "example-assistantid",
  BlockedOutputsMessaging: "example-blockedoutputsmessaging",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A aiguardrail resource managed by Alchemy",
});
```

## Advanced Configuration

Create a aiguardrail with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAIGuardrail = await AWS.Wisdom.AIGuardrail("advanced-aiguardrail", {
  BlockedInputMessaging: "example-blockedinputmessaging",
  AssistantId: "example-assistantid",
  BlockedOutputsMessaging: "example-blockedoutputsmessaging",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A aiguardrail resource managed by Alchemy",
});
```


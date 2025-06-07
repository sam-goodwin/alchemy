---
title: Managing AWS Bedrock Guardrails with Alchemy
description: Learn how to create, update, and manage AWS Bedrock Guardrails using Alchemy Cloud Control.
---

# Guardrail

The Guardrail resource lets you create and manage [AWS Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-guardrail.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const guardrail = await AWS.Bedrock.Guardrail("guardrail-example", {
  BlockedInputMessaging: "example-blockedinputmessaging",
  BlockedOutputsMessaging: "example-blockedoutputsmessaging",
  Name: "guardrail-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A guardrail resource managed by Alchemy",
});
```

## Advanced Configuration

Create a guardrail with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGuardrail = await AWS.Bedrock.Guardrail("advanced-guardrail", {
  BlockedInputMessaging: "example-blockedinputmessaging",
  BlockedOutputsMessaging: "example-blockedoutputsmessaging",
  Name: "guardrail-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A guardrail resource managed by Alchemy",
});
```


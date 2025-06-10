---
title: Guardrail
description: Learn how to create, update, and manage AWS Bedrock Guardrails using Alchemy Cloud Control.
---


The Guardrail resource allows you to manage [AWS Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/) that help in enforcing compliance and security policies for your machine learning models.

## Minimal Example

Create a basic Guardrail with required properties and a couple of common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicGuardrail = await AWS.Bedrock.Guardrail("basicGuardrail", {
  name: "BasicGuardrail",
  blockedInputMessaging: "Input is not allowed.",
  blockedOutputsMessaging: "Output is restricted.",
  description: "A basic guardrail for model compliance.",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a Guardrail with additional security and policy settings.

```ts
const advancedGuardrail = await AWS.Bedrock.Guardrail("advancedGuardrail", {
  name: "AdvancedGuardrail",
  blockedInputMessaging: "Input is not allowed.",
  blockedOutputsMessaging: "Output is restricted.",
  Description: "An advanced guardrail with policies.",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  ContextualGroundingPolicyConfig: {
    // Example of a contextual grounding policy
    Policy: JSON.stringify({
      Statement: [
        {
          Effect: "Deny",
          Action: "bedrock:ModelInvoke",
          Resource: "*",
          Condition: {
            StringEquals: {
              "bedrock:InputType": "sensitive"
            }
          }
        }
      ]
    })
  },
  SensitiveInformationPolicyConfig: {
    // Example of sensitive information policy
    Policy: JSON.stringify({
      Statement: [
        {
          Effect: "Deny",
          Action: "bedrock:ModelInvoke",
          Resource: "*",
          Condition: {
            StringEquals: {
              "bedrock:InputType": "sensitive_data"
            }
          }
        }
      ]
    })
  },
  Tags: [
    { Key: "Department", Value: "Data Science" }
  ]
});
```

## Specific Use Case: Content Filtering

Create a Guardrail specifically for content filtering scenarios.

```ts
const contentFilteringGuardrail = await AWS.Bedrock.Guardrail("contentFilteringGuardrail", {
  name: "ContentFilteringGuardrail",
  blockedInputMessaging: "Input violates content policies.",
  blockedOutputsMessaging: "Output violates content policies.",
  WordPolicyConfig: {
    // List of blocked words
    BlockedWords: ["inappropriate", "offensive"]
  },
  ContentPolicyConfig: {
    // Example content policy
    Policy: JSON.stringify({
      Statement: [
        {
          Effect: "Deny",
          Action: "bedrock:ModelInvoke",
          Resource: "*",
          Condition: {
            StringLike: {
              "bedrock:InputContent": "*inappropriate*"
            }
          }
        }
      ]
    })
  },
  Tags: [
    { Key: "UseCase", Value: "ContentModeration" }
  ]
});
```

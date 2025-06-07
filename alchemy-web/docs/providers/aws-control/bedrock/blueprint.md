---
title: Managing AWS Bedrock Blueprints with Alchemy
description: Learn how to create, update, and manage AWS Bedrock Blueprints using Alchemy Cloud Control.
---

# Blueprint

The Blueprint resource allows you to create and manage [AWS Bedrock Blueprints](https://docs.aws.amazon.com/bedrock/latest/userguide/) that define your AI models and their configurations.

## Minimal Example

Create a basic Bedrock Blueprint with required properties and a KMS key for encryption:

```ts
import AWS from "alchemy/aws/control";

const BasicBlueprint = await AWS.Bedrock.Blueprint("BasicBlueprint", {
  Type: "Model",
  BlueprintName: "MyFirstBlueprint",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  Schema: {
    ModelType: "CustomModel",
    Version: "1.0"
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "AI" }
  ]
});
```

## Advanced Configuration

Configure a Blueprint with additional KMS context and custom encryption settings:

```ts
const AdvancedBlueprint = await AWS.Bedrock.Blueprint("AdvancedBlueprint", {
  Type: "Model",
  BlueprintName: "MyAdvancedBlueprint",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  KmsEncryptionContext: {
    "Project": "AI-Research",
    "Data": "Sensitive"
  },
  Schema: {
    ModelType: "AdvancedCustomModel",
    Version: "2.0",
    Parameters: {
      LearningRate: 0.001,
      Epochs: 50
    }
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing Blueprint resource instead of failing when it already exists:

```ts
const AdoptExistingBlueprint = await AWS.Bedrock.Blueprint("AdoptExistingBlueprint", {
  Type: "Model",
  BlueprintName: "ExistingBlueprint",
  adopt: true,
  Schema: {
    ModelType: "AdoptedModel",
    Version: "1.0"
  }
});
```
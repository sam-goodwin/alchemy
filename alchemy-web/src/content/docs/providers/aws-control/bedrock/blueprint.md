---
title: Blueprint
description: Learn how to create, update, and manage AWS Bedrock Blueprints using Alchemy Cloud Control.
---


The Blueprint resource allows you to create, update, and manage [AWS Bedrock Blueprints](https://docs.aws.amazon.com/bedrock/latest/userguide/) that define the parameters and configurations required for your AI models.

## Minimal Example

Create a basic Bedrock Blueprint with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicBlueprint = await AWS.Bedrock.Blueprint("basicBlueprint", {
  Type: "TextGeneration",
  BlueprintName: "BasicTextGenBlueprint",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  Schema: {
    input: {
      type: "string",
      description: "Input text for generation"
    },
    output: {
      type: "string",
      description: "Generated text output"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "AIModeling" }
  ]
});
```

## Advanced Configuration

Configure a more complex Bedrock Blueprint with additional settings, including KMS encryption context and custom tags.

```ts
const advancedBlueprint = await AWS.Bedrock.Blueprint("advancedBlueprint", {
  Type: "ImageGeneration",
  BlueprintName: "AdvancedImageGenBlueprint",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/wxyz1234-56ef-78gh-90ij-klmnopqrstuv",
  KmsEncryptionContext: {
    Project: "ImageGeneration",
    Owner: "AITeam"
  },
  Schema: {
    input: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "Prompt for image generation"
        },
        style: {
          type: "string",
          enum: ["cartoon", "realistic"],
          description: "Style of the generated image"
        }
      },
      required: ["prompt"]
    },
    output: {
      type: "string",
      description: "URL of the generated image"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "AIImageModeling" }
  ],
  adopt: true
});
```

## Use Case: Text Generation with Custom Schema

Create a Bedrock Blueprint specifically for text generation with a custom schema that includes additional validation.

```ts
const textGenBlueprint = await AWS.Bedrock.Blueprint("textGenBlueprint", {
  Type: "TextGeneration",
  BlueprintName: "CustomTextGenBlueprint",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/ijkl1234-56ef-78gh-90ij-klmnopqrstuv",
  Schema: {
    input: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "The text input to guide the generation"
        },
        temperature: {
          type: "number",
          description: "Controls the randomness of the output",
          minimum: 0,
          maximum: 1
        }
      },
      required: ["prompt"]
    },
    output: {
      type: "string",
      description: "The generated text response"
    }
  },
  Tags: [
    { Key: "UseCase", Value: "ContentCreation" },
    { Key: "Team", Value: "Marketing" }
  ]
});
```

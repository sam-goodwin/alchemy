---
title: Managing AWS Bedrock PromptVersions with Alchemy
description: Learn how to create, update, and manage AWS Bedrock PromptVersions using Alchemy Cloud Control.
---

# PromptVersion

The PromptVersion resource allows you to create and manage versions of prompts in AWS Bedrock, enabling you to fine-tune and deploy your models effectively. For more details, visit the [AWS Bedrock PromptVersions documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/).

## Minimal Example

Create a basic PromptVersion with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicPromptVersion = await AWS.Bedrock.PromptVersion("BasicPromptVersion", {
  PromptArn: "arn:aws:bedrock:us-west-2:123456789012:prompt/my-prompt",
  Description: "This is the first version of my prompt.",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DataScienceTeam" }
  ]
});
```

## Advanced Configuration

Configure a PromptVersion with additional properties, including tags for better resource management.

```ts
const AdvancedPromptVersion = await AWS.Bedrock.PromptVersion("AdvancedPromptVersion", {
  PromptArn: "arn:aws:bedrock:us-west-2:123456789012:prompt/advanced-prompt",
  Description: "This version includes advanced configurations.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "AIResearch" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using Existing Prompts

This example demonstrates how to create a PromptVersion that adopts an existing prompt.

```ts
const AdoptedPromptVersion = await AWS.Bedrock.PromptVersion("AdoptedPromptVersion", {
  PromptArn: "arn:aws:bedrock:us-west-2:123456789012:prompt/existing-prompt",
  Description: "This version adopts an existing prompt for continued development.",
  adopt: true // Indicate that we want to adopt an existing resource
});
```
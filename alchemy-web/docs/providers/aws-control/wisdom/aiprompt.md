---
title: Managing AWS Wisdom AIPrompts with Alchemy
description: Learn how to create, update, and manage AWS Wisdom AIPrompts using Alchemy Cloud Control.
---

# AIPrompt

The AIPrompt resource lets you create and manage [AWS Wisdom AIPrompts](https://docs.aws.amazon.com/wisdom/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wisdom-aiprompt.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const aiprompt = await AWS.Wisdom.AIPrompt("aiprompt-example", {
  Type: "example-type",
  ApiFormat: "example-apiformat",
  TemplateConfiguration: "example-templateconfiguration",
  TemplateType: "example-templatetype",
  ModelId: "example-modelid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A aiprompt resource managed by Alchemy",
});
```

## Advanced Configuration

Create a aiprompt with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAIPrompt = await AWS.Wisdom.AIPrompt("advanced-aiprompt", {
  Type: "example-type",
  ApiFormat: "example-apiformat",
  TemplateConfiguration: "example-templateconfiguration",
  TemplateType: "example-templatetype",
  ModelId: "example-modelid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A aiprompt resource managed by Alchemy",
});
```


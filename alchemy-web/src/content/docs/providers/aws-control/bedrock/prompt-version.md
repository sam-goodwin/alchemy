---
title: PromptVersion
description: Learn how to create, update, and manage AWS Bedrock PromptVersions using Alchemy Cloud Control.
---


The PromptVersion resource allows you to create and manage [AWS Bedrock PromptVersions](https://docs.aws.amazon.com/bedrock/latest/userguide/) which are used for versioning prompts in your AI applications.

## Minimal Example

Create a basic PromptVersion with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const promptVersion = await AWS.Bedrock.PromptVersion("myPromptVersion", {
  PromptArn: "arn:aws:bedrock:us-west-2:123456789012:prompt/my-prompt",
  Description: "Initial version of my AI prompt."
});
```

## Advanced Configuration

Configure a PromptVersion with tags for better management and organization.

```ts
const taggedPromptVersion = await AWS.Bedrock.PromptVersion("myTaggedPromptVersion", {
  PromptArn: "arn:aws:bedrock:us-west-2:123456789012:prompt/my-prompt",
  Description: "Version 1 of my prompt with tags.",
  Tags: {
    Environment: "Production",
    Team: "AI Development"
  }
});
```

## Adopting Existing Resources

Create a PromptVersion that adopts an existing resource instead of failing.

```ts
const adoptExistingPromptVersion = await AWS.Bedrock.PromptVersion("myAdoptedPromptVersion", {
  PromptArn: "arn:aws:bedrock:us-west-2:123456789012:prompt/my-existing-prompt",
  Description: "Adopted version of an existing prompt.",
  adopt: true
});
```

## Updating an Existing PromptVersion

You can also update an existing PromptVersion by using the same ID and modifying the properties.

```ts
const updatedPromptVersion = await AWS.Bedrock.PromptVersion("myPromptVersion", {
  PromptArn: "arn:aws:bedrock:us-west-2:123456789012:prompt/my-prompt",
  Description: "Updated version of my AI prompt with new features."
});
```

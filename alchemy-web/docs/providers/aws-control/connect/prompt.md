---
title: Managing AWS Connect Prompts with Alchemy
description: Learn how to create, update, and manage AWS Connect Prompts using Alchemy Cloud Control.
---

# Prompt

The Prompt resource allows you to manage [AWS Connect Prompts](https://docs.aws.amazon.com/connect/latest/userguide/) for your contact center solutions. Prompts are audio files that provide information to customers during their interactions with the connect service.

## Minimal Example

Create a basic AWS Connect Prompt with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicPrompt = await AWS.Connect.Prompt("basic-prompt", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd-efgh-ijkl-mnop",
  Name: "WelcomePrompt",
  S3Uri: "s3://my-bucket/prompts/welcome.mp3",
  Description: "This prompt greets the caller."
});
```

## Advanced Configuration

Configure an AWS Connect Prompt with tags for organization and management.

```ts
const AdvancedPrompt = await AWS.Connect.Prompt("advanced-prompt", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd-efgh-ijkl-mnop",
  Name: "SupportPrompt",
  S3Uri: "s3://my-bucket/prompts/support.mp3",
  Description: "This prompt informs the caller about support options.",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "CustomerSupport" }
  ]
});
```

## Adopt Existing Resource

Use the `adopt` option to adopt an existing prompt instead of failing if it already exists.

```ts
const AdoptedPrompt = await AWS.Connect.Prompt("adopted-prompt", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd-efgh-ijkl-mnop",
  Name: "AdoptedPrompt",
  S3Uri: "s3://my-bucket/prompts/adopted.mp3",
  Description: "This prompt is adopted from an existing resource.",
  adopt: true
});
```
---
title: Prompt
description: Learn how to create, update, and manage AWS Connect Prompts using Alchemy Cloud Control.
---


The Prompt resource allows you to manage [AWS Connect Prompts](https://docs.aws.amazon.com/connect/latest/userguide/) used in contact flows for customer interactions. Prompts can include audio files that are stored in Amazon S3, enabling customized audio responses during customer interactions.

## Minimal Example

Create a basic prompt with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicPrompt = await AWS.Connect.Prompt("basic-prompt", {
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrst",
  name: "CustomerGreeting",
  s3Uri: "s3://my-bucket/prompts/greeting.mp3",
  description: "Greeting prompt for customer interactions"
});
```

## Advanced Configuration

Configure a prompt with tags for better resource management.

```ts
const taggedPrompt = await AWS.Connect.Prompt("tagged-prompt", {
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrst",
  name: "OrderStatusUpdate",
  s3Uri: "s3://my-bucket/prompts/order-status.mp3",
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "CustomerSupport" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing prompt instead of failing if the resource already exists.

```ts
const adoptedPrompt = await AWS.Connect.Prompt("adopted-prompt", {
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrst",
  name: "FeedbackPrompt",
  s3Uri: "s3://my-bucket/prompts/feedback.mp3",
  adopt: true
});
```

## Updating an Existing Prompt

Update the description of an existing prompt for clarity.

```ts
const updatedPrompt = await AWS.Connect.Prompt("existing-prompt", {
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrst",
  name: "CustomerFeedback",
  s3Uri: "s3://my-bucket/prompts/feedback-updated.mp3",
  description: "Updated feedback prompt for improved clarity"
});
```

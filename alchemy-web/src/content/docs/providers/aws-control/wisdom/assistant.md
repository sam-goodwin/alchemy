---
title: Assistant
description: Learn how to create, update, and manage AWS Wisdom Assistants using Alchemy Cloud Control.
---


The Assistant resource lets you create and manage [AWS Wisdom Assistants](https://docs.aws.amazon.com/wisdom/latest/userguide/) which provide contextual information and insights to support agents in customer interactions.

## Minimal Example

Create a basic Wisdom Assistant with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicAssistant = await AWS.Wisdom.Assistant("basic-assistant", {
  Type: "CUSTOM",
  Description: "A basic Wisdom Assistant to support customer service agents.",
  Name: "BasicAssistant"
});
```

## Advanced Configuration

Configure an Assistant with server-side encryption and tags for better management:

```ts
const advancedAssistant = await AWS.Wisdom.Assistant("advanced-assistant", {
  Type: "CUSTOM",
  Description: "An advanced Wisdom Assistant with encryption.",
  Name: "AdvancedAssistant",
  ServerSideEncryptionConfiguration: {
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-ef56-7890-abcd-ef1234567890",
    EncryptionType: "KMS"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Customer Support" }
  ]
});
```

## Adoption of Existing Resources

Create an Assistant that adopts an existing resource if it already exists, avoiding failure:

```ts
const adoptAssistant = await AWS.Wisdom.Assistant("adopt-assistant", {
  Type: "CUSTOM",
  Name: "AdoptableAssistant",
  adopt: true
});
```

## Custom Usage Scenarios

Create an Assistant with specific configurations for a training environment:

```ts
const trainingAssistant = await AWS.Wisdom.Assistant("training-assistant", {
  Type: "CUSTOM",
  Description: "A Wisdom Assistant for training purposes.",
  Name: "TrainingAssistant",
  ServerSideEncryptionConfiguration: {
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-ef56-7890-abcd-ef1234567890",
    EncryptionType: "KMS"
  },
  Tags: [
    { Key: "Environment", Value: "Training" },
    { Key: "Purpose", Value: "Agent Training" }
  ]
});
```

---
title: Managing AWS Wisdom Assistants with Alchemy
description: Learn how to create, update, and manage AWS Wisdom Assistants using Alchemy Cloud Control.
---

# Assistant

The Assistant resource lets you create and manage [AWS Wisdom Assistants](https://docs.aws.amazon.com/wisdom/latest/userguide/) which help in providing contextual information to agents during customer interactions.

## Minimal Example

Create a basic Wisdom Assistant with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicAssistant = await AWS.Wisdom.Assistant("BasicAssistant", {
  Type: "Standard",
  Description: "This assistant provides contextual information for customer service agents.",
  Name: "CustomerServiceAssistant"
});
```

## Advanced Configuration

Configure an Assistant with server-side encryption and tags for better resource management.

```ts
const advancedAssistant = await AWS.Wisdom.Assistant("AdvancedAssistant", {
  Type: "Secure",
  Description: "This assistant uses encryption for sensitive information.",
  Name: "SecureCustomerServiceAssistant",
  ServerSideEncryptionConfiguration: {
    // Assuming the configuration requires specific properties
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "CustomerSupport" }
  ]
});
```

## Utilizing Existing Resources

If you want to adopt an existing Assistant instead of creating a new one, you can use the adopt property.

```ts
const adoptExistingAssistant = await AWS.Wisdom.Assistant("AdoptExistingAssistant", {
  Type: "Standard",
  Description: "Adopting an existing assistant resource.",
  Name: "ExistingAssistantName",
  adopt: true
});
```

## Example with Enhanced Security Settings

Create an Assistant configured with specific security settings to handle sensitive information.

```ts
const secureAssistant = await AWS.Wisdom.Assistant("SecureAssistant", {
  Type: "Standard",
  Description: "This assistant is configured with enhanced security settings.",
  Name: "SensitiveDataAssistant",
  ServerSideEncryptionConfiguration: {
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv"
  },
  Tags: [
    { Key: "Compliance", Value: "GDPR" },
    { Key: "Team", Value: "Legal" }
  ]
});
```
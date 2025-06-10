---
title: MessageTemplateVersion
description: Learn how to create, update, and manage AWS Wisdom MessageTemplateVersions using Alchemy Cloud Control.
---


The MessageTemplateVersion resource allows you to manage versions of message templates within AWS Wisdom. For more information, refer to the [AWS Wisdom MessageTemplateVersions](https://docs.aws.amazon.com/wisdom/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic MessageTemplateVersion using required properties along with a common optional property.

```ts
import AWS from "alchemy/aws/control";

const messageTemplateVersion = await AWS.Wisdom.MessageTemplateVersion("basicTemplateVersion", {
  MessageTemplateArn: "arn:aws:wisdom:us-west-2:123456789012:messageTemplate/abc123",
  MessageTemplateContentSha256: "8c7dd922ad47494fc02c388e12c00eac",
});
```

## Advanced Configuration

In this example, we create a MessageTemplateVersion with the adoption feature enabled, allowing the resource to adopt an existing version if it already exists.

```ts
const advancedMessageTemplateVersion = await AWS.Wisdom.MessageTemplateVersion("advancedTemplateVersion", {
  MessageTemplateArn: "arn:aws:wisdom:us-west-2:123456789012:messageTemplate/xyz789",
  MessageTemplateContentSha256: "3c59dc048e88503e8f1f4b41b300f600",
  adopt: true
});
```

## Versioning with Existing Resources

Here, we demonstrate how to create a new MessageTemplateVersion while ensuring that it adopts an existing version if found.

```ts
const existingTemplateVersion = await AWS.Wisdom.MessageTemplateVersion("existingTemplateVersion", {
  MessageTemplateArn: "arn:aws:wisdom:us-west-2:123456789012:messageTemplate/def456",
  adopt: true
});
```

## Retrieving Resource Attributes

In this example, we create a MessageTemplateVersion and retrieve its ARN and creation time after creation.

```ts
const templateVersionDetails = await AWS.Wisdom.MessageTemplateVersion("templateVersionDetails", {
  MessageTemplateArn: "arn:aws:wisdom:us-west-2:123456789012:messageTemplate/ghi012"
});

// Accessing the ARN and creation time
console.log("ARN:", templateVersionDetails.Arn);
console.log("Creation Time:", templateVersionDetails.CreationTime);
```

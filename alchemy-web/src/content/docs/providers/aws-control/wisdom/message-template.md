---
title: MessageTemplate
description: Learn how to create, update, and manage AWS Wisdom MessageTemplates using Alchemy Cloud Control.
---


The MessageTemplate resource allows you to manage [AWS Wisdom MessageTemplates](https://docs.aws.amazon.com/wisdom/latest/userguide/) that help in creating structured messages for various channels. This resource facilitates the configuration and customization of message templates used in customer service scenarios.

## Minimal Example

Create a basic message template with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const messageTemplate = await AWS.Wisdom.MessageTemplate("customerInquiryTemplate", {
  Name: "Customer Inquiry",
  KnowledgeBaseArn: "arn:aws:wisdom:us-east-1:123456789012:knowledge-base/knowledge-base-id",
  ChannelSubtype: "Email",
  Content: {
    type: "text/plain",
    value: "Thank you for reaching out! We will get back to you shortly."
  },
  Description: "Template for customer inquiry responses"
});
```

## Advanced Configuration

Configure a message template with additional attributes such as grouping configuration and default attributes.

```ts
const advancedMessageTemplate = await AWS.Wisdom.MessageTemplate("technicalSupportTemplate", {
  Name: "Technical Support",
  KnowledgeBaseArn: "arn:aws:wisdom:us-east-1:123456789012:knowledge-base/knowledge-base-id",
  ChannelSubtype: "Chat",
  Content: {
    type: "text/html",
    value: "<p>Our technical support team is here to help you!</p>"
  },
  GroupingConfiguration: {
    GroupBy: "issueType"
  },
  DefaultAttributes: {
    urgency: "high",
    priority: "immediate"
  }
});
```

## Custom Messaging for Different Languages

Create a message template for a specific language to cater to international customers.

```ts
const multilingualTemplate = await AWS.Wisdom.MessageTemplate("spanishResponseTemplate", {
  Name: "Respuesta en Español",
  KnowledgeBaseArn: "arn:aws:wisdom:us-east-1:123456789012:knowledge-base/knowledge-base-id",
  ChannelSubtype: "SMS",
  Language: "es",
  Content: {
    type: "text/plain",
    value: "Gracias por contactarnos. Estamos aquí para ayudar."
  }
});
```

## Tagging for Resource Management

Create a message template with tags for better organization and management.

```ts
const taggedMessageTemplate = await AWS.Wisdom.MessageTemplate("salesFollowUpTemplate", {
  Name: "Sales Follow-Up",
  KnowledgeBaseArn: "arn:aws:wisdom:us-east-1:123456789012:knowledge-base/knowledge-base-id",
  ChannelSubtype: "Email",
  Content: {
    type: "text/plain",
    value: "We appreciate your interest in our products. Do you have any questions?"
  },
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Purpose", Value: "Follow-Up" }
  ]
});
```

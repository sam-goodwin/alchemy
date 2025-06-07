---
title: Managing AWS Pinpoint SmsTemplates with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint SmsTemplates using Alchemy Cloud Control.
---

# SmsTemplate

The SmsTemplate resource allows you to create and manage SMS message templates in AWS Pinpoint, which can be used for personalized messaging campaigns. For more information, refer to the [AWS Pinpoint SmsTemplates](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic SMS template with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicSmsTemplate = await AWS.Pinpoint.SmsTemplate("BasicSmsTemplate", {
  TemplateName: "WelcomeMessage",
  Body: "Welcome to our service! We're glad to have you.",
  TemplateDescription: "A welcome message template for new users.",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Marketing" }
  ]
});
```

## Advanced Configuration

Configure an SMS template with default substitutions, allowing for dynamic content in messages.

```ts
const AdvancedSmsTemplate = await AWS.Pinpoint.SmsTemplate("AdvancedSmsTemplate", {
  TemplateName: "BirthdayWishes",
  Body: "Happy Birthday, {{name}}! Enjoy your special day!",
  TemplateDescription: "A birthday wishes template with dynamic name substitution.",
  DefaultSubstitutions: '{"name": "User"}',
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Customer Engagement" }
  ]
});
```

## Custom Use Case: Promotional Offers

Create an SMS template specifically for promotional offers that can easily be modified with different discount codes.

```ts
const PromoSmsTemplate = await AWS.Pinpoint.SmsTemplate("PromoSmsTemplate", {
  TemplateName: "SummerSale",
  Body: "Get {{discount}} off your next purchase! Use code: {{code}}",
  TemplateDescription: "A promotional SMS template for summer sales.",
  DefaultSubstitutions: '{"discount": "20%", "code": "SUMMER20"}',
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Sales" }
  ]
});
```
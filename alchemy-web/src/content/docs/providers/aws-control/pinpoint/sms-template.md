---
title: SmsTemplate
description: Learn how to create, update, and manage AWS Pinpoint SmsTemplates using Alchemy Cloud Control.
---


The SmsTemplate resource allows you to manage [AWS Pinpoint SmsTemplates](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for sending SMS messages with predefined content.

## Minimal Example

Create a basic SMS template with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const smsTemplate = await AWS.Pinpoint.SmsTemplate("basicSmsTemplate", {
  TemplateName: "WelcomeMessage",
  Body: "Welcome to our service! Your verification code is {{code}}.",
  TemplateDescription: "A welcome message template for new users."
});
```

## Advanced Configuration

Configure an SMS template with default substitutions and tags to enhance message personalization.

```ts
const advancedSmsTemplate = await AWS.Pinpoint.SmsTemplate("advancedSmsTemplate", {
  TemplateName: "PasswordResetMessage",
  Body: "We received a request to reset your password. Click here to reset: {{url}}",
  DefaultSubstitutions: '{"url": "https://example.com/reset"}',
  Tags: {
    "type": "account",
    "priority": "high"
  }
});
```

## Adoption of Existing Templates

Adopt an existing SMS template without failing if it already exists.

```ts
const adoptSmsTemplate = await AWS.Pinpoint.SmsTemplate("adoptExistingTemplate", {
  TemplateName: "PromotionalOffer",
  Body: "Special offer just for you! Enjoy a discount of {{discount}} on your next purchase.",
  adopt: true // Will not fail if the template already exists
});
```

## Example with Custom Substitutions

Create an SMS template that utilizes custom substitutions for dynamic messaging.

```ts
const customSubstitutionTemplate = await AWS.Pinpoint.SmsTemplate("customSubstitutionTemplate", {
  TemplateName: "EventReminder",
  Body: "Don't forget about your upcoming event: {{eventName}} on {{eventDate}}!",
  DefaultSubstitutions: '{"eventName": "Concert", "eventDate": "Friday, 7 PM"}'
});
```

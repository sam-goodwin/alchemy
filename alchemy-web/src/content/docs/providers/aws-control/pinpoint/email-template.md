---
title: EmailTemplate
description: Learn how to create, update, and manage AWS Pinpoint EmailTemplates using Alchemy Cloud Control.
---


The EmailTemplate resource lets you manage [AWS Pinpoint EmailTemplates](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for sending targeted email communications to your users.

## Minimal Example

Create a basic email template with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const emailTemplate = await AWS.Pinpoint.EmailTemplate("welcomeEmailTemplate", {
  TemplateName: "Welcome Email",
  Subject: "Welcome to Our Service!",
  HtmlPart: "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
  TextPart: "Welcome! Thank you for joining us."
});
```

## Advanced Configuration

Configure an email template with default substitutions and additional metadata.

```ts
const advancedEmailTemplate = await AWS.Pinpoint.EmailTemplate("advancedEmailTemplate", {
  TemplateName: "Advanced Welcome Email",
  Subject: "Welcome to Our Service!",
  HtmlPart: "<h1>Welcome!</h1><p>Dear {{name}}, thank you for joining us.</p>",
  TextPart: "Welcome! Dear {{name}}, thank you for joining us.",
  TemplateDescription: "A detailed welcome email template.",
  DefaultSubstitutions: JSON.stringify({ name: "User" }),
  Tags: {
    environment: "production",
    team: "marketing"
  }
});
```

## Using Tags for Organization

Create an email template with specific tags for better organization and management.

```ts
const taggedEmailTemplate = await AWS.Pinpoint.EmailTemplate("taggedEmailTemplate", {
  TemplateName: "Promotional Offer",
  Subject: "Exclusive Offer Just for You!",
  HtmlPart: "<h1>Special Offer!</h1><p>Get 20% off your next purchase!</p>",
  TextPart: "Special Offer! Get 20% off your next purchase!",
  Tags: {
    campaign: "holiday-promotion",
    region: "us-west"
  }
});
```

## Handling Existing Resources

Create an email template that adopts an existing resource if it already exists, preventing failures.

```ts
const adoptEmailTemplate = await AWS.Pinpoint.EmailTemplate("adoptEmailTemplate", {
  TemplateName: "Adopted Welcome Email",
  Subject: "Welcome Back!",
  HtmlPart: "<h1>Welcome Back!</h1><p>We're glad to see you again.</p>",
  TextPart: "Welcome Back! We're glad to see you again.",
  adopt: true // Set to true to adopt existing resource
});
```

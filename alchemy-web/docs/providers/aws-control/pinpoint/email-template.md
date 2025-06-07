---
title: Managing AWS Pinpoint EmailTemplates with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint EmailTemplates using Alchemy Cloud Control.
---

# EmailTemplate

The EmailTemplate resource allows you to create and manage email templates for AWS Pinpoint, enabling personalized email communication with your users. For more details, refer to the [AWS Pinpoint EmailTemplates documentation](https://docs.aws.amazon.com/pinpoint/latest/userguide/).

## Minimal Example

Create a basic email template with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicEmailTemplate = await AWS.Pinpoint.EmailTemplate("BasicEmailTemplate", {
  TemplateName: "WelcomeEmail",
  Subject: "Welcome to Our Service!",
  HtmlPart: "<html><body><h1>Welcome!</h1><p>Thanks for joining us.</p></body></html>",
  TextPart: "Welcome! Thanks for joining us."
});
```

## Advanced Configuration

Configure an email template with additional options, including a description and default substitutions.

```ts
const AdvancedEmailTemplate = await AWS.Pinpoint.EmailTemplate("AdvancedEmailTemplate", {
  TemplateName: "PromotionalEmail",
  Subject: "Exclusive Offer Just for You!",
  HtmlPart: "<html><body><h1>Special Promotion!</h1><p>Use code <strong>OFFER2023</strong> to get a discount!</p></body></html>",
  TextPart: "Special Promotion! Use code OFFER2023 to get a discount!",
  TemplateDescription: "A template for promotional emails.",
  DefaultSubstitutions: JSON.stringify({
    name: "User"
  }),
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Region", Value: "us-east-1" }
  ]
});
```

## Custom Default Substitutions

Use default substitutions to personalize emails dynamically based on user data.

```ts
const PersonalizedEmailTemplate = await AWS.Pinpoint.EmailTemplate("PersonalizedEmailTemplate", {
  TemplateName: "BirthdayEmail",
  Subject: "Happy Birthday, {{name}}!",
  HtmlPart: "<html><body><h1>Happy Birthday!</h1><p>Wishing you a fantastic day, {{name}}!</p></body></html>",
  TextPart: "Happy Birthday, {{name}}! Wishing you a fantastic day!",
  DefaultSubstitutions: JSON.stringify({
    name: "John Doe"
  })
});
```

## Tagging for Organization

Create an email template with specific tags for better management and organization.

```ts
const TaggedEmailTemplate = await AWS.Pinpoint.EmailTemplate("TaggedEmailTemplate", {
  TemplateName: "FeedbackRequestEmail",
  Subject: "We Value Your Feedback!",
  HtmlPart: "<html><body><h1>Your Opinion Matters!</h1><p>Please let us know how we did.</p></body></html>",
  TextPart: "Your Opinion Matters! Please let us know how we did.",
  Tags: [
    { Key: "Feedback", Value: "Customer" },
    { Key: "Priority", Value: "High" }
  ]
});
```
---
title: Template
description: Learn how to create, update, and manage AWS SES Templates using Alchemy Cloud Control.
---


The Template resource lets you manage [AWS SES Templates](https://docs.aws.amazon.com/ses/latest/userguide/) for sending personalized email messages.

## Minimal Example

Create a basic SES template with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const emailTemplate = await AWS.SES.Template("welcomeTemplate", {
  Template: {
    TemplateName: "WelcomeEmail",
    SubjectPart: "Welcome to Our Service!",
    HtmlPart: "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
    TextPart: "Welcome! Thank you for joining us."
  }
});
```

## Advanced Configuration

Define an SES template with additional customization options.

```ts
const advancedTemplate = await AWS.SES.Template("advancedTemplate", {
  Template: {
    TemplateName: "AdvancedWelcomeEmail",
    SubjectPart: "Welcome to Our Service!",
    HtmlPart: "<h1>Welcome, {{name}}!</h1><p>Thank you for joining us.</p>",
    TextPart: "Welcome, {{name}}! Thank you for joining us.",
    Tags: [
      {
        Name: "Source",
        Value: "Marketing"
      }
    ]
  }
});
```

## Updating an Existing Template

Modify an existing SES template to enhance its content.

```ts
const updatedTemplate = await AWS.SES.Template("updateTemplate", {
  Template: {
    TemplateName: "WelcomeEmail",
    SubjectPart: "Welcome Aboard!",
    HtmlPart: "<h1>Welcome!</h1><p>We're excited to have you!</p>",
    TextPart: "Welcome! We're excited to have you!"
  },
  adopt: true // Adopt existing resource instead of failing if it already exists
});
```

## Deleting a Template

Remove an SES template that is no longer needed.

```ts
const deleteTemplate = await AWS.SES.Template("deleteTemplate", {
  Template: {
    TemplateName: "ObsoleteTemplate"
  }
});
```

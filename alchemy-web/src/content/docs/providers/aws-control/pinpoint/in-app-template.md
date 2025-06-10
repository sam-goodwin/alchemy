---
title: InAppTemplate
description: Learn how to create, update, and manage AWS Pinpoint InAppTemplates using Alchemy Cloud Control.
---


The InAppTemplate resource allows you to manage [AWS Pinpoint InAppTemplates](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for creating rich in-app messaging experiences.

## Minimal Example

Create a basic InAppTemplate with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const inAppTemplate = await AWS.Pinpoint.InAppTemplate("welcomeMessageTemplate", {
  TemplateName: "WelcomeMessage",
  Layout: "TITLE_BODY",
  Content: [
    {
      Header: "Welcome to Our App!",
      Body: "We're glad to have you here. Enjoy your experience!"
    }
  ]
});
```

## Advanced Configuration

Configure an InAppTemplate with a custom configuration and tags for better resource management.

```ts
const advancedTemplate = await AWS.Pinpoint.InAppTemplate("advancedTemplate", {
  TemplateName: "AdvancedTemplate",
  Layout: "BODY_ONLY",
  Content: [
    {
      Body: "Check out our new features!",
      Header: "New Features Available!"
    }
  ],
  CustomConfig: {
    colorScheme: {
      primary: "#ff5733",
      secondary: "#33c1ff"
    }
  },
  Tags: {
    project: "myApp",
    environment: "production"
  }
});
```

## Using Tags for Resource Management

Create an InAppTemplate with detailed tags to manage your resources effectively.

```ts
const taggedTemplate = await AWS.Pinpoint.InAppTemplate("taggedTemplate", {
  TemplateName: "TaggedTemplate",
  Layout: "TITLE_BODY",
  Content: [
    {
      Header: "Special Offer Just for You!",
      Body: "Get 20% off your next purchase!"
    }
  ],
  Tags: {
    campaign: "HolidaySale",
    targetAudience: "loyalCustomers"
  }
});
```

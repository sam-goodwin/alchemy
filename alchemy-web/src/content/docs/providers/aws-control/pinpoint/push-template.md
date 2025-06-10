---
title: PushTemplate
description: Learn how to create, update, and manage AWS Pinpoint PushTemplates using Alchemy Cloud Control.
---


The PushTemplate resource lets you manage [AWS Pinpoint PushTemplates](https://docs.aws.amazon.com/pinpoint/latest/userguide/) used for sending push notifications across different platforms.

## Minimal Example

Create a basic PushTemplate with required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicPushTemplate = await AWS.Pinpoint.PushTemplate("basicPushTemplate", {
  TemplateName: "BasicPushTemplate",
  TemplateDescription: "A basic push template for Android and iOS notifications.",
  GCM: {
    Title: "Hello from AWS Pinpoint",
    Body: "This is a test notification for Android devices.",
    IconReference: "icon.png",
    ImageIconUrl: "https://example.com/image.png"
  },
  APNS: {
    Title: "Hello from AWS Pinpoint",
    Body: "This is a test notification for iOS devices.",
    Sound: "default"
  }
});
```

## Advanced Configuration

Configure a PushTemplate with additional options such as default substitutions and tags.

```ts
const advancedPushTemplate = await AWS.Pinpoint.PushTemplate("advancedPushTemplate", {
  TemplateName: "AdvancedPushTemplate",
  TemplateDescription: "An advanced push template with default substitutions.",
  GCM: {
    Title: "Welcome!",
    Body: "Join us for an exclusive event.",
    IconReference: "event_icon.png"
  },
  APNS: {
    Title: "Exclusive Event",
    Body: "Don't miss out on our upcoming event!",
    Sound: "event_sound.aiff"
  },
  DefaultSubstitutions: '{"name":"User"}',
  Tags: {
    Environment: "Production",
    Feature: "PushNotifications"
  }
});
```

## Adoption of Existing Resource

If you want to adopt an existing PushTemplate instead of failing when it already exists, set the `adopt` property to `true`.

```ts
const adoptPushTemplate = await AWS.Pinpoint.PushTemplate("adoptPushTemplate", {
  TemplateName: "AdoptedPushTemplate",
  adopt: true,
  GCM: {
    Title: "Existing Template",
    Body: "This template was adopted successfully.",
  }
});
```

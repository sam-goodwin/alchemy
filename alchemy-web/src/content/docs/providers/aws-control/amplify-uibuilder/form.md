---
title: Form
description: Learn how to create, update, and manage AWS AmplifyUIBuilder Forms using Alchemy Cloud Control.
---


The Form resource allows you to create and manage forms in AWS Amplify UI Builder, enabling developers to build custom user interfaces. For more details, refer to the [AWS AmplifyUIBuilder Forms documentation](https://docs.aws.amazon.com/amplifyuibuilder/latest/userguide/).

## Minimal Example

Create a basic form with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicForm = await AWS.AmplifyUIBuilder.Form("basicForm", {
  AppId: "myAppId",
  Name: "UserRegistration",
  FormActionType: "submit",
  Fields: {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", required: true }
  }
});
```

## Advanced Configuration

Configure a form with additional features, such as a custom call-to-action and styling options.

```ts
const advancedForm = await AWS.AmplifyUIBuilder.Form("advancedForm", {
  AppId: "myAppId",
  Name: "FeedbackForm",
  FormActionType: "submit",
  Cta: {
    text: "Submit Feedback",
    style: "primary"
  },
  Fields: {
    feedback: { type: "text", required: true },
    rating: { type: "number", required: true }
  },
  Style: {
    backgroundColor: "#f9f9f9",
    borderColor: "#dcdcdc",
    borderRadius: "8px"
  }
});
```

## Custom Sectional Elements

Demonstrate creating a form that includes sectional elements for organizing fields logically.

```ts
const sectionalForm = await AWS.AmplifyUIBuilder.Form("sectionalForm", {
  AppId: "myAppId",
  Name: "SurveyForm",
  Fields: {
    demographics: {
      type: "group",
      fields: {
        age: { type: "number", required: true },
        gender: { type: "string", required: true }
      }
    },
    preferences: {
      type: "group",
      fields: {
        favoriteColor: { type: "string", required: false },
        newsletter: { type: "boolean", required: false }
      }
    }
  },
  SectionalElements: {
    demographics: { label: "Demographics", required: true },
    preferences: { label: "Preferences", required: false }
  }
});
``` 

## Form with Tags

Show how to create a form that includes tags for better organization and management.

```ts
const taggedForm = await AWS.AmplifyUIBuilder.Form("taggedForm", {
  AppId: "myAppId",
  Name: "EventRegistration",
  Fields: {
    eventName: { type: "string", required: true },
    participantCount: { type: "number", required: true }
  },
  Tags: {
    category: "registration",
    status: "active"
  }
});
```

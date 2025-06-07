---
title: Managing AWS Cognito UserPoolUICustomizationAttachments with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolUICustomizationAttachments using Alchemy Cloud Control.
---

# UserPoolUICustomizationAttachment

The UserPoolUICustomizationAttachment resource lets you customize the UI of your Amazon Cognito User Pools. This customization allows you to specify CSS styles for user pool sign-up and sign-in pages. For more information, refer to the [AWS Cognito UserPoolUICustomizationAttachments](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a basic UserPoolUICustomizationAttachment with required properties and a common optional CSS property.

```ts
import AWS from "alchemy/aws/control";

const UserPoolUICustomization = await AWS.Cognito.UserPoolUICustomizationAttachment("UserPoolUICustomization", {
  UserPoolId: "us-east-1_aBc123456",
  ClientId: "2n12345678",
  CSS: `
    .sign-in {
      background-color: #f7f7f7;
      color: #333;
    }
  `
});
```

## Advanced Configuration

Customize the UI with additional advanced CSS properties for branding and user experience.

```ts
const AdvancedUserPoolUICustomization = await AWS.Cognito.UserPoolUICustomizationAttachment("AdvancedUserPoolUICustomization", {
  UserPoolId: "us-east-1_aBc123456",
  ClientId: "2n12345678",
  CSS: `
    .sign-in {
      background-color: #ffffff;
      color: #000000;
      font-family: Arial, sans-serif;
    }
    .button {
      background-color: #0073e6;
      border-radius: 5px;
      color: #ffffff;
    }
  `
});
```

## Customizing for Multiple Clients

Use different customizations for multiple clients within the same user pool.

```ts
const Client1Customization = await AWS.Cognito.UserPoolUICustomizationAttachment("Client1Customization", {
  UserPoolId: "us-east-1_aBc123456",
  ClientId: "client1-123456",
  CSS: `
    .sign-in {
      background-color: #ffcccc;
      color: #900;
    }
  `
});

const Client2Customization = await AWS.Cognito.UserPoolUICustomizationAttachment("Client2Customization", {
  UserPoolId: "us-east-1_aBc123456",
  ClientId: "client2-654321",
  CSS: `
    .sign-in {
      background-color: #ccffcc;
      color: #006600;
    }
  `
});
```
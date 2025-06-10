---
title: UserPoolUICustomizationAttachment
description: Learn how to create, update, and manage AWS Cognito UserPoolUICustomizationAttachments using Alchemy Cloud Control.
---


The UserPoolUICustomizationAttachment resource allows you to customize the UI for your AWS Cognito User Pools. This customization can include visual elements such as CSS styles that enhance the user experience. For more information, refer to the [AWS Cognito UserPoolUICustomizationAttachments documentation](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a basic UserPoolUICustomizationAttachment with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const userPoolUICustomization = await AWS.Cognito.UserPoolUICustomizationAttachment("myUserPoolUICustomization", {
  UserPoolId: "us-east-1_AbCdEfGhI",
  ClientId: "1h2g3f4g5h6i7j8k9l0m",
  CSS: "body { background-color: #f0f0f0; }" // Basic CSS customization
});
```

## Advanced Configuration

Customize the User Pool UI with more extensive CSS and adopt an existing resource if it already exists.

```ts
const advancedUICustomization = await AWS.Cognito.UserPoolUICustomizationAttachment("advancedUserPoolUICustomization", {
  UserPoolId: "us-east-1_AbCdEfGhI",
  ClientId: "1h2g3f4g5h6i7j8k9l0m",
  CSS: `
    body { 
      background-color: #ffffff; 
      font-family: Arial, sans-serif; 
    }
    .header { 
      color: #333333; 
    }
  `,
  adopt: true // Adopt existing resource if it exists
});
```

## Example with Custom CSS

In this example, you can see how to apply a more comprehensive CSS style to the user pool UI.

```ts
const customCSSUICustomization = await AWS.Cognito.UserPoolUICustomizationAttachment("customCSSUserPoolUICustomization", {
  UserPoolId: "us-east-1_AbCdEfGhI",
  ClientId: "1h2g3f4g5h6i7j8k9l0m",
  CSS: `
    body { 
      background-color: #fafafa; 
      color: #333; 
      font-size: 16px; 
    }
    .button { 
      background-color: #007bff; 
      border: none; 
      color: white; 
      padding: 10px 20px; 
      text-align: center; 
      text-decoration: none; 
      display: inline-block; 
      font-size: 16px; 
      margin: 4px 2px; 
      cursor: pointer; 
    }
  `
});
```

---
title: ManagedLoginBranding
description: Learn how to create, update, and manage AWS Cognito ManagedLoginBrandings using Alchemy Cloud Control.
---


The ManagedLoginBranding resource allows you to manage the branding settings for a Cognito user pool, enabling you to customize the login experience for your users. For more information, refer to the [AWS Cognito ManagedLoginBrandings documentation](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a basic ManagedLoginBranding with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const branding = await AWS.Cognito.ManagedLoginBranding("myBranding", {
  UserPoolId: "us-east-1_ExaMPle",
  UseCognitoProvidedValues: true
});
```

## Advanced Configuration

Configure a ManagedLoginBranding with additional assets and client ID settings.

```ts
const advancedBranding = await AWS.Cognito.ManagedLoginBranding("advancedBranding", {
  UserPoolId: "us-east-1_ExaMPle",
  UseCognitoProvidedValues: false,
  Assets: [
    {
      Key: "logo",
      Value: "https://example.com/logo.png"
    },
    {
      Key: "background",
      Value: "https://example.com/background.jpg"
    }
  ],
  ClientId: "myClientId123",
  Settings: {
    colorScheme: "dark"
  }
});
```

## Adopt Existing Resource

If you want to adopt an existing ManagedLoginBranding resource, you can do so by setting the `adopt` property to true.

```ts
const adoptedBranding = await AWS.Cognito.ManagedLoginBranding("adoptedBranding", {
  UserPoolId: "us-east-1_ExaMPle",
  adopt: true
});
```

## Return Merged Resources

You can also return merged resources when creating a ManagedLoginBranding by setting the `ReturnMergedResources` property.

```ts
const mergedBranding = await AWS.Cognito.ManagedLoginBranding("mergedBranding", {
  UserPoolId: "us-east-1_ExaMPle",
  ReturnMergedResources: true,
  Assets: [
    {
      Key: "favicon",
      Value: "https://example.com/favicon.ico"
    }
  ]
});
```

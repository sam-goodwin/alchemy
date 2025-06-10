---
title: IdentityPool
description: Learn how to create, update, and manage AWS Cognito IdentityPools using Alchemy Cloud Control.
---


The IdentityPool resource allows you to manage [AWS Cognito IdentityPools](https://docs.aws.amazon.com/cognito/latest/userguide/) for user authentication and access management in your applications.

## Minimal Example

Create a basic IdentityPool with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const identityPool = await AWS.Cognito.IdentityPool("myIdentityPool", {
  IdentityPoolName: "MyAppIdentityPool",
  AllowUnauthenticatedIdentities: true,
  DeveloperProviderName: "my-developer-provider"
});
```

## Advanced Configuration

Configure an IdentityPool with additional options such as supported login providers and Cognito events.

```ts
const advancedIdentityPool = await AWS.Cognito.IdentityPool("advancedIdentityPool", {
  IdentityPoolName: "AdvancedAppIdentityPool",
  AllowUnauthenticatedIdentities: false,
  CognitoIdentityProviders: [
    {
      ProviderName: "cognito-idp.us-west-2.amazonaws.com/us-west-2_aBcDeFgHi",
      ClientId: "1234567890abcdefg"
    }
  ],
  CognitoEvents: {
    onLogin: "arn:aws:lambda:us-west-2:123456789012:function:onLogin"
  },
  SupportedLoginProviders: {
    "graph.facebook.com": "1234567890123456"
  }
});
```

## Using SAML Providers

Create an IdentityPool that includes SAML provider ARNs for federated authentication.

```ts
const samlIdentityPool = await AWS.Cognito.IdentityPool("samlIdentityPool", {
  IdentityPoolName: "SAMLAppIdentityPool",
  AllowUnauthenticatedIdentities: true,
  SamlProviderARNs: [
    "arn:aws:cognito:saml-provider/MySAMLProvider"
  ]
});
```

## Configuring Cognito Streams

Set up an IdentityPool to utilize Cognito Streams for real-time data processing.

```ts
const streamIdentityPool = await AWS.Cognito.IdentityPool("streamIdentityPool", {
  IdentityPoolName: "StreamAppIdentityPool",
  AllowUnauthenticatedIdentities: false,
  CognitoStreams: {
    RoleArn: "arn:aws:iam::123456789012:role/CognitoStreamRole",
    StreamName: "CognitoStream",
    StreamingStatus: "ENABLED"
  }
});
```

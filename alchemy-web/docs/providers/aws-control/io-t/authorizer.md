---
title: Managing AWS IoT Authorizers with Alchemy
description: Learn how to create, update, and manage AWS IoT Authorizers using Alchemy Cloud Control.
---

# Authorizer

The Authorizer resource lets you manage [AWS IoT Authorizers](https://docs.aws.amazon.com/iot/latest/userguide/) that enable you to control access to your AWS IoT resources through custom authentication mechanisms.

## Minimal Example

Create a basic IoT Authorizer with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicAuthorizer = await AWS.IoT.Authorizer("BasicAuthorizer", {
  AuthorizerFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:MyAuthorizerFunction",
  TokenKeyName: "Authorization",
  EnableCachingForHttp: true,
  Status: "ACTIVE"
});
```

## Advanced Configuration

Configure an IoT Authorizer with additional settings, including token signing public keys and tags.

```ts
const AdvancedAuthorizer = await AWS.IoT.Authorizer("AdvancedAuthorizer", {
  AuthorizerFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:AdvancedAuthorizerFunction",
  TokenKeyName: "Authorization",
  EnableCachingForHttp: true,
  TokenSigningPublicKeys: {
    "key1": "publicKey1Base64Encoded",
    "key2": "publicKey2Base64Encoded"
  },
  SigningDisabled: false,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Caching Configuration

Create an IoT Authorizer that utilizes caching for HTTP requests to improve performance.

```ts
const CachingAuthorizer = await AWS.IoT.Authorizer("CachingAuthorizer", {
  AuthorizerFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:CachingAuthorizerFunction",
  TokenKeyName: "AuthToken",
  EnableCachingForHttp: true,
  Status: "ACTIVE"
});
```

## Disabling Signing

Configure an IoT Authorizer with signing disabled for scenarios that do not require it.

```ts
const NoSigningAuthorizer = await AWS.IoT.Authorizer("NoSigningAuthorizer", {
  AuthorizerFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:NoSigningAuthorizerFunction",
  TokenKeyName: "AuthHeader",
  SigningDisabled: true,
  Status: "ACTIVE"
});
```
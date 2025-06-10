---
title: Authorizer
description: Learn how to create, update, and manage AWS IoT Authorizers using Alchemy Cloud Control.
---


The Authorizer resource lets you manage [AWS IoT Authorizers](https://docs.aws.amazon.com/iot/latest/userguide/) which are used to control access to AWS IoT devices and services.

## Minimal Example

Create an IoT Authorizer with the required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const myAuthorizer = await AWS.IoT.Authorizer("myAuthorizer", {
  AuthorizerFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myAuthFunction",
  Status: "ACTIVE",
  TokenKeyName: "Authorization"
});
```

## Advanced Configuration

Configure an IoT Authorizer with additional settings such as caching and token signing.

```ts
const advancedAuthorizer = await AWS.IoT.Authorizer("advancedAuthorizer", {
  AuthorizerFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:advancedAuthFunction",
  Status: "ACTIVE",
  TokenKeyName: "Authorization",
  EnableCachingForHttp: true,
  SigningDisabled: false,
  TokenSigningPublicKeys: {
    "key1": "publicKeyData"
  }
});
```

## Using Tags for Resource Management

You can add tags to your Authorizer for better resource management and organization.

```ts
const taggedAuthorizer = await AWS.IoT.Authorizer("taggedAuthorizer", {
  AuthorizerFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:taggedAuthFunction",
  Status: "ACTIVE",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IoTPlatform" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing Authorizer instead of failing if it already exists, set the `adopt` parameter to true.

```ts
const adoptedAuthorizer = await AWS.IoT.Authorizer("existingAuthorizer", {
  AuthorizerFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:existingAuthFunction",
  Status: "ACTIVE",
  adopt: true
});
```

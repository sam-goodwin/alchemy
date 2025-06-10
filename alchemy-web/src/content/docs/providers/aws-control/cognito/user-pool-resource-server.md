---
title: UserPoolResourceServer
description: Learn how to create, update, and manage AWS Cognito UserPoolResourceServers using Alchemy Cloud Control.
---


The UserPoolResourceServer resource allows you to manage [AWS Cognito User Pool Resource Servers](https://docs.aws.amazon.com/cognito/latest/userguide/). This resource enables you to define custom resource servers for your user pool, complete with associated scopes.

## Minimal Example

Create a basic User Pool Resource Server with required properties.

```ts
import AWS from "alchemy/aws/control";

const userPoolResourceServer = await AWS.Cognito.UserPoolResourceServer("myResourceServer", {
  UserPoolId: "us-east-1_123456789",
  Identifier: "https://myapi.example.com",
  Name: "My API Resource Server",
  Scopes: [
    {
      ScopeName: "read",
      ScopeDescription: "Read access to the resource"
    },
    {
      ScopeName: "write",
      ScopeDescription: "Write access to the resource"
    }
  ]
});
```

## Advanced Configuration

Configure a User Pool Resource Server with additional scopes for more granular access control.

```ts
const advancedResourceServer = await AWS.Cognito.UserPoolResourceServer("advancedResourceServer", {
  UserPoolId: "us-east-1_987654321",
  Identifier: "https://myadvancedapi.example.com",
  Name: "Advanced API Resource Server",
  Scopes: [
    {
      ScopeName: "admin",
      ScopeDescription: "Admin access to the resource"
    },
    {
      ScopeName: "read",
      ScopeDescription: "Read access to the resource"
    },
    {
      ScopeName: "write",
      ScopeDescription: "Write access to the resource"
    }
  ]
});
```

## Adopt Existing Resource

If you want to adopt an existing resource instead of failing when the resource already exists, you can set the `adopt` property to true.

```ts
const adoptedResourceServer = await AWS.Cognito.UserPoolResourceServer("adoptedResourceServer", {
  UserPoolId: "us-east-1_543216789",
  Identifier: "https://myadoptedapi.example.com",
  Name: "Adopted API Resource Server",
  adopt: true,
  Scopes: [
    {
      ScopeName: "read",
      ScopeDescription: "Read access to the resource"
    }
  ]
});
```

This example illustrates how to adopt an existing User Pool Resource Server by setting the `adopt` property to true, ensuring that the operation does not fail if the resource already exists.

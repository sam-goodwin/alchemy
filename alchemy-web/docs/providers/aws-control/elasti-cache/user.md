---
title: Managing AWS ElastiCache Users with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache Users using Alchemy Cloud Control.
---

# User

The User resource lets you manage [AWS ElastiCache Users](https://docs.aws.amazon.com/elasticache/latest/userguide/) for your Redis and Memcached clusters, allowing for fine-grained access control.

## Minimal Example

Create a basic ElastiCache User with required properties and one optional property for authentication mode.

```ts
import AWS from "alchemy/aws/control";

const basicElastiCacheUser = await AWS.ElastiCache.User("BasicElastiCacheUser", {
  UserName: "defaultUser",
  Engine: "redis",
  AuthenticationMode: {
    Type: "password",
    Passwords: ["securePassword123"],
  },
  NoPasswordRequired: false,
  UserId: "user-01"
});
```

## Advanced Configuration

Configure an ElastiCache User with specific access permissions and tags.

```ts
const advancedElastiCacheUser = await AWS.ElastiCache.User("AdvancedElastiCacheUser", {
  UserName: "adminUser",
  Engine: "redis",
  AuthenticationMode: {
    Type: "password",
    Passwords: ["anotherSecurePassword456"],
  },
  AccessString: "on ~* +@all",
  UserId: "user-admin",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## User Without Password

Create an ElastiCache User that does not require a password, suitable for specific use cases.

```ts
const userWithoutPassword = await AWS.ElastiCache.User("UserWithoutPassword", {
  UserName: "noPasswordUser",
  Engine: "memcached",
  NoPasswordRequired: true,
  UserId: "user-nopass"
});
```

## Adoption of Existing User

Adopt an existing ElastiCache User instead of failing if the user already exists, using the `adopt` property.

```ts
const existingUser = await AWS.ElastiCache.User("ExistingUser", {
  UserName: "existingUser",
  Engine: "redis",
  UserId: "user-exist",
  adopt: true
});
```
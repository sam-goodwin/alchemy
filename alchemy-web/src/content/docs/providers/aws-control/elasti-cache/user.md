---
title: User
description: Learn how to create, update, and manage AWS ElastiCache Users using Alchemy Cloud Control.
---


The User resource allows you to manage [AWS ElastiCache Users](https://docs.aws.amazon.com/elasticache/latest/userguide/) for Redis and Memcached, providing the ability to control access and permissions for caching resources.

## Minimal Example

Create a basic ElastiCache User with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicUser = await AWS.ElastiCache.User("basicUser", {
  UserName: "defaultUser",
  UserId: "user-1234",
  Engine: "redis",
  AccessString: "on ~* +@all"
});
```

## Advanced Configuration

Configure an ElastiCache User with authentication mode and password settings for enhanced security.

```ts
const secureUser = await AWS.ElastiCache.User("secureUser", {
  UserName: "secureUser",
  UserId: "user-5678",
  Engine: "redis",
  AuthenticationMode: {
    Type: "password",
    Passwords: ["StrongPassword123!"]
  },
  AccessString: "on ~* +@all"
});
```

## No Password Required

Create an ElastiCache User that does not require a password, useful for certain configurations.

```ts
const noPasswordUser = await AWS.ElastiCache.User("noPasswordUser", {
  UserName: "guestUser",
  UserId: "user-91011",
  Engine: "redis",
  NoPasswordRequired: true,
  AccessString: "on ~* +@all"
});
```

## With Tags

Create an ElastiCache User with tags for better resource management and organization.

```ts
const taggedUser = await AWS.ElastiCache.User("taggedUser", {
  UserName: "taggedUser",
  UserId: "user-121314",
  Engine: "memcached",
  AccessString: "on ~* +@all",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "CachingSystem" }
  ]
});
```

---
title: User
description: Learn how to create, update, and manage AWS MemoryDB Users using Alchemy Cloud Control.
---


The User resource lets you manage [AWS MemoryDB Users](https://docs.aws.amazon.com/memorydb/latest/userguide/), which are essential for controlling access to your MemoryDB clusters.

## Minimal Example

Create a basic MemoryDB user with required properties and an optional access string.

```ts
import AWS from "alchemy/aws/control";

const memoryDbUser = await AWS.MemoryDB.User("memoryDbUser", {
  UserName: "memoryUser1",
  AccessString: "on ~* +@all"
});
```

## Advanced Configuration

Configure a MemoryDB user with authentication mode and tags for better management.

```ts
const advancedMemoryDbUser = await AWS.MemoryDB.User("advancedMemoryDbUser", {
  UserName: "memoryUser2",
  AccessString: "on ~* +@all",
  AuthenticationMode: {
    Type: "password",
    Passwords: ["SecurePassword123!"]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```

## User with Multiple Authentication Methods

Create a MemoryDB user with multiple authentication methods for enhanced security.

```ts
const multiAuthMemoryDbUser = await AWS.MemoryDB.User("multiAuthMemoryDbUser", {
  UserName: "memoryUser3",
  AccessString: "on ~* +@all",
  AuthenticationMode: {
    Type: "iam",
    Passwords: ["AnotherSecurePassword456!"]
  },
  Tags: [
    { Key: "Project", Value: "MemoryDBMigration" }
  ]
});
```

## Adoption of Existing User Resource

Adopt an existing MemoryDB user instead of failing when the resource already exists.

```ts
const adoptExistingMemoryDbUser = await AWS.MemoryDB.User("existingUser", {
  UserName: "existingUser1",
  AccessString: "on ~* +@all",
  adopt: true
});
```

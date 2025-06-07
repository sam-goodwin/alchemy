---
title: Managing AWS MemoryDB Users with Alchemy
description: Learn how to create, update, and manage AWS MemoryDB Users using Alchemy Cloud Control.
---

# User

The User resource lets you manage [AWS MemoryDB Users](https://docs.aws.amazon.com/memorydb/latest/userguide/) including authentication modes and access permissions.

## Minimal Example

Create a basic MemoryDB user with required properties and one optional property for access string.

```ts
import AWS from "alchemy/aws/control";

const memoryDBUser = await AWS.MemoryDB.User("default-user", {
  UserName: "adminUser",
  AccessString: "on ~* +@all" // Grants the user access to all commands
});
```

## Advanced Configuration

Configure a MemoryDB user with an authentication mode and tags for better management.

```ts
const advancedMemoryDBUser = await AWS.MemoryDB.User("advanced-user", {
  UserName: "secureUser",
  AuthenticationMode: {
    Passwords: ["SecurePassword123"]
  },
  AccessString: "on ~* +@all", // Grants the user access to all commands
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## User with Multiple Passwords

Create a MemoryDB user that utilizes multiple passwords for authentication.

```ts
const multiPasswordUser = await AWS.MemoryDB.User("multi-password-user", {
  UserName: "multiAuthUser",
  AuthenticationMode: {
    Passwords: ["FirstPassword123", "SecondPassword456"]
  },
  AccessString: "on ~* +@all"
});
```

## User with No Access

Create a MemoryDB user with no access to any commands, useful for specific security scenarios.

```ts
const noAccessUser = await AWS.MemoryDB.User("no-access-user", {
  UserName: "restrictedUser",
  AccessString: "off" // No access to any commands
});
```
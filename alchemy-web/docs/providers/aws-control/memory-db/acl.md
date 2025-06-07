---
title: Managing AWS MemoryDB ACLs with Alchemy
description: Learn how to create, update, and manage AWS MemoryDB ACLs using Alchemy Cloud Control.
---

# ACL

The ACL resource allows you to manage [AWS MemoryDB Access Control Lists (ACLs)](https://docs.aws.amazon.com/memorydb/latest/userguide/), which define permissions for users to access MemoryDB clusters.

## Minimal Example

Create a basic ACL with a name and a list of usernames.

```ts
import AWS from "alchemy/aws/control";

const basicACL = await AWS.MemoryDB.ACL("basicAcl", {
  ACLName: "default-access",
  UserNames: ["user1", "user2"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an ACL with additional options for user permissions.

```ts
const advancedACL = await AWS.MemoryDB.ACL("advancedAcl", {
  ACLName: "advanced-access",
  UserNames: ["admin-user", "read-only-user"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with No Users

Create an ACL that does not specify any usernames, allowing for further customization later.

```ts
const noUserACL = await AWS.MemoryDB.ACL("noUserAcl", {
  ACLName: "no-users-access",
  Tags: [
    { Key: "Environment", Value: "staging" }
  ]
});
```

## Example with Tags Only

Create an ACL resource that only specifies tags, allowing for a quick setup.

```ts
const tagOnlyACL = await AWS.MemoryDB.ACL("tagOnlyAcl", {
  ACLName: "tagged-access",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Owner", Value: "QA" }
  ]
});
```
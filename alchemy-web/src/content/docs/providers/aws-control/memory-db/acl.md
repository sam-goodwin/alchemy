---
title: ACL
description: Learn how to create, update, and manage AWS MemoryDB ACLs using Alchemy Cloud Control.
---


The ACL resource allows you to manage [AWS MemoryDB Access Control Lists (ACLs)](https://docs.aws.amazon.com/memorydb/latest/userguide/) to control access to your MemoryDB clusters and resources.

## Minimal Example

Create a basic ACL with a name and a list of usernames.

```ts
import AWS from "alchemy/aws/control";

const memoryDbAcl = await AWS.MemoryDB.ACL("basicAcl", {
  ACLName: "myAcl",
  UserNames: ["user1", "user2"],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "MemoryDBSetup" }
  ]
});
```

## Advanced Configuration

Create an ACL with additional configuration options including tags and adoption of existing resources.

```ts
const advancedMemoryDbAcl = await AWS.MemoryDB.ACL("advancedAcl", {
  ACLName: "secureAcl",
  UserNames: ["adminUser", "readonlyUser"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "HighSecurityApp" }
  ],
  adopt: true // This will use an existing resource if it already exists
});
```

## Use Case: Restrict Access for Multiple Users

Create an ACL that restricts access for a specific set of users.

```ts
const restrictedMemoryDbAcl = await AWS.MemoryDB.ACL("restrictedAcl", {
  ACLName: "restrictedAccess",
  UserNames: ["guestUser1", "guestUser2"],
  Tags: [
    { Key: "AccessLevel", Value: "Restricted" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```

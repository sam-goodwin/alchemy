---
title: UserToGroupAddition
description: Learn how to create, update, and manage AWS IAM UserToGroupAdditions using Alchemy Cloud Control.
---


The UserToGroupAddition resource allows you to add IAM users to an IAM group, helping you manage permissions efficiently. For more details, refer to the official AWS documentation on [AWS IAM UserToGroupAdditions](https://docs.aws.amazon.com/iam/latest/userguide/).

## Minimal Example

Create a UserToGroupAddition with the required properties to add users to an IAM group.

```ts
import AWS from "alchemy/aws/control";

const userGroupAddition = await AWS.IAM.UserToGroupAddition("basicUserGroupAddition", {
  GroupName: "Developers",
  Users: ["alice", "bob"],
  adopt: false // Default is false: This will fail if the resource already exists
});
```

## Advanced Configuration

Configure a UserToGroupAddition to automatically adopt existing resources if they are found.

```ts
const advancedUserGroupAddition = await AWS.IAM.UserToGroupAddition("advancedUserGroupAddition", {
  GroupName: "Admins",
  Users: ["charlie", "dave"],
  adopt: true // This will adopt the existing resource if it already exists
});
```

## Adding Multiple Users

Demonstrate adding multiple users to a group in a single operation.

```ts
const multiUserGroupAddition = await AWS.IAM.UserToGroupAddition("multiUserGroupAddition", {
  GroupName: "Testers",
  Users: ["eve", "frank", "grace"],
  adopt: false // This will create a new resource
});
```

## Error Handling Example

Show how to handle errors when trying to add users to a non-existing group.

```ts
try {
  const errorUserGroupAddition = await AWS.IAM.UserToGroupAddition("errorUserGroupAddition", {
    GroupName: "NonExistentGroup",
    Users: ["heidi"],
    adopt: false // This will throw an error if the group does not exist
  });
} catch (error) {
  console.error("Failed to add user to group:", error);
}
```

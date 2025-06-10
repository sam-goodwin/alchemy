---
title: UserPoolUserToGroupAttachment
description: Learn how to create, update, and manage AWS Cognito UserPoolUserToGroupAttachments using Alchemy Cloud Control.
---


The `UserPoolUserToGroupAttachment` resource lets you manage the association of users with groups in an AWS Cognito User Pool. This resource is essential for organizing users and controlling access to application features based on group membership. For more information, refer to the [AWS Cognito UserPoolUserToGroupAttachments documentation](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

This example demonstrates how to attach a user to a group in a Cognito User Pool with the required properties.

```ts
import AWS from "alchemy/aws/control";

const userGroupAttachment = await AWS.Cognito.UserPoolUserToGroupAttachment("userGroupAttachment", {
  GroupName: "Admins",
  UserPoolId: "us-east-1_ExAmPle",
  Username: "john_doe"
});
```

## Advanced Configuration

In this example, we'll use the `adopt` property to ensure that we adopt an existing resource if it already exists, rather than failing.

```ts
const userGroupAttachmentWithAdopt = await AWS.Cognito.UserPoolUserToGroupAttachment("userGroupAttachmentWithAdopt", {
  GroupName: "Editors",
  UserPoolId: "us-west-2_ExAmPle",
  Username: "jane_doe",
  adopt: true
});
```

## Managing Multiple Users

Here’s how you can manage multiple users by creating separate attachments for each user in a loop.

```ts
const users = ["alice_smith", "bob_johnson", "charlie_brown"];
const groupName = "Developers";

for (const username of users) {
  const userGroupAttachment = await AWS.Cognito.UserPoolUserToGroupAttachment(`userGroupAttachment-${username}`, {
    GroupName: groupName,
    UserPoolId: "eu-central-1_ExAmPle",
    Username: username
  });
}
```

## Error Handling and Logging

You can implement error handling to log any issues encountered during the attachment process.

```ts
const attachUserToGroup = async (username: string) => {
  try {
    await AWS.Cognito.UserPoolUserToGroupAttachment(`userGroupAttachment-${username}`, {
      GroupName: "Managers",
      UserPoolId: "ap-south-1_ExAmPle",
      Username: username
    });
    console.log(`Successfully attached ${username} to Managers group.`);
  } catch (error) {
    console.error(`Failed to attach ${username} to Managers group:`, error);
  }
};

await attachUserToGroup("david_jones");
```
